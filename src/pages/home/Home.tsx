import {
  IonButton,
  IonButtons,
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
import ProductCard from "../../components/product/product-card/ProductCard";
import { Footer } from "../../components/global/Footer";
import { RouteComponentProps } from "react-router";

const Home: React.FC<RouteComponentProps> = ({ history }) => {
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
          <IonTitle>
            <img
              src="assets/chopchop.svg"
              height="28px"
              width="144px"
              alt="Chop Chop"
            />
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={(e) => {
                history.push("/cart");
              }}
            >
              <img
                src="assets/cart.svg"
                height="28px"
                width="44px"
                alt="Cart"
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="home">
          <IonRow>
            <IonCol className="ion-hide-md-up">
              <img src="assets/chopchop.svg" alt="Chop Chop" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-hide-md-down">
              <img src="assets/chopchop.svg" alt="Chop Chop" />
            </IonCol>
            <IonCol>
              <IonGrid>
                <IonRow>
                  {products.map((product) => {
                    return (
                      <IonCol
                        size="12"
                        sizeSm="12"
                        sizeMd="12"
                        sizeLg="6"
                        sizeXl="6"
                        key={product.id}
                        className="ion-no-padding"
                      >
                        <ProductCard
                          product={product}
                          onSelectProduct={(product) => {
                            history.push(`/product/${product["id"]}`, {
                              product,
                            });
                          }}
                        />
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Home;
