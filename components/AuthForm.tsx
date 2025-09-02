import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { AuthData, AuthMode } from '@/types/auth';
import SubmitButton from '@/components/SubmitButton';

interface AuthFormProps {
  onSubmit: (activeForm: AuthMode, authData: AuthData) => void;
  submitLabel: string;
  formLabel: string;
  linkText: string;
  link: string;
  onToggleForm: () => void;
  activeForm: 'login' | 'signup';
}

const AuthForm = ({
  onSubmit,
  submitLabel,
  formLabel,
  linkText,
  link,
  onToggleForm,
  activeForm,
}: AuthFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleSubmit = () => {
    try {
      onSubmit(activeForm, { email, password, firstName, lastName });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.title}>{formLabel}</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {activeForm === 'signup' ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder={'First name'}
                placeholderTextColor="#333"
                onChangeText={setFirstName}
                value={firstName}
                autoCapitalize={'words'}
              />
              <TextInput
                style={styles.input}
                placeholder={'Last name'}
                placeholderTextColor="#333"
                onChangeText={setLastName}
                value={lastName}
                autoCapitalize={'words'}
              />
            </View>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#333"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#333"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <SubmitButton onPress={handleSubmit} label={submitLabel} />
          <View>
            <Text style={styles.linkText}>{linkText}</Text>
            <TouchableOpacity onPress={onToggleForm}>
              <Text style={styles.link}>{link}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    width: '100%',
    paddingTop: '30%',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: 'Crafteds',
  },
  input: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 20,
    height: 50,
    backgroundColor: 'white',
  },
  error: { color: 'red', marginBottom: 10 },
  link: { color: 'blue', textAlign: 'center' },
  linkText: { marginTop: 50, marginBottom: 10, textAlign: 'center' },
});

export default AuthForm;
