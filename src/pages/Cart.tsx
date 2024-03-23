import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store"; // Make sure path is correct
import {
  incrementQuantity,
  decrementQuantity,
  checkout,
} from "../components/cartSlice"; // Make sure path is correct
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
  IonThumbnail,
  IonRow,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonAlert,
} from "@ionic/react";
import { add, remove } from "ionicons/icons";
import "./../App.css";
import { addTransaction } from "../components/historySlice";

const generateTransactionCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // Menambahkan tipe data `string` untuk `source`
  const randomCharacters = (source: string, length: number): string =>
    Array.from(
      { length },
      () => source[Math.floor(Math.random() * source.length)]
    ).join("");

  return `${randomCharacters(letters, 3)}${randomCharacters(numbers, 3)}`;
};

const Cart: React.FC = () => {
  const [showCheckoutAlert, setShowCheckoutAlert] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Generate transaction code
    const transactionCode = generateTransactionCode();
    dispatch(
      addTransaction({
        transactionCode,
        totalAmount: totalPrice,
        items: cartItems,
      })
    );

    // Clear cart
    dispatch(checkout());

    // Show modal or toast for success message
  };

  const confirmCheckout = () => {
    window.location.reload();
  };

  return (
    <IonContent>
      <IonGrid className="mt-20">
        {" "}
        <IonRow>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <IonCol size="12" size-md="4" key={index}>
                <IonCard color="medium">
                  <IonItem lines="none">
                    <IonThumbnail slot="start">
                      <IonImg src={item.image} />
                    </IonThumbnail>
                    <IonLabel>
                      <IonCardTitle>{item.title}</IonCardTitle>
                      <IonCardSubtitle>Price: {item.price}</IonCardSubtitle>
                    </IonLabel>
                  </IonItem>
                  <IonCardContent>
                    Quantity: {item.quantity}
                    <IonButton
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      <IonIcon icon={add} />
                    </IonButton>
                    <IonButton
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      <IonIcon icon={remove} />
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))
          ) : (
            <IonCard>
              <IonCardContent>
                <IonLabel>Cart Kosong</IonLabel>
              </IonCardContent>
            </IonCard>
          )}
        </IonRow>
      </IonGrid>
      <IonCol size="12" size-md="6">
        <IonCard className="flex justify-center align-center md:mx-48">
          <IonCardContent>
            <IonCardTitle>Total Belanjaan</IonCardTitle>
            {cartItems.map((item, index) => (
              <IonItem key={index} lines="none">
                <IonLabel>
                  {item.title} ({item.quantity}) : {item.price * item.quantity}
                </IonLabel>
              </IonItem>
            ))}
            <IonItem lines="none">
              <IonLabel>
                <strong>Total:</strong> {totalPrice}
              </IonLabel>
            </IonItem>
            <IonButton expand="block" onClick={handleCheckout}>
              Checkout
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonCol>
      <IonAlert
        isOpen={showCheckoutAlert}
        onDidDismiss={() => setShowCheckoutAlert(false)}
        cssClass="my-custom-class"
        header={"Confirm Checkout"}
        message={"Are you sure you want to checkout?"}
        buttons={[
          {
            text: "Yes",
            handler: () => {
              confirmCheckout();
            },
          },
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {},
          },
        ]}
      />
    </IonContent>
  );
};

export default Cart;
