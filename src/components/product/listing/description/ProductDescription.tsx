import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import "./ProductDescription.css";

interface ProductDescriptionProps {
  product: any;
  variants: any[];
  defaultVariants: object;
  onVariantChange: (any) => void;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
  variants = [],
  defaultVariants = {},
  onVariantChange,
}) => {
  return (
    <div className="product-description">
      <h1>{product["name"]}</h1>
      <IonGrid className="ion-no-padding">
        <IonRow>
          <IonCol>{product["price"]["formatted_with_symbol"]}</IonCol>
          <IonCol className="ion-text-end">Add to bag</IonCol>
        </IonRow>
        {variants.map(({ options, ...variant }) => {
          return (
            <IonRow key={variant["id"]}>
              <IonCol>
                <IonItem lines="none" className="variant ion-no-padding">
                  <IonLabel>{variant["name"]}</IonLabel>
                  <IonSelect
                    id={variant["id"]}
                    onIonChange={onVariantChange}
                    defaultValue={defaultVariants[variant["id"]]}
                  >
                    {options.map((option) => {
                      return (
                        <IonSelectOption
                          key={option["id"]}
                          value={option["id"]}
                        >
                          {option["name"]}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
          );
        })}
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
