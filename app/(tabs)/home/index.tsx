import { Text, StyleSheet } from 'react-native';
import BookList from '@/components/BookList';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Books in your Journal</Text>
      <BookList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F4F4F6',
  },
  header: {
    fontFamily: 'Crafteds',
    fontSize: 32,
  },
});

export default Home;
