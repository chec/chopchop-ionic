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
  selectedVariants: object;
  onVariantChange: (any) => void;
  onAddItemToBag: (any) => void;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
  variants = [],
  defaultVariants = {},
  selectedVariants = {},
  onVariantChange,
  onAddItemToBag,
}) => {
  return (
    <div className="product-description">
      <h1 className="font-serif italic name">{product["name"]}</h1>
      <IonGrid className="ion-no-padding">
        <IonRow>
          <IonCol className="price">
            {product["price"]["formatted_with_symbol"]}
          </IonCol>
          <IonCol className="ion-text-end">
            <button onClick={onAddItemToBag} className="add-to-cart">
              Add to bag
            </button>
          </IonCol>
        </IonRow>
        {variants.map(({ options, ...variant }) => {
          return (
            <IonRow key={variant["id"]}>
              <IonCol>
                <IonItem
                  lines="none"
                  className="variant ion-no-padding ion-no-margin"
                >
                  <IonSelect
                    placeholder="Select variant"
                    id={variant["id"]}
                    onIonChange={onVariantChange}
                    defaultValue={defaultVariants[variant["id"]]}
                    value={selectedVariants[variant["id"]]}
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
                  <IonLabel>{variant["name"]}</IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
          );
        })}
        <IonRow>
          <IonCol>
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className="prose"
            ></div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ProductDescription;
