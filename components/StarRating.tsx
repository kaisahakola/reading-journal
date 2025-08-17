import { View, StyleSheet, Image } from 'react-native';

interface StarRatingProps {
  rating: number;
  size: 'big' | 'small';
}

const StarRating = ({ rating, size }: StarRatingProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < rating;
        return (
          <Image
            key={index}
            source={
              isFilled
                ? require('@/assets/images/yellow_star_icon.png')
                : require('@/assets/images/gray_star_icon.png')
            }
            style={{
              width: size === 'big' ? 32 : size === 'small' ? 24 : 0,
              height: size === 'big' ? 32 : size === 'small' ? 24 : 0,
              margin: size === 'big' ? 4 : size === 'small' ? 2 : 0,
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default StarRating;
