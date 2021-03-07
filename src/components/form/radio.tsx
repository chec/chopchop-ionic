import { IonItem, IonLabel, IonRadio, IonRadioGroup } from "@ionic/react";
import { Controller } from "react-hook-form";
import "./radio.css";

function FormRadio({
  control,
  labelForItem,
  name,
  options,
  required = false,
  validation = {},

  ...props
}) {
  return (
    <>
      <Controller
        control={control}
        id={name}
        name={name}
        rules={{ required, ...validation }}
        render={({ onChange, onBlur, name }) => (
          <IonRadioGroup onIonChange={onChange}>
            {options.map((item) => {
              return (
                <IonItem key={item.id}>
                  <IonRadio
                    id={props.id || name}
                    name={name}
                    onBlur={onBlur}
                    value={item.id}
                    {...props}
                  />
                  <IonLabel>{labelForItem(item)}</IonLabel>
                </IonItem>
              );
            })}
          </IonRadioGroup>
        )}
      />
    </>
  );
}

export default FormRadio;
