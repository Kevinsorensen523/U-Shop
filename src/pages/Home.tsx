import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./Home.css";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonRow,
  IonTitle,
} from "@ionic/react";
import "./../App.css";

const Home = () => {
  const images = [
    "/Banner/Banner1.png",
    "/Banner/Banner3.png",
    "/Banner/Banner4.jpg",
    "/Banner/Banner5.png",
    "/Banner/Banner6.png",
  ];

  return (
    <IonContent className="carousel-container ">
      <div className="justify-center mt-20 mx-4">
        <CarouselProvider
          naturalSlideWidth={50}
          naturalSlideHeight={20}
          totalSlides={images.length}
          isPlaying={true}
          interval={2000}
        >
          <Slider>
            {images.map((image, index) => (
              <Slide index={index} key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="margin-auto object-fit"
                />
              </Slide>
            ))}
          </Slider>
          <DotGroup />
        </CarouselProvider>
      </div>
      <IonRow>
        <IonCol>
          <IonCard>
            <img alt="Bitcoin" src="/Shop/Bitcoin.jpg" />
            <IonCardHeader>
              <IonCardTitle>Bitcoin</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
          </IonCard>
        </IonCol>
        <IonCol>
          <IonCard>
            <img alt="Ethereum" src="/Shop/Ethereum.jpeg" />
            <IonCardHeader>
              <IonCardTitle>Ethereum</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent></IonCardContent>
          </IonCard>
        </IonCol>
        <IonCol>
          <IonCard>
            <img alt="Solana" src="/Shop/Solana.jpg" />
            <IonCardHeader>
              <IonCardTitle>Solana</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent></IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonCard>
            <img alt="Manta" src="/Shop/Manta.png" />
            <IonCardHeader>
              <IonCardTitle>Manta</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent></IonCardContent>
          </IonCard>
        </IonCol>
        <IonCol>
          <IonCard>
            <img alt="Pepe" src="/Shop/Pepe.jpg" />
            <IonCardHeader>
              <IonCardTitle>Pepe</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent></IonCardContent>
          </IonCard>
        </IonCol>
        <IonCol>
          <IonCard>
            <img alt="Doge" src="/Shop/Doge.png" />
            <IonCardHeader>
              <IonCardTitle>Doge</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent></IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonContent>
  );
};

export default Home;
