import "./ProductListing.css";

interface ProductListingProps {
  product: object;
}

const ProductListing: React.FC<ProductListingProps> = ({ product }) => {
  return (
    <div className="container">
      <p>My product</p>
    </div>
  );
};

export default ProductListing;
