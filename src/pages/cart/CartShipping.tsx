import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Commerce from "@chec/commerce.js";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import "./Cart.css";
import { useForm, FormProvider } from "react-hook-form";
import FormRadio from "../../components/form/radio";
import AddressFields from "../../components/cart/address";

interface CartShippingPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const CartShipping: React.FC<CartShippingPageProps> = ({ match }) => {
  const { id: checkoutId } = match.params;
  const [cart, setCart] = useState(null);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const history = useHistory();
  const methods = useForm();
  const { watch, setValue, control } = methods;
  const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);

  const form = useRef<HTMLFormElement>();

  const watchCountry = watch("shipping.country");
  const watchSubdivision = watch("shipping.region");
  const watchShippingMethod = watch("fulfillment.shipping_method");

  useEffect(() => {
    commerce.cart.retrieve().then((cart) => setCart(cart));
  }, []);

  useEffect(() => {
    fetchCountries(checkoutId);
  }, [checkoutId]);

  useEffect(() => {
    setValue("shipping.region", "");

    if (watchCountry) {
      fetchSubdivisions(checkoutId, watchCountry);
      fetchShippingOptions(checkoutId, watchCountry);
    }
  }, [checkoutId, watchCountry]);

  useEffect(() => {
    if (watchSubdivision) {
      fetchShippingOptions(checkoutId, watchCountry, watchSubdivision);
    }
  }, [checkoutId, watchSubdivision]);

  useEffect(() => {
    if (watchShippingMethod) {
      onShippingSelect(watchShippingMethod);
    }
  }, [watchShippingMethod]);

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

  const fetchShippingOptions = async (checkoutId, country, region = null) => {
    if (!checkoutId && !country) return;

    setValue("fulfillment.shipping_method", null);

    try {
      const shippingOptions = await commerce.checkout.getShippingOptions(
        checkoutId,
        {
          country,
          ...(region && { region }),
        }
      );

      setShippingOptions(shippingOptions);

      if (shippingOptions.length === 1) {
        const [shippingOption] = shippingOptions;

        setValue("fulfillment.shipping_method", shippingOption.id);
        selectShippingMethod(shippingOption.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onShippingSelect = (value) => selectShippingMethod(value);

  const selectShippingMethod = async (optionId) => {
    try {
      await setShippingMethod(optionId, watchCountry, watchSubdivision);
    } catch (err) {
      console.log(err);
    }
  };

  const setShippingMethod = async (shipping_option_id, country, region) => {
    try {
      await commerce.checkout.checkShippingOption(checkoutId, {
        shipping_option_id,
        country,
        ...(region && { region }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (values) => {
    history.push(`/cart/${checkoutId}/payment`, {
      shippingInfo: values["shipping"],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="cart-header">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            <img
              src="assets/chopchop.svg"
              height="28px"
              width="144px"
              alt="Chop Chop"
            />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="cart">
        <FormProvider {...methods}>
          <form ref={form} onSubmit={methods.handleSubmit(onSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeSm="6" sizeMd="6" sizeLg="6" sizeXl="6">
                  <h3>Shipping Address</h3>
                  <IonGrid>
                    <AddressFields
                      prefix="shipping"
                      control={control}
                      countries={countries}
                      regions={regions}
                    />
                  </IonGrid>
                </IonCol>
                <IonCol size="12" sizeSm="6" sizeMd="6" sizeLg="6" sizeXl="6">
                  <h3>Shipping</h3>
                  {watchCountry ? (
                    <FormRadio
                      control={control}
                      name="fulfillment.shipping_method"
                      labelForItem={(item) => {
                        return `${item.description}: ${item.price.formatted_with_symbol}`;
                      }}
                      options={shippingOptions}
                      required
                    />
                  ) : (
                    <p>Please enter your address to fetch shipping options</p>
                  )}
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
                methods.handleSubmit(onSubmit)();
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

export default CartShipping;
