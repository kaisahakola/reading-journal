import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';

interface ListItemProps {
  onPress: () => void;
  itemText: string;
  featherName: ComponentProps<typeof Feather>['name'];
  borderBottom: boolean;
}

const SettingsListItem = (props: ListItemProps) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          ...styles.listItem,
          borderBottomWidth: props.borderBottom ? 1 : 0,
        }}
        onPress={props.onPress}
      >
        <Text style={styles.listItemText}>{props.itemText}</Text>
        <Feather
          name={props.featherName}
          size={24}
          color={'black'}
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemText: {
    fontSize: 20,
  },
  listItem: {
    borderColor: 'darkgray',
    padding: 15,
    flexDirection: 'row',
  },
});

export default SettingsListItem;
