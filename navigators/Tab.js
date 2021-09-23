import React from 'react'
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from '../screens/Feed'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CreaterSpace from '../screens/Create';
const Tab = createMaterialBottomTabNavigator()
import firebase from 'firebase'

export default class MaterialTab extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            light_theme: true,
            is_updated: false
        }
    }


    fetchUser = async () => {
        let theme;
        await firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on('value', (data) => {
            theme = data.val().current_theme
        })
        this.setState({
            light_theme: theme === 'light' ? true : false,
        })
    }

    componentDidMount = () => {
        this.fetchUser();
    }

    changeUpdate = () => {
        this.setState({ is_updated: true })
    }

    removeUpdated = () => {
        this.setState({ is_updated: false })
    }

    renderFeed = (props) => {
        return (
            <Feed setUpdatetofalse={this.removeUpdated} {...props} />
        )
    }

    renderStory = (props) => {
        return (
            <CreaterSpace setUpdatetotrue={this.changeUpdate} {...props} />
        )
    }

    render() {
        return (
            <Tab.Navigator
                barStyle={styles.barstyle}
                activeColor="black"
                inactiveColor="white"
                initialRouteName='Feed'
                shifting={true}
            >

                <Tab.Screen name='Feed' component={this.renderFeed} options={{
                    tabBarLabel: 'Feed',
                    tabBarColor: this.state.light_theme ? '#B7B7B7' : '#2F7DA1',
                    tabBarIcon: ({ focused, size, color }) => {
                        return (
                            <AntDesign name="picture" size={26} color={focused ? "white" : 'black'} />

                        )
                    },
                    unmountOnBlur: true
                }}
                />
                <Tab.Screen name='CreaterSpace' component={this.renderStory} options={{
                    tabBarLabel: 'Creater Space',
                    tabBarColor: this.state.light_theme ? '#B7B7B7' : '#3B8887',
                    tabBarIcon: ({ focused, size, color }) => {
                        return (
                            <Ionicons name={focused ? "ios-add-circle" : 'ios-add-circle-outline'} size={26} color={focused ? "white" : 'black'} />
                        )
                    },
                    unmountOnBlur: true
                }} />
            </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    barstyle: {
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        overflow: 'hidden',
        position: 'absolute',
        fontWeight: 'bold'
    }
})



//hidden name and color