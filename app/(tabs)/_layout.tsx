import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const TabLayout = () => {
    return (
      <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen name='home' options={{
                title: 'Home',
                tabBarIcon: ({color, size}) => (
                    <FontAwesome name="book" size={size} color={color} />
                )
              }}
          />
          <Tabs.Screen name='addNewBook' options={{
                title: 'Add New',
                tabBarIcon: ({color, size}) => (
                  <FontAwesome name="plus" size={size} color={color} />
                )
              }}
          />
      </Tabs>
    );
}

export default TabLayout;
