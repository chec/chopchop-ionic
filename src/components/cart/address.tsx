import { IonCol, IonRow } from "@ionic/react";
import FormInput from "../form/input";
import FormSelect from "../form/select";

const AddressFields = ({ prefix, control, countries, regions }) => {
  return (
    <>
      <IonRow>
        <IonCol>
          <FormInput
            control={control}
            label="First Name"
            name={`${prefix}.firstname`}
            required
          />
        </IonCol>
        <IonCol>
          <FormInput
            control={control}
            label="Last Name"
            name={`${prefix}.lastname`}
            required
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <FormInput
            control={control}
            label="Address"
            name={`${prefix}.street`}
            required
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <FormInput
            control={control}
            label="City"
            name={`${prefix}.town_city`}
            required
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <FormSelect
            control={control}
            label={"Select country"}
            name={`${prefix}.country`}
            required
            options={countries}
          />
        </IonCol>
        <IonCol>
          <FormSelect
            control={control}
            label={"Select region"}
            name={`${prefix}.region`}
            required
            options={regions}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <FormInput
            control={control}
            label="Zip"
            name={`${prefix}.postal_zip_code`}
            required
          />
        </IonCol>
      </IonRow>
    </>
  );
};

export default AddressFields;
