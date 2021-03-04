import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Product.css";
import Commerce from "@chec/commerce.js";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import ProductListing from "../../components/product/listing/ProductListing";
import { Footer } from "../../components/global/Footer";

interface ProductDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const ProductDetail: React.FC<ProductDetailPageProps> = ({
  match,
  location: { state },
}) => {
  const history = useHistory();
  const [product, setProduct] = useState((state && state["product"]) || null);
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);
    commerce.products
      .retrieve(match.params.id)
      .then((product) => setProduct(product))
      .catch((e) => console.error(e));
  }, [match.params.id]);

  useEffect(() => {
    if (state && state["product"]) {
      setProduct(state["product"]);
    }
  }, [state]);

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
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
                alt="Chop Chop"
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle size="large">
              <img src="assets/chopchop.svg" height="28px" alt="Chop Chop" />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {product && (
          <ProductListing
            product={product}
            onSelectProduct={(product) => {
              history.push(`/product/${product["id"]}`, {
                product,
              });
            }}
          />
        )}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default ProductDetail;
