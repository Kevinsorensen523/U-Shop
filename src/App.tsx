import React, { useEffect, useState } from "react";
import { Link, Redirect, Route, useHistory } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  IonToggle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "./App.css";
import { logoIonic, cartOutline, personOutline } from "ionicons/icons";
import Home from "./pages/Home";

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
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import History from "./pages/History";
import Cart from "./pages/Cart";
import { RootState } from "./store";
import { useSelector } from "react-redux";

setupIonicReact();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar color="primary">
              <IonMenuToggle>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <IonTitle class="ion-text-center">U-Shop</IonTitle>
                </Link>
              </IonMenuToggle>
            </IonToolbar>
          </IonHeader>

          <IonContent
            className="ion-padding"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonGrid style={{ width: "100%" }}>
              <IonRow>
                <IonMenuToggle autoHide={false}>
                  <IonButton
                    routerLink="/wishlist"
                    fill="clear"
                    className="text-lg"
                  >
                    Wishlist
                  </IonButton>
                </IonMenuToggle>
              </IonRow>
              <IonRow>
                <IonMenuToggle autoHide={false}>
                  <IonButton
                    routerLink="/history"
                    fill="clear"
                    className="text-lg"
                  >
                    History
                  </IonButton>
                </IonMenuToggle>
              </IonRow>
              <IonRow>
                <IonMenuToggle autoHide={false}>
                  <IonButton
                    routerLink="/profile"
                    fill="clear"
                    className="text-lg"
                  >
                    Profile
                  </IonButton>
                </IonMenuToggle>
              </IonRow>
              <IonRow>
                <IonMenuToggle autoHide={false}>
                  <IonToggle
                    checked={isDarkMode}
                    onIonChange={(e) => setIsDarkMode(e.detail.checked)}
                  >
                    Dark Mode
                  </IonToggle>
                </IonMenuToggle>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonMenu>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonButton routerLink="/cart" fill="clear" slot="end">
              <IonIcon icon={cartOutline} size="large" />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "relative",
                    background: "red",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "0.75rem",
                    top: "10px",
                    right: "10px",
                    transform: "translate(50%, -50%)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </IonButton>

            <IonTitle></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonPage id="main-content">
          <IonRouterOutlet id="main-content">
            <Route exact path="/home" component={Home} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/history" component={History} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
