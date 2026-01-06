import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}} style={styles.bar}>
        <Feather name="search" size={24} color="black" />
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    width: '92%',
    margin: 'auto',

    // iOS shadow
    shadowColor: '#9999A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchBar;
