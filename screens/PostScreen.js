import React from 'react';
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class PostScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            light_theme: false
        }
    }

    fetchingTheme = () => {
        let theme;
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid).on('value', db => {
            theme = db.val().current_theme;
            this.setState({
                light_theme: theme == 'light'
            })
        })
    }

    componentDidMount = () => {
        this.fetchingTheme();
    }

    render() {
        let image_post = {
            image1: require('../assets/image_1.jpg'),
            image2: require('../assets/image_2.jpg'),
            image3: require('../assets/image_3.jpg'),
            image4: require('../assets/image_4.jpg'),
            image5: require('../assets/image_5.jpg'),
            image6: require('../assets/image_6.jpg'),
            image7: require('../assets/image_7.jpg')
        }
        return (
            <View style={this.state.light_theme ? styles.mainViewLight : styles.mainView}>
                <SafeAreaView
                    style={styles.safeView}
                />
                <View style={styles.header}>
                    <View style={styles.iconView}>
                        <Image
                            source={this.state.light_theme ? require("../assets/image.png") : require('../assets/logo.png')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Text style={this.state.light_theme ? styles.textLight : styles.text}>Spectagram</Text>
                    </View>
                </View>
                <View style={styles.view}>
                    <Image source={image_post[this.props.route.params.post.value.preview_image]} style={styles.images} />
                </View>
                <View>
                    <Text style={[this.state.light_theme ? styles.colorLight : styles.color, { marginTop: 21 }]}>
                        By: {this.props.route.params.post.value.author}
                    </Text>
                    <Text style={this.state.light_theme ? styles.colorLight : styles.color}>
                        {this.props.route.params.post.value.caption}
                    </Text>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'black',
        flex: 1
    },
    mainViewLight: {
        backgroundColor: 'white',
        flex: 1
    },
    safeView: {
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : RFValue(35)
    },
    header: {
        //flex: 1,
        flexDirection: "row",
        // marginBottom: RFValue(25),
        // marginTop: RFValue(25),
    },
    iconView: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: RFValue(50),
        height: RFValue(50),
        resizeMode: 'contain'
    },
    textView: {
        flex: 0.7,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: RFValue(28),
        fontWeight: 'bold'
    },
    textLight: {
        color: "black",
        fontSize: RFValue(28),
        fontWeight: 'bold'
    },
    list: {
        fontSize: 100,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    images: {
        width: RFValue(460),
        height: RFValue(260)
    },
    view: {
        alignSelf: 'center',
        marginTop: RFValue(30)
    },
    color: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 21,
        marginTop: RFValue(21)
    },
    colorLight: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 21,
        marginTop: RFValue(21)
    }
})