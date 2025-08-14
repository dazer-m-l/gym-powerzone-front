import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
} from "react-native";

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState(
    Dimensions.get("window").width >= 768
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const updateDimension = () => {
      setIsLargeScreen(Dimensions.get("window").width >= 768);
    };
    const dimensionListener = Dimensions.addEventListener(
      "change",
      updateDimension
    );
    return () => {
      dimensionListener.remove();
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  interface ErrorResponse {
    error: string;
    status?: number;
  }

  const handleResetPassword = async () => {
    try {
      setError("");
      if (!email.trim()) {
        throw new Error("Por favor, ingresa tu dirección de email.");
      }
      if (!validateEmail(email)) {
        throw new Error("Por favor, introduce un correo electrónico válido.");
      }
      setLoading(true);

      const response = await fetch(
        "https://gym-powerzone-back-production.up.railway.app/api/auth/recuperar-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      console.log("Estado de la respuesta:", {
        status: response.status,
        ok: response.ok,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", {
          status: response.status,
          error: errorData,
          email: email,
          timestamp: new Date().toISOString(),
        });
        throw new Error(errorData.error || "Error al enviar el correo");
      }

      const responseData = await response.json();
      console.log("Respuesta exitosa:", responseData);

      Alert.alert(
        "Instrucciones Enviadas",
        "Si tu email está registrado, recibirás un correo para restablecer tu contraseña."
      );
      router.push("/Login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error en la petición:", {
          error: err.message,
          email: email,
          timestamp: new Date().toISOString(),
          stack: err.stack,
        });
        setError(err.message);
      } else {
        console.error("Error desconocido:", {
          error: String(err),
          email: email,
          timestamp: new Date().toISOString(),
        });
        setError("Error desconocido al enviar el correo");
      }
      Alert.alert("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#000000", "#330000", "#1a0000"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View
          style={[
            styles.passwordResetCard,
            !isLargeScreen && styles.passwordResetCardSmallScreen,
          ]}
        >
          {isLargeScreen && (
            <View style={styles.imageSection}>
              <Image
                source={require("../../assets/images/login.png")}
                style={styles.gymImage}
                resizeMode="cover"
              />
            </View>
          )}
          <View
            style={[
              styles.formSection,
              !isLargeScreen && styles.formSectionSmallScreen,
            ]}
          >
            <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.subtitle}>
              Ingresa tu dirección de email y te enviaremos instrucciones para
              restablecerla.
            </Text>
            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="tu@email.com"
                placeholderTextColor="#aaa"
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Enviar instrucciones</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.backToLoginText}>
              ¿Recordaste tu contraseña?{" "}
              <TouchableOpacity
                onPress={() => router.push("/Login")}
                disabled={loading}
              >
                <Text style={styles.loginLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordResetCard: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 900,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    minHeight: 400,
  },
  passwordResetCardSmallScreen: {
    flexDirection: "column",
    width: "90%",
    maxHeight: "70%",
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#eee",
    marginVertical: 0,
    minHeight: 300,
  },
  imageSection: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  gymImage: {
    width: "100%",
    height: "100%",
  },
  formSection: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
  },
  formSectionSmallScreen: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "center",
  },
  form: {
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sendButton: {
    backgroundColor: "#ff4500",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#ff4500",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backToLoginText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginTop: 20,
  },
  loginLink: {
    color: "#ff4500",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default ForgotPasswordScreen;
