import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import React from 'react';

const SettingsList = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          router.push('/(tabs)/profile/personalInfo');
        }}
      >
        <Text style={styles.listItemText}>Personal info</Text>
        <Feather
          name="chevron-right"
          size={24}
          color={'black'}
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          router.push('/(tabs)/profile/statistics');
        }}
      >
        <Text style={styles.listItemText}>Statistics</Text>
        <Feather
          name="chevron-right"
          size={24}
          color={'black'}
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listItem, { borderBottomWidth: 0 }]}
        onPress={() => {
          router.push('/(tabs)/profile/recommendations');
        }}
      >
        <Text style={styles.listItemText}>Book recommendations</Text>
        <Feather
          name="chevron-right"
          size={24}
          color={'black'}
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>
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
    width: '100%',
  },
  listItemText: {
    fontSize: 20,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: 'darkgray',
    padding: 15,
    flexDirection: 'row',
  },
});

export default SettingsList;
