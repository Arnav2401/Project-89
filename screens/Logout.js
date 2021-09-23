import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

export default class Logout extends React.Component {

    componentDidMount = () => {
        firebase.auth().signOut();
    }

    render() {
        return (
            <View style={styles.main}>
                <Text>
                    Logout
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});