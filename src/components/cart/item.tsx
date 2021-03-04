import "./item.css";

export const CartItem = ({
  item,
  decrementQuantity,
  incrementQuantity,
  removeItem,
}) => {
  return (
    <div className="cart-item">
      {/* Image */}
      <div className="image">
        {item.media && (
          <img src={item.media.source} className="item-image" alt="" />
        )}
      </div>
      {/* Info and actions */}
      <div className="info">
        <div className="name">
          <p className="font-serif italic">{item.name}</p>
        </div>
        <div className="secondary">
          <div className="price">{item.line_total.formatted_with_symbol}</div>
          <div className="actions-container">
            <div className="actions">
              <span className="pr-2">Quantity:</span>
              <button
                onClick={decrementQuantity}
                className="action cart-button hover"
              >
                -
              </button>
              <span className="px-2 md:text-lg">{item.quantity}</span>
              <button
                onClick={incrementQuantity}
                className="action cart-button hover"
              >
                +
              </button>
            </div>
            <div>
              <button onClick={removeItem} className="action cart-button hover">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
