import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AuthForm from '@/components/AuthForm';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { AuthData, AuthMode } from '@/types/auth';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { setDoc } from '@firebase/firestore';
import { doc } from 'firebase/firestore';

const Index = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'signup' | ''>('');
  const [sheetIndex, setSheetIndex] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['65%', '90%'];

  const handleAuth = async (
    authMode: AuthMode,
    { email, password, firstName, lastName }: AuthData,
  ) => {
    if (authMode === 'login') {
      await signInWithEmailAndPassword(auth, email, password);
    } else if (authMode === 'signup') {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      await user.reload();

      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email: user.email,
        createdAt: new Date(),
      });
    }
    router.replace('/(tabs)/home');
  };

  const handleSelectForm = (authMode: AuthMode) => {
    setActiveForm(authMode);
    setSheetIndex(1);
    bottomSheetRef.current?.snapToIndex(1);
  };

  return (
    <GestureHandlerRootView style={styles.sheetContainer}>
      <View
        style={[
          styles.backgroundContainer,
          { opacity: sheetIndex === 1 ? 0 : 1 },
        ]}
      >
        <Text style={styles.header}>Welcome to the{'\n'}Book Journal!</Text>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        handleComponent={null}
        animateOnMount={true}
        style={styles.sheet}
      >
        <BottomSheetView style={styles.contentContainer}>
          {activeForm === '' ? (
            <View style={styles.buttonContainer}>
              <Text style={styles.text}>Keep up with your reading!</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSelectForm('login')}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Don&#39;t have an account yet?</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSelectForm('signup')}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          ) : activeForm === 'login' ? (
            <AuthForm
              onSubmit={handleAuth}
              submitLabel={'Login'}
              formLabel={'Login'}
              linkText={"Don't have an account yet?"}
              link={'Sign up'}
              onToggleForm={() => setActiveForm('signup')}
              activeForm={activeForm}
            />
          ) : (
            <AuthForm
              onSubmit={handleAuth}
              submitLabel={'Sign Up'}
              formLabel={'Sign up'}
              linkText={'Already have an account?'}
              link={'Login'}
              onToggleForm={() => setActiveForm('login')}
              activeForm={activeForm}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
    height: 50,
    backgroundColor: 'black',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    width: '90%',
    margin: 'auto',
    marginBottom: '30%',
  },
  text: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 24,
    fontFamily: 'Crafteds',
  },
  contentContainer: {
    padding: 30,
    paddingTop: '20%',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    minHeight: '100%',
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundContainer: {
    paddingTop: '30%',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  header: {
    fontFamily: 'Crafteds',
    fontSize: 32,
    textAlign: 'center',
  },
  sheet: {
    zIndex: 1,
  },
});

export default Index;
