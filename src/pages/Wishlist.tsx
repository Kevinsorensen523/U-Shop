import React from "react";
import { useDispatch } from "react-redux";
import { useFavorites } from "./../components/FavoriteContext";
import {
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonButton,
  IonApp,
  IonContent,
  IonCard,
  IonImg,
  IonThumbnail,
} from "@ionic/react";
import { trash, cart } from "ionicons/icons";
import { addItem } from "./../components/cartSlice";
import { Product } from "./Home";
import { useHistory } from "react-router-dom";

const Wishlist: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    toggleFavorite(product);
  };

  const handleRemoveFromWishlist = (product: Product) => {
    toggleFavorite(product);
  };

  const navigateToHome = () => {
    history.push("/home");
  };

  return (
    <IonContent>
      <div className="mt-20">
        {favorites.length > 0 ? (
          <IonList>
            {favorites.map((product) => (
              <IonItemSliding key={product.id}>
                <IonItemOptions side="start">
                  <IonItemOption
                    color="success"
                    onClick={() => handleAddToCart(product)}
                  >
                    <IonIcon icon={cart} slot="icon-only"></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
                <IonItem lines="none">
                  <IonThumbnail slot="start">
                    <img src={product.image} alt={product.title} />
                  </IonThumbnail>
                  <IonLabel>
                    {product.title} - {product.subtitle}
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => handleRemoveFromWishlist(product)}
                  >
                    <IonIcon icon={trash} slot="icon-only"></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        ) : (
          <IonCard className="ion-text-center ion-padding">
            <IonLabel>Your Wishlist is empty.</IonLabel>
            <IonButton expand="block" onClick={navigateToHome}>
              Add Products
            </IonButton>
          </IonCard>
        )}
      </div>
    </IonContent>
  );
};

export default Wishlist;
