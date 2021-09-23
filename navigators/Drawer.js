import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import StackNavigator from '../navigators/Stack'
import Logout from '../screens/Logout';
const Drawer = createDrawerNavigator()
import CustomDrawer from '../screens/CustomDrawer';
import firebase from 'firebase';

export default class DrawerNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            light_theme: true
        };
    }

    getTheme = () => {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                theme = snapshot.val().current_theme;
            });
        this.setState({ light_theme: theme === "light" ? true : false });
    }


    componentDidMount = () => {
        this.getTheme();
    }

    render() {
        let props = this.props;
        return (
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: "#e91e63",
                    itemStyle: { marginVertical: 5 },
                    inactiveTintColor: this.state.light_theme ? "black" : "white"
                }}
                drawerContent={props => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name='Home' component={StackNavigator} options={{ unmountOnBlur: true }} />
                <Drawer.Screen name='Profile' component={Profile} options={{ unmountOnBlur: true }} />
                <Drawer.Screen name='Logout' component={Logout} options={{ unmountOnBlur: true }} />
            </Drawer.Navigator>
        )
    }
}