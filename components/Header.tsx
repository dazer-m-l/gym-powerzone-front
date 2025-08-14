import { HeaderProps } from '@/types';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '@/app/(tabs)/CartContext';

interface HeaderPropsWithoutCartPress extends Omit<HeaderProps, 'onCartPress'> {
    cartItemCount?: number;
}

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const Header: React.FC<HeaderPropsWithoutCartPress> = ({ onSearchChange, searchTerm }) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const { cartItems } = useCart();
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        router.replace('/Login');
    };
    
    return (
        <View style={[
            styles.headerContainer,
            { 
                paddingTop: Platform.OS === 'ios' ? insets.top : 10,
                paddingHorizontal: isMobile ? 15 : 90
            }
        ]}>
            <View style={isMobile ? styles.mobileTopBar : styles.topRow}>
                {!isMobile && (
                    <TouchableOpacity onPress={() => router.push('/')} style={styles.logoContainer}>
                        <Text style={styles.logoText}>Gym-PowerZone</Text>
                    </TouchableOpacity>
                )}
                
                <View style={isMobile ? styles.searchBarMobile : styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar"
                        placeholderTextColor="#888"
                        value={searchTerm}
                        onChangeText={onSearchChange}
                    />
                    <TouchableOpacity style={styles.searchIcon}>
                        <Icon name="search-outline" size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                {!isMobile && (
                    <View style={styles.iconButtonsContainer}>
                        <TouchableOpacity 
                            onPress={() => router.push('/Cart')} 
                            style={styles.iconButton}
                        >
                            <View style={{ position: 'relative' }}>
                                <Icon name="cart-outline" size={28} color="#FFF" />
                                {cartItemCount > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{cartItemCount}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={styles.logoutButton}
                            onMouseEnter={() => setHoveredItem('CerrarSesion')}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <Text style={[
                                styles.menuText,
                                hoveredItem === 'CerrarSesion' && styles.menuTextHover,
                            ]}>
                                CERRAR SESIÓN
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#000',
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mobileTopBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flexShrink: 0,
        marginRight: 20,
    },
    logoText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        flex: 1,
        maxWidth: 700,
    },
    searchBarMobile: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        width: '100%',
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: '#333',
        fontSize: 14,
    },
    searchIcon: {
        padding: 8,
    },
    iconButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    iconButton: {
        marginLeft: 10,
    },
    logoutButton: {
        marginLeft: 10,
        paddingVertical: 10,
    },
    menuText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    menuTextHover: {
        color: '#E44D26',
    },
    badge: {
        position: 'absolute',
        right: -8,
        top: -5,
        backgroundColor: '#E44D26',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Header;