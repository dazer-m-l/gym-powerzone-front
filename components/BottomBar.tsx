// BottomBar.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const BottomBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/Login');
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={() => router.push('/Cart')} style={styles.bottomBarButton}>
        <Icon name="cart-outline" size={28} color="#FFF" />
        <Text style={styles.bottomBarText}>Carrito</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.bottomBarButton}>
        <Icon name="log-out-outline" size={28} color="#FFF" />
        <Text style={styles.bottomBarText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#555',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  bottomBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBarText: {
    color: '#FFF',
    fontSize: 10,
    marginTop: 2,
  },
});

export default BottomBar;