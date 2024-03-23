import {
  IonApp,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
} from "@ionic/react";
import { archive, trash } from "ionicons/icons";
import React from "react";

const Wishlist = () => {
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

export default Wishlist;
