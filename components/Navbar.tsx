import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, Linking, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { styles } from './Navbar.styles';

interface NavbarProps {
  onPressMenu?: () => void;
  scrollToSection: (section: string) => void;
  activeSection: string | null;
  onNavigateToLogin: () => void; // Prop para navegar a la pantalla de Login
}

export const Navbar: React.FC<NavbarProps> = ({ onPressMenu, scrollToSection, activeSection, onNavigateToLogin }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];

  const { width } = useWindowDimensions();
  const isMobileOrTablet = width < 1024;

  const router = useRouter(); 

  const menuItems = [
    { name: 'INICIO', section: 'inicio' },
    { name: 'SOBRE NOSOTROS', section: 'sobreNosotros' },
    { name: 'CLASES', section: 'clases' },
    { name: 'HORARIOS', section: 'horarios' },
    { name: 'CONTACTO', section: 'contacto' },
  ];

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [menuOpen, slideAnim]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemPress = (itemSection: string) => {
    scrollToSection(itemSection);
    setTimeout(() => {
      setMenuOpen(false);
    }, 200);
  };

  const handleWhatsappPress = async () => {
    const phoneNumber = '5217711429286';
    const message = 'Hola, quiero saber más sobre ustedes.';

    const whatsappWebUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    try {
      await Linking.openURL(whatsappWebUrl);
    } catch (error) {
      console.error('Error al abrir WhatsApp Web:', error);
      Alert.alert('Error', 'No se pudo abrir WhatsApp. Intenta de nuevo más tarde.');
    }
  };

  const menuHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, menuItems.length * 50 + 80 + 50]
  });

  return (
    <View style={styles.navbar} testID="main-navbar">
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Gym-PowerZone</Text>
      </View>

      {isMobileOrTablet ? (
        <>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={toggleMenu}
            activeOpacity={0.7}
          >
            <FontAwesome
              name={menuOpen ? "times" : "bars"}
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.mobileMenu,
              {
                height: menuHeight,
                opacity: slideAnim,
                display: menuOpen ? 'flex' : 'none',
                top: 60,
              }
            ]}
          >
            <View style={styles.menuContent}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={styles.mobileMenuItem}
                  onPress={() => handleMenuItemPress(item.section)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.mobileMenuText,
                    activeSection === item.section && styles.mobileMenuTextPressed,
                  ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.mobileMenuItem}
                onPress={() => {
                  onNavigateToLogin();
                  setMenuOpen(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.mobileMenuText}>INICIAR SESIÓN</Text>
              </TouchableOpacity>

              <View style={styles.mobileSocialIcons}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
                  <FontAwesome name="facebook" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('https://x.com')}>
                  <View style={styles.xIcon}>
                    <Text style={styles.xText}>X</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleWhatsappPress}>
                  <FontAwesome name="whatsapp" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com')}>
                  <FontAwesome name="instagram" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </>
      ) : (
        <View style={styles.desktopMenu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.menuItem}
              onMouseEnter={() => setHoveredItem(item.section)}
              onMouseLeave={() => setHoveredItem(null)}
              onPress={() => handleMenuItemPress(item.section)}
            >
              <Text style={[
                styles.menuText,
                activeSection === item.section && styles.menuTextPressed,
                activeSection !== item.section && hoveredItem === item.section && styles.menuTextHover,
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.menuItem}
            onMouseEnter={() => setHoveredItem('Login')}
            onMouseLeave={() => setHoveredItem(null)}
            onPress={onNavigateToLogin}
          >
            <Text style={[
              styles.menuText,
              hoveredItem === 'Login' && styles.menuTextHover,
            ]}>
              INICIAR SESIÓN
            </Text>
          </TouchableOpacity>

          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.facebook.com')}
              onMouseEnter={() => setHoveredItem('facebook')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <FontAwesome
                name="facebook"
                size={20}
                color={'white'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://x.com')}
              onMouseEnter={() => setHoveredItem('twitter')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <View style={styles.xIcon}>
                <Text style={styles.xText}>
                  X
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleWhatsappPress}
              onMouseEnter={() => setHoveredItem('whatsapp')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <FontAwesome
                name="whatsapp"
                size={20}
                color={'white'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.instagram.com')}
              onMouseEnter={() => setHoveredItem('instagram')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <FontAwesome
                name="instagram"
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};