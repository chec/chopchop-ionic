import {
  IonBackButton,
  IonButton,
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
import "./Product.css";
import Commerce from "@chec/commerce.js";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import ProductListing from "../../components/product/listing/ProductListing";
import { addModal } from "../../utils/modal";

interface ProductDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const ProductDetail: React.FC<ProductDetailPageProps> = ({
  match,
  location: { state },
}) => {
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
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            <img src="assets/chopchop.svg" height="28px" width="144px" />
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={(e) => {
                addModal("cart-modal", pageRef);
              }}
            >
              Cart
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
              <img src="assets/chopchop.svg" height="28px" />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {product && <ProductListing product={product} />}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>Powered By Commerce.JS</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ProductDetail;
