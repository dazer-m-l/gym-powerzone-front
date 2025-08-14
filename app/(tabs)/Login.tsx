import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
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
import Svg, { Path } from 'react-native-svg';
import { useAuth } from './AuthContext'; // 👈 Importa el hook useAuth

// --- ÚNICO CAMBIO: URL BASE DE LA API ---
const API_BASE_URL = 'https://gym-powerzone-back-production.up.railway.app/api';

// Elimina la prop `onLogin` del componente
const LoginScreen: React.FC = () => {
  const { login } = useAuth(); // 👈 Llama al hook para obtener la función `login`
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [isLargeScreen, setIsLargeScreen] = useState(Dimensions.get('window').width >= 768);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const updateDimension = () => {
      setIsLargeScreen(Dimensions.get('window').width >= 768);
    };

    const dimensionListener = Dimensions.addEventListener('change', updateDimension);

    return () => {
      dimensionListener.remove();
    };
  }, []);

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setRememberMe(false);
    setLoginError('');
  };

  useFocusEffect(
    useCallback(() => {
      clearForm();
      return () => {};
    }, [])
  );

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    setLoginError('');

    if (!email || !password) {
      setLoginError('Por favor, completa todos los campos.');
      return;
    }
    if (!validateEmail(email)) {
      setLoginError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Credenciales inválidas. Por favor, revisa tu email y contraseña.');
        }
        throw new Error(data.message || 'Error en el servidor. Inténtalo de nuevo.');
      }

      console.log('✅ Inicio de sesión exitoso:', data);
      
      Alert.alert('Inicio de Sesión Exitoso', '¡Bienvenido!');
      
      clearForm();
      login(); // 👈 Llama a la función `login` del contexto para cambiar el estado global
      router.replace('/Store');
      
    } catch (error) {
      console.error('❌ Error durante el inicio de sesión:', error);
      setLoginError(error instanceof Error ? error.message : 'Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push('/Register');
  };

  const navigateToForgotPassword = () => {
    router.push('/ForgotPassword');
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
          styles.loginCard,
          !isLargeScreen && styles.loginCardSmallScreen
        ]}>
          <View style={[
            styles.formSection,
            !isLargeScreen && styles.formSectionSmallScreen
          ]}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Bienvenido de nuevo, ingrese sus datos por favor</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setLoginError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="tu@email.com"
                placeholderTextColor="#aaa"
                editable={!loading}
              />

              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setLoginError('');
                  }}
                  secureTextEntry={!showPassword}
                  placeholder="********"
                  placeholderTextColor="#aaa"
                  editable={!loading}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPassword ? (
                      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z" />
                    ) : (
                      <>
                        <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <Path d="M1 1l22 22" />
                      </>
                    )}
                  </Svg>
                </TouchableOpacity>
              </View>

              {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

              <View style={styles.checkboxContainer}>
                <View style={styles.rememberMeGroup}>
                  <TouchableOpacity
                    style={styles.checkboxTouchArea}
                    onPress={() => setRememberMe(!rememberMe)}
                    disabled={loading}
                  >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>Recordar</Text>
                </View>
                <TouchableOpacity
                  onPress={navigateToForgotPassword}
                  disabled={loading}
                >
                  <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Ingresar</Text>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.signupText}>
              ¿No tienes cuenta?{' '}
              <TouchableOpacity onPress={navigateToRegister} disabled={loading}>
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
            </Text>
          </View>

          {isLargeScreen && (
            <View style={styles.imageSection}>
              <Image
                source={require('../../assets/images/login.png')}
                style={styles.gymImage}
                resizeMode="cover"
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 800,
    minHeight: 550,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  loginCardSmallScreen: {
    flexDirection: 'column',
    maxWidth: '95%',
    minHeight: 'auto',
  },
  formSection: {
    flex: 1,
    minWidth: 350,
    padding: 20,
    paddingVertical: 50,
    justifyContent: 'center',
  },
  formSectionSmallScreen: {
    minWidth: 'auto',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 25,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 18,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  
  input: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 16,
    color: '#333',
  },
  eyeIconContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxTouchArea: {
    padding: 5,
    marginRight: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#ff4500',
    borderColor: '#ff4500',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#555',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#ff4500',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#ff4500',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#ff4500',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  imageSection: {
    flex: 1,
    minWidth: 300,
    minHeight: 550,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gymImage: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: '#ff4500',
    fontSize: 14,
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 15,
    fontWeight: 'bold',
  },
});