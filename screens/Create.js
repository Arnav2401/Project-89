import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, StatusBar, SafeAreaView, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';

export default class CreaterSpace extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: 'image1',
            author: '',
            caption: '',
            dropdownHeight: 40,
            light_theme: false,
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


    addingPost = async () => {

        if (this.state.caption && this.state.author) {

            let postData = {
                preview_image: this.state.image,
                caption: this.state.caption,
                author_uid: firebase.auth().currentUser.uid,
                author: firebase.auth().currentUser.displayName,
                created_on: new Date(),
                likes: 0
            }

            await
                firebase
                    .database()
                    .ref('/post/' + Math.random()
                        .toString(36)
                        .slice(2)
                    )
                    .set(postData)
                    .then((x) => {
                        this.props.navigation.navigate('Feed')
                        this.props.setUpdatetotrue()
                    })
        }
        else {
            alert('All Field are Mandatory')
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
            <View style={this.state.light_theme ? styles.viewLight : styles.view}>
                <SafeAreaView
                    style={styles.safeArea}
                >
                    <ScrollView style={this.state.light_theme ? styles.scrollViewLight : styles.scrollView}>
                        <KeyboardAvoidingView style={this.state.light_theme ? styles.viewLight : styles.view}
                            behavior={'padding'}
                        >
                            <View style={styles.header}>
                                <View style={styles.iconView}>
                                    <Image source={this.state.light_theme ? require("../assets/image.png") : require('../assets/logo.png')} style={styles.image} />
                                </View>
                                <View style={styles.textView}>
                                    <Text style={this.state.light_theme ? styles.textLight : styles.text}>New Post</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Image source={image_post[this.state.image]} style={styles.selectImage} />
                            </View>
                            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                                <DropDownPicker
                                    items=
                                    {
                                        [
                                            { label: 'Image 1', value: 'image1' },
                                            { label: 'Image 2', value: 'image2' },
                                            { label: 'Image 3', value: 'image3' },
                                            { label: 'Image 4', value: 'image4' },
                                            { label: 'Image 5', value: 'image5' },
                                            { label: 'Image 6', value: 'image6' },
                                            { label: 'Image 7', value: 'image7' },
                                        ]
                                    }
                                    onChangeItem={(item) => {
                                        this.setState({ image: item.value })
                                    }
                                    }
                                    value={this.state.image}
                                    containerStyle={styles.containerstyle}
                                    style={styles.drop}
                                    dropDownStyle={styles.downstyle}
                                    labelStyle={this.state.light_theme ? styles.stylelabelLight : styles.stylelabel}
                                    itemStyle={styles.styleitem}
                                    onOpen={() => {
                                        this.setState({ dropdownHeight: 170 });
                                    }}
                                    onClose={() => {
                                        this.setState({ dropdownHeight: 40 });
                                    }}
                                />
                            </View>

                            <TextInput
                                placeholder={'Name'}
                                onChangeText={x => {
                                    this.setState({ author: x })
                                }}
                                value={this.state.author}
                                style={this.state.light_theme ? styles.authorInputLight : styles.authorInput}
                                placeholderTextColor={this.state.light_theme ? 'black' : 'white'}
                            />
                            <TextInput
                                placeholder={'Caption'}
                                onChangeText={x => {
                                    this.setState({ caption: x })
                                }}
                                value={this.state.caption}
                                style={[this.state.light_theme ? styles.authorInputLight : styles.authorInput, { marginTop: 15 }]}
                                placeholderTextColor={this.state.light_theme ? 'black' : 'white'}
                            />
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => {
                                    this.addingPost();
                                }}
                            >
                                <Text style={this.state.light_theme ? styles.submit : styles.submitLight}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>
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
        // flex: 1,
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
        justifyContent: "center",
        paddingLeft: 18
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
    content: {
        flex: .5
    },
    selectImage: {
        width: RFValue(350),
        height: RFValue(200),
        marginTop: RFValue(30),
        alignSelf: 'center',
        borderRadius: 12,
        resizeMode: 'contain'
    },
    authorInput: {
        width: '98%',
        height: RFValue(35),
        alignSelf: 'center',
        borderRadius: 6,
        textAlign: 'center',
        borderColor: 'rgb(9, 75, 119)',
        borderWidth: 3,
        color: 'white',
        marginTop: RFValue(90)
    },
    authorInputLight: {
        width: '98%',
        height: RFValue(35),
        alignSelf: 'center',
        borderRadius: 6,
        textAlign: 'center',
        borderColor: 'rgb(9, 75, 119)',
        borderWidth: 3,
        color: 'black',
        marginTop: RFValue(90)
    },
    containerstyle: {
        borderRadius: 30,
        marginTop: RFValue(80),
        height: RFValue(35),
        width: '98%',
        alignSelf: 'center',
    },
    drop: {
        borderRadius: 6,
        borderWidth: 3,
        borderColor: 'rgb(9, 75, 119)',
        backgroundColor: 'transparent',
    },
    downstyle: {
        backgroundColor: 'rgba(9, 75, 119,.3)',
    },
    stylelabel: {
        color: 'white',
        textAlign: 'center',
        paddingLeft: 16,
    },
    stylelabelLight: {
        color: 'black',
        textAlign: 'center',
        paddingLeft: 16,
    },
    styleitem: {
        justifyContent: 'flex-start',
    },
    scrollView: {
        backgroundColor: 'black'
    },
    scrollViewLight: {
        backgroundColor: 'white'
    },
    submit: {
        color: 'black',
        borderColor: 'rgb(9, 75, 119)',
        borderWidth: 2,
        width: RFValue(80),
        textAlign: 'center',
        height: RFValue(25),
        paddingTop: RFValue(4),
        borderRadius: 12
    },
    submitButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: RFValue(32)
    },
    submitLight: {
        color: 'white',
        borderColor: 'rgb(9, 75, 119)',
        borderWidth: 2,
        width: RFValue(80),
        textAlign: 'center',
        height: RFValue(25),
        paddingTop: RFValue(4),
        borderRadius: 12
    },

})