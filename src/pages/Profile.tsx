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
      <div className="mt-20">
        <IonCard className="bg-slate-500 md:p-8 md:mx-96">
          <img alt="Muka Gua" src="/Profile/Kevin.png" className="m-auto" />
          <IonCardHeader>
            <IonCardTitle className="text-center text-white">
              KEVIN SORENSEN
            </IonCardTitle>
            <IonCardSubtitle className="text-center text-white">
              00000062002
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      </div>
    </IonContent>
  );
};

export default Profile;
