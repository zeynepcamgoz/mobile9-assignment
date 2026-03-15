import { Formik } from "formik";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import InputField from "../components/InputField";

type ScreenProps = {
  navigation: any;
};

const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Please enter at least 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Input at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
})

export default function SignUpScreen({ navigation }: ScreenProps) {

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          console.log("The sign up data:", values);
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
              label="Name"
              value={values.fullName}
              autoCapitalize="words"
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
            />

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
              autoCapitalize="none"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
            />

            <InputField
              label="Confirm Password"
              value={values.confirmPassword}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <Button
              title="Sign Up"
              onPress={handleSubmit as any}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>

      <View style={styles.loginContainer}>
        <Pressable onPress={() => navigation.navigate("Sign in")} style={styles.loginLink}>
          <Text style={styles.boldText}>Already registered? Log in</Text>
        </Pressable></View>

      <View style={styles.loginContainer}>
        <Pressable onPress={() => navigation.navigate("Employee form")} style={styles.loginLink}>
          <Text style={styles.boldText}>For our employees.</Text>
        </Pressable></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  loginLink: {
    padding: 15,
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  boldText: {
    fontWeight: "bold",
  },
});