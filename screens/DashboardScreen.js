import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from '../navigators/Drawer';

export default function DashboardScreen() {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
}