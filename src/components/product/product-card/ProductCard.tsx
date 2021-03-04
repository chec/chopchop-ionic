import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import "./ProductCard.css";

interface ProductCardProps {
  product: object;
  onSelectProduct: (product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  return (
    <div className="product-card">
      <IonCard
        className="ion-no-margin ion-no-padding"
        onClick={(e) => {
          onSelectProduct(product);
        }}
      >
        {product["media"] != null && (
          <img
            src={product["media"]["source"]}
            className="product-image"
            alt=""
          />
        )}
        <IonCardHeader>
          <IonCardTitle>
            <IonGrid>
              <IonRow>
                <IonCol>{product["name"]}</IonCol>
                <IonCol className="ion-text-end price" size="4">
                  {product["price"]["formatted_with_symbol"]}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </div>
  );
};

export default ProductCard;
