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
  IonIcon,
} from "@ionic/react";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";

interface Item {
  title: string;
  quantity: number;
  price: number;
}

interface Transaction {
  transactionCode: string;
  totalAmount: number;
  items: Item[];
}

const History: React.FC = () => {
  const transactions = useSelector(
    (state: RootState) => state.history.transactions as Transaction[]
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [sortBy, setSortBy] = useState<"price" | "code">("code");

  const [openedTransaction, setOpenedTransaction] = useState<string | null>(
    null
  );

  // Sort transactions based on selected criteria
  const sortTransactions = (transactions: Transaction[]) => {
    return transactions.sort((a, b) => {
      if (sortBy === "code") {
        return sortOrder === "ascending"
          ? a.transactionCode.localeCompare(b.transactionCode)
          : b.transactionCode.localeCompare(a.transactionCode);
      } else {
        return sortOrder === "ascending"
          ? a.totalAmount - b.totalAmount
          : b.totalAmount - a.totalAmount;
      }
    });
  };

  const sortedTransactions = sortTransactions([...transactions]);

  const toggleTransaction = (transactionCode: string) => {
    if (openedTransaction === transactionCode) {
      setOpenedTransaction(null);
    } else {
      setOpenedTransaction(transactionCode);
    }
  };

  return (
    <IonContent>
      <div className="mt-20">
        <IonSegment onIonChange={(e) => setSortOrder(e.detail.value)}>
          <IonSegmentButton
            value="ascending"
            checked={sortOrder === "ascending"}
          >
            <IonLabel>Ascending</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="descending"
            checked={sortOrder === "descending"}
          >
            <IonLabel>Descending</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonSegment onIonChange={(e) => setSortBy(e.detail.value)}>
          <IonSegmentButton value="code" checked={sortBy === "code"}>
            <IonLabel>Code</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="price" checked={sortBy === "price"}>
            <IonLabel>Price</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {sortedTransactions.map((transaction) => (
          <IonCard
            key={transaction.transactionCode}
            onClick={() => toggleTransaction(transaction.transactionCode)}
          >
            <IonCardHeader>
              <IonCardTitle>
                Transaction: {transaction.transactionCode}
              </IonCardTitle>
              <IonCardSubtitle>
                Total: {transaction.totalAmount}
              </IonCardSubtitle>
              <IonIcon
                icon={
                  openedTransaction === transaction.transactionCode
                    ? chevronDownOutline
                    : chevronForwardOutline
                }
                slot="end"
              />
            </IonCardHeader>
            {openedTransaction === transaction.transactionCode && (
              <IonList>
                {transaction.items.map((item, index) => (
                  <IonItem key={index}>
                    <IonLabel>
                      {item.title} - Quantity: {item.quantity} - Price:{" "}
                      {item.price}
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </IonCard>
        ))}
      </div>
    </IonContent>
  );
};

export default History;
