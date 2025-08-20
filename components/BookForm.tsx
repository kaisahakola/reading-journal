import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Book } from '@/types/book';
import SubmitButton from './SubmitButton';

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

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setAuthor(initialValues.author);
      setRating(initialValues.rating.toString());
      setNote(initialValues.note);
    }
  }, [initialValues]);

  const handleOnSubmit = () => {
    setTitle('');
    setAuthor('');
    setRating('');
    setNote('');
    onSubmit({ title, author, rating: Number(rating), note });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: '35%',
  },
  input: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 20,
    height: 50,
    backgroundColor: 'white',
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
