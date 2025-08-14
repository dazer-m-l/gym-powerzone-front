import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../../types';

interface CartContextType {
    cartItems: Product[];
    totalItems: number;
    loading: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const addToCart = (product: Product): void => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id 
                        ? { ...item, quantity: (item.quantity || 0) + 1 } 
                        : item
                );
            }
            
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string): void => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, newQuantity: number): void => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = (): void => {
        setLoading(true);
        setTimeout(() => {
            setCartItems([]);
            setLoading(false);
        }, 1000);
    };

    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

    return (
        <CartContext.Provider 
            value={{
                cartItems,
                totalItems,
                loading,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};