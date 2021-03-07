import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useRef } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { Footer } from "../../components/global/Footer";
import { Header } from "../../components/global/Header";
import "./Order.css";

const OrderDetail: React.FC<RouteComponentProps> = () => {
  const history = useHistory();
  const pageRef = useRef<HTMLElement>(null);

  return (
    <IonPage ref={pageRef}>
      <Header
        hasBackButton={true}
        toolbarClassName="header"
        backButton={
          <IonButton
            onClick={() => {
              history.replace("/");
            }}
          >
            <IonIcon slot="icon-only" icon={chevronBack} />
          </IonButton>
        }
      />
      <IonContent fullscreen className="page">
        <Header large={true} />
        <IonGrid className="thanks-container">
          <IonRow>
            <IonCol size="12" sizeSm="12" sizeMd="12" sizeLg="6" sizeXl="6">
              <div className="thanks-info">
                <h3 className="font-serif italic">Thanks!</h3>
                <p>
                  You’ll receive an email with your receipt, and a backup link
                  to re-download your purchase
                </p>
              </div>
            </IonCol>
            <IonCol size="12" sizeSm="12" sizeMd="12" sizeLg="6" sizeXl="6">
              <div className="card">
                <div className="title-image">
                  <img src="/assets/doesnotexist.svg" alt="Does not exist" />
                </div>
                <div className="info">
                  <p>
                    ...if it did, we'd offer you a{" "}
                    <span className="font-serif italic">
                      100% real store credit
                    </span>
                    , but since it doesn't, we'd love for you to check out{" "}
                    <a
                      href="https://commercejs.com"
                      target="_blank"
                      rel="noopener nofollow noreferrer"
                      className="font-serif italic"
                    >
                      commercejs.com
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://github.com/chec/commercejs-chopchop-demo"
                      target="_blank"
                      rel="noopener nofollow noreferrer"
                      className="font-serif italic"
                    >
                      the repo
                    </a>{" "}
                    for this store instead.
                  </p>
                  <div className="thanks">
                    <img
                      src="/assets/thanks.svg"
                      width={110}
                      height={48}
                      alt="Thanks for visiting"
                    />
                    <span className="italic">
                      'Chop chop' what are you waiting for
                    </span>
                  </div>
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default OrderDetail;
