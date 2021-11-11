import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './UI/Screens/LoginScreen/Login';
import { StatusBar } from 'react-native';
import Register from './UI/Screens/RegisterScreen/Register';
import Home from './UI/Screens/HomeScreen/Home';
import Research from './UI/Screens/ResearchScreen/Research';

import { HomeIcon, DocumentSearchIcon, UserGroupIcon } from "react-native-heroicons/solid";
import Community from './UI/Screens/CommunityScreen/Community';
import Stock from './UI/Screens/StockScreen/Stock';
import StockDetails from './UI/Screens/StockDetailsScreen/StockDetails';
import CommunityDetails from './UI/Screens/CommunityDetailsScreen/CommunityDetails';
import CreateCommunity from './UI/Screens/CreateCommunity/CreateCommunity';
import Category from './UI/Screens/Category/Category';
import PostScreen from './UI/Screens/PostScreen/PostScreen';

// import './fire';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  const tabNavigator = () => {
    return(
      <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#363943",
          paddingBottom: 6,
          paddingTop: 2
        },
        tabBarActiveTintColor: '#63D879',
        tabBarInactiveTintColor: "#fff"
      }}>
        <Tab.Screen name="HomeScreen" component={Home} options={{
          tabBarLabel: "Home",
          tabBarIcon:({ focused }) => (
            <HomeIcon color={ focused ? "#63D879" : "#fff"} size={22} />
          )
        }} />
        <Tab.Screen name="Community" component={Community} options={{
          tabBarLabel: "Community",
          tabBarIcon:({ focused }) => (
            <UserGroupIcon color={ focused ? "#63D879" : "#fff"} size={22} />
          )
        }} />
        <Tab.Screen name="Research" component={Research} options={{
          tabBarLabel: "Research",
          tabBarIcon:({ focused }) => (
            <DocumentSearchIcon color={ focused ? "#63D879" : "#fff"} size={22} />
          )
        }} />
        
      </Tab.Navigator>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1F2128" }}>
      <NavigationContainer theme={{ colors: { background: "#1F2128" } }} >
        <StatusBar hidden />
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, animation:"flip" }}  >
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" children={() => tabNavigator()}/>
          <Stack.Screen name="Stock" component={ Stock } />
          <Stack.Screen name="StockDetails" component={StockDetails} />
          <Stack.Screen name="CommunityDetails" component={CommunityDetails} />
          <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Post" component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    
  )
}

export default App;
