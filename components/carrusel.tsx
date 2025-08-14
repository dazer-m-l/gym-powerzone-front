import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

interface CaruselItem {
  clase_id: number;
  nombre_clase: string;
  descripcion: string;
  precio_clase: string;
  imagen_url: string;
}

const { width: screenWidth } = Dimensions.get('window');
const isMobile = screenWidth < 768;
const CARD_WIDTH = screenWidth * (isMobile ? 0.8 : 0.25);
const CARD_HEIGHT = 440;
const ITEM_MARGIN = 12;
const ITEM_WIDTH = CARD_WIDTH + ITEM_MARGIN * 2;

const styles = StyleSheet.create({
  fullWidthContainer: {
    width: '100%',
    backgroundColor: '#EEEEEE',
    paddingVertical: isMobile ? 40 : 60,
    paddingHorizontal: isMobile ? 20 : 90,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#818181',
  },
  headerTitle1: {
    fontSize: isMobile ? 20 : 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 0,
    color: '#121212',
  },
  carouselContent: {
    alignItems: 'center',
    paddingHorizontal: isMobile ? 10 : 40,
    paddingBottom: 10,
  },
  slide: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: ITEM_MARGIN,
    backgroundColor: '#F9F9F9',
    borderRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: -8,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContent: {
    flex: 1,
    marginRight: 0,
  },
  slideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  slideDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 65,
  },
  ctaCircle: {
    backgroundColor: '#F13a11',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

const fallbackImage = require('../assets/images/adaptive-icon.png');

const Carusel: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [data, setData] = useState<CaruselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('https://gym-powerzone-back-production.up.railway.app/api/clases')
      .then(res => res.json())
      .then((json: CaruselItem[]) => {
        setData(json);
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: json.length * ITEM_WIDTH,
            animated: false,
          });
          setCurrentIndex(json.length);
        }, 100);
      })
      .catch(err => {
        console.error('Error cargando las clases:', err);
      });
  }, []);

  const infiniteData = [...data, ...data, ...data];
  const dataLength = data.length;

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor((contentOffset + ITEM_WIDTH / 2) / ITEM_WIDTH);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }

    if (newIndex >= dataLength * 2) {
      const resetIndex = newIndex % dataLength;
      scrollViewRef.current?.scrollTo({
        x: (dataLength + resetIndex) * ITEM_WIDTH,
        animated: false,
      });
      setCurrentIndex(dataLength + resetIndex);
    } else if (newIndex < dataLength) {
      const resetIndex = newIndex % dataLength + dataLength;
      scrollViewRef.current?.scrollTo({
        x: resetIndex * ITEM_WIDTH,
        animated: false,
      });
      setCurrentIndex(resetIndex);
    }
  };

  const [erroredImages, setErroredImages] = useState<Set<number>>(new Set());

  const onErrorImage = (id: number) => {
    setErroredImages(prev => new Set(prev).add(id));
  };

  return (
    <View style={styles.fullWidthContainer}>
      <Text style={styles.headerTitle}>Consigue el cuerpo ideal</Text>
      <Text style={styles.headerTitle1}>Nuestras Clases de Entrenamiento</Text>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
      >
        {infiniteData.map((item, index) => (
          <View key={`${item.clase_id}-${index}`} style={styles.slide}>
            <Image
              source={
                erroredImages.has(index)
                  ? fallbackImage
                  : { uri: item.imagen_url }
              }
              style={styles.image}
              resizeMode="cover"
              onError={() => onErrorImage(index)}
            />

            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.slideTitle}>{item.nombre_clase}</Text>
              </View>

              <View style={styles.contentWrapper}>
                <View style={styles.textContent}>
                  <Text style={styles.slideDescription}>{item.descripcion}</Text>
                </View>

                <View style={styles.ctaCircle}>
                  <Text style={styles.ctaText}>${item.precio_clase}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Carusel;
