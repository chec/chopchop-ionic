import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import "./ProductListing.css";

interface ProductListingProps {
  product: object;
}

const ProductListing: React.FC<ProductListingProps> = ({ product }) => {
  return (
    <div className="product-listing">
      <IonCard>
        {product["media"] != null && (
          <img src={product["media"]["source"]} className="product-image" />
        )}
        <IonCardHeader>
          <IonCardTitle>{product["name"]}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="product-description">
          <div
            dangerouslySetInnerHTML={{ __html: product["description"] }}
          ></div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default ProductListing;
