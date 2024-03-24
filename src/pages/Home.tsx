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
import { star, starOutline, cart } from "ionicons/icons"; // Mengganti add dengan cart untuk kejelasan
import { useDispatch } from "react-redux";
import { addItem } from "./../components/cartSlice";
import { useFavorites } from "../components/FavoriteContext";
import { useHistory } from "react-router-dom";
import { useProducts } from "../components/DataContext";

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
}

const Home: React.FC = () => {
  const { favorites, toggleFavorite: toggleFavoriteInContext } = useFavorites();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showToastWishlist, setShowToastWishlist] = useState(false);
  const [showToastCart, setShowToastCart] = useState(false);
  const { products, banners } = useProducts();
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    setToastMessage(`"${product.title}" ditambahkan ke keranjang`);
    setShowToastCart(true);
  };

  const handleAddToWishlist = (product: Product) => {
    toggleFavoriteInContext(product);
    setToastMessage(`"${product.title}" ditambahkan ke wishlist`);
    setShowToastWishlist(true);
  };

  return (
    <IonContent className="carousel-container">
      <div className="mt-20">
        <CarouselProvider
          naturalSlideWidth={50}
          naturalSlideHeight={20}
          totalSlides={banners.length}
          isPlaying={true}
          interval={2000}
        >
          <Slider>
            {banners.map((image, index) => (
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
                  <IonIcon icon={cart} />
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
      <IonToast
        isOpen={showToastWishlist}
        onDidDismiss={() => setShowToastWishlist(false)}
        message={toastMessage}
        duration={2000}
        buttons={[
          {
            text: "Lihat",
            handler: () => {
              history.push("/wishlist");
            },
          },
        ]}
      />
      <IonToast
        isOpen={showToastCart}
        onDidDismiss={() => setShowToastCart(false)}
        message={toastMessage}
        duration={2000}
        buttons={[
          {
            text: "Lihat",
            handler: () => {
              history.push("/cart");
            },
          },
        ]}
      />
    </IonContent>
  );
};

export default Home;
