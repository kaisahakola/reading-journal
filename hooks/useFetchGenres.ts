import { useMemo } from 'react';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';
import { GENRE_COLORS } from '@/utils/colors';

export const useFetchGenres = () => {
  const { books } = useFetchAllBooks();

  const { genreStats } = useMemo(() => {
    const genreCount: Record<string, number> = {};
    books.forEach((book) => {
      if (book.genre) {
        const genreKey = book.genre.trim().toLowerCase();
        genreCount[genreKey] = (genreCount[genreKey] || 0) + 1;
      }
    });

    const stats = Object.entries(genreCount).map(([genre, count], index) => ({
      value: count,
      label: genre,
      color: GENRE_COLORS[genre] || GENRE_COLORS.default,
    }));

    return { genreStats: stats };
  }, [books]);

  return { genreStats };
};
