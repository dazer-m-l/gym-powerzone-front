import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const ResponsiveForm = () => {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

  const scaleSize = (desktopSize: number, tabletSize: number, mobileSize: number) => {
    if (isDesktop) return desktopSize;
    if (isTablet) return tabletSize;
    return mobileSize;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      padding: scaleSize(40, 30, 20),
      marginHorizontal: scaleSize(100, 50, 20),
    },
    title: {
      fontSize: scaleSize(32, 28, 24),
      fontWeight: 'bold',
      color: '#333',
      marginBottom: scaleSize(35, 25, 20),
      textAlign: 'center',
    },
    input: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: scaleSize(18, 14, 12),
      marginBottom: 15,
      fontSize: scaleSize(18, 16, 14),
      color: '#333',
    },
    messageInput: {
      height: scaleSize(150, 120, 100),
      textAlignVertical: 'top',
    },
    sendButton: {
      backgroundColor: '#007bff',
      padding: scaleSize(20, 18, 15),
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    sendButtonText: {
      color: '#fff',
      fontSize: scaleSize(20, 18, 16),
      fontWeight: 'bold',
    },
  });

export default ResponsiveForm;
