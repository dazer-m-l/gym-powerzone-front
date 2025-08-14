import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const API_BASE_URL = 'https://gym-powerzone-back-production.up.railway.app/api';

const RegisterScreen: React.FC = () => {
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    password: '',
    telefono: '',
    tipo: '',
    calle: '',
    ciudad: '',
    estado: '',
    cp: '',
    referencias: ''
  });

  const [errors, setErrors] = useState({ password: '', form: '', passwordButton: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(Dimensions.get('window').width >= 768);

  useEffect(() => {
    const updateDimension = () => setIsLargeScreen(Dimensions.get('window').width >= 768);
    const dimensionListener = Dimensions.addEventListener('change', updateDimension);
    return () => dimensionListener.remove();
  }, []);

  useFocusEffect(useCallback(() => {
    clearForm();
    return () => {};
  }, []));

  // Validaciones
  const validate = {
    email: (email: string) => /\S+@\S+\.\S+/.test(email),
    phone: (phone: string) => /^\d{10}$/.test(phone),
    textOnly: (text: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(text),
    noSpaces: (text: string) => text.trim() === text,
    isEmpty: (text: string) => text.trim().length === 0,
    zipCode: (zip: string) => /^\d{5}$/.test(zip)
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors.form) setErrors(prev => ({ ...prev, form: '' }));
    if (errors.password && field === 'password') setErrors(prev => ({ ...prev, password: '', passwordButton: '' }));
  };

  const clearForm = () => {
    setFormData({
      nombre: '', apellido_paterno: '', apellido_materno: '', email: '', password: '',
      telefono: '', tipo: '', calle: '', ciudad: '', estado: '', cp: '', referencias: ''
    });
    setErrors({ password: '', form: '', passwordButton: '' });
    setCurrentStep(1);
    setShowPassword(false);
  };

  const validateStep = (step: number) => {
    setErrors({ password: '', form: '', passwordButton: '' });

    if (step === 1) {
      const { nombre, apellido_paterno, apellido_materno, email, password } = formData;
      
      if ([nombre, apellido_paterno, apellido_materno, email, password].some(validate.isEmpty)) {
        setErrors(prev => ({ ...prev, form: 'Por favor, completa todos los campos de información personal.' }));
        return false;
      }
      
      if (![nombre, apellido_paterno, apellido_materno].every(validate.noSpaces)) {
        setErrors(prev => ({ ...prev, form: 'Los campos de nombre y apellido no pueden tener espacios al principio o al final.' }));
        return false;
      }
      
      if (![nombre, apellido_paterno, apellido_materno].every(validate.textOnly)) {
        setErrors(prev => ({ ...prev, form: 'Los campos de nombre y apellido solo pueden contener letras.' }));
        return false;
      }
      
      if (!validate.email(email) || !validate.noSpaces(email)) {
        setErrors(prev => ({ ...prev, form: 'Por favor, introduce un correo electrónico válido sin espacios al principio o al final.' }));
        return false;
      }
      
      if (password.length < 8 || password.length > 10 || !validate.noSpaces(password)) {
        setErrors({
          password: 'La contraseña debe tener entre 8 a 10 caracteres y no puede tener espacios al principio o al final.',
          form: '',
          passwordButton: 'La contraseña no cumple los requisitos.'
        });
        return false;
      }
    }

    if (step === 2) {
      const { telefono, tipo, calle } = formData;
      
      if (validate.isEmpty(telefono) || !tipo || validate.isEmpty(calle)) {
        setErrors(prev => ({ ...prev, form: 'Por favor, completa todos los campos de contacto y dirección básica.' }));
        return false;
      }
      
      if (!validate.phone(telefono) || !validate.noSpaces(telefono)) {
        setErrors(prev => ({ ...prev, form: 'Introduce un número de 10 dígitos válido sin espacios al principio o al final.' }));
        return false;
      }
      
      if (!validate.noSpaces(calle)) {
        setErrors(prev => ({ ...prev, form: 'La calle y número no pueden tener espacios al principio o al final.' }));
        return false;
      }
    }

    if (step === 3) {
      const { ciudad, estado, cp, referencias } = formData;
      
      if ([ciudad, estado, cp, referencias].some(validate.isEmpty)) {
        setErrors(prev => ({ ...prev, form: 'Por favor, completa todos los campos de detalles de dirección y referencias.' }));
        return false;
      }
      
      if (![ciudad, estado, cp, referencias].every(validate.noSpaces)) {
        setErrors(prev => ({ ...prev, form: 'Ningún campo puede tener espacios al principio o al final.' }));
        return false;
      }
      
      if (![ciudad, estado].every(validate.textOnly)) {
        setErrors(prev => ({ ...prev, form: 'Los campos de ciudad y estado solo pueden contener letras.' }));
        return false;
      }
      
      if (!validate.zipCode(cp)) {
        setErrors(prev => ({ ...prev, form: 'El Código Postal debe ser numérico y tener 5 dígitos.' }));
        return false;
      }
    }

    return true;
  };

  const handleStep = (direction: 'next' | 'prev') => {
    if (direction === 'next' && validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else if (direction === 'prev') {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRegister = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      const userData = {
        nombre: formData.nombre.trim(),
        apellido_paterno: formData.apellido_paterno.trim(),
        apellido_materno: formData.apellido_materno.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        telefono: formData.telefono,
        direcciones: [{
          tipo: formData.tipo,
          calle: formData.calle.trim(),
          ciudad: formData.ciudad.trim(),
          estado: formData.estado.trim(),
          cp: formData.cp,
          referencias: formData.referencias.trim()
        }]
      };

      console.log('Datos enviados:', userData);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(userData),
      });

      console.log('Status de respuesta:', response.status);
      console.log('Headers de respuesta:', response.headers);

      // Verificar si la respuesta tiene contenido JSON
      const contentType = response.headers.get('content-type');
      let data = null;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Respuesta del servidor (JSON):', data);
      } else {
        const textData = await response.text();
        console.log('Respuesta del servidor (Text):', textData);
        data = { mensaje: textData };
      }

      if (!response.ok) {
        throw new Error(
          response.status === 400 ? (data?.mensaje || 'Datos inválidos') :
          response.status === 409 ? 'El email ya está registrado' :
          (data?.mensaje || `Error del servidor: ${response.status}`)
        );
      }

      // Si llegamos aquí, el registro fue exitoso
      console.log('✅ Registro exitoso, mostrando alerta...');
      
      // TEMPORAL: Alternativa si Alert no funciona
      setErrors(prev => ({ 
        ...prev, 
        form: '✅ ¡Registro exitoso! Redirigiendo al login...'
      }));
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        clearForm();
        router.replace('/Login');
      }, 2000);
      
      /* COMENTADO TEMPORALMENTE PARA PROBAR
      Alert.alert(
        'Registro Exitoso', 
        'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.',
        [
          {
            text: 'OK', 
            onPress: () => {
              console.log('Usuario presionó OK, limpiando formulario y redirigiendo...');
              clearForm();
              router.replace('/Login');
            }
          }
        ],
        { cancelable: false }
      );
      */

      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormError('');
      clearForm();
      router.replace('/Store');
    } catch (error) {
      console.error('❌ Error durante el registro:', error);
      setErrors(prev => ({ 
        ...prev, 
        form: error instanceof Error ? error.message : 'Ocurrió un error inesperado durante el registro. Por favor, intenta de nuevo.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const cleaners = {
    textOnly: (text: string) => text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').replace(/^\s+/, ''),
    noLeadingSpaces: (text: string) => text.replace(/^\s+/, ''),
    numbersOnly: (text: string) => text.replace(/[^0-9]/g, '').replace(/^\s+/, ''),
    email: (text: string) => text.startsWith(' ') ? text.slice(1) : text
  };

  const renderStep1 = () => (
    <>
      <Text style={styles.label}>Nombre(s)</Text>
      <TextInput
        style={[styles.input, !isLargeScreen && styles.inputSmallScreen]}
        value={formData.nombre}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').replace(/^\s+/, '');
          updateField('nombre', cleaned);
        }}
        placeholder="Tu nombre(s)"
        placeholderTextColor="#aaa"
        autoCapitalize="words"
      />

      <Text style={styles.label}>Apellido Paterno</Text>
      <TextInput
        style={[styles.input, !isLargeScreen && styles.inputSmallScreen]}
        value={formData.apellido_paterno}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').replace(/^\s+/, '');
          updateField('apellido_paterno', cleaned);
        }}
        placeholder="Tu apellido paterno"
        placeholderTextColor="#aaa"
        autoCapitalize="words"
      />

      <Text style={styles.label}>Apellido Materno</Text>
      <TextInput
        style={[styles.input, !isLargeScreen && styles.inputSmallScreen]}
        value={formData.apellido_materno}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').replace(/^\s+/, '');
          updateField('apellido_materno', cleaned);
        }}
        placeholder="Tu apellido materno"
        placeholderTextColor="#aaa"
        autoCapitalize="words"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, !isLargeScreen && styles.inputSmallScreen]}
        value={formData.email}
        onChangeText={(text) => {
          const cleaned = text.startsWith(' ') ? text.slice(1) : text;
          updateField('email', cleaned);
        }}
        placeholder="tu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Contraseña</Text>
      <View style={[styles.passwordInputContainer, !isLargeScreen && styles.inputSmallScreen]}>
        <TextInput
          style={styles.passwordInput}
          value={formData.password}
          onChangeText={(text) => updateField('password', text.replace(/^\s+/, ''))}
          secureTextEntry={!showPassword}
          placeholder="********"
          placeholderTextColor="#aaa"
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
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={[styles.input, !isLargeScreen && styles.inputSmallScreen]}
        value={formData.telefono}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
          updateField('telefono', cleaned);
        }}
        keyboardType="phone-pad"
        maxLength={10}
        placeholder="Ej. 5512345678"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Tipo de Dirección</Text>
      <View style={[styles.pickerContainer, !isLargeScreen && styles.inputSmallScreen]}>
        <Picker
          selectedValue={formData.tipo}
          onValueChange={(itemValue) => updateField('tipo', itemValue)}
          style={[styles.picker, !isLargeScreen && styles.pickerSmallScreen]}
          dropdownIconColor="#333"
          itemStyle={!isLargeScreen ? styles.pickerItemSmallScreen : null}
        >
          <Picker.Item label="Seleccione una opción" value="" />
          <Picker.Item label="Casa" value="casa" />
          <Picker.Item label="Oficina" value="oficina" />
          <Picker.Item label="Departamento" value="departamento" />
          <Picker.Item label="Bodega" value="bodega" />
          <Picker.Item label="Local Comercial" value="local_comercial" />
          <Picker.Item label="Consultorio" value="consultorio" />
          <Picker.Item label="Sucursal" value="sucursal" />
          <Picker.Item label="Otro" value="otro" />
        </Picker>
      </View>

      <Text style={styles.label}>Calle y Número</Text>
      <TextInput
        style={[styles.input, !isLargeScreen && styles.inputSmallScreen]}
        value={formData.calle}
        onChangeText={(text) => updateField('calle', text.replace(/^\s+/, ''))}
        placeholder="Ej. Av. Siempre Viva 742"
        placeholderTextColor="#aaa"
      />
    </>
  );

  const renderStep3 = () => (
    <ScrollView style={styles.formScrollView} contentContainerStyle={styles.formScrollViewContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={[styles.twoColumnRow, !isLargeScreen && styles.twoColumnRowSmallScreen]}>
        <View style={[styles.columnField, !isLargeScreen && styles.columnFieldSmallScreen]}>
          <Text style={styles.label}>Ciudad</Text>
          <TextInput
            style={[styles.input, !isLargeScreen && styles.inputSmallScreen]}
            value={formData.ciudad}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').replace(/^\s+/, '');
              updateField('ciudad', cleaned);
            }}
            placeholder="Ej. México"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
          />
        </View>
        <View style={[styles.columnFieldLast, !isLargeScreen && styles.columnFieldSmallScreen]}>
          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={[styles.input, !isLargeScreen && styles.inputSmallScreen]}
            value={formData.estado}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').replace(/^\s+/, '');
              updateField('estado', cleaned);
            }}
            placeholder="Ej. Hidalgo"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
          />
        </View>
      </View>
      <View style={[styles.twoColumnRow, !isLargeScreen && styles.twoColumnRowSmallScreen]}>
        <View style={[styles.columnField, !isLargeScreen && styles.columnFieldSmallScreen]}>
          <Text style={styles.label}>Código Postal</Text>
          <TextInput
            style={[styles.input, !isLargeScreen && styles.inputSmallScreen]}
            value={formData.cp}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9]/g, '').slice(0, 5);
              updateField('cp', cleaned);
            }}
            keyboardType="numeric"
            maxLength={5}
            placeholder="Ej. 12345"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={[styles.columnFieldLast, !isLargeScreen && styles.columnFieldSmallScreen]} />
      </View>
      <Text style={styles.label}>Referencias de Dirección</Text>
      <TextInput
        style={[styles.input, !isLargeScreen && styles.inputSmallScreen, styles.multilineInput]}
        value={formData.referencias}
        onChangeText={(text) => updateField('referencias', text.replace(/^\s+/, ''))}
        placeholder="Casa con portón rojo, a lado de la farmacia"
        multiline
        numberOfLines={3}
        placeholderTextColor="#aaa"
      />
    </ScrollView>
  );

  return (
    <LinearGradient colors={['#000000', '#330000', '#1a0000']} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingContainer}>
        <View style={[styles.registerCard, !isLargeScreen && styles.registerCardSmallScreen, isLargeScreen && styles.registerCardLargeScreen]}>
          {isLargeScreen && (
            <View style={styles.imageSection}>
              <Image source={require('../../assets/images/login.png')} style={styles.gymImage} resizeMode="cover" />
            </View>
          )}

          <View style={[styles.formSection, !isLargeScreen && styles.formSectionSmallScreen]}>
            <View style={styles.formContentContainer}>
              <Text style={styles.title}>Bienvenido</Text>
              <Text style={styles.subtitle}>Bienvenido a Gym-powerZone, ingresa tus datos por favor</Text>

              <View style={[styles.formStepContent, styles.formStepContentFixedSize]}>
                <Text style={[styles.sectionTitle, !isLargeScreen && styles.sectionTitleSmallScreen]}>
                  {currentStep === 1 ? 'Información Personal' :
                   currentStep === 2 ? 'Información de Contacto y Dirección Básica' :
                   'Detalles de Dirección y Referencias'}
                </Text>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
              </View>
            </View>

            {errors.form && !errors.passwordButton && <Text style={styles.formErrorText}>{errors.form}</Text>}

            <View style={[styles.navigationButtonsContainer, currentStep === 1 ? styles.justifyEnd : styles.justifyBetween]}>
              {currentStep === 1 && errors.passwordButton && <Text style={styles.passwordButtonErrorText}>{errors.passwordButton}</Text>}

              {currentStep > 1 && (
                <TouchableOpacity style={styles.smallNavButton} onPress={() => handleStep('prev')} disabled={loading}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M15 18l-6-6 6-6" />
                  </Svg>
                  <Text style={[styles.buttonText, { marginLeft: 2, fontSize: 14 }]}>Anterior</Text>
                </TouchableOpacity>
              )}

              {currentStep < 3 ? (
                <TouchableOpacity style={[styles.smallNavButton, currentStep > 1 && styles.marginLeft]} onPress={() => handleStep('next')} disabled={loading}>
                  <Text style={[styles.buttonText, { marginRight: 2, fontSize: 14 }]}>Siguiente</Text>
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M9 18l6-6-6-6" />
                  </Svg>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[styles.registerButton, styles.registerButtonFixed, currentStep > 1 && styles.marginLeft]} onPress={handleRegister} disabled={loading}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrar</Text>}
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.loginText}>
              ¿Ya tienes cuenta?{' '}
              <TouchableOpacity onPress={() => router.push('/Login')} disabled={loading}>
                <Text style={styles.loginLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 },
  keyboardAvoidingContainer: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  registerCard: { flexDirection: 'row', width: '100%', maxWidth: 900, backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 15, minHeight: 500 },
  registerCardLargeScreen: { width: 900, height: 600 },
  registerCardSmallScreen: { flexDirection: 'column', width: '90%', maxHeight: '85%', borderRadius: 15, padding: 20, justifyContent: 'center', alignSelf: 'center', borderWidth: 1, borderColor: '#eee', marginVertical: 0, minHeight: 500 },
  imageSection: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', minHeight: 200 },
  gymImage: { width: '100%', height: '100%' },
  formSection: { flex: 1, padding: 20, justifyContent: 'space-between', minHeight: 450 },
  formSectionSmallScreen: { paddingHorizontal: 0, paddingVertical: 0, justifyContent: 'flex-start' },
  formContentContainer: { flex: 1, justifyContent: 'center' },
  formStepContent: { flex: 1, minHeight: 300 },
  formStepContentFixedSize: { height: 350, minHeight: undefined },
  formScrollView: { flex: 1 },
  formScrollViewContent: { flexGrow: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 2, color: '#333' },
  subtitle: { fontSize: 15, color: '#666', marginBottom: 10 },
  label: { marginBottom: 3, fontSize: 12, color: '#555', fontWeight: 'bold' },
  sectionTitle: { marginTop: 2, marginBottom: 5, fontSize: 15, color: '#666' },
  sectionTitleSmallScreen: { marginBottom: 5, fontSize: 10 },
  input: { paddingVertical: 10, paddingHorizontal: 15, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, fontSize: 16, color: '#333', backgroundColor: '#f9f9f9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  inputSmallScreen: { paddingVertical: 10, fontSize: 16, marginBottom: 10 },
  multilineInput: { minHeight: 80, textAlignVertical: 'top' },
  passwordInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 5, backgroundColor: '#f9f9f9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  passwordInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 15, fontSize: 16, color: '#333' },
  eyeIconContainer: { padding: 10 },
  pickerContainer: { paddingVertical: 0, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#f9f9f9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, justifyContent: 'center' },
  picker: { height: 50, width: '100%', color: '#333' },
  pickerSmallScreen: { height: 50 },
  pickerItemSmallScreen: { fontSize: 15 },
  twoColumnRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  twoColumnRowSmallScreen: { flexDirection: 'column' },
  columnField: { flex: 1, marginRight: 10 },
  columnFieldLast: { flex: 1, marginRight: 0 },
  columnFieldSmallScreen: { width: '100%', marginRight: 0, marginBottom: 10 },
  navigationButtonsContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 0, width: '100%', paddingHorizontal: 0 },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  marginLeft: { marginLeft: 10 },
  registerButton: { backgroundColor: '#ff4500', paddingVertical: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center', shadowColor: '#ff4500', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5, flexDirection: 'row', flex: 1 },
  registerButtonFixed: { width: 150, flex: undefined },
  smallNavButton: { backgroundColor: '#ff4500', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center', shadowColor: '#ff4500', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5, flexDirection: 'row', width: 120 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loginText: { textAlign: 'center', fontSize: 14, color: '#666', marginTop: 10 },
  loginLink: { color: '#ff4500', fontWeight: 'bold', textDecorationLine: 'underline' },
  errorText: { color: '#ff4500', fontSize: 12, marginTop: -5, marginBottom: 10 },
  formErrorText: { color: '#ff4500', fontSize: 14, textAlign: 'center', marginTop: 10, fontWeight: 'bold' },
  passwordButtonErrorText: { color: '#ff4500', fontSize: 12, fontWeight: 'bold', flex: 1, textAlign: 'right', marginRight: 10 }
});