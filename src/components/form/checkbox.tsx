import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import { Controller } from "react-hook-form";

function FormCheckbox({
  control,
  label,
  name,
  required = false,
  validation = {},
  onChangeCheckbox = undefined,
  ...props
}) {
  return (
    <>
      <Controller
        control={control}
        id={name}
        name={name}
        placeholder={label}
        defaultValue=""
        rules={{ required, ...validation }}
        render={({ onChange, onBlur, name }) => (
          <IonItem className="ion-no-margin ion-no-padding" lines="none">
            <IonCheckbox
              id={props.id || name}
              name={name}
              onIonChange={(e) => {
                onChangeCheckbox(e);
                onChange(e);
              }}
              onBlur={onBlur}
              {...props}
            />
            <IonLabel>{label}</IonLabel>
          </IonItem>
        )}
      />
    </>
  );
}

export default FormCheckbox;
