import React, { useState } from "react";
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
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonIcon,
  IonRow,
  IonTitle,
} from "@ionic/react";
import "./../App.css";
import { star, starOutline, add } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

type Favorites = Record<number, boolean>;

const Home = () => {
  const [favorites, setFavorites] = useState<Favorites>({});
  const dispatch = useDispatch();

  const toggleFavorite = (index: number) => {
    const newFavorites = { ...favorites, [index]: !favorites[index] };
    setFavorites(newFavorites);
    console.log(`Produk ${index} favorit: ${newFavorites[index]}`);
  };

  const addToCart = (index: number) => {
    console.log(`Produk ${index} ditambahkan ke keranjang`);
    dispatch({ type: "cart/increment" });
  };

  const images = [
    "/Banner/Banner1.png",
    "/Banner/Banner3.png",
    "/Banner/Banner4.jpg",
    "/Banner/Banner5.png",
    "/Banner/Banner6.png",
  ];

  const products = [
    {
      title: "Bitcoin",
      subtitle: "Rp. 100.000",
      image: "/Shop/Bitcoin.jpg",
    },
    {
      title: "Ethereum",
      subtitle: "Rp. 50.000",
      image: "/Shop/Ethereum.jpeg",
    },
    {
      title: "Solana",
      subtitle: "Rp. 35.000",
      image: "/Shop/Solana.jpg",
    },
    {
      title: "Manta",
      subtitle: "Rp. 10.000",
      image: "/Shop/Manta.png",
    },
    {
      title: "Pepe",
      subtitle: "Rp. 75.000",
      image: "/Shop/Pepe.jpg",
    },
    {
      title: "Doge",
      subtitle: "Rp. 60.000",
      image: "/Shop/Doge.png",
    },
  ];

  return (
    <IonContent className="carousel-container ">
      <div className="mt-20">
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
                <img src={image} alt={`Slide ${index + 1}`} />
              </Slide>
            ))}
          </Slider>
          <DotGroup />
        </CarouselProvider>
      </div>
      <IonRow className="lg: mt-10">
        {products.map((product, index) => (
          <IonCol size="12" size-md="4" key={index}>
            <IonCard>
              <div
                className="card-image-container"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <IonCardHeader className="items-center">
                <IonCardTitle>{product.title}</IonCardTitle>
                <IonCardSubtitle>{product.subtitle}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="ion-text-right">
                <IonButton
                  fill="clear"
                  size="large"
                  onClick={() => toggleFavorite(index)}
                >
                  <IonIcon
                    icon={favorites[index] ? star : starOutline}
                    style={{ color: favorites[index] ? "gold" : "grey" }}
                  />
                </IonButton>
                <IonButton
                  fill="clear"
                  size="large"
                  onClick={() => addToCart(index)}
                >
                  <IonIcon icon={add} />
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonContent>
  );
};

export default Home;
