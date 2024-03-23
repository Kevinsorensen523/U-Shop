import React, { useEffect, useState } from "react";
import { Link, Redirect, Route } from "react-router-dom";
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
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import History from "./pages/History";
import { RootState } from "./store";
import { useSelector } from "react-redux";

setupIonicReact();

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

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
