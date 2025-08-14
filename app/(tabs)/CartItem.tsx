import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Product } from '../../types';

interface CartItemProps {
    product: Product;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
    product, 
    onIncrease, 
    onDecrease, 
    onRemove 
}) => {
    return (
        <View style={styles.container}>
            <Image source={product.imageUrl} style={styles.image} />
            
            <View style={styles.details}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.ratingContainer}>
                    <Icon name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{product.rating} ({product.reviews})</Text>
                </View>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={onDecrease}>
                        <Icon name="remove-circle-outline" size={24} color="#FF0000" />
                    </TouchableOpacity>
                    
                    <Text style={styles.quantity}>{product.quantity}</Text>
                    
                    <TouchableOpacity onPress={onIncrease}>
                        <Icon name="add-circle-outline" size={24} color="#FF0000" />
                    </TouchableOpacity>
                </View>
            </View>
            
            <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
                <Icon name="trash-outline" size={24} color="#FF0000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderRadius: 8,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 4,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 4,
    },
    price: {
        fontSize: 16,
        color: '#FF0000',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
        minWidth: 20,
        textAlign: 'center',
    },
    deleteButton: {
        padding: 8,
    },
});

export default CartItem;