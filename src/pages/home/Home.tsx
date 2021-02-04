import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import Commerce from "@chec/commerce.js";
import { useEffect, useState } from "react";
import ProductListing from "../../components/product-listing/ProductListing";

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);
    commerce.products
      .list({ active: 1 })
      .then((products) => setProducts(products.data));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ChopChop</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ChopChop</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {products.map((product) => {
              return (
                <IonCol
                  size="12"
                  sizeSm="6"
                  sizeMd="4"
                  sizeLg="4"
                  key={product.id}
                >
                  <ProductListing product={product} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
