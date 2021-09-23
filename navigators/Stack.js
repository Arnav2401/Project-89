import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../navigators/Tab'
import PostScreen from '../screens/PostScreen';
const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false

            }}
        >
            <Stack.Screen name='Home' component={TabNavigator} />
            <Stack.Screen name='PostScreen' component={PostScreen} />
        </Stack.Navigator>
    )
}


export default StackNavigator