import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#001427',
        tabBarInactiveTintColor: '#DBEEEC',
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addNewBook"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
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
    backgroundColor: '#2A9D8F',
    borderTopWidth: 0,
    shadowOpacity: 0.1,
    position: 'absolute',
    height: 65,
    marginBottom: 25,
    marginHorizontal: 35,
    borderRadius: 50,
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
