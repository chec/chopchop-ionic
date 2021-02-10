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
import "./Home.css";
import Commerce from "@chec/commerce.js";
import { useEffect, useState } from "react";
import ProductCard from "../../components/product/product-card/ProductCard";

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
      <IonContent fullscreen>
        <IonGrid className="home">
          <IonRow>
            <IonCol className="ion-hide-md-up">
              <img src="assets/chopchop.svg" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-hide-md-down">
              <img src="assets/chopchop.svg" />
            </IonCol>
            <IonCol>
              <IonGrid>
                <IonRow>
                  {products.map((product) => {
                    return (
                      <IonCol
                        size="12"
                        sizeSm="6"
                        sizeMd="6"
                        sizeLg="6"
                        sizeXl="6"
                        key={product.id}
                        className="ion-no-padding"
                      >
                        <ProductCard product={product} />
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>Powered By Commerce.JS</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
