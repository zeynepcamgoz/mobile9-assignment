import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';
import InputField from '../components/InputField';

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  position: '',
};

const employeeSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required').min(3, 'Too short'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  phone: Yup.string().required('Phone is required').min(10, 'Too short'),
  position: Yup.string().required('Position is required'),
});

const EmployeeFormScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Employee Details 📋</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={employeeSchema}
        onSubmit={(values, { resetForm }) => {
          setModalVisible(true);
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
          <View style={styles.form}>
            <InputField
              label="Full Name"
              placeholder="e.g. Pragunya Wadhwa"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              error={errors.fullName}
              touched={touched.fullName}
            />

            <InputField
              label="Email"
              placeholder="hello@sait.ca"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
            />

            <InputField
              label="Phone Number"
              placeholder="403-000-0000"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
            />

            <View style={styles.buttonContainer}>
              <Button title="Submit Info" onPress={() => handleSubmit()} disabled={!isValid} color="#6200EE" />
            </View>
          </View>
        )}
      </Formik>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Employee Added Successfully! ✨</Text>
            <Button title="Dismiss" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EmployeeFormScreen;

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#F5F5F5' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 30, color: '#333', textAlign: 'center' },
  form: { backgroundColor: '#fff', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  buttonContainer: { marginTop: 20 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 30 },
  modalContent: { backgroundColor: '#fff', padding: 30, borderRadius: 20, alignItems: 'center' },
  modalText: { fontSize: 18, fontWeight: '600', marginBottom: 20 }
});