import React, { Component } from 'react';
import { FlatList, Switch, Alert } from 'react-native';
import { Container, Button, Textview } from '../../default'
import firebase from 'react-native-firebase';

var questions_list = [];
var count = 1;
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            loading:true,
        }
    }
    componentDidMount() {
        this.fetchQuestions();
    }
    fetchQuestions() {
        questions_list = [];
        count=1;
        firebase.database().ref('Questions/').on('value', (snapshot) => {
            snapshot.forEach((data)=>{
                console.log("snapshot", data.val());
                questions_list.push(data.val());    
            })
            if(questions_list!==undefined || questions_list!=='' || questions_list!==null){
                this.setState({ questions: questions_list}, () => {
                    this.setState({loading:false});
                    console.log("Questions data", this.state.questions);
                })
            }
        })
    }
    onToggleValueChanged(value, index) {
        if(count <= 2 ){
            questions_list[index].switch = value;
            this.setState({questions: questions_list})
            if(value)
                count++;
            else
                count--;
        }
        else{
            Alert.alert("You can make only two of them active.")
        }
    }
    renderItem = ({item, index}) => {
        return (
            <Container ContainerStyle={{ flexDirection: 'row', backgroundColor: '#fff', height:70,  }} >
                <Textview text={item.question} textStyle={styles.listTextStyle} />
                <Switch
                    style={{ marginTop: 30, color: '#0080ff' }}
                    onValueChange={(value) => { this.onToggleValueChanged(value, index) }}
                    value={item.switch} />
            </Container>
        )
    }
    onSavePressed(){
        // update database the whole array .. due to lack of time, I was unable to do this. 
    }
    render() {
        if(this.state.loading == false){
            return (
                <Container ContainerStyle={{flex:1}}>
                    <Container>
                        <Textview text="List Of Questions." textStyle={styles.questionTagStyle} />
                    </Container>
                    <Container ContainerStyle={{marginTop:50, borderRadius:5, borderColor:'black', borderWidth:1,width:'90%', alignSelf:'center', padding:10, backgroundColor:'#fff' }}>
                        <FlatList
                            data={this.state.questions}
                            extraData={this.state}
                            renderItem = {this.renderItem}
                            keyExtractor={(index) => { index.toString() }} />
                    </Container>
                    <Button onPress={()=>{this.onSavePressed()}} title="Save" style={styles.saveButtonStyles} textStyle={styles.saveButtonTextStyles}/>
                </Container>
            )
        }
        else{
            return null;
        }
    }
}
const styles = {
    questionTagStyle: {
        alignSelf: 'center',
        marginTop: 30,
        fontSize: 20,
        color: '#0080ff',
        fontWeight: 'bold',
    },
    listTextStyle: {
        flex: 1,
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    saveButtonStyles:{
        marginTop: 20,
        width: '90%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0080ff',
        height: 50,
        alignSelf:'center'
    },
    saveButtonTextStyles:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22
    }
}