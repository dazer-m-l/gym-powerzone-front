import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { useResponsiveFooterStyles } from './Footer.styles';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const styles = useResponsiveFooterStyles();

  const email = 'Gym-PowerZone@gmail.com';
  const phoneNumber = '771-142-9286';

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.copyrightText}>
        Derechos de autor © 2025 Gym PowerZone
      </Text>

      <View style={styles.contactInfo}>
        <TouchableOpacity onPress={handleEmailPress} style={styles.contactItem}>
          <FontAwesome name="envelope" size={16} color={styles.icon.color} style={styles.icon} />
          <Text style={styles.contactText}>{email}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePhonePress} style={styles.contactItem}>
          <FontAwesome name="phone" size={16} color={styles.icon.color} style={styles.icon} />
          <Text style={styles.contactText}>{phoneNumber}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
