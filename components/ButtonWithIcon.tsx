import { ButtonType } from '@/types/button';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';

interface ButtonWithIconProps {
  buttonType: ButtonType;
  featherIconName: React.ComponentProps<typeof Feather>['name'];
  onPress: () => void;
}

const ButtonWithIcon = (props: ButtonWithIconProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Feather name={props.featherIconName} size={24} color={'black'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
    alignSelf: 'flex-start',
  },
});

export default ButtonWithIcon;
