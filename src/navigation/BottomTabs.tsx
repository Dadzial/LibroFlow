import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from "../screens/search/SearchScreen";
import TrashScreen from "../screens/trash/TrashScreen";
import LottoScreen from "../screens/lotto/RandomScreen"
import LibraryScreen from "../screens/library/LibraryScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs(){
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#6A28B0',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => {
                    let iconName: string;
                    switch (route.name) {
                        case 'Home': iconName = 'home'; break;
                        case 'Library': iconName = 'library'; break;
                        case 'Random': iconName = 'dice'; break;
                        case 'Trash': iconName = 'trash'; break;
                        case 'Search': iconName = 'search'; break;
                        default: iconName = 'ellipse';
                    }
                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Library" component={LibraryScreen} />
            <Tab.Screen name="Random" component={LottoScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Trash" component={TrashScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
    );
};

