import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '@/app/(tabs)/CartContext';

const Header = ({ totalItems, isMobile, onNavigateToStore }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const formatCartCount = (count) => {
    return count > 9 ? '9+' : count.toString();
  };

  const handleSearch = () => {
    console.log('Buscando:', searchQuery);
  };

  return (
    <View style={[
      styles.headerContainer,
      { paddingTop: Platform.OS === 'ios' ? insets.top : 10 }
    ]}>
      <View style={styles.topRow}>
        {!isMobile && (
          <TouchableOpacity onPress={onNavigateToStore}>
            <Text style={styles.logoText}>Gym-PowerZone</Text>
          </TouchableOpacity>
        )}
        
        <View style={[
          styles.searchBarContainer, 
          isMobile ? styles.searchBarContainerMobile : styles.searchBarContainerDesktop,
          isMobile && { flex: 1, marginLeft: 0, marginRight: 0 }
        ]}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity 
              style={styles.searchIcon} 
              onPress={handleSearch}
            >
              <Icon name="search-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {!isMobile && (
          <View style={styles.iconButtonsContainer}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onNavigateToStore}
            >
              <Icon name="home-outline" size={28} color="#FFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.iconButton, { position: 'relative' }]}
              onPress={onNavigateToStore}
            >
              <Icon name="cart-outline" size={28} color="#FFF" />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {formatCartCount(totalItems)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const BottomNavBar = ({ totalItems, onNavigateToStore }) => {
  const formatCartCount = (count) => {
    return count > 9 ? '9+' : count.toString();
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity 
        style={styles.footerButton} 
        onPress={onNavigateToStore}
      >
        <Icon name="home-outline" size={30} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.footerButton, { position: 'relative' }]}
        onPress={onNavigateToStore}
      >
        <Icon name="cart-outline" size={30} color="#FFF" />
        {totalItems > 0 && (
          <View style={styles.footerBadge}>
            <Text style={styles.footerBadgeText}>
              {formatCartCount(totalItems)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const Carrito = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const navigation = useNavigation();
  const { 
    cartItems, 
    totalItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    loading 
  } = useCart();

  const handleNavigateToStore = () => {
    navigation.navigate('Store');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E44D26" />
      </View>
    );
  }

  const renderSummarySection = () => (
    <View style={[
      styles.summarySection,
      isMobile && styles.summarySectionMobile
    ]}>
      <View style={styles.shippingInfo}>
        <View style={styles.shippingIconContainer}>
          <Icon name="checkmark-circle" size={24} color="#ff0000" />
        </View>
        <View style={styles.shippingTextContainer}>
          <Text style={styles.shippingTitle}>Una parte de tu primer pedido califica para envío</Text>
          <Text style={styles.shippingText}>
            <Text style={styles.shippingTextBold}>GRATIS</Text> Selecciona esta opción al finalizar tu compra <Text style={styles.shippingTextLink}>Detalles</Text>
          </Text>
        </View>
      </View>
      <View style={isMobile ? styles.subtotalContainerMobile : styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} producto{cartItems.reduce((total, item) => total + item.quantity, 0) !== 1 ? 's' : ''}):</Text>
        <Text style={styles.subtotalPrice}>${calculateSubtotal().toLocaleString('es-MX')}</Text>
      </View>
      <TouchableOpacity 
        style={styles.checkoutButton}
        onPress={() => {
          clearCart();
          // Navegar a pantalla de pago si es necesario
        }}
      >
        <Text style={styles.checkoutButtonText}>Proceder al pago</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProductsSection = () => (
    <View style={[
      styles.productsSection,
      isMobile && styles.productsSectionMobile
    ]}>
      <View style={styles.cartHeader}>
        <Text style={styles.cartTitle}>Carrito</Text>
        {!isMobile && <Text style={styles.priceHeader}>Precio</Text>}
      </View>
      <View style={styles.headerSeparator} />
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Icon name="cart-outline" size={50} color="#CCC" />
          <Text style={styles.emptyText}>Tu carrito está vacío</Text>
        </View>
      ) : (
        cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemImageContainer}>
              <Image
                source={item.imageUrl}
                style={styles.productImage}
              />
            </View>
            <View style={isMobile ? styles.itemDetailsMobile : styles.itemDetails}>
              <View style={styles.itemInfo}>
                <Text style={isMobile ? styles.itemTitleMobile : styles.itemTitle}>{item.name}</Text>
                <Text style={isMobile ? styles.itemDescriptionMobile : styles.itemDescription}>{item.description}</Text>
                <Text style={styles.availability}>Disponible</Text>
                {isMobile && <Text style={styles.itemPriceMobile}>${(item.price * item.quantity).toLocaleString('es-MX')}</Text>}
                
                <View style={isMobile ? styles.itemControlsMobile : styles.itemControls}>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {isMobile ? (
                    <View style={styles.actionsMobile}>
                      <TouchableOpacity 
                        style={styles.actionButtonMobile}
                        onPress={() => removeFromCart(item.id)}
                      >
                        <Text style={styles.actionButtonText}>Eliminar</Text>
                      </TouchableOpacity>
                      <Text style={styles.actionSeparator}>|</Text>
                      <TouchableOpacity style={styles.actionButtonMobile}>
                        <Text style={styles.actionButtonText}>Guardar</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.actions}>
                      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                        <Text style={styles.actionButtonText}>Eliminar</Text>
                      </TouchableOpacity>
                      <Text style={styles.actionSeparator}>|</Text>
                      <TouchableOpacity>
                        <Text style={styles.actionButtonText}>Guardar para más tarde</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              {!isMobile && <Text style={styles.itemPriceDesktop}>${(item.price * item.quantity).toLocaleString('es-MX')}</Text>}
            </View>
          </View>
        ))
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        totalItems={totalItems} 
        isMobile={isMobile} 
        onNavigateToStore={handleNavigateToStore} 
      />

      <ScrollView 
        contentContainerStyle={[
          styles.mainContent,
          { paddingBottom: isMobile ? 70 : 20 }
        ]}
      >
        {isMobile ? (
          <View style={styles.mobileContentContainer}>
            {renderSummarySection()}
            {renderProductsSection()}
          </View>
        ) : (
          <View style={styles.contentWrapper}>
            {renderProductsSection()}
            {renderSummarySection()}
          </View>
        )}
      </ScrollView>
      
      {isMobile && <BottomNavBar totalItems={totalItems} onNavigateToStore={handleNavigateToStore} />}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    paddingHorizontal: Platform.select({
      ios: 20,
      android: 20,
      default: 90
    }),
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  logoText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: Platform.select({
      ios: 20,
      android: 20,
      default: 100
    }),
    flexShrink: 0,
  },
  searchBarContainer: {
    flex: 1,
    marginHorizontal: 10,
    minWidth: 150,
  },
  searchBarContainerDesktop: {
    maxWidth: 590,
  },
  searchBarContainerMobile: {
    width: '100%',
    marginVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    color: '#333',
    fontSize: 14,
  },
  searchIcon: {
    padding: 8,
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  iconButton: {
    marginLeft: 15,
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  footerContainer: {
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },
  footerButton: {
    position: 'relative',
    padding: 10,
  },
  footerBadge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  mainContent: {
    flexGrow: 1,
    padding: 20,
  },
  mobileContentContainer: {
    width: '100%',
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productsSection: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    flex: 2,
    marginRight: 20,
    marginBottom: 20,
  },
  productsSectionMobile: {
    width: '100%',
    marginRight: 0,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#333',
  },
  priceHeader: {
    fontSize: 14,
    color: '#666',
  },
  headerSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  itemImageContainer: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDetailsMobile: {
    flex: 1,
    flexDirection: 'column',
  },
  itemInfo: {
    flex: 1,
    marginRight: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemTitleMobile: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  itemDescriptionMobile: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  availability: {
    fontSize: 14,
    color: '#388e3c',
    marginBottom: 10,
  },
  itemPriceDesktop: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 80,
    textAlign: 'right',
  },
  itemPriceMobile: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  itemControlsMobile: {
    flexDirection: 'column',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10,
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
  },
  quantity: {
    paddingHorizontal: 12,
    fontSize: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsMobile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ff0000',
    fontSize: 14,
  },
  actionButtonMobile: {
    paddingVertical: 5,
  },
  actionSeparator: {
    color: '#ccc',
    marginHorizontal: 10,
  },
  summarySection: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    width: 350,
    marginBottom: 20,
  },
  summarySectionMobile: {
    width: '100%',
    marginRight: 0,
  },
  shippingInfo: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  shippingIconContainer: {
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  shippingTextContainer: {
    flex: 1,
  },
  shippingTitle: {
    fontSize: 14,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  shippingText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  shippingTextBold: {
    fontWeight: 'bold',
    color: '#ff0000',
  },
  shippingTextLink: {
    color: '#0066cc',
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  subtotalContainerMobile: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  subtotalText: {
    fontSize: 16,
    color: '#333',
  },
  subtotalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#ff0000',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
});

export default Carrito;