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
import OrderDetail from "./pages/order/Order";
import CartShipping from "./pages/cart/CartShipping";
import CartPayment from "./pages/cart/CartPayment";
import Cart from "./pages/cart/Cart";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { LoadingProvider } from "./context/loading";
import Loading from "./components/global/Loading";

if (isPlatform("desktop")) {
  // setupConfig({
  //   mode: "ios",
  // });
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const App: React.FC = () => (
  <IonApp>
    <Elements
      stripe={stripePromise}
      options={{
        fonts: [
          {
            cssSrc:
              "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
          },
        ],
      }}
    >
      <LoadingProvider>
        <Loading />
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/cart" exact component={Cart} />
            <Route path="/cart/:id/shipping" exact component={CartShipping} />
            <Route path="/cart/:id/payment" exact component={CartPayment} />
            <Route path="/order" exact component={OrderDetail} />
          </IonRouterOutlet>
        </IonReactRouter>
      </LoadingProvider>
    </Elements>
  </IonApp>
);

export default App;
