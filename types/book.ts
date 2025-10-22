export interface Book {
  title: string;
  author: string;
  note: string;
  rating: number;
  genre: Genres;
  thumbnail: string | null;
}

export type BookWithId = Book & { id: string };

export type BookWithIdAndDate = Book & {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Genres =
  | null
  | 'fiction'
  | 'non-fiction'
  | 'fantasy'
  | 'science-fiction'
  | 'thriller'
  | 'romance'
  | 'historical fiction'
  | 'horror'
  | 'biography'
  | 'self-help'
  | 'poetry'
  | 'young adult'
  | `children's book`
  | 'classics'
  | 'other';

export const GenresList: { label: string; value: Genres }[] = [
  { label: 'Fiction', value: 'fiction' },
  { label: 'Non-fiction', value: 'non-fiction' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Science Fiction', value: 'science-fiction' },
  { label: 'Thriller', value: 'thriller' },
  { label: 'Romance', value: 'romance' },
  { label: 'Historical Fiction', value: 'historical fiction' },
  { label: 'Horror', value: 'horror' },
  { label: 'Biography', value: 'biography' },
  { label: 'Self-help', value: 'self-help' },
  { label: 'Poetry', value: 'poetry' },
  { label: 'Young Adult', value: 'young adult' },
  { label: "Children's Book", value: `children's book` },
  { label: 'Classics', value: 'classics' },
  { label: 'Other', value: 'other' },
];
