import axios, { isAxiosError } from 'axios';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import MapComponent from './MapComponent';

const ContactForm = () => {
  const { width } = useWindowDimensions();

  const IS_DESKTOP = width >= 1024;
  const IS_TABLET = width >= 600 && width < 1024;

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [nombreError, setNombreError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    let valid = true;

    if (!nombre.trim()) {
      setNombreError('El nombre es obligatorio.');
      valid = false;
    } else {
      setNombreError('');
    }

    if (!email.trim()) {
      setEmailError('El correo es obligatorio.');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('El correo no es válido.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!mensaje.trim()) {
      setMensajeError('El mensaje no puede estar vacío.');
      valid = false;
    } else {
      setMensajeError('');
    }

    return valid;
  };

  const handleSendMessage = async () => {
    if (!validateForm()) return;

    setIsSending(true);

    try {
      await axios.post(
        'https://gym-powerzone-back-production.up.railway.app/api/leads',
        {
          nombre_autor: nombre,
          email,
          mensaje,
          fecha_envio: new Date().toISOString().split('T')[0],
        }
      );

      Alert.alert(
        '¡Mensaje enviado!',
        'Tu mensaje ha sido enviado con éxito. Gracias por contactarnos.'
      );

      setNombre('');
      setEmail('');
      setMensaje('');
    } catch (error) {
      if (isAxiosError(error)) {
        console.error('Error al enviar mensaje:', error.response?.data || error.message);
      } else {
        console.error('Error desconocido:', error);
      }
      Alert.alert(
        'Error',
        'No se pudo enviar el mensaje. Por favor, intenta más tarde.'
      );
    } finally {
      setIsSending(false);
    }
  };

  const gymInfo = {
    latitude: 20.2806,
    longitude: -98.0569,
    address: 'C. de Olivo, Centro, 43200 Zacualtipán, Hgo.',
    name: 'Gym "PowerZone"',
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollViewContent,
        {
          paddingVertical: IS_DESKTOP ? 60 : IS_TABLET ? 50 : 40,
          alignItems: 'center',
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.sectionContainer}>
        <View
          style={[
            styles.contentWrapper,
            {
              flexDirection: IS_DESKTOP ? 'row' : 'column',
              width: IS_DESKTOP ? '90%' : IS_TABLET ? 700 : '95%',
              maxWidth: IS_DESKTOP ? 1200 : undefined,
              justifyContent: 'space-between',
            },
          ]}
        >
          <View
            style={[
              styles.formColumn,
              {
                padding: IS_DESKTOP ? 30 : IS_TABLET ? 25 : 20,
                marginBottom: IS_DESKTOP ? 0 : 40,
                marginRight: IS_DESKTOP ? 40 : 0,
                maxWidth: IS_DESKTOP ? 500 : '100%',
                width: IS_TABLET ? '100%' : undefined,
              },
            ]}
          >
            <Text
              style={[
                styles.formTitle,
                {
                  fontSize: IS_DESKTOP ? 32 : IS_TABLET ? 28 : 22,
                  lineHeight: IS_DESKTOP ? 40 : 30,
                  textAlign: IS_DESKTOP ? 'left' : 'center',
                },
              ]}
            >
              Siéntete libre de preguntar cualquier cosa
            </Text>

            <TextInput
              style={[styles.input, nombreError && styles.inputError]}
              placeholder="Nombre"
              value={nombre}
              onChangeText={(text) => {
                setNombre(text);
                if (text.trim()) setNombreError('');
              }}
            />
            {nombreError ? <Text style={styles.errorText}>{nombreError}</Text> : null}

            <TextInput
              style={[styles.input, emailError && styles.inputError]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailRegex.test(text)) setEmailError('');
              }}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
              style={[styles.input, styles.messageInput, mensajeError && styles.inputError]}
              placeholder="Mensaje"
              multiline={true}
              numberOfLines={4}
              value={mensaje}
              onChangeText={(text) => {
                setMensaje(text);
                if (text.trim()) setMensajeError('');
              }}
            />
            {mensajeError ? <Text style={styles.errorText}>{mensajeError}</Text> : null}

            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={isSending}
            >
              <Text style={styles.sendButtonText}>
                {isSending ? 'Enviando...' : 'Enviar Mensaje'}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.mapColumn,
              {
                padding: IS_DESKTOP ? 30 : IS_TABLET ? 25 : 20,
                maxWidth: IS_DESKTOP ? '55%' : '100%',
                width: IS_TABLET ? '100%' : undefined,
                alignItems: IS_DESKTOP ? 'flex-start' : 'center',
              },
            ]}
          >
            <Text
              style={[
                styles.mapTitle,
                {
                  fontSize: IS_DESKTOP ? 32 : IS_TABLET ? 28 : 22,
                  lineHeight: IS_DESKTOP ? 40 : 30,
                  textAlign: IS_DESKTOP ? 'left' : 'center',
                },
              ]}
            >
              Dónde puedes encontrarnos
            </Text>
            <View style={styles.locationDetail}>
              <Image source={require('./styles/image.png')} style={styles.locationIcon} />
              <Text style={styles.locationText}>
                {gymInfo.address} ({gymInfo.name})
              </Text>
            </View>
            <View style={styles.divider} />

            <MapComponent
              latitude={gymInfo.latitude}
              longitude={gymInfo.longitude}
              name={gymInfo.name}
              address={gymInfo.address}
              height={280}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  contentWrapper: {
    justifyContent: 'space-between',
  },
  formColumn: {
    backgroundColor: '#fff',
  },
  formTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    borderRadius: 6,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  messageInput: {
    height: 180,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#222',
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 18,
  },
  mapColumn: {
    backgroundColor: '#fff',
  },
  mapTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  locationText: {
    fontSize: 18,
    color: '#555',
    flexShrink: 1,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 30,
    width: '100%',
  },
});

export default ContactForm;
