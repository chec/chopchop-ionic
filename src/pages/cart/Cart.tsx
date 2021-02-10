import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Commerce from "@chec/commerce.js";
import { useEffect, useState } from "react";

const CartModal: React.FC = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);
    commerce.cart.retrieve().then((cart) => setCart(cart));
  }, []);

  console.log(cart);

  return (
    <IonPage>
      <IonContent fullscreen>Cart</IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>Powered By Commerce.JS</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default CartModal;
