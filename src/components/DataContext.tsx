import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./Types";

interface ProductsContextType {
  products: Product[];
  banners: string[];
}

interface ProductsProviderProps {
  children: ReactNode;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([
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
  ]);

  const [banners, setBanners] = useState<string[]>([
    "/Banner/Banner1.png",
    "/Banner/Banner3.png",
    "/Banner/Banner4.jpg",
    "/Banner/Banner5.png",
    "/Banner/Banner6.png",
  ]);

  return (
    <ProductsContext.Provider value={{ products, banners }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
