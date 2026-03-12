import InputField from "@/components/InputField";
import { Formik } from "formik";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

type Props = {
  navigation: any;
};

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});



export default function SignInScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          console.log("User signed in:", values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <InputField
              label="Email"
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
            />

            <InputField
              label="Password"
              value={values.password}
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
            />

            <Button
              title="Sign In"
              onPress={handleSubmit as any}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>

      <View style={styles.SignUpContainer}>
        <Pressable onPress={() => navigation.navigate("Sign up")} style={styles.SignUpLink}>
          <Text style={styles.boldText}>Already registered? Sign Up</Text>
        </Pressable></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  SignUpLink: {
    padding: 15,
  },
  SignUpContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  boldText: {
    fontWeight: "bold",
  },
});