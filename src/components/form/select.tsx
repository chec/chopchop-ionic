import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { Controller } from "react-hook-form";

import FormError from "./error";

import "./select.css";

function FormSelect({
  control,
  label,
  name,
  options,
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
        render={({ onChange, onBlur, name }) => (
          <IonItem
            lines="none"
            className="ion-no-margin ion-no-padding select-item"
            key={name}
          >
            <IonSelect
              placeholder={label}
              title={label}
              id={name}
              name={name}
              defaultValue=""
              onIonChange={onChange}
            >
              {options.map(({ value, label }) => (
                <IonSelectOption key={value} value={value}>
                  {label}
                </IonSelectOption>
              ))}
            </IonSelect>
            <IonLabel id={name}>{label}</IonLabel>
          </IonItem>
        )}
      />
      <FormError name={name} />
    </>
  );
}

export default FormSelect;
