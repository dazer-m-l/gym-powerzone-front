import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const SMALL_SCREEN_WIDTH = 768;

export default function HeroVideo() {
  const handleGetStarted = () => {
    Alert.alert('GET STARTED', 'Funcionalidad iniciada.');
  };

  const handleLearnMore = () => {
    Alert.alert('LEARN MORE', 'Más información disponible.');
  };

  const videoSourceUrl = 'https://files.catbox.moe/a0p1ns.mp4';


  const isSmallScreen = width < SMALL_SCREEN_WIDTH;
  const subtitleFontSize = isSmallScreen ? 28 : 34;
  const subtitle2FontSize = isSmallScreen ? 26 : 32;

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <View style={styles.videoContainer}>
          <video
            src={videoSourceUrl}
            autoPlay 
            loop     
            muted    
            playsInline
            style={styles.responsiveVideo} 
          />
        </View>

        <View style={styles.overlayBackground} />

        <View style={styles.overlay}>
          <Text style={styles.title}>¡Nueva forma de construir un estilo de vida saludable!</Text>
          <Text style={[styles.subtitle, { fontSize: subtitleFontSize }]}>MEJORA TU CUERPO EN</Text>
          <Text style={[styles.subtitle2, { fontSize: subtitle2FontSize }]}>GYMSO FITNESS</Text>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleGetStarted} style={styles.button}>
              <Text style={styles.buttonText}>COMENZAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLearnMore} style={styles.buttonOutline}>
              <Text style={styles.buttonTextOutline}>MÁS INFORMACIÓN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
    overflow: 'hidden',
  },
 
  responsiveVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
    
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.76)',
    zIndex: -1,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  title: {
    color: '#575759',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subtitle2: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#06060603',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 0,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#f13a11',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 0,
  },
  buttonTextOutline: {
    color: '#f13a11',
    fontWeight: 'bold',
    fontSize: 14,
  },
});