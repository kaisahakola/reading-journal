import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import { useRouter } from 'expo-router';
import { PieChart } from 'react-native-gifted-charts';
import { useFetchGenres } from '@/hooks/useFetchGenres';
import { getPercent } from '@/utils/getPercent';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';

const Statistics = () => {
  const router = useRouter();
  const { genreStats } = useFetchGenres();
  const { books } = useFetchAllBooks();

  return (
    <SafeAreaView style={styles.container}>
      <ButtonWithIcon
        buttonType={'goBack'}
        featherIconName={'arrow-left'}
        onPress={() => router.back()}
      />
      <Text style={styles.title}>Statistics</Text>

      <View style={styles.genreStatWrapper}>
        <Text style={styles.chartTitle}>All genres</Text>
        <View style={styles.genreChart}>
          {!genreStats?.length ? (
            <ActivityIndicator size="large" color="#999" />
          ) : (
            <PieChart donut data={genreStats} showText />
          )}
        </View>

        <View style={styles.legendContainer}>
          {genreStats.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendLabel}>
                {item.label}: {getPercent(item.value, books.length)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'Marcellus',
    fontSize: 32,
    marginHorizontal: 'auto',
    marginBottom: 20,
  },
  genreStatWrapper: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '95%',
    marginHorizontal: 'auto',

    // iOS shadow
    shadowColor: '#66666E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  chartTitle: {
    fontSize: 20,
    fontFamily: 'AndadaPro',
  },
  genreChart: {
    margin: 'auto',

    // iOS shadow
    shadowColor: '#66666E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  legendContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 16,
    fontFamily: 'AndadaPro',
  },
});

export default Statistics;
