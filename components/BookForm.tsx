import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Book, Genres, GenresList } from '@/types/book';
import SubmitButton from './SubmitButton';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BookFormProps {
  onSubmit: (bookData: Book) => void;
  submitLabel: string;
  initialValues?: Book;
  formLabel: string;
}

const BookForm = ({
  onSubmit,
  submitLabel,
  initialValues,
  formLabel,
}: BookFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [genre, setGenre] = useState<Genres>(null);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setAuthor(initialValues.author);
      setRating(initialValues.rating.toString());
      setNote(initialValues.note);
      setGenre(initialValues.genre);
    }
  }, [initialValues]);

  const handleOnSubmit = () => {
    setTitle('');
    setAuthor('');
    setRating('');
    setNote('');
    setGenre(null);
    onSubmit({ title, author, rating: Number(rating), note, genre });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.keyboardAwareScrollView}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
          <Text style={styles.titleText}>{formLabel}</Text>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#333"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Author"
            placeholderTextColor="#333"
            value={author}
            onChangeText={setAuthor}
            style={styles.input}
          />
          <TextInput
            placeholder="Rating"
            placeholderTextColor="#333"
            keyboardType="numeric"
            value={rating}
            onChangeText={setRating}
            style={styles.input}
          />
          <Dropdown
            style={styles.input}
            data={GenresList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Genre"
            searchPlaceholder="Search..."
            value={genre}
            onChange={(item) => {
              setGenre(item.value);
            }}
          />
          <TextInput
            placeholder="Note"
            placeholderTextColor="#333"
            multiline={true}
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
            style={{ ...styles.input, minHeight: 100 }}
          />
          <SubmitButton onPress={handleOnSubmit} label={submitLabel} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    margin: 'auto',
  },
  keyboardAwareScrollView: {
    flex: 1,
    paddingTop: '15%',
  },
  input: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    height: 50,
    backgroundColor: 'lightgray',
    textAlignVertical: 'top',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Crafteds',
  },
});

export default BookForm;
