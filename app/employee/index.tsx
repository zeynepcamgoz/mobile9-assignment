import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Modal } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "expo-router";

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  position: '',
  startDate: '',
  notes: '',
};

const employeeSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required').min(3, 'Full name must be at least 3 characters'),
  email: Yup.string().required('Email is required').email('Must be a valid email'),
  phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be at most 15 digits'),
  position: Yup.string().required('Position is required'),
  startDate: Yup.string().required('Start date is required'),
  notes: Yup.string().max(200, 'Notes must be at most 200 characters'),
});

const EmployeeFormScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Employee Information Form</Text>

      <View style={styles.backButton}>
        <Button title="Back" onPress={() => router.back()} />
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={employeeSchema}
        onSubmit={(values, { resetForm }) => {
          setModalVisible(true);
          resetForm();
        }}
        validateOnMount
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
        }) => (
          <View style={styles.form}>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              placeholder="Enter full name"
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
            {touched.phone && errors.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
            )}

            <Text style={styles.label}>Position</Text>
            <TextInput
              style={styles.input}
              value={values.position}
              onChangeText={handleChange('position')}
              onBlur={handleBlur('position')}
              placeholder="Enter position"
            />
            {touched.position && errors.position && (
              <Text style={styles.error}>{errors.position}</Text>
            )}

            <Text style={styles.label}>Start Date</Text>
            <TextInput
              style={styles.input}
              value={values.startDate}
              onChangeText={handleChange('startDate')}
              onBlur={handleBlur('startDate')}
              placeholder="YYYY-MM-DD"
            />
            {touched.startDate && errors.startDate && (
              <Text style={styles.error}>{errors.startDate}</Text>
            )}

            <Text style={styles.label}>Notes (optional)</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              value={values.notes}
              onChangeText={handleChange('notes')}
              onBlur={handleBlur('notes')}
              placeholder="Additional notes"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {touched.notes && errors.notes && (
              <Text style={styles.error}>{errors.notes}</Text>
            )}

            <View style={styles.submitButton}>
              <Button
                title={isSubmitting ? 'Submitting...' : 'Submit'}
                onPress={() => handleSubmit()}
                disabled={!isValid || isSubmitting}
              />
            </View>

          </View>
        )}
      </Formik>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Employee information submitted successfully!</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

export default EmployeeFormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  multiline: {
    height: 120,
  },
  error: {
    color: 'red',
    fontSize: 13,
  },
  submitButton: {
    marginTop: 32,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
});