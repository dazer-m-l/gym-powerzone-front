import { ImageSourcePropType } from 'react-native';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: ImageSourcePropType;
    rating: number;
    reviews: number;
    quantity?: number; // Añadido para el carrito
}

export interface CarouselImage {
    id: string;
    uri: ImageSourcePropType;
}

export interface HeaderProps {
    onMenuPress?: () => void;
    onSearchChange?: (text: string) => void;
    searchTerm?: string;
    showBackButton?: boolean;
    cartItemCount?: number;
}

export interface ProductCardProps {
    product: Product;
    onPress: (product: Product) => void;
    numColumns: number;
    listPaddingHorizontal: number;
}

export interface CartItemProps {
    product: Product;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

interface CartContextType {
    cartItems: Product[];
    totalItems: number;
    loading: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    clearCart: () => void;
}

export type { CartContextType };