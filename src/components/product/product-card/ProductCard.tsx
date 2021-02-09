import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { useHistory } from "react-router";
import "./ProductCard.css";

interface ProductCardProps {
  product: object;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const history = useHistory();
  return (
    <div className="product-card">
      <IonCard
        className="ion-no-margin ion-no-padding"
        onClick={(e) => {
          history.push(`/product/${product["id"]}`, {
            product,
          });
        }}
      >
        {product["media"] != null && (
          <img src={product["media"]["source"]} className="product-image" />
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
