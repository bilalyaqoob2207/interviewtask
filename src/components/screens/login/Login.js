import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Container, Input, Button, Scrollview, Textview } from '../../default'
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    onLoginPressed() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                console.log("user ", user);
                AsyncStorage.setItem("LOGIN_CHECK", 'true').then(()=>{
                    this.props.navigation.navigate('Home')
                })
            })
            .catch(console.log("fb promise"));
    }
    handleEmailChange(event) {
        this.setState({ email: event });
    }
    handlePassChange(event) {
        this.setState({ password: event });
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Scrollview >
                    <Container>
                        <Textview textStyle={styles.loginTagStyle} text={"Welcome, \nPlease Login to your Account.."} />
                    </Container>
                    <Container ContainerStyle={styles.formContainer}>
                        <Input
                            placeholder="Email"
                            placeholderTextColor="#000"
                            keyboardType="email-address"
                            returnKeyType={"next"}
                            blurOnSubmit={true}
                            inputStyle={styles.input}
                            onChangeText={(event) => this.handleEmailChange(event)}
                        />
                        <Input
                            placeholder="Password"
                            placeholderTextColor="#000"
                            secureTextEntry={true}
                            returnKeyType={"next"}
                            inputStyle={styles.input}
                            blurOnSubmit={true}
                            onChangeText={(event) => this.handlePassChange(event)}
                        />
                        <Button
                            onPress={() => { this.onLoginPressed() }}
                            title="Login" style={styles.loginButtonStyles} textStyle={styles.loginButtonText} />
                        <Button
                            onPress={() => { this.props.navigation.navigate("SignupForm") }}
                            title="Signup" style={styles.loginButtonStyles} textStyle={styles.loginButtonText} />
                    </Container>
                </Scrollview>
            </SafeAreaView>
        )
    }
}

const styles = {
    scrollViewStyles: {
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'center'
    },
    formContainer: {
        flex: 1,
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 30
    },
    loginButtonStyles: {
        marginTop: 20,
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0080ff',
        height: 50
    },
    loginButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22
    },
    loginTagStyle: {
        alignSelf: 'center',
        marginTop: 50,
        fontSize: 20,
        color: '#0080ff',
        fontWeight: 'bold',
    },
    invalidInputStyles: {
        marginTop: 5,
        alignSelf: 'center',
        color: 'red'
    }
}