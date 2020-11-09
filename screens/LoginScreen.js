import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView, Image} from 'react-native';
import firebase from "firebase";

export default class LoginScreen extends React.Component{
    
    constructor(){
        super();
            this.state = {
                emailId: "",
                password: ""
        }
    }

    login = async(email, password) => {
        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email, password);
                if(response){
                this.props.navigation.navigate("Transaction");
            }
            }catch(error){
                    switch(error.code){
                        case "auth/user-not-found": 
                            Alert.alert("user not found");
                            console.log("user not found");
                            break;

                        case "auth/invalid-email":
                            Alert.alert("incorrect email or password");
                            console.log("incorrect email or password");
                            break;
                    }
            }
        }else{
            console.log("enter email or password properly");
        }
    }

    render(){
        return(  
        <KeyboardAvoidingView style = {{alignItems:'center', marginTop:20}}>
            <View>
                <Image source = {require("../assets/booklogo.jpg")} style = {{width:200, height:200}}/>
                <Text style={{ textAlign: "center", fontSize: 30 }}>Wily</Text>
            </View>
            <View>
            <TextInput
              style={styles.loginInput}
              placeholder="abc@xyz.com"
              keyboardType = "email-address"
              onChangeText={text => {
                this.setState({
                  emailId: text
                });
              }}
              value={this.state.emailId}
            />
            <TextInput
              style={styles.loginInput}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({
                    password: text
                });
              }}
              value={this.state.password}
            />
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.login(this.state.emailId, this.state.password);
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>   
        )
    }
}


const styles  = StyleSheet.create({
    loginButton:{
        height:30,
        width:90,
        borderWidth: 1,
        marginTop: 20,
        paddingTop: 5,
        borderRadius: 7,
        backgroundColor:"teal"

    },

   loginInput: {
       marginTop:10,
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20,
        padding: 10,
        backgroundColor: "pink",
      },
    buttonText:{
        textAlign:"center"
    }

})