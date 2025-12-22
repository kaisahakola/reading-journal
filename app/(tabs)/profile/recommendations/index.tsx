import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { askAi } from '@/utils/ai';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';
import { BookTitle } from '@/types/book';
import Markdown from 'react-native-markdown-display';

const BookRecommendations = () => {
  const router = useRouter();
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [hideText, setHideText] = useState<boolean>(true);
  const { titles } = useFetchAllBooks();

  const parseTitles = (titles: BookTitle[]): string => {
    let stringOfTitles = '';

    for (let i = 0; i < titles.length; i++) {
      stringOfTitles += titles[i].title + ', ';
    }

    return stringOfTitles;
  };

  const getRecommendations = async () => {
    setLoading(true);

    const reply = await askAi({
      promptMessage: `Recommend me five new books based on these
      books that I have read: ${parseTitles(titles)}. 
      And give me short answers please. `,
    });

    setResult(reply);
    setLoading(false);
    setHideText(false);
  };

  const clearText = () => {
    setResult('');
    setHideText(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonWithIcon
        buttonType={'goBack'}
        featherIconName={'arrow-left'}
        onPress={() => router.back()}
      />
      <Text style={styles.title}>Recommendations</Text>
      <ScrollView style={styles.scrollContainer}>
        <Text>
          Ask AI to generate book recommendations based on the books you have
          added to your journal!
        </Text>
        {hideText ? (
          <TouchableOpacity style={styles.button} onPress={getRecommendations}>
            <Text style={styles.btnText}>Generate</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={clearText}>
            <Text style={styles.btnText}>Clear</Text>
          </TouchableOpacity>
        )}
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.result}>
            <Markdown>{result}</Markdown>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'Crafteds',
    fontSize: 32,
    marginHorizontal: 'auto',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#001427',
    width: '30%',
    padding: 10,
    borderRadius: 15,
    marginTop: 15,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#F4D58D',
  },
  scrollContainer: {
    marginBottom: 75,
  },
  result: {
    paddingBottom: 20,
  },
});

export default BookRecommendations;
