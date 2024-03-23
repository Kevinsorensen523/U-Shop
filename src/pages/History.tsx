import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonModal,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

const History: React.FC = () => {
  const transactions = useSelector(
    (state: RootState) => state.history.transactions
  );
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [sortBy, setSortBy] = useState<"price" | "code">("code");

  // Sort transactions based on selected criteria
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortBy === "code") {
      return sortOrder === "ascending"
        ? a.transactionCode.localeCompare(b.transactionCode)
        : b.transactionCode.localeCompare(a.transactionCode);
    } else {
      // Sorting by totalAmount
      return sortOrder === "ascending"
        ? a.totalAmount - b.totalAmount
        : b.totalAmount - a.totalAmount;
    }
  });

  return (
    <IonContent>
      <div className="mt-20">
        <IonSegment
          value={sortOrder}
          onIonChange={(e) =>
            setSortOrder(e.detail.value as "ascending" | "descending")
          }
        >
          <IonSegmentButton value="ascending">
            <IonLabel>Ascending</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="descending">
            <IonLabel>Descending</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonSegment
          value={sortBy}
          onIonChange={(e) => setSortBy(e.detail.value as "price" | "code")}
        >
          <IonSegmentButton value="code">
            <IonLabel>Code</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="price">
            <IonLabel>Price</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {sortedTransactions.map((transaction, index) => (
          <IonCard
            key={index}
            onClick={() => setSelectedTransaction(transaction)}
          >
            <IonCardHeader>
              <IonCardTitle>
                Transaction: {transaction.transactionCode}
              </IonCardTitle>
              <IonCardSubtitle>
                Total: {transaction.totalAmount}
              </IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        ))}

        <IonModal
          isOpen={!!selectedTransaction}
          onDidDismiss={() => setSelectedTransaction(null)}
        >
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel>
                  Transaction Code: {selectedTransaction?.transactionCode}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Total Amount: {selectedTransaction?.totalAmount}
                </IonLabel>
              </IonItem>
              {selectedTransaction?.items.map(
                (item: any, itemIndex: number) => (
                  <IonItem key={itemIndex}>
                    <IonLabel>
                      {item.title} - Quantity: {item.quantity} - Price:{" "}
                      {item.price}
                    </IonLabel>
                  </IonItem>
                )
              )}
            </IonList>
            <IonButton
              expand="block"
              onClick={() => setSelectedTransaction(null)}
            >
              Close
            </IonButton>
          </IonContent>
        </IonModal>
      </div>
    </IonContent>
  );
};

export default History;
