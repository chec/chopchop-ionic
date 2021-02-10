import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupConfig, isPlatform } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/home/Home";

import "./global.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import ProductDetail from "./pages/product/Product";
import { createElement } from "react";
import { render } from "react-dom";
import CartModal from "./pages/cart/Cart";

if (isPlatform("desktop")) {
  setupConfig({
    mode: "ios",
  });
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/product/:id" component={ProductDetail} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

class CartModalComponent extends HTMLElement {
  createModal() {
    return createElement(CartModal);
  }

  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.appendChild(mountPoint);

    render(this.createModal(), mountPoint);
  }
}

window.customElements.define("cart-modal", CartModalComponent);

export default App;
