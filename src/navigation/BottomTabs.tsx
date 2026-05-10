import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from "../screens/search/SearchScreen";
import TrashScreen from "../screens/trash/TrashScreen";
import LottoScreen from "../screens/lotto/RandomScreen"
import LibraryScreen from "../screens/library/LibraryScreen";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../utils/ColorsParser';

const Tab = createBottomTabNavigator();

export default function BottomTabs(){
    const { theme } = useTheme();
    const themeColors = Colors[theme];

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }
            ) => ({
                tabBarStyle: { backgroundColor: themeColors.secondColor }, // Theme the tab bar
                tabBarActiveTintColor: themeColors.accent,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: string;
                    switch (route.name) {
                        case 'Home': iconName = 'home'; break;
                        case 'Library': iconName = 'library'; break;
                        case 'Draw': iconName = 'dice'; break;
                        case 'Trash': iconName = 'trash'; break;
                        case 'Search': iconName = 'search'; break;
                        default: iconName = 'ellipse';
                    }
                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Library" component={LibraryScreen} />
            <Tab.Screen name="Draw" component={LottoScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Trash" component={TrashScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
    );
};

