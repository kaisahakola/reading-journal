import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#001427',
        tabBarInactiveTintColor: '#9999A1',
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addNewBook"
        options={{
          title: 'Add New',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#E6E6E9',
    borderTopWidth: 0,
    shadowOpacity: 0.1,
    position: 'absolute',
    height: 95,
  },
  tabBarIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TabLayout;
