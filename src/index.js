import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createRootNavigator } from './components/router/router'
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
    state = { loading: true, logincheck: true }

    componentDidMount(){
        AsyncStorage.getItem("LOGIN_CHECK").then((value) => {
            if (value != null) {
                this.setState({ logincheck: false })
            }
            this.setState({ loading: false })
        });
    }

    render(){
        if (this.state.loading) {
            return null;
        }
        if (this.state.logincheck) {
            const Layout = createAppContainer(createRootNavigator('login'));
            return (
                <Layout />
            )
        }
        else if (this.state.logincheck == false) {
                const Layout = createAppContainer(createRootNavigator('home'));
                return (
                    <Layout />
                )	
        }
    }
}