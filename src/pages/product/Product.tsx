import {
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
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import ProductListing from "../../components/product/listing/ProductListing";

interface ProductDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const ProductDetail: React.FC<ProductDetailPageProps> = ({
  match,
  location: { state },
}) => {
  const [product, setProduct] = useState((state && state["product"]) || null);

  useEffect(() => {
    const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);
    commerce.products
      .retrieve(match.params.id)
      .then((product) => setProduct(product))
      .catch((e) => console.error(e));
  }, [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <img src="assets/chopchop.svg" height="28px" width="144px" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
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
