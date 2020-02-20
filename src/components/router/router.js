import {  createSwitchNavigator } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack'
import Signup from '../screens/signup/Signup'
import Login from '../screens/login/Login'
import Home from "../screens/home/Home";

const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    header:null
  },
  SignUp: {
    screen: Signup,
    header:null
  }
})
const AppStack = createStackNavigator({
  Home: {
    screen: Home,
    header:null
  }
})
export const createRootNavigator = (navigate) => {
    return createSwitchNavigator(
      {
        LoginStack: {
          screen: LoginStack,
          header:null
        },
        HomeStack: {
          screen: AppStack,
          header:null
        }
      },
      {
        initialRouteName: navigate == 'login' ? 'LoginStack' : 'HomeStack' 
      }
    )
  }
