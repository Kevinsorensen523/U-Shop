import React, { useState } from "react";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
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
} from "@ionic/react";
import { star, starOutline, add } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { addItem } from "./../components/cartSlice";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
}

type Favorites = Record<number, boolean>;

const Home: React.FC = () => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const dispatch = useDispatch<AppDispatch>();

  const toggleFavorite = (productId: number) => {
    setFavorites((currentFavorites) => ({
      ...currentFavorites,
      [productId]: !currentFavorites[productId],
    }));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
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
      id: 1,
      title: "Bitcoin",
      subtitle: "Rp. 100.000",
      image: "/Shop/Bitcoin.jpg",
      price: 100000,
    },
    {
      id: 2,
      title: "Ethereum",
      subtitle: "Rp. 50.000",
      image: "/Shop/Ethereum.jpeg",
      price: 50000,
    },
    {
      id: 3,
      title: "Solana",
      subtitle: "Rp. 35.000",
      image: "/Shop/Solana.jpg",
      price: 35000,
    },
    {
      id: 4,
      title: "Manta",
      subtitle: "Rp. 10.000",
      image: "/Shop/Manta.png",
      price: 10000,
    },
    {
      id: 5,
      title: "Pepe",
      subtitle: "Rp. 75.000",
      image: "/Shop/Pepe.jpg",
      price: 75000,
    },
    {
      id: 6,
      title: "Doge",
      subtitle: "Rp. 60.000",
      image: "/Shop/Doge.png",
      price: 60000,
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
      <IonRow>
        {products.map((product) => (
          <IonCol size="12" size-md="4" key={product.id}>
            <IonCard>
              <div
                className="card-image-container"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <IonCardHeader>
                <IonCardTitle>{product.title}</IonCardTitle>
                <IonCardSubtitle>{product.subtitle}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton onClick={() => toggleFavorite(product.id)}>
                  <IonIcon icon={favorites[product.id] ? star : starOutline} />
                </IonButton>
                <IonButton onClick={() => handleAddToCart(product)}>
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
