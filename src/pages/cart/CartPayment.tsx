import Commerce from "@chec/commerce.js";
import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonPage,
  IonRow,
} from "@ionic/react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import AddressFields from "../../components/cart/address";
import FormCheckbox from "../../components/form/checkbox";
import FormInput from "../../components/form/input";
import { Header } from "../../components/global/Header";
import { useLoader } from "../../context/loading";

interface CartPaymentPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const CartPayment: React.FC<CartPaymentPageProps> = ({
  match,
  location: { state },
}) => {
  const { id: checkoutId } = match.params;
  const shippingInfo = (state && state["shippingInfo"]) || null;
  const [cart, setCart] = useState(null);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);
  const history = useHistory();
  const { showLoading, hideLoading } = useLoader();
  const methods = useForm();
  const { setError, watch, setValue, control, clearErrors } = methods;
  const style = {
    base: {
      "::placeholder": {
        color: "rgba(21,7,3,0.3)",
      },
      color: "#150703",
      fontSize: "16px",
      fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
      iconColor: "#6B7280",
    },
  };

  const stripe = useStripe();
  const elements = useElements();

  const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);

  const watchCountry = watch("payment.country");

  useEffect(() => {
    commerce.cart.retrieve().then((cart) => setCart(cart));
  }, []);

  useEffect(() => {
    fetchCountries(checkoutId);
  }, [checkoutId]);

  useEffect(() => {
    setValue("payment.region", "");

    if (watchCountry) {
      fetchSubdivisions(checkoutId, watchCountry);
    }
  }, [checkoutId, watchCountry]);

  const reducer = ([code, name]) => ({
    value: code,
    label: name,
  });

  const fetchCountries = async (checkoutId) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutId
      );

      const formattedCountries = countries
        ? Object.entries(countries).map(reducer)
        : [];

      setCountries(formattedCountries);
    } catch (err) {
      // noop
    }
  };

  const fetchSubdivisions = async (checkoutId, countryCode) => {
    try {
      const {
        subdivisions,
      } = await commerce.services.localeListShippingSubdivisions(
        checkoutId,
        countryCode
      );

      const formattedRegions = subdivisions
        ? Object.entries(subdivisions).map(reducer)
        : [];

      setRegions(formattedRegions);
    } catch (err) {
      // noop
    }
  };

  const onSubmit = (values) => {
    captureOrder({ ...values, shipping: shippingInfo });
  };

  const onStripeChange = () => {
    clearErrors("stripe");
  };

  const capture = (values) => commerce.checkout.capture(checkoutId, values);

  const captureOrder = async (values) => {
    showLoading();
    setProcessing(true);

    const {
      customer,
      shipping,
      payment: { firstname, lastname, region: county_state, ...payment },
      ...data
    } = values;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement("cardNumber"),
      billing_details: {
        name: `${payment.firstname} ${payment.lastname}`,
        email: customer.email,
      },
    });

    if (error) {
      hideLoading();
      setError("stripe", { type: "manual", message: error.message });
      setProcessing(false);
      return;
    }

    const checkoutPayload = {
      ...data,
      customer: {
        ...customer,
        firstname,
        lastname,
      },
      ...(shipping && {
        shipping: {
          ...shipping,
          name: `${shipping.firstname} ${shipping.lastname}`,
        },
      }),
      billing: {
        ...payment,
        name: `${firstname} ${lastname}`,
        county_state,
      },
    };

    try {
      const newOrder = await capture({
        ...checkoutPayload,
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      });

      handleOrderSuccess(newOrder);
      setProcessing(false);
    } catch (res) {
      if (
        res.statusCode !== 402 ||
        res.data.error.type !== "requires_verification"
      ) {
        hideLoading();
        setCheckoutError(res.data.error.message);
        setProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.handleCardAction(
        res.data.error.param
      );

      if (error) {
        hideLoading();
        setError("stripe", { type: "manual", message: error.message });
        setProcessing(false);
        return;
      }

      try {
        const newOrder = await capture({
          ...checkoutPayload,
          payment: {
            gateway: "stripe",
            stripe: {
              payment_intent_id: paymentIntent.id,
            },
          },
        });

        handleOrderSuccess(newOrder);
        setProcessing(false);
      } catch (err) {
        hideLoading();
        setError("stripe", { type: "manual", message: error.message });
        setProcessing(false);
      }
    }
  };

  const handleOrderSuccess = (order) => {
    hideLoading();
    history.push(`/order`);
  };

  return (
    <IonPage>
      <Header hasBackButton={true} toolbarClassName="cart-header" />
      <IonContent fullscreen className="cart">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeSm="6" sizeMd="6" sizeLg="6" sizeXl="6">
                  <h3>Billing Address</h3>
                  <IonGrid>
                    <IonRow>
                      <FormCheckbox
                        control={control}
                        label="Same as shipping address?"
                        name={"info.useshippinginfo"}
                        onChangeCheckbox={({ target: { checked } }) => {
                          let info = {};
                          Object.keys(shippingInfo).forEach((key) => {
                            info[`payment.${key}`] = shippingInfo[key];
                          });
                          checked && setValue("payment", info);
                        }}
                      />
                    </IonRow>
                    <AddressFields
                      prefix="payment"
                      control={control}
                      countries={countries}
                      regions={regions}
                    />
                  </IonGrid>
                </IonCol>
                <IonCol size="12" sizeSm="6" sizeMd="6" sizeLg="6" sizeXl="6">
                  <h3>Payment</h3>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <FormInput
                          control={control}
                          label="Receipt email"
                          name={"customer.email"}
                          required
                        />
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <CardNumberElement
                          options={{ style }}
                          onChange={onStripeChange}
                        />
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <CardExpiryElement
                          options={{ style }}
                          onChange={onStripeChange}
                        />
                      </IonCol>
                      <IonCol>
                        <CardCvcElement
                          options={{ style }}
                          onChange={onStripeChange}
                        />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </FormProvider>
      </IonContent>
      {cart && (
        <IonFooter>
          <div className="cart-actions">
            <span>
              Total: {cart.subtotal.formatted_with_symbol}, {cart.total_items}{" "}
              items
            </span>
            <button
              onClick={(e) => {
                methods.handleSubmit(onSubmit, (e) => {
                  console.log(e);
                })();
              }}
              className="checkout-button"
            >
              Pay
            </button>
          </div>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default CartPayment;
