import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// URL base de tu API
const API_URL_BASE = 'https://gym-powerzone-back-production.up.railway.app/api';

const ResetPasswordScreen: React.FC = () => {
  // ✅ Obtiene el token de los query parameters para web
  const searchParams = useLocalSearchParams();
  const token = searchParams.token;

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState(Dimensions.get('window').width >= 768);

  useEffect(() => {
    // Agregar un pequeño delay para asegurar que el componente esté montado
    const checkToken = async () => {
      if (!token) {
        Alert.alert('Error', 'Token de recuperación no encontrado. Por favor, solicita un nuevo enlace.', [
          {
            text: 'OK',
            onPress: () => {
              // Usar setTimeout para evitar la navegación antes del montaje
              setTimeout(() => {
                router.push('/Login');
              }, 100);
            }
          }
        ]);
      }
    };

    // Solo ejecutar si el componente está montado
    if (token !== undefined) {
      checkToken();
    }
  }, [token]);

  useEffect(() => {
    const updateDimension = () => {
      setIsLargeScreen(Dimensions.get('window').width >= 768);
    };

    const dimensionListener = Dimensions.addEventListener('change', updateDimension);

    return () => {
      dimensionListener.remove();
    };
  }, []);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Campos incompletos', 'Por favor, ingresa y confirma tu nueva contraseña.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Contraseñas no coinciden', 'Las contraseñas ingresadas no son iguales.');
      return;
    }

    setLoading(true);
    try {
      // ✅ CORREGIDO: Endpoint correcto que coincide con tu backend
      const response = await fetch(`${API_URL_BASE}/auth/restablecer-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          token: token, 
          nuevaContrasena: newPassword 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el servidor. Inténtalo de nuevo.');
      }

      Alert.alert('Éxito', 'Tu contraseña ha sido actualizada correctamente.', [
        {
          text: 'OK',
          onPress: () => router.push('/Login')
        }
      ]);
      
    } catch (error: any) {
      console.error('Error durante el restablecimiento de contraseña:', error);
      Alert.alert('Error', error.message || 'Ocurrió un error inesperado. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#330000', '#1a0000']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={[
          styles.passwordResetCard,
          !isLargeScreen && styles.passwordResetCardSmallScreen
        ]}>
          {isLargeScreen && (
            <View style={styles.imageSection}>
              <Image
                source={require('../assets/images/login.png')}
                style={styles.gymImage}
                resizeMode="cover"
              />
            </View>
          )}

          <View style={[
            styles.formSection,
            !isLargeScreen && styles.formSectionSmallScreen
          ]}>
            <Text style={styles.title}>Restablecer Contraseña</Text>
            <Text style={styles.subtitle}>
              Ingresa tu nueva contraseña y confírmala para continuar.
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Nueva Contraseña</Text>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                autoCapitalize="none"
                placeholder="Ingresa tu nueva contraseña (mín. 6 caracteres)"
                placeholderTextColor="#aaa"
                editable={!loading}
              />

              <Text style={styles.label}>Confirmar Contraseña</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                placeholder="Confirma tu nueva contraseña"
                placeholderTextColor="#aaa"
                editable={!loading}
              />

              <TouchableOpacity style={styles.sendButton} onPress={handleResetPassword} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Restablecer Contraseña</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.push('/Login')}
                disabled={loading}
              >
                <Text style={styles.backButtonText}>Volver al Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordResetCard: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 900,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    minHeight: 400, 
  },
  passwordResetCardSmallScreen: {
    flexDirection: 'column', 
    width: '90%', 
    maxHeight: '80%',
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center', 
    alignSelf: 'center',
    borderWidth: 1, 
    borderColor: '#eee', 
    marginVertical: 0, 
    minHeight: 350,
  },
  imageSection: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  gymImage: {
    width: '100%',
    height: '100%',
  },
  formSection: {
    flex: 1, 
    padding: 25,
    justifyContent: 'center',
  },
  formSectionSmallScreen: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'center',
  },
  form: {
    marginBottom: 15, 
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 10, 
    color: '#333',
    textAlign: 'center', 
  },
  subtitle: {
    fontSize: 14, 
    color: '#666',
    marginBottom: 20, 
    textAlign: 'center', 
  },
  label: {
    marginBottom: 6,
    fontSize: 14, 
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15, 
    marginBottom: 12, 
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 16, 
    color: '#333',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sendButton: {
    backgroundColor: '#ff4500',
    paddingVertical: 12, 
    borderRadius: 4, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, 
    shadowColor: '#ff4500', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16, 
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});