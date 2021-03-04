import { ErrorMessage } from "@hookform/error-message";

function FormError({ className = "", ...props }) {
  return (
    <div className="pt-1">
      <ErrorMessage
        {...props}
        render={({ message }) => (
          <span className={`error ${className}`} {...props}>
            {message}
          </span>
        )}
      />
    </div>
  );
}

export default FormError;
