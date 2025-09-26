// app/setting.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const SettingPage: React.FC = () => {
  const { color, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("authToken");
          router.replace("/signin");
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <Text style={[styles.heading, { color: color.primary }]}>Settings</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: color.surface }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: color.text }]}>Toggle Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#dc3545" }]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonText, { color: "#fff" }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
