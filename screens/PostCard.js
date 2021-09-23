import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase';
import Feed from './Feed';


export default class PostCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            light_theme: false,
            post_id: this.props.post.key,
            post_data: this.props.post.value,
            isLiked: false,
            likes: this.props.post.value.likes
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
        console.log(this.state.post_data)
    }


    likeAction = () => {
        if (this.state.isLiked) {
            firebase.database().ref('/post').child(this.state.post_id).child('likes').set(firebase.database.ServerValue.increment(-1))
            this.setState({
                likes: this.state.likes - 1,
                isLiked: false
            })
        }
        else {
            firebase.database().ref('/post').child(this.state.post_id).child('likes').set(firebase.database.ServerValue.increment(+1))
            this.setState({
                likes: this.state.likes + 1,
                isLiked: true
            })
        }
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

            <TouchableOpacity style={styles.view}
                onPress={() =>
                    this.props.navigation.navigate('PostScreen', {
                        post: this.props.post
                    })
                }
            >
                <View style={this.state.light_theme ? styles.imageviewLight : styles.imageview}>
                    <View style={styles.textview}>
                        <Text style={this.state.light_theme ? styles.authorLight : styles.author}>{this.state.post_data.author}</Text>
                    </View>
                    <Image source={image_post[this.state.post_data.preview_image]} style={styles.image} />
                    <View style={styles.textview}>
                        <Text style={this.state.light_theme ? styles.authorLight : styles.author}>{this.state.post_data.caption}</Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={this.state.isLiked ? styles.likeButton : styles.likeButtonLight}
                            onPress={() => {
                                this.likeAction();
                            }}>
                            <Icon name={'heart'} size={30} color={this.state.light_theme ? 'black' : 'white'} />
                            <Text style={this.state.light_theme ? styles.likeTextLight : styles.likeText}>{this.state.likes}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    imageview: {
        backgroundColor: 'rgba(50,82,112,0.3)',
        borderRadius: 21,
        margin: RFValue(10),
    },
    imageviewLight: {
        backgroundColor: 'white',
        borderRadius: 21,
        margin: RFValue(10),
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: RFValue(0.5),
        shadowRadius: RFValue(5),
        elevation: RFValue(2)
    },
    image: {
        width: RFValue(300),
        height: RFValue(250),
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    textview: {
        justifyContent: 'center',
    },
    author: {
        fontSize: RFValue(18),
        color: 'white',
        textAlign: 'center',
        marginTop: RFValue(8),
        fontWeight: 'bold'
    },
    authorLight: {
        fontSize: RFValue(18),
        color: 'black',
        textAlign: 'center',
        marginTop: RFValue(8),
        fontWeight: 'bold'
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
    },
    likeButtonLight: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#eb3948",
        borderWidth: 2,
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    likeTextLight: {
        color: "black",
        fontSize: RFValue(25),
        marginLeft: RFValue(5),
        fontWeight: 'bold'
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
    },
})