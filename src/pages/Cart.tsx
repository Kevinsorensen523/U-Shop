import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store"; // Pastikan path benar
import { incrementQuantity, decrementQuantity } from "../components/cartSlice"; // Pastikan path benar
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonImg,
} from "@ionic/react";
import { add, remove } from "ionicons/icons";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <IonContent>
      <h2>Keranjang Belanja</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <IonCard key={index}>
            <IonImg src={item.image} />
            <IonCardHeader>
              <IonCardTitle>{item.title}</IonCardTitle>
              <IonCardSubtitle>Harga: {item.price}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Jumlah: {item.quantity}
              <IonButton onClick={() => dispatch(incrementQuantity(item.id))}>
                <IonIcon icon={add} />
              </IonButton>
              <IonButton onClick={() => dispatch(decrementQuantity(item.id))}>
                <IonIcon icon={remove} />
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))
      ) : (
        <p>Keranjang belanja Anda kosong.</p>
      )}
    </IonContent>
  );
};

export default Cart;
