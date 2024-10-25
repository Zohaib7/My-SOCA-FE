import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HOF, HomeIconBot, MalePng, RewardIcon} from '../assets/logo';

import Performance from '@Container/AppContainer/AllPerformance/Performance';
import HallOfFame from '@Container/AppContainer/HallOfFame';
import HomeScreen from '@Container/AppContainer/Home/HomeScreen';
import ProfileSetting from '@Container/AppContainer/ProfileSetting/ProfileSetting';
import {Colors} from '@Theme/Colors';
import NavigationRoutes from './NavigationRoutes';
const Tab = createBottomTabNavigator();

const RenderTabBarIcon = ({source, color, focused}) => {
  return (
    <>
      {focused && (
        <View
          style={[
            {
              paddingHorizontal: 44,
              paddingVertical: 30,
              alignSelf: 'center',
              position: 'absolute',
              backgroundColor: '#040C17',
              top: 6,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#00B2FF',
            },
          ]}
        />
      )}

      <Image
        source={source}
        style={{
          // width: '100%',
          resizeMode: 'contain',
          flex: 1,
          tintColor: color,
          marginTop: 7,
          width: 20,
          // height: 20,
        }}
      />
    </>
  );
};

const tabRoutes = [
  {
    name: NavigationRoutes.APP_STACK.HOME,
    component: HomeScreen,
    options: {
      tabBarIcon: ({color, focused}) => (
        <RenderTabBarIcon
          source={HomeIconBot}
          color={color}
          focused={focused}
        />
      ),
      title: 'Home',
    },
  },
  {
    name: NavigationRoutes.APP_STACK.HALL_OF_FAME,
    component: HallOfFame,
    options: {
      tabBarIcon: ({color, focused}) => (
        <RenderTabBarIcon source={HOF} color={color} focused={focused} />
      ),
      title: 'Hall Of Fame',
    },
  },

  {
    name: NavigationRoutes.APP_STACK.ALL_PERFORMANCE,
    component: Performance,
    options: {
      tabBarIcon: ({color, focused}) => (
        <RenderTabBarIcon source={RewardIcon} color={color} focused={focused} />
      ),
      title: 'Performance',
    },
  },
  {
    name: NavigationRoutes.APP_STACK.PROFILE_SETTING,
    component: ProfileSetting,
    options: {
      tabBarIcon: ({color, focused}) => (
        <RenderTabBarIcon source={MalePng} color={color} focused={focused} />
      ),
      title: 'Profile',
    },
  },
];

const BottomTabs = props => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A182C',
          alignSelf: 'center',
          shadowColor: Colors.BLACK,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 8,
          width: '100%',

          height: 90 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Medium',
          fontSize: 10,
          marginBottom: 30,
        },
        tabBarItemStyle: {},
        tabBarActiveTintColor: Colors.WHITE,
        tabBarInactiveTintColor: '#ADB0C2',
      }}
      sceneContainerStyle={{
        backgroundColor: '#F7F7F7',
      }}
      initialRouteName={NavigationRoutes.APP_STACK.HOME}>
      {tabRoutes.map(({name, component, options}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={options}
          initialParams={{item: props?.route?.params?.item}}
        />
      ))}
    </Tab.Navigator>
  );
};
export default BottomTabs;
