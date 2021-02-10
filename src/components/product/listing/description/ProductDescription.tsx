import { IonCol, IonGrid, IonRow } from "@ionic/react";

interface ProductDescriptionProps {
  product: any;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div>
      <h1>{product["name"]}</h1>
      <IonGrid className="ion-no-padding">
        <IonRow>
          <IonCol>
            <span>{product["price"]["formatted_with_symbol"]}</span>
            <span>Variants</span>
          </IonCol>
          <IonCol className="ion-text-end">Add to bag</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ProductDescription;
