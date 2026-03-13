import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: "center",
    }}>
      <Stack.Screen name="Sign in" component={SignInScreen} options={{ title: "Sign In" }} />
      <Stack.Screen name="Sign up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}