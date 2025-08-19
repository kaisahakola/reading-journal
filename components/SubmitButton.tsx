import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SubmitButtonProps {
  onPress: () => void;
  label: string;
}

const SubmitButton = ({ onPress, label }: SubmitButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
    height: 50,
    backgroundColor: 'black',
    width: '90%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SubmitButton;
