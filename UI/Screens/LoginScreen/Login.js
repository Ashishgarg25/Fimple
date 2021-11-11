import React, { useState, useRef, useEffect} from 'react'
import { Pressable, ScrollView, Text, TextInput, View, ToastAndroid } from 'react-native'
import { LockClosedIcon, UserIcon } from "react-native-heroicons/solid";
import Icon from 'react-native-ionicons'
import styles from '../../../utils/styles/styles';
import ResetModal from '../../Components/ResetModal/ResetModal';
import RegEx from '../../../utils/RegEx/RegEx';
import LinkedInModal from 'react-native-linkedin';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '717582333818-1ijh9tdurepq691gp9e933fsvc1lvk9p.apps.googleusercontent.com',
});

const Login = ({ navigation }) => {

    // const auth = getAuth();

    const [modalVisible, setModalVisible] = useState(false);

    const [ emailPhoneErr, setEmailPhoneErr ] = useState("");
    const [ emailPhone, setEmailPhone ] = useState(null);

    const [ passwordErr, setPasswordErr ] = useState("");
    const [ password, setPassword ] = useState("");

    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState(''); 
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            console.log("===============USER IS===============",user)
            if(user !== null)
                navigation.navigate("Home", { screen: "HomeScreen", params: { user: user } })
        });
        return subscriber;
      }, []);

    const handleInput = (text) => {
        if(!isNaN(text)){
            if(!RegEx.phone.test(text)){
                setEmailPhoneErr("Please enter 10 digit mobile number !")
                setEmailPhone(0)
            }else{
                setEmailPhoneErr("");
                setEmailPhone(text)
                
            }
        }else{
            if(!RegEx.email.test(text)){
                setEmailPhoneErr("Please enter valid email address !")
                setEmailPhone("a")
            }else{
                setEmailPhoneErr("")
                setEmailPhone(text)
                
            }
        }
    }

    const handleLogin = () => {

        if(!isNaN(emailPhone)){

            if(emailPhone === "" || (code === "")){
                setEmailPhoneErr("Mobile number cannot be empty !");
                setPasswordErr("OTP cannot be empty !")
            }else{
                phoneValidation();
            }
        }else{

            if(emailPhone === "" || (password === "")){
                setEmailPhoneErr("Email cannot be empty !");
                setPasswordErr("Password cannot be empty !")
            }else{
                auth()
                .signInWithEmailAndPassword(emailPhone, password)
                    .then((userCred) => {
                        const user = userCred.user;
                        console.log("USER------------------------",user)
                        ToastAndroid.showWithGravity("Login Successful", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                        navigation.navigate("Home", { uid: userCred.user.uid })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
    
                        console.log(errorMessage, errorCode)
                    });
            }
        }
    }

    const sendOTP = async(phone) => {
        if(phone !== ""){
            const confirmation = await auth().signInWithPhoneNumber(phone);
            console.log(confirmation)
            setConfirm(confirmation);
        }else{
            setEmailPhoneErr("Mobile number cannot be empty !");
        }
    }

    const phoneValidation = async() => {
        try {
            await confirm.confirm(code);
            ToastAndroid.showWithGravity("Login Successful", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            navigation.navigate("Home")
          } catch (error) {
            console.log('Invalid code.');
          }
    }

    const linkedInRef = useRef(null);
    const clientID = "77cwrcbov0x4dt";
    const clientSecret = "4BzdVut6JWFju4sn";

    
    const signInUsingGoogle = async() => {

        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        console.log("========GOOGLE SIGN IN==================",googleCredential)

        return auth().signInWithCredential(googleCredential);
    }

    // const signOut = () => {
    //     auth()
    //     .signOut()
    //     .then(() => console.log('User signed out!'));
    // }

    return (
        <ScrollView contentContainerStyle={[ styles.container, { opacity: modalVisible ? 0.3 : 1, backgroundColor: modalVisible ? "#363943" : "#1F2128" }]}>
            <Text style={ styles.title }>Welcome Back</Text>
            <Text style={ styles.subTitle }>Please login to continue</Text>
            <Text style={styles.label}>Email / Mobile</Text>
            <View style={ styles.inputWrapper }>
                <UserIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                <TextInput 
                    style={[ styles.textInput ]}
                    placeholder="Email Address / Mobile"
                    placeholderTextColor="#8B8B8B"
                    onChangeText={(text) => handleInput(text)}
                />
            </View>
            { emailPhoneErr ? <Text style={[ styles.label, { fontSize: 12, color: "#f56", marginTop: 6, marginBottom: 0 } ]}>{emailPhoneErr}</Text> : null }

            {
                !isNaN(emailPhone) ?
                    <View style={ styles.section }>
                        <Text style={ styles.label }>OTP</Text>
                        <Text style={[ styles.label, { color: "#9E9E9E", fontSize: 12 } ]} >Resend OTP</Text>
                    </View>
                :
                    <View style={ styles.section }>
                        <Text style={ styles.label }>Password</Text>
                        <Text style={[ styles.label, { color: "#9E9E9E", fontSize: 12 } ]} onPress={() => setModalVisible(true)}>Forgot Password ?</Text>
                    </View>
            }

            {
                !isNaN(emailPhone) ?
                    <View style={ styles.inputWrapper }>
                        <LockClosedIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                        <TextInput 
                            style={[ styles.textInput, ]}
                            placeholder="Enter 4 digit OTP"
                            placeholderTextColor="#8B8B8B"
                            
                            onChangeText={(text) => {
                                setCode(text)
                            }}
                        />
                    </View>
                :
                    <View style={ styles.inputWrapper }>
                        <LockClosedIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                        <TextInput 
                            style={[ styles.textInput, ]}
                            placeholder="Password"
                            placeholderTextColor="#8B8B8B"
                            secureTextEntry
                            onChangeText={(text) => {
                                if(!RegEx.password.test(text)){
                                    setPasswordErr("Please enter valid password !")
                                }else{
                                    setPasswordErr("");
                                    setPassword(text);
                                }
                            }}
                        />
                    </View>       
            }
            { [passwordErr] ? <Text style={[ styles.label, { fontSize: 12, color: "#f56", marginTop: 6, marginBottom: 0 } ]}>{[passwordErr]}</Text> : null }

            {
                !isNaN(emailPhone) ?
                    confirm === null ?
                        <View style={{ borderRadius: 6, width: "100%" }}>
                            <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => sendOTP(emailPhone)}>
                                <Text style={ styles.btnText }>SEND OTP</Text>
                            </Pressable>
                        </View>
                    :
                        <View style={{ borderRadius: 6, width: "100%" }}>
                            <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => handleLogin()}>
                                <Text style={ styles.btnText }>LOGIN BY OTP</Text>
                            </Pressable>
                        </View>
                :
                    <View style={{ borderRadius: 6, width: "100%" }}>
                        <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => handleLogin()}>
                            <Text style={ styles.btnText }>LOGIN</Text>
                        </Pressable>
                    </View>
                
            }
            
            <Text style={ styles.secondaryLabel } onPress={() => navigation.navigate("Register")}>Don't have an account yet ? Sign Up </Text>
            <View style={ styles.orSection }>
                <View
                    style={[ styles.border, { marginLeft: 64 } ]}
                />
                <Text style={[ styles.secondaryLabel, { color: "#fff" } ]}> OR </Text>
                <View
                    style={[ styles.border, { marginRight: 64 } ]}
                />
            </View>
            <View style={ styles.wrapper }>
                <View style={{ borderRadius: 6, width: "42%" }}>
                    <Pressable style={ styles.linkedInBtn } android_ripple={{ color: "#2867B2", borderless: false }} >
                        <Icon name="logo-linkedin" color="#2867B2" style={ styles.ionIcon } />
                        <Text style={ styles.linkedInBtnText }>Linked In</Text>
                    </Pressable>
                </View>
               <View style={{ borderRadius: 6, width: "42%", marginRight: 10 }}>
                    <Pressable style={ styles.googleBtn } android_ripple={{ color: "#FF5566", borderless: false }} onPress={() => signInUsingGoogle().then(() => console.log("Signed In"))}>
                        <Icon name="logo-google" color="#FF5566" style={[ styles.ionIcon, { left: 32 } ]} />
                        <Text style={ styles.googleBtnText }>Google</Text>
                    </Pressable>
               </View>
            </View>

            <ResetModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />

                {/* <View style={{ backgroundColor: "#fff" }}>
                    <LinkedInModal
                        ref={linkedInRef}
                        // shouldGetAccessToken={false}
                        clientSecret={clientSecret}
                        clientID={clientID}
                        redirectUri="https://fimple.in"
                        onSuccess={token => console.log(token)}
                    />
                </View> */}

        </ScrollView>
    )
}
export default Login;