import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '@/config/firebase';
import { useUserProfile } from '@/hooks/useUserProfile';
import { TriggerAlert } from '@/utils/alert';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from 'firebase/auth';
import { setDoc } from '@firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import SubmitButton from '@/components/SubmitButton';
import Toast from 'react-native-toast-message';

const PersonalInfo = () => {
  const router = useRouter();
  const userId = auth.currentUser?.uid;
  const user = auth.currentUser;
  const { firstName, lastName, email, profilePicture, isDefaultPicture } =
    useUserProfile(userId);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    setFirstNameInput(firstName ? firstName : '');
    setLastNameInput(lastName ? lastName : '');
    setEmailInput(email ? email : '');
  }, [email, firstName, lastName]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Your changes were saved successfully!',
    });
  };

  const handleAddProfilePicture = () => {
    TriggerAlert(
      'Add new profile picture',
      '',
      'Error adding picture: ',
      'Search from gallery',
      addPicture,
      !isDefaultPicture,
      'Delete current picture',
      removeImageAlert,
    );
  };

  const addPicture = async () => {
    if (!user) {
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!image.canceled) {
      const uri = image.assets[0].uri;

      await updateProfile(user, { photoURL: uri });
      await user.reload();

      await setDoc(
        doc(db, 'users', user.uid),
        { profilePicture: uri },
        { merge: true },
      );
    }
  };

  const removeImageAlert = async () => {
    TriggerAlert(
      'Delete profile picture?',
      '',
      'Error deleting picture',
      'Delete',
      deleteImage,
      false,
    );
  };

  const deleteImage = async () => {
    if (!user) {
      return;
    }
    try {
      await updateProfile(user, { photoURL: null });
      await user.reload();

      await setDoc(
        doc(db, 'users', user.uid),
        { profilePicture: null },
        { merge: true },
      );
    } catch (err) {
      console.error('Error removing image: ', err);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      return;
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
      });
      Keyboard.dismiss();
      showToast();
    } catch (err) {
      console.error('Error updating name or email: ', err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ButtonWithIcon
          buttonType={'goBack'}
          featherIconName={'arrow-left'}
          onPress={() => router.back()}
        />

        <View style={styles.content}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleAddProfilePicture}
          >
            <Image source={profilePicture} style={styles.profileImage} />
            <ButtonWithIcon
              buttonType={'edit'}
              featherIconName={'edit-2'}
              size={15}
              onPress={handleAddProfilePicture}
            />
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>First name:</Text>
            <TextInput
              placeholder={'First name'}
              placeholderTextColor="#333"
              value={firstNameInput}
              onChangeText={setFirstNameInput}
              style={styles.input}
            />

            <Text style={styles.inputText}>Last name:</Text>
            <TextInput
              placeholder={'Last name'}
              placeholderTextColor="#333"
              value={lastNameInput}
              onChangeText={setLastNameInput}
              style={styles.input}
            />

            <Text style={styles.inputText}>Email:</Text>
            <TextInput
              placeholder={'Email address'}
              placeholderTextColor="#333"
              value={emailInput}
              onChangeText={setEmailInput}
              style={styles.input}
            />
          </View>

          <SubmitButton onPress={handleSubmit} label="Save changes" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  content: {
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  imageContainer: {
    flexDirection: 'row',
    margin: 'auto',
  },
  input: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 20,
    height: 50,
    backgroundColor: 'lightgray',
    textAlignVertical: 'top',
    width: '100%',
  },
  inputContainer: {
    padding: 10,
  },
  inputText: {
    padding: 5,
  },
});

export default PersonalInfo;
