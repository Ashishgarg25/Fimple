import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, ToastAndroid } from 'react-native'
import { LockClosedIcon, MailIcon, PhoneIcon, UserIcon } from "react-native-heroicons/solid";
import Icon from 'react-native-ionicons'
import RegEx from '../../../utils/RegEx/RegEx';
import styles from '../../../utils/styles/styles';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({ navigation }) => {

    // const auth = getAuth();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
  
    const [phone, setPhone] = useState();
    const [phoneError, setPhoneError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [ confirmPasswordError, setConfirmPasswordError ] = useState("");

    const handleRegister = () => {
        if(nameError !== "" || emailError !== "" || phoneError !== "" || passwordError !== ""){
            setNameError("Name cannot be empty");
            setEmailError("Email cannot be empty")
            setPhoneError("Phone cannot be empty")
            setPassword("Password cannot be empty")
        }else{
            auth()
                .createUserWithEmailAndPassword(email, password)
                    .then((userCred) => {
                    // Signed in 
                    
                        firestore()
                            .collection('users')
                            .doc(userCred.uid)
                            .set({
                                name: name,
                                email: email,
                                phone: phone
                            })
                            .then(() => {
                                console.log("=============USER CRED=============",userCred.user.uid)
                                ToastAndroid.showWithGravity("Registered Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                                navigation.navigate("Home", { uid: userCred.user.uid })
                            });
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                          console.log('That email address is already in use!');
                        }
                    
                        if (error.code === 'auth/invalid-email') {
                          console.log('That email address is invalid!');
                        }
                    
                        console.error(error);
                    });

        }    // 
    }

    return (
        <ScrollView contentContainerStyle={ newStyles.container }>
            <Text style={ styles.title }>Create Account</Text>
            <Text style={ newStyles.subTitle }>Join us to explore knowledge</Text>
            <Text style={ styles.label }>Full Name</Text>
            <View style={ styles.inputWrapper }>
                <UserIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                <TextInput 
                    style={[ styles.textInput ]}
                    placeholder="Full Name"
                    placeholderTextColor="#8B8B8B"
                    onChangeText={(text) => {
                        if(!RegEx.alphabetSpace.test(text)){
                            setNameError("Please enter full name !");
                        }else{
                            setNameError("");
                            setName(text)
                        }
                    }}
                />
            </View>
            { nameError ? <Text style={[ styles.label, { fontSize: 12, color: "#f56", marginTop: 6, marginBottom: 0, paddingBottom: 0 } ]}>{nameError}</Text> : null }
            <Text style={ styles.label }>Mobile</Text>
            <View style={ styles.inputWrapper }>
                <PhoneIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                <TextInput 
                    style={[ styles.textInput ]}
                    placeholder="Mobile"
                    placeholderTextColor="#8B8B8B"
                    onChangeText={(text) => {
                        if(!RegEx.phone.test(text)){
                            setPhoneError("Please 10 digit mobile number !");
                        }else{
                            setPhoneError("");
                            setPhone(text)
                        }
                    }}
                />
            </View>
            { phoneError ? <Text style={[ styles.label, { fontSize: 12, color: "#f56", marginTop: 6, marginBottom: 0, paddingBottom: 0 } ]}>{phoneError}</Text> : null }
            <Text style={ styles.label }>Email</Text>
            <View style={ styles.inputWrapper }>
                <MailIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                <TextInput 
                    style={[ styles.textInput ]}
                    placeholder="Email Address"
                    placeholderTextColor="#8B8B8B"
                    onChangeText={(text) => {
                        if(!RegEx.email.test(text)){
                            setEmailError("Please enter valid email !");
                        }else{
                            setEmailError("");
                            setEmail(text)
                        }
                    }}
                />
            </View>
            { emailError ? <Text style={[ styles.label, { fontSize: 12, color: "#f56", marginTop: 6, marginBottom: 0, paddingBottom: 0 } ]}>{emailError}</Text> : null }
            <Text style={ styles.label }>Password</Text>
            <View style={ styles.inputWrapper }>
                <LockClosedIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                <TextInput 
                    style={[ styles.textInput]}
                    placeholder="Password"
                    placeholderTextColor="#8B8B8B"
                    secureTextEntry
                    onChangeText={(text) => {
                        if(!RegEx.password.test(text)){
                            setPasswordError("Please enter valid password !");
                        }else{
                            setPasswordError("");
                            setPassword(text)
                        }
                    }}
                />
            </View>
            { passwordError ? <Text style={[ styles.label, { fontSize: 12, color: "#f56", marginTop: 6, marginBottom: 0, paddingBottom: 0 } ]}>{passwordError}</Text> : null }
            <Text style={ styles.label }>Confirm Password</Text>
            <View style={ styles.inputWrapper }>
                <LockClosedIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                <TextInput 
                    style={[ styles.textInput]}
                    placeholder="Confirm Password"
                    placeholderTextColor="#8B8B8B"
                    secureTextEntry
                    onChangeText={(text) => {
                        if(text !== password){
                            setConfirmPasswordError("Password do not match.")
                        }else{
                            setConfirmPasswordError("");
                        }
                    }}
                />
            </View>
            { confirmPasswordError ? <Text style={[ styles.label, { fontSize: 12, color: "#f56", marginTop: 6, marginBottom: 0, paddingBottom: 0 } ]}>{confirmPasswordError}</Text> : null }
            <View style={{ borderRadius: 6, width: "100%" }}>
                <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => handleRegister()}>
                    <Text style={ styles.btnText }>REGISTER</Text>
                </Pressable>
            </View>
            <Text style={ styles.secondaryLabel } onPress={() => navigation.navigate("Login")}>Already have an account ? Log In </Text>
        </ScrollView>
    )
}

const newStyles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#1F2128",
        padding: 24,
        paddingTop: 24
    },
    subTitle: {
        fontFamily: "Nunito-Bold",
        fontWeight: "bold",
        fontSize: 18,
        color: "#9E9E9E",
        marginBottom: 32
    },
})

export default Register


