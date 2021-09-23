import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Switch
} from "react-native";
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEnabled: true,
            light_theme: false,
            name: '',
            pic: ''
        }
    }

    fetchUser = async () => {
        let name, picture, theme;
        await
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on('value', (data) => {
                theme = data.val().current_theme
                name = data.val().first_name + ' ' + data.val().last_name
                picture = data.val().profile_picture
            })
        this.setState({
            name: name,
            pic: picture,
            light_theme: theme === 'light' ? true : false,
            isEnabled: theme === 'light' ? false : true,
        })
    }

    componentDidMount = () => {
        this.fetchUser();
    }


    toggleSwitch = () => {
        const previous_theme = this.state.isEnabled
        const theme = this.state.isEnabled ? 'light' : 'dark'
        var updates = {}
        updates['/users/' + firebase.auth().currentUser.uid + '/current_theme'] = theme
        firebase.database().ref().update(updates)
        this.setState({
            isEnabled: !previous_theme,
            light_theme: previous_theme
        })
    }

    render() {
        return (
            <View style={this.state.light_theme ? styles.main : styles.mainLight}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={this.state.light_theme ? require("../assets/image.png") : require('../assets/logo.png')}
                            style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Spectagram</Text>
                    </View>
                </View>
                <View style={styles.screenContainer}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: this.state.pic }}
                            styles={styles.profileImage}
                        />
                        <Text style={this.state.light_theme ? styles.nameTextLight : styles.nameText}>
                            {this.state.name}
                        </Text>
                    </View>
                    <View style={styles.themeContainer}>
                        <Text style={this.state.light_theme ? styles.theme : styles.themeLight}>
                            Dark Theme
                        </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: 'white' }}
                            thumbColor={this.state.isEnabled ? '#EE8249' : '#F4F3F4'}
                            value={this.state.isEnabled}
                            onValueChange={() => {
                                this.toggleSwitch()
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    mainLight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row",
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center",
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
    },
    screenContainer: {
        flex: 0.85,
    },
    profileImageContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },
    profileImage: {
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70),
    },
    nameText: {
        color: "white",
        fontSize: RFValue(40),
        marginTop: RFValue(10),
    },
    nameTextLight: {
        color: "black",
        fontSize: RFValue(40),
        marginTop: RFValue(10),
    },
    themeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: RFValue(20),
    },
    theme: {
        fontWeight: "bold",
        fontSize: RFValue(18),
        paddingRight: RFValue(21),
        color: 'black'
    },
    themeLight: {
        fontWeight: "bold",
        fontSize: RFValue(18),
        paddingRight: RFValue(21),
        color: "white"
    }
});