import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  incrementQuantity,
  decrementQuantity,
  checkout,
  removeItem,
} from "../components/cartSlice";
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
import { useHistory } from "react-router-dom";

const generateTransactionCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

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
  const history = useHistory();
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length > 0) {
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
    } else {
      // Show alert if cart is empty
      setShowCheckoutAlert(true);
    }
  };

  const confirmCheckout = (isEmpty: boolean) => {
    if (isEmpty) {
      history.push("/home");
    } else {
      window.location.reload();
    }
  };

  const handleDecrementQuantity = (id: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(decrementQuantity(id));
    } else {
      // Menampilkan alert konfirmasi penghapusan
      setShowRemoveAlert(true);
      setItemToRemove(id);
    }
  };

  const confirmRemoveItem = (confirm: boolean) => {
    if (confirm && itemToRemove !== null) {
      dispatch(removeItem(itemToRemove));
    }
    setShowRemoveAlert(false);
    setItemToRemove(null);
  };

  return (
    <IonContent>
      <IonGrid className="mt-20">
        {cartItems.length > 0 ? (
          <IonRow>
            {cartItems.map((item, index) => (
              <IonCol size="12" size-md="6" key={index}>
                <IonCard>
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
                      onClick={() =>
                        handleDecrementQuantity(item.id, item.quantity)
                      }
                    >
                      <IonIcon icon={remove} />
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        ) : (
          <IonCard>
            <IonCardContent className="ion-text-center">
              <IonLabel>Your cart is empty.</IonLabel>
              <IonButton expand="block" onClick={() => history.push("/home")}>
                Add Products
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonGrid>
      {cartItems.length > 0 && (
        <IonCol size="12" size-md="6" className="ion-margin-auto">
          <IonCard>
            <IonCardContent>
              <IonCardTitle>Total Shopping</IonCardTitle>
              {cartItems.map((item, index) => (
                <IonItem key={index} lines="none">
                  <IonLabel>
                    {item.title} ({item.quantity}): {item.price * item.quantity}
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
      )}
      <IonAlert
        isOpen={showCheckoutAlert}
        onDidDismiss={() => setShowCheckoutAlert(false)}
        header={"Cart Anda Kosong"}
        message={"Cart anda kosong, apakah anda ingin menambahkan barang?"}
        buttons={[
          {
            text: "Ya",
            handler: () => confirmCheckout(true),
          },
          {
            text: "Tidak",
            role: "cancel",
            handler: () => confirmCheckout(false),
          },
        ]}
      />
      <IonAlert
        isOpen={showRemoveAlert}
        onDidDismiss={() => setShowRemoveAlert(false)}
        header={"Konfirmasi Penghapusan"}
        message={"Apakah Anda yakin ingin menghapus produk ini dari keranjang?"}
        buttons={[
          {
            text: "Ya",
            handler: () => confirmRemoveItem(true),
          },
          {
            text: "Tidak",
            role: "cancel",
            handler: () => confirmRemoveItem(false),
          },
        ]}
      />
    </IonContent>
  );
};

export default Cart;
