import { ProductCardProps } from '@/types';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCart } from '@/app/(tabs)/CartContext';

interface ExtendedProductCardProps extends ProductCardProps {
    numColumns: number;
    listPaddingHorizontal: number;
}

const ProductCard: React.FC<ExtendedProductCardProps> = ({ product, onPress, numColumns, listPaddingHorizontal }) => {
    const { addToCart } = useCart();
    const screenWidth = Dimensions.get('window').width;
    const cardMarginHorizontal = 15;
    const availableWidth = screenWidth - (2 * listPaddingHorizontal);
    const totalInternalMarginSpace = (numColumns - 1) * (2 * cardMarginHorizontal);
    const calculatedCardWidth = (availableWidth - totalInternalMarginSpace) / numColumns;

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <TouchableOpacity 
            style={[styles.cardContainer, { width: calculatedCardWidth, marginHorizontal: cardMarginHorizontal }]} 
            onPress={() => onPress(product)}
        >
            <Image source={product.imageUrl} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
            <Text style={styles.productDescription} numberOfLines={3}>{product.description}</Text>

            <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                    <Icon
                        key={i}
                        name={i < Math.floor(product.rating) ? 'star' : 'star-o'}
                        size={12}
                        color="#E44D26"
                        style={styles.starIcon}
                    />
                ))}
                <Text style={styles.reviewsText}>({product.reviews})</Text>
            </View>
            
            <View style={styles.priceAndButtonContainer}>
                <Text style={styles.productPrice}>MX$ {product.price.toLocaleString('es-MX')}</Text>
                <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.addToCartButtonText}>Agregar al carrito</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderRadius: 0,
        padding: 12,
        marginVertical: 15,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    productImage: {
        width: '100%',
        height: 110,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 9,
        height: 36,
    },
    productDescription: {
        fontSize: 12,
        textAlign: 'left',
        color: '#666',
        marginBottom: 34,
        height: 30,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        alignSelf: 'flex-start',
        width: '100%',
    },
    starIcon: {
        marginHorizontal: 1,
    },
    reviewsText: {
        fontSize: 9,
        color: '#666',
        marginLeft: 4,
        textAlign: 'left',
    },
    priceAndButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 0,
    },
    productPrice: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#070606ff',
        textAlign: 'left',
    },
    addToCartButton: {
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E44D26',
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addToCartButtonText: {
        color: '#E44D26',
        fontSize: 10,
        fontWeight: 'bold',
        lineHeight: 10,
    },
});

export default ProductCard;