import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Container, Input, Button, Scrollview, Textview } from '../../default'
import firebase from 'react-native-firebase';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name:''
        }
    }
    onSignupPressed(){
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then( (user) => {
                console.log("user ", user);
                let userID = firebase.auth().currentUser.uid;
                firebase.database().ref('users/').child(userID).set({
                    name: this.state.name,
                    email:this.state.email,
                    userId: userID
                }).then(()=>{
                    this.props.navigation.navigate('LoginScreen')
                })
            }).catch(console.log("fb promise"));
    }
    handleNameChange(event){
        this.setState({name:event});
    }
    handleEmailChange(event){
        this.setState({email:event});
    }
    handlePassChange(event){
        this.setState({password:event});
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Scrollview >
                    <Container>
                        <Textview textStyle={styles.signupTagStyle} text={"Hi, \nPlease create your Account.."} />
                    </Container>
                    <Container ContainerStyle={styles.formContainer}>
                        <Input
                            placeholder="Name"
                            placeholderTextColor="#000"
                            returnKeyType={"next"}
                            blurOnSubmit={true}
                            inputStyle={styles.input}
                            onChangeText={(event) => this.handleNameChange(event)}
                        />
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
                            onPress={()=>{this.onSignupPressed()}} 
                            title="Signup" style={styles.signupButtonStyles} textStyle={styles.signupButtonText} />
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
    signupButtonStyles: {
        marginTop: 20,
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0080ff',
        height: 50
    },
    signupButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22
    },
    signupTagStyle: {
        alignSelf: 'center',
        marginTop: 50,
        fontSize: 20,
        color: '#0080ff',
        fontWeight: 'bold',
    },
}