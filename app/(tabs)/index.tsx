import { StyleSheet, Image, Animated, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { auth } from '@/config/firebase';
import { useUserProfile } from '@/hooks/useUserProfile';
import HomeScreenSquareBtn from '@/components/HomeScreenSquareBtn';
import HomeScreenAddNewBtn from '@/components/HomeScreenAddNewBtn';
import { useRouter } from 'expo-router';

const SHEET_HEIGHT = 700;

const Home = () => {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const hasAnimated = useRef(false);
  const userId = auth.currentUser?.uid;
  const { firstName } = useUserProfile(userId);
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;
    if (hasAnimated.current) false;

    Animated.timing(translateY, {
      toValue: 0,
      duration: 1700,
      useNativeDriver: true,
    }).start(() => {
      hasAnimated.current = true;
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/BookJournalLogo3.png')}
      />

      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <Text style={styles.greeting}>Nice to see you, {firstName}</Text>
        <View style={styles.squareBtns}>
          <HomeScreenSquareBtn
            label="Go to your library"
            image={require('../../assets/images/library-btn.png')}
            color="#F56476"
            navigateTo={() => router.replace('/(tabs)/library')}
          />
          <HomeScreenSquareBtn
            label="See statistics"
            image={require('../../assets/images/stats-btn.png')}
            color="#9BA2FF"
            navigateTo={() => router.replace('/(tabs)/profile/statistics')}
          />
        </View>
        <HomeScreenAddNewBtn />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBEEEC',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    resizeMode: 'contain',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    height: SHEET_HEIGHT,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  greeting: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Marcellus',
    marginTop: 20,
  },
  squareBtns: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 30,
    marginHorizontal: 'auto',
  },
});

export default Home;
