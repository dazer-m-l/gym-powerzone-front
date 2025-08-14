import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  findNodeHandle,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

type Coach = {
  entrenador_id: number;
  nombre_entrenador: string;
  especialidad: string;
  foto_url: string;
  contacto_entrenador: string;
};

type Props = {
  onSectionVisibilityChange?: (section: string, isVisible: boolean) => void;
};

const WeAreGymso = forwardRef((props: Props, ref) => {
  WeAreGymso.displayName = 'WeAreGymso';

  const { onSectionVisibilityChange } = props;
  const { width, height } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const aboutUsSectionRef = useRef<View>(null);
  const [aboutUsHeight, setAboutUsHeight] = useState(0);

  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isDesktop = width >= 1024;
  const isTablet = width >= 600 && width < 1024;
  const isPhone = width < 600;

  useImperativeHandle(ref, () => ({
    scrollToAboutUs: () => {
      if (scrollViewRef.current && aboutUsSectionRef.current) {
        const node = findNodeHandle(scrollViewRef.current);
        if (!node) return;
        aboutUsSectionRef.current.measureLayout(
          node,
          (x: number, y: number) => {
            scrollViewRef.current?.scrollTo({ y, animated: true });
          },
          () => console.error('scroll error')
        );
      }
    },
  }));

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch(
          'https://gym-powerzone-back-production.up.railway.app/api/entrenadores'
        );
        if (!response.ok) throw new Error('Error fetching coaches');
        const data = await response.json();
        setCoaches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    if (aboutUsSectionRef.current && aboutUsHeight > 0) {
      const node = findNodeHandle(scrollViewRef.current);
      if (!node) return;
      aboutUsSectionRef.current.measureLayout(
        node,
        (x: number, y: number) => {
          const isVisible = y < scrollY + height && y + aboutUsHeight > scrollY;
          onSectionVisibilityChange?.('aboutUs', isVisible);
        },
        () => console.error('scroll error')
      );
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View
        style={styles.outerContainer}
        ref={aboutUsSectionRef}
        onLayout={(e) => setAboutUsHeight(e.nativeEvent.layout.height)}
      >
        <View
          style={[
            styles.contentBox,
            {
              flexDirection: isDesktop ? 'row' : 'column',
              justifyContent: isDesktop ? 'flex-end' : 'center',
              paddingVertical: isDesktop ? 0 : 30,
            },
          ]}
        >
          <View
            style={[
              styles.textSection,
              {
                paddingRight: isDesktop ? 40 : 0,
                marginBottom: isDesktop ? 0 : 30,
              },
            ]}
          >
            <Text style={[styles.title, { fontSize: isPhone ? 24 : 32 }]}>
              Hola, somos Gym-PowerZone
            </Text>
            <Text
              style={[
                styles.paragraph,
                { fontSize: isPhone ? 14 : 17, lineHeight: isPhone ? 20 : 26 },
              ]}
            >
              Tu centro de transformación física y mental integral. En Gym-PowerZone,
              no solo entrenamos tu cuerpo, sino que fortalecemos tu mente para
              enfrentar cualquier desafío.
            </Text>
            <Text
              style={[
                styles.paragraph,
                { fontSize: isPhone ? 14 : 17, lineHeight: isPhone ? 20 : 26 },
              ]}
            >
              Contamos con un equipo de entrenadores certificados y altamente
              experimentados que diseñan programas personalizados para tus objetivos.
              Estamos listos para guiarte en cada paso de tu camino.
            </Text>
          </View>

          <View
            style={[
              styles.cardsSection,
              {
                flexDirection: isDesktop || isTablet ? 'row' : 'column',
                justifyContent: isDesktop || isTablet ? 'flex-end' : 'center',
                alignItems: isDesktop || isTablet ? 'flex-start' : 'center',
              },
            ]}
          >
            {loading && <ActivityIndicator size="large" color="#000" />}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            {!loading &&
              !error &&
              coaches.map((coach) => (
                <View
                  key={coach.entrenador_id}
                  style={[
                    styles.card,
                    {
                      width: 280,
                      marginBottom: isPhone ? 20 : 0,
                      marginRight: isDesktop || isTablet ? 15 : 0,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: coach.foto_url }}
                    style={[styles.cardImage, { height: isPhone ? 200 : 280 }]}
                  />
                  <View style={styles.cardBody}>
                    <View style={styles.textIconRow}>
                      <Text style={[styles.cardName, { fontSize: isPhone ? 16 : 20 }]}>
                        {coach.nombre_entrenador}
                      </Text>
                      <Icon name="x-twitter" size={18} color="#666" />
                    </View>
                    <View style={styles.textIconRow}>
                      <Text style={[styles.cardRole, { fontSize: isPhone ? 12 : 15 }]}>
                        {coach.especialidad}
                      </Text>
                      <Icon name="instagram" size={18} color="#666" />
                    </View>
                    <Text style={[styles.paragraph, { fontSize: isPhone ? 12 : 14 }]}>
                      Contacto: {coach.contacto_entrenador}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
});

export default WeAreGymso;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  outerContainer: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 65,
    alignItems: 'center',
    width: '100%',
  },
  contentBox: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 30,
  },
  textSection: {
    flex: 1,
    maxWidth: 550,
    justifyContent: 'center',
  },
  title: {
    color: '#111',
    fontWeight: '700',
    fontFamily: 'sans-serif',
    marginBottom: 20,
    letterSpacing: -0.7,
  },
  paragraph: {
    color: '#555',
    marginBottom: 15,
    fontFamily: 'sans-serif',
  },
  cardsSection: {
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'flex-start',
  },
  cardImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  textIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 2,
    marginBottom: 0,
  },
  cardName: {
    color: '#222',
    fontWeight: '700',
    fontFamily: 'sans-serif',
    flexShrink: 1,
  },
  cardRole: {
    color: '#777',
    fontFamily: 'sans-serif',
    flexShrink: 1,
  },
});
