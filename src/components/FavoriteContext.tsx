import React, { createContext, useContext, ReactNode, useState } from "react";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: number;
}

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const toggleFavorite = (product: Product) => {
    const isFavorited = favorites.find((fav) => fav.id === product.id);
    setFavorites(
      isFavorited
        ? favorites.filter((fav) => fav.id !== product.id)
        : [...favorites, product]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
