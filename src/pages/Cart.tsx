import {
  IonApp,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
} from "@ionic/react";
import { archive, heart, trash } from "ionicons/icons";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./../store";

const Cart = () => {
  return (
    <IonApp className="mt-20">
      <IonList>
        <IonItemSliding>
          <IonItemOptions side="start">
            <IonItemOption color="success">
              <IonIcon slot="icon-only" icon={archive}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
          <IonItem>
            <IonLabel class="ion-text-center">
              Sliding Item with Icons Only
            </IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption color="danger">
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      </IonList>
    </IonApp>
  );
};

export default Cart;
