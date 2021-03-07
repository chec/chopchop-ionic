import { IonContent, IonPage } from "@ionic/react";
import "./Product.css";
import Commerce from "@chec/commerce.js";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import ProductListing from "../../components/product/listing/ProductListing";
import { Footer } from "../../components/global/Footer";
import { Header } from "../../components/global/Header";

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
      <Header hasBackButton={true} hasCartButton={true} />
      <IonContent fullscreen>
        <Header large={true} />
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
