import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useRouter } from 'expo-router';

const HomeScreenAddNewBtn = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.replace('/(tabs)/addNewBook');
      }}
    >
      <Feather name={'plus'} size={25} color={'white'} />
      <Text style={styles.text}>Add a Book</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#023047',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 5,
    padding: 15,
    marginHorizontal: 'auto',
    justifyContent: 'center',
    width: 340, // = square buttons widths + gap
    marginTop: 20, // = square buttons gap

    // iOS shadow
    shadowColor: '#9999A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.75,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AndadaPro',
  },
});

export default HomeScreenAddNewBtn;
