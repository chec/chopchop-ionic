import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";

export const Header = ({
  hasBackButton = false,
  backButton = undefined,
  hasCartButton = false,
  hasTitleImage = true,
  large = false,
  toolbarClassName = "",
}) => {
  const history = useHistory();
  return (
    <IonHeader collapse={large ? "condense" : undefined}>
      <IonToolbar className={toolbarClassName}>
        {hasBackButton && (
          <>
            {backButton !== undefined ? (
              <>{backButton}</>
            ) : (
              <IonButtons slot="start">
                <IonBackButton defaultHref="/" />
              </IonButtons>
            )}
          </>
        )}
        <IonTitle size={large ? "large" : "small"}>
          {hasTitleImage && (
            <img
              src="assets/chopchop.svg"
              height="28px"
              width="144px"
              alt="Chop Chop"
            />
          )}
        </IonTitle>
        {hasCartButton && (
          <IonButtons slot="end">
            <IonButton
              onClick={(e) => {
                history.push("/cart");
              }}
            >
              <img
                src="assets/cart.svg"
                height="28px"
                width="44px"
                alt="Cart"
              />
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};
