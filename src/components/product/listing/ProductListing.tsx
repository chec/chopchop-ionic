import { IonCard, IonCol, IonGrid, IonRow } from "@ionic/react";
import ProductDescription from "./description/ProductDescription";
import "./ProductListing.css";

interface ProductListingProps {
  product: any;
}

const ProductListing: React.FC<ProductListingProps> = ({ product }) => {
  const { variants, assets, meta, related_products } = product;
  const images = assets.filter(({ is_image }) => is_image);
  return (
    <IonGrid className="product-listing">
      <IonRow>
        <IonCol className="ion-hide-md-down" size="5">
          <ProductDescription product={product} />
        </IonCol>
        <IonCol>
          <IonGrid>
            <IonRow className="images">
              {images.map(({ id, url }) => {
                return (
                  <IonCol
                    size="12"
                    sizeSm="12"
                    sizeMd="12"
                    sizeLg="12"
                    sizeXl="12"
                    key={id}
                  >
                    <img src={url} />
                  </IonCol>
                );
              })}
            </IonRow>
            <IonRow className="meta">
              {(meta.attributes || []).map((fileName) => {
                return (
                  <IonCol
                    size="6"
                    sizeSm="6"
                    sizeMd="6"
                    sizeLg="6"
                    sizeXl="6"
                    key={fileName}
                  >
                    <img src={`/assets/product-attributes/${fileName}`} />
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        </IonCol>
      </IonRow>
      <IonRow className="ion-hide-md-up">
        <IonCol>
          <ProductDescription product={product} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ProductListing;
