import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import ImageCarousel from '@/components/ImageCarousel';
import ProductCard from '@/components/ProductoCart';
import BottomBar from '@/components/BottomBar';
import ProductListScreen from '@/components/ProductListScreen';
import { Product } from '@/types';
import { useCart } from '@/app/(tabs)/CartContext';

const { width, height } = Dimensions.get('window');
const isMobile = width < 768;
const numColumns = width > 1200 ? 5 : width > 900 ? 4 : width > 600 ? 3 : width > 400 ? 2 : 2;
const listPaddingHorizontal = isMobile ? 15 : 52;

export default function StoreScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [numColumns, setNumColumns] = useState(2);
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const { cartItemCount } = useCart();

    useEffect(() => {
        const updateLayout = () => {
            const newWidth = Dimensions.get('window').width;
            setWindowWidth(newWidth);
            const newNumColumns = newWidth > 1200 ? 5 : newWidth > 900 ? 4 : newWidth > 600 ? 3 : newWidth > 400 ? 2 : 2;
            setNumColumns(newNumColumns);
        };
        const subscription = Dimensions.addEventListener('change', updateLayout);
        updateLayout();
        return () => subscription.remove();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProductPress = (product: any) => {
        console.log('Producto presionado:', product.name);
    };

    const renderRows = () => {
        const rows: React.JSX.Element[] = [];
        let row: Product[] = [];

        filteredProducts.forEach((product, index) => {
            row.push(product);
            
            if (row.length === numColumns || index === filteredProducts.length - 1) {
                const isLastRow = index === filteredProducts.length - 1;
                const isPartialRow = row.length < numColumns;
                
                const rowStyle = [
                    styles.productRow,
                    (isLastRow && isPartialRow) && styles.centeredRow
                ];
                
                rows.push(
                    <View key={`row-${rows.length}`} style={rowStyle}>
                        {row.map(p => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                onPress={handleProductPress}
                                numColumns={numColumns}
                                listPaddingHorizontal={listPaddingHorizontal}
                            />
                        ))}
                    </View>
                );
                row = [];
            }
        });
        return rows;
    };
    
    if (loading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <ProductListScreen
                    onProductsLoaded={setProducts}
                    onLoading={setLoading}
                    onError={setError}
                />
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#E44D26" />
                    <Text style={styles.loadingText}>Cargando productos...</Text>
                </View>
            </SafeAreaView>
        );
    }
    
    if (error) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <ProductListScreen
                    onProductsLoaded={setProducts}
                    onLoading={setLoading}
                    onError={setError}
                />
                <View style={styles.centered}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer} edges={['bottom']}>
            <Header
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {searchTerm.length === 0 && <ImageCarousel />}
                
                {filteredProducts.length === 0 ? (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>
                            No se encontraron resultados para
                            <Text style={{ fontWeight: 'bold' }}> {searchTerm}</Text>
                        </Text>
                    </View>
                ) : (
                    <View style={styles.productListContainer}>
                        {renderRows()}
                    </View>
                )}
            </ScrollView>
            
            {isMobile && <BottomBar />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#EDEDED',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    noResultsText: {
        fontSize: 20,
        color: '#e91818ff',
        textAlign: 'center',
    },
    productListContainer: {
        paddingHorizontal: listPaddingHorizontal,
        marginTop: 15,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    centeredRow: {
        justifyContent: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});