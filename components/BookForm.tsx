import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Book, Genres, GenresList } from '@/types/book';
import SubmitButton from './SubmitButton';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating-widget';

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
  const [rating, setRating] = useState<number>(0);
  const [note, setNote] = useState<string>('');
  const [genre, setGenre] = useState<Genres>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setAuthor(initialValues.author);
      setRating(initialValues.rating);
      setNote(initialValues.note);
      setGenre(initialValues.genre);
      setThumbnail(initialValues.thumbnail ? initialValues.thumbnail : null);
    }
  }, [initialValues]);

  const handleOnSubmit = () => {
    onSubmit({ title, author, rating: Number(rating), note, genre, thumbnail });
    if (!initialValues) {
      setTitle('');
      setAuthor('');
      setRating(0);
      setNote('');
      setGenre(null);
      setThumbnail(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Text style={styles.titleText}>{formLabel}</Text>
        <KeyboardAwareScrollView
          style={styles.keyboardAwareScrollView}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 75 }}
          enableOnAndroid={true}
          scrollEnabled={true}
        >
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
          <View style={styles.ratingInput}>
            <Text style={styles.ratingText}>Give the book a rating:</Text>
            <StarRating
              rating={rating}
              onChange={setRating}
              enableHalfStar={false}
            />
          </View>

          {initialValues?.thumbnail && (
            <Image
              style={styles.thumbnail}
              source={{ uri: initialValues?.thumbnail }}
            />
          )}
          <SubmitButton onPress={handleOnSubmit} label={submitLabel} />
        </KeyboardAwareScrollView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 75,
  },
  keyboardAwareScrollView: {
    flex: 1,
    paddingTop: '5%',
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
    fontFamily: 'Crafteds',
  },
  ratingInput: {
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  ratingText: {
    fontSize: 14,
    padding: 10,
    alignSelf: 'center',
  },
  thumbnail: {
    width: '50%',
    aspectRatio: 2 / 3,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default BookForm;
