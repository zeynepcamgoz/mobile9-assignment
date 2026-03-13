import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 32, textAlign: "center" }}>
        Home Screen
      </Text>

      <Link href="/employee" asChild>
        <Button title="Go to Employee Form" />
      </Link>
    </View>
  );
}