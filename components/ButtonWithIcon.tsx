import { ButtonType } from '@/types/button';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';

interface ButtonWithIconProps {
  buttonType: ButtonType;
  featherIconName: React.ComponentProps<typeof Feather>['name'];
  onPress: () => void;
  size?: number;
}

const ButtonWithIcon = (props: ButtonWithIconProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Feather
        name={props.featherIconName}
        size={props.size ? props.size : 24}
        color={'#F4D58D'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001427',
    borderRadius: 50,
    padding: 10,
    alignSelf: 'flex-start',
  },
});

export default ButtonWithIcon;
