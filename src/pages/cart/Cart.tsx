import Commerce from "@chec/commerce.js";
import { IonContent, IonFooter, IonList, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { CartItem } from "../../components/cart/item";
import { Header } from "../../components/global/Header";
import "./Cart.css";

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
      <Header hasBackButton={true} toolbarClassName="cart-header" />
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
