import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GoogleBook } from '@/types/bookApi';

interface ApiResultListProps {
  bookListVisible: boolean;
  books: GoogleBook[];
  activateLoadingAnimation: boolean;
  handleSelectBook: (id: string) => void;
}

const ApiResultList = ({
  bookListVisible,
  books,
  activateLoadingAnimation,
  handleSelectBook,
}: ApiResultListProps) => {
  return (
    <View style={styles.container}>
      {bookListVisible && (
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
                    <Text style={styles.author}>
                      {info.authors?.join(', ')}
                    </Text>
                    <Text style={styles.publishedYear}>
                      {info.publishedDate?.slice(0, 4)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      {activateLoadingAnimation && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {
    marginTop: 65,
    marginBottom: 70,
  },
  listItem: {
    backgroundColor: 'lightgray',
    marginBottom: 5,
    padding: 15,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  thumbnail: {
    width: '30%',
    aspectRatio: 2 / 3,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  activityIndicator: {
    marginTop: 100,
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
