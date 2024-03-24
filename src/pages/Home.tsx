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
  IonToast,
} from "@ionic/react";
import { star, starOutline, add } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { addItem } from "./../components/cartSlice";
import { useFavorites } from "../components/FavoriteContext";
import { useHistory } from "react-router-dom";

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
}

const Home: React.FC = () => {
  const { favorites, toggleFavorite: toggleFavoriteInContext } = useFavorites();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const handleAddToWishlist = (product: Product) => {
    toggleFavoriteInContext(product);
    setShowToast(true); // Menampilkan toast
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
                <IonButton onClick={() => handleAddToWishlist(product)}>
                  <IonIcon
                    icon={
                      favorites.some((fav) => fav.id === product.id)
                        ? star
                        : starOutline
                    }
                  />
                </IonButton>
                <IonButton onClick={() => handleAddToCart(product)}>
                  <IonIcon icon={add} />
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Produk berhasil ditambahkan ke wishlist. Cek Wishlist?"
        duration={2000}
        buttons={[
          {
            text: "Lihat",
            handler: () => {
              history.push("/wishlist"); // Navigasi ke halaman wishlist
            },
          },
        ]}
      />
    </IonContent>
  );
};

export default Home;
