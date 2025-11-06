import { useMemo } from 'react';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';
import { GENRE_COLORS } from '@/utils/colors';

export const useFetchGenres = () => {
  const { books } = useFetchAllBooks();

  const { genreStats, numAllGenres } = useMemo(() => {
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

    const totalGenres = stats.length;

    return { genreStats: stats, numAllGenres: totalGenres };
  }, [books]);

  return { genreStats, numAllGenres };
};
