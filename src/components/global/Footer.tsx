import { IonFooter, IonToolbar } from "@ionic/react";
import "./Footer.css";

export const Footer = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <div className="container">
          <a href="https://commercejs.com/">
            <span>Powered By</span>
            <img src="/assets/commercejs.svg" height="22px" alt="CommerceJS" />
          </a>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};
