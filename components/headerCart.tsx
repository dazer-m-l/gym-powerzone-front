import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router'; 
import { HeaderProps } from '@/types'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

interface HeaderCartProps extends Omit<HeaderProps, 'onCartPress'> {
  cartItemCount: number;
}

const HeaderCart: React.FC<HeaderCartProps> = ({ 
  onMenuPress, 
  onSearchChange, 
  searchTerm,
  cartItemCount 
}) => {
  const router = useRouter(); 
  const insets = useSafeAreaInsets(); 

  // Formatear el número para mostrar "9+" si es mayor a 9
  const formatCartCount = (count: number) => {
    return count > 9 ? '9+' : count.toString();
  };

  return (
    <View style={[
      styles.headerContainer,
      { paddingTop: Platform.OS === 'ios' ? insets.top : 10 } 
    ]}>
      <View style={styles.topRow}>
        <Text style={styles.logoText}>Gym-PowerZone</Text>
        
        <View style={styles.searchBar}>
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

        <TouchableOpacity 
          onPress={() => router.push('/cart')} 
          style={styles.cartButton}
        >
          <Icon name="cart-outline" size={24} color="#FFF" />
          {cartItemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {formatCartCount(cartItemCount)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Icon name="menu-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 15,
    maxWidth: '50%',
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
  cartButton: {
    position: 'relative',
    marginLeft: 10,
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#FF6B00',
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
  iconButton: {
    marginLeft: 10,
  },
});

export default HeaderCart;