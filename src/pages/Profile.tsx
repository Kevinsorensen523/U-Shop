import {
  IonApp,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonTitle,
} from "@ionic/react";
import React from "react";

const Profile = () => {
  return (
    <IonContent className="mt-20 justify-center">
      <IonCard>
        <img alt="Muka Gua" src="/Profile/Kevin.png" className="m-auto" />
        <IonCardHeader>
          <IonCardTitle className="text-center">KEVIN SORENSEN</IonCardTitle>
          <IonCardSubtitle className="text-center">00000062002</IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    </IonContent>
  );
};

export default Profile;
