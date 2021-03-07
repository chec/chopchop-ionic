import { IonInput } from "@ionic/react";
import { Controller } from "react-hook-form";
import FormError from "./error";

function FormInput({
  control,
  label,
  name,
  required = false,
  validation = {},
  ...props
}) {
  const isRequired = required ? `${label || name} is required` : false;

  return (
    <>
      <Controller
        control={control}
        id={name}
        name={name}
        placeholder={label}
        rules={{ required: isRequired, ...validation }}
        render={({ onChange, onBlur, name, ref }) => (
          <IonInput
            placeholder={label}
            id={name}
            name={name}
            {...props}
            onIonChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
      <FormError name={name} />
    </>
  );
}

export default FormInput;
