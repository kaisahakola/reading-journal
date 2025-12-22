import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import SettingsListItem from './SettingsListItem';
import { TriggerAlert } from '@/utils/alert';
import { getAuth, signOut } from 'firebase/auth';

const SettingsList = () => {
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = async () => {
    TriggerAlert(
      'Logging out',
      'Are you sure you want to log out?',
      'Logout error: ',
      'Log out',
      logOut,
      false,
    );
  };

  const logOut = async () => {
    await signOut(auth);
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <SettingsListItem
        onPress={() => router.push('/(tabs)/profile/personalInfo')}
        itemText={'Personal info'}
        featherName={'chevron-right'}
        borderBottom={true}
      />
      <SettingsListItem
        onPress={() => router.push('/(tabs)/profile/statistics')}
        itemText={'Statistics'}
        featherName={'chevron-right'}
        borderBottom={true}
      />
      <SettingsListItem
        onPress={() => router.push('/(tabs)/profile/recommendations')}
        itemText={'Book recommendations'}
        featherName={'chevron-right'}
        borderBottom={true}
      />
      <SettingsListItem
        onPress={handleLogout}
        itemText={'Logout'}
        featherName={'log-out'}
        borderBottom={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'darkgray',
    marginTop: 15,
    width: '90%',
  },
});

export default SettingsList;
