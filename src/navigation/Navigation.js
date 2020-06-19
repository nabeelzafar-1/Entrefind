import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Images from '../constants/Images';
import Colors from '../constants/Colors';
import CustomBarItem from './CustomBarItem';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';
import SignupScreen from '../screens/SignupScreen';
import EntrepreneurHomeScreen from '../screens/EntrepreneurHomeScreen';
import InvestorHomeScreen from '../screens/InvestorHomeScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import AddProjectScreen from '../screens/AddProjectScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ChatScreen from '../screens/ChatScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import AddExperienceScreen from '../screens/AddExperienceScreen';
import AddEducationScreen from '../screens/AddEducationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

import ScreenSwiper from '../components/ScreenSwiper';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const ProjectsStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Projects"
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false,
    }}>
    <Stack.Screen name="Projects" component={ProjectsScreen} />
    <Stack.Screen name="AddProject" component={AddProjectScreen} />
  </Stack.Navigator>
);

const MessagesStackNavigator = ({navigation, route}) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen;
  if (routeName === 'Chat') {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <Stack.Navigator
      initialRouteName="Messages"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = ({navigation, route}) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen;
  if (
    routeName === 'ChangePassword' ||
    routeName === 'TermsOfUse' ||
    routeName === 'PrivacyPolicy'
  ) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="AddExperience" component={AddExperienceScreen} />
      <Stack.Screen name="AddEducation" component={AddEducationScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigatorEntrepreneur = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: Colors.primaryColor,
      inactiveTintColor: Colors.accentColor,
    }}
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? Images.Home : Images.HomeOutline;
        } else if (route.name === 'Projects') {
          iconName = focused ? Images.Projects : Images.ProjectsOutline;
        } else if (route.name === 'Messages') {
          iconName = focused ? Images.Mesaages : Images.MesaagesOutline;
        } else if (route.name === 'Notifications') {
          iconName = focused
            ? Images.Notification
            : Images.NotificationOutlline;
        } else if (route.name === 'Profile') {
          iconName = focused ? Images.Profile : Images.ProfileOutine;
        }

        if (focused) {
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen;
          if (
            routeName === 'Chat' ||
            routeName === 'ChangePassword' ||
            routeName === 'TermsOfUse' ||
            routeName === 'PrivacyPolicy'
          ) {
            return null;
          } else {
            return <CustomBarItem iconName={iconName} />;
          }
        } else {
          return (
            <Image
              style={{height: 24, width: 24}}
              resizeMode="contain"
              source={iconName}
            />
          );
        }
      },
    })}>
    <BottomTab.Screen name="Projects" component={ProjectsStackNavigator} />
    <BottomTab.Screen name="Messages" component={MessagesStackNavigator} />
    <BottomTab.Screen name="Home" component={EntrepreneurHomeScreen} />
    <BottomTab.Screen name="Notifications" component={NotificationsScreen} />
    <BottomTab.Screen name="Profile" component={ProfileStackNavigator} />
  </BottomTab.Navigator>
);

const BottomTabNavigatorInvestor = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: Colors.primaryColor,
      inactiveTintColor: Colors.accentColor,
    }}
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? Images.Home : Images.HomeOutline;
        } else if (route.name === 'Projects') {
          iconName = focused ? Images.Projects : Images.ProjectsOutline;
        } else if (route.name === 'Messages') {
          iconName = focused ? Images.Mesaages : Images.MesaagesOutline;
        } else if (route.name === 'Notifications') {
          iconName = focused
            ? Images.Notification
            : Images.NotificationOutlline;
        } else if (route.name === 'Profile') {
          iconName = focused ? Images.Profile : Images.ProfileOutine;
        }

        if (focused) {
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen;
          if (
            routeName === 'Chat' ||
            routeName === 'ChangePassword' ||
            routeName === 'TermsOfUse' ||
            routeName === 'PrivacyPolicy'
          ) {
            return null;
          } else {
            return <CustomBarItem iconName={iconName} />;
          }
        } else {
          return (
            <Image
              style={{height: 24, width: 24}}
              resizeMode="contain"
              source={iconName}
            />
          );
        }
      },
    })}>
    <BottomTab.Screen name="Projects" component={ProjectsStackNavigator} />
    <BottomTab.Screen name="Messages" component={MessagesStackNavigator} />
    <BottomTab.Screen name="Home" component={InvestorHomeScreen} />
    <BottomTab.Screen name="Notifications" component={NotificationsScreen} />
    <BottomTab.Screen name="Profile" component={ProfileStackNavigator} />
  </BottomTab.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen
          name="HomeNavigatorEntrepreneur"
          component={BottomTabNavigatorEntrepreneur}
        />
        <Stack.Screen
          name="HomeNavigatorInvestor"
          component={BottomTabNavigatorInvestor}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
        <Stack.Screen name="Swiper" component={ScreenSwiper} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
