import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GoogleBook } from '@/types/bookApi';

interface ApiResultListProps {
  books: GoogleBook[];
  handleSelectBook: (id: string) => void;
}

const ApiResultList = ({ books, handleSelectBook }: ApiResultListProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const info = item.volumeInfo;
            return (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelectBook(item.id)}
              >
                {info.imageLinks && (
                  <Image
                    style={styles.thumbnail}
                    source={{ uri: info.imageLinks.thumbnail }}
                  />
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{info.title}</Text>
                  <Text style={styles.author}>{info.authors?.join(', ')}</Text>
                  <Text style={styles.publishedYear}>
                    {info.publishedDate?.slice(0, 4)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {
    marginTop: 15,
    marginBottom: 70,
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',

    // iOS shadow
    shadowColor: '#9999A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  thumbnail: {
    width: '30%',
    aspectRatio: 2 / 3,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Crafteds',
    fontSize: 20,
    flexShrink: 1,
  },
  author: {
    fontSize: 18,
    fontFamily: 'AndadaPro',
  },
  publishedYear: {
    fontSize: 16,
    fontFamily: 'AndadaPro',
  },
  textContainer: {
    padding: 10,
    flex: 1,
  },
});

export default ApiResultList;
