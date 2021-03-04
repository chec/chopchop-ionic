import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Commerce from "@chec/commerce.js";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Cart.css";
import { CartItem } from "../../components/cart/item";

const Cart: React.FC = () => {
  const [cart, setCart] = useState(null);
  const history = useHistory();
  const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);

  useEffect(() => {
    commerce.cart.retrieve().then((cart) => setCart(cart));
  }, []);

  const increaseQuantity = async ({ id, quantity }) => {
    const { cart } = await commerce.cart.update(id, { quantity: quantity + 1 });
    setCart(cart);
  };

  const decreaseQuantity = async ({ id, quantity }) => {
    if (quantity > 1) {
      const { cart } = await commerce.cart.update(id, {
        quantity: quantity - 1,
      });
      setCart(cart);
      return;
    }

    removeItem({ id });
  };

  const removeItem = async ({ id }) => {
    const { cart } = await commerce.cart.remove(id);
    setCart(cart);
  };

  const checkoutCart = async () => {
    const checkout = await commerce.checkout.generateToken(cart.id, {
      type: "cart",
    });
    console.log(checkout);
    history.push(`/cart/${checkout.id}/shipping`);
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
        <IonList className="cart-items" lines="none">
          {cart &&
            cart.line_items.map((item) => {
              return (
                <div key={item.id}>
                  <CartItem
                    item={item}
                    decrementQuantity={() => decreaseQuantity(item)}
                    incrementQuantity={() => increaseQuantity(item)}
                    removeItem={() => removeItem(item)}
                  />
                  {/* <IonItem key={item.id}>
                    {item.media && (
                      <img
                        src={item.media.source}
                        className="item-image"
                        alt=""
                      />
                    )}
                    <IonLabel className="ion-align-self-end item-name">
                      {item.name}
                    </IonLabel>
                    <div className="ion-align-self-end">
                      <IonGrid slot="end">
                        <IonRow className="item-price">
                          {item.line_total.formatted_with_symbol}
                        </IonRow>
                        <IonRow className="item-quantity">
                          <span className="label">Quantity: </span>
                          <button
                            onClick={(e) => decreaseQuantity(item)}
                            className="action cart-button hover"
                          >
                            -
                          </button>{" "}
                          <span className="amount">{item.quantity} </span>
                          <button
                            onClick={(e) => increaseQuantity(item)}
                            className="action cart-button hover"
                          >
                            +
                          </button>
                        </IonRow>
                        <IonRow className="item-actions">
                          <button
                            onClick={(e) => removeItem(item)}
                            className="cart-button"
                          >
                            Remove
                          </button>
                        </IonRow>
                      </IonGrid>
                    </div>
                  </IonItem> */}
                  <hr />
                </div>
              );
            })}
        </IonList>
      </IonContent>
      {cart && (
        <IonFooter>
          <div className="cart-actions">
            <span>
              Total: {cart.subtotal.formatted_with_symbol}, {cart.total_items}{" "}
              items
            </span>
            <button onClick={checkoutCart} className="checkout-button">
              Check Out
            </button>
          </div>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default Cart;
