import React from 'react'
import { FlatList, View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, Image } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";
import PostCard from '../screens/PostCard';
let photos = require('./temp_objects.json')
import firebase from 'firebase';


export default class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            light_theme: false,
            posts: []
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

    fetchPost = () => {
        firebase
            .database()
            .ref('/post/')
            .on(
                "value",
                snapshot => {
                    let posts = [];
                    if (snapshot.val()) {
                        Object.keys(snapshot.val()).forEach(function (key) {

                            posts.push({
                                key: key,
                                value: snapshot.val()[key]
                            });
                        });
                    }
                    this.setState({ posts: posts });
                     this.props.setUpdatetofalse()
                },
            );
    };


    componentDidMount = () => {
        this.fetchingTheme();
        this.fetchPost();
    }



    itemrender = ({ item: post }) => {
        return (
            <PostCard post={post} navigation={this.props.navigation} />
        )
    }


    extractor = (item, index) => {
        index.toString()
    }

    render() {
        return (
            <View style={this.state.light_theme ? styles.viewLight : styles.view}>
                <SafeAreaView
                    style={styles.safeArea}
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
                <View style={styles.list}>
                    <FlatList
                        data={this.state.posts}
                        renderItem={this.itemrender}
                        keyExtractor={this.extractor}
                    />
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'black'
    },
    viewLight: {
        flex: 1,
        backgroundColor: 'white'
    },
    safeArea: {
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : RFValue(35)
    },
    header: {
        flex: 1,
        flexDirection: "row",
        marginBottom: RFValue(25),
        marginTop: RFValue(25),
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
    }
})