import Commerce from "@chec/commerce.js";
import { IonCol, IonGrid, IonRow, IonToast } from "@ionic/react";
import { useMemo, useState } from "react";
import { useLoader } from "../../../context/loading";
import ProductCard from "../product-card/ProductCard";
import ProductDescription from "./description/ProductDescription";
import "./ProductListing.css";

interface ProductListingProps {
  product: any;
  onSelectProduct: (product) => void;
}

const ProductListing: React.FC<ProductListingProps> = ({
  product,
  onSelectProduct,
}) => {
  const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);
  const { showLoading, hideLoading } = useLoader();
  const [showAddedToCartToast, setShowAddedToCartToast] = useState(false);
  const {
    variants = [],
    assets = [],
    meta = {},
    related_products = [],
  } = product;
  const images = assets.filter(({ is_image }) => is_image);

  const initialVariants = useMemo(
    () =>
      variants.reduce((all, { id, options }) => {
        const [firstOption] = options;

        return { ...all, [id]: firstOption.id };
      }, {}),
    [variants]
  );

  const [selectedVariants, setSelectedVariants] = useState(initialVariants);

  const handleVariantChange = ({ target: { id, value } }) => {
    setSelectedVariants({
      ...selectedVariants,
      [id]: value,
    });
  };

  const handleAddItemToBag = async (event) => {
    showLoading();
    await commerce.cart.add(product.id, 1, selectedVariants);
    setShowAddedToCartToast(true);
    hideLoading();
  };

  const ProductDescriptionContainer = () => (
    <ProductDescription
      product={product}
      variants={variants}
      defaultVariants={initialVariants}
      selectedVariants={selectedVariants}
      onVariantChange={handleVariantChange}
      onAddItemToBag={handleAddItemToBag}
    />
  );

  return (
    <>
      <IonGrid className="product-listing">
        <IonRow>
          <IonCol className="ion-hide-md-down">
            <ProductDescriptionContainer />
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
                      <img src={url} alt="" />
                    </IonCol>
                  );
                })}
              </IonRow>
              <IonRow className="meta ion-hide-md-down">
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
                      <img
                        src={`/assets/product-attributes/${fileName}`}
                        alt=""
                      />
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonGrid>
          </IonCol>
        </IonRow>
        <IonRow className="ion-hide-md-up">
          <IonCol>
            <ProductDescriptionContainer />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonGrid>
              <IonRow>
                <h3 className="font-serif">Some other things you might like</h3>
              </IonRow>
              <IonRow>
                {related_products.map((related_product) => {
                  return (
                    <IonCol
                      size="12"
                      sizeSm="6"
                      sizeMd="6"
                      sizeLg="3"
                      sizeXl="3"
                      key={related_product.id}
                    >
                      <ProductCard
                        product={related_product}
                        onSelectProduct={onSelectProduct}
                      />
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonGrid>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonToast
        isOpen={showAddedToCartToast}
        onDidDismiss={() => setShowAddedToCartToast(false)}
        message={`${product.name} is now in your cart.`}
        duration={3000}
      />
    </>
  );
};

export default ProductListing;
