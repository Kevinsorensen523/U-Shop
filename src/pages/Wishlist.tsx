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
} from "@ionic/react";
import { trash, cart } from "ionicons/icons";
import { addItem } from "./../components/cartSlice";
import { Product } from "./Home";

const Wishlist: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    toggleFavorite(product);
  };

  const handleRemoveFromWishlist = (product: Product) => {
    toggleFavorite(product);
  };

  return (
    <IonContent>
      <div className="mt-20">
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
              <IonItem>
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
      </div>
    </IonContent>
  );
};

export default Wishlist;
