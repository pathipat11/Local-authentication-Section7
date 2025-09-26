import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token: string | null = await AsyncStorage.getItem("authToken");
        router.replace(token ? "/main" : "/signin");
      } catch (error) {
        console.error("Error reading token:", error);
        router.replace("/signin");
      }
    };

    checkLogin();
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
