import { View, StyleSheet, Image } from 'react-native';

interface StarRatingProps {
    rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {

    return (
        <View style={styles.container}>
            {Array.from({ length: 5 }).map((_, index) => {
                const isFilled = index < rating;
                return (
                    <Image
                        key={index}
                        source={isFilled
                            ? require('@/assets/images/yellow_star_icon.png')
                            : require('@/assets/images/gray_star_icon.png')
                    }
                        style={styles.star}
                    />
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    star: {
        width: 24,
        height: 24,
        marginRight: 4,
    },
});

export default StarRating;
