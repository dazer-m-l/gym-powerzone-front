import React from 'react';
import { Clipboard, Pressable, Text, View, useWindowDimensions, StyleSheet } from 'react-native';



const SeccionMembresia: React.FC = () => {
  const { width } = useWindowDimensions();
  const isSmall = width < 600;

  const handleRegister = () => console.log('Registro iniciado');

  const handleCopyPrice = () => {
    const priceText = "400 por mes";
    try {
      Clipboard.setString(priceText);
      console.log('Precio copiado: ' + priceText);
    } catch (err) {
      console.error('Error al copiar el precio: ', err);
    }
  };

  return (
    <View style={[
      styles.membershipSection,
      {
        paddingVertical: isSmall ? 24 : 40,
        paddingHorizontal: isSmall ? 16 : 32,
        marginHorizontal: isSmall ? 12 : 24,
        marginVertical: isSmall ? 24 : 40,
        maxWidth: 1000,
        alignSelf: 'center',
      }
    ]}>
      <View style={[
        styles.rowContainer,
        {
          flexDirection: isSmall ? 'column' : 'row',
          gap: isSmall ? 30 : 20,
        }
      ]}>
        <View style={[
          styles.columnLeft,
          {
            paddingRight: isSmall ? 0 : 40,
            marginBottom: isSmall ? 24 : 0,
            width: '100%',
          }
        ]}>
          <Text style={[
            styles.membershipTitle,
            { fontSize: isSmall ? 20 : 30, textAlign: isSmall ? 'center' : 'left' }
          ]}>
            ¿Nuevo en Gym-PowerZone?
          </Text>

          <Text style={[
            styles.offerText,
            { textAlign: isSmall ? 'center' : 'left' }
          ]}>
            Tu membresía incluye hasta 3 meses GRATIS
          </Text>

          <Pressable onPress={handleCopyPrice}>
            <Text style={[
              styles.membershipPrice,
              { textAlign: isSmall ? 'center' : 'left' }
            ]}>
              ($400 por mes)
            </Text>
          </Pressable>

          <Text style={[
            styles.membershipDescription,
            { textAlign: isSmall ? 'center' : 'left' }
          ]}>
            ¡Entrena con los mejores! Acceso a pesas, cardio, HIIT, zona funcional y más.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.membershipCta,
              { opacity: pressed ? 0.8 : 1 }
            ]}
            onPress={handleRegister}
          >
            <Text style={[
              styles.ctaText,
              { fontSize: isSmall ? 16 : 18 }
            ]}>¡HAZTE MIEMBRO HOY!</Text>
          </Pressable>
        </View>

        <View style={[
          styles.divider,
          {
            width: isSmall ? '100%' : 1,
            height: isSmall ? 1 : '60%',
            marginVertical: isSmall ? 20 : 0,
            alignSelf: 'center',
            backgroundColor: '#2a2a2a',
          }
        ]} />

        <View style={[
          styles.columnRight,
          {
            paddingLeft: isSmall ? 0 : 40,
            width: '100%',
          }
        ]}>
          <Text style={[
            styles.scheduleTitle,
            { fontSize: isSmall ? 22 : 28, textAlign: isSmall ? 'center' : 'left' }
          ]}>
            Horario de atención
          </Text>

          <View style={[styles.scheduleGroup, { alignItems: isSmall ? 'center' : 'flex-start' }]}>
            <Text style={[styles.scheduleDay, { textAlign: isSmall ? 'center' : 'left' }]}>Domingo: Cerrado</Text>
          </View>

          <View style={[styles.scheduleGroup, { alignItems: isSmall ? 'center' : 'flex-start' }]}>
            <Text style={[styles.scheduleDay, { textAlign: isSmall ? 'center' : 'left' }]}>Lunes - Viernes</Text>
            <Text style={[styles.scheduleTime, { textAlign: isSmall ? 'center' : 'left' }]}>6:00 AM - 10:00 PM</Text>
          </View>

          <View style={[styles.scheduleGroup, { alignItems: isSmall ? 'center' : 'flex-start' }]}>
            <Text style={[styles.scheduleDay, { textAlign: isSmall ? 'center' : 'left' }]}>Sábado</Text>
            <Text style={[styles.scheduleTime, { textAlign: isSmall ? 'center' : 'left' }]}>8:00 AM - 4:00 PM</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  membershipSection: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    width: '100%',
  },
  rowContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap', // permite que las columnas bajen si no caben

  },
  columnLeft: {
    flex: 1,
  },
  columnRight: {
    flex: 1,
  },
  divider: {},
  membershipTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  offerText: {
    color: '#d4d9d0',
    fontWeight: '600',
    marginBottom: 8,
  },
  membershipPrice: {
    color: '#fff',
    marginBottom: 12,
  },
  membershipDescription: {
    color: '#4a4e4f',
    marginBottom: 20,
  },
  membershipCta: {
    backgroundColor: '#f23a11',
    paddingVertical: 14,
    borderRadius: 6,

    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  ctaText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scheduleTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scheduleGroup: {
    marginBottom: 16,
  },
  scheduleDay: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scheduleTime: {
    color: '#4a4e4f',
  },
});

export default SeccionMembresia;