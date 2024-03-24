import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
  const [openedTransaction, setOpenedTransaction] = useState<string | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [sortBy, setSortBy] = useState<"price" | "code">("code");

  const handleSortOrderChange = (e: CustomEvent) => {
    setSortOrder(e.detail.value);
  };

  const handleSortByChange = (e: CustomEvent) => {
    setSortBy(e.detail.value);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
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

  const toggleTransaction = (transactionCode: string) => {
    setOpenedTransaction(
      openedTransaction === transactionCode ? null : transactionCode
    );
  };

  return (
    <IonContent>
      <div className="mt-20">
        <IonSegment onIonChange={handleSortOrderChange} value={sortOrder}>
          <IonSegmentButton value="ascending">
            <IonLabel>Ascending</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="descending">
            <IonLabel>Descending</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonSegment onIonChange={handleSortByChange} value={sortBy}>
          <IonSegmentButton value="code">
            <IonLabel>Code</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="price">
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
