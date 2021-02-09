import { IonCard, IonCol, IonGrid, IonRow } from "@ionic/react";
import "./ProductListing.css";

interface ProductListingProps {
  product: any;
}

const ProductListing: React.FC<ProductListingProps> = ({ product }) => {
  //   console.log(product);
  const { variants, assets, meta, related_products } = product;
  const images = assets.filter(({ is_image }) => is_image);
  //   console.log(images);
  return (
    <IonGrid className="product-listing">
      <IonRow>
        <IonCol className="ion-hide-md-down" size="5">
          Content
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
          </IonGrid>
        </IonCol>
      </IonRow>
      <IonRow className="ion-hide-md-up">
        <IonCol>Content</IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ProductListing;
