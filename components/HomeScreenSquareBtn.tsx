import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Props {
  label: string;
  image: any;
  color: string;
  navigateTo: () => void;
}

const HomeScreenSquareBtn = ({ label, image, color, navigateTo }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={navigateTo}
    >
      <Image style={{ width: 100, height: 100 }} source={image} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    maxWidth: 160,
    height: 160,

    // iOS shadow
    shadowColor: '#9999A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.75,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  label: {
    color: 'white',
    fontFamily: 'AndadaPro',
    fontSize: 16,
  },
});

export default HomeScreenSquareBtn;
