import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Boss 💼</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Employee form")}
      >
        <Text style={styles.buttonText}>Employees</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Sign in")}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});