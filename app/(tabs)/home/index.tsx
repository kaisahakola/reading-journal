import { StyleSheet } from 'react-native';
import BookList from '@/components/BookList';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/components/SearchBar';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <BookList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F6',
  },
  header: {
    fontFamily: 'Marcellus',
    fontSize: 32,
  },
});

export default Home;
