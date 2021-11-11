import React, { useState } from 'react'
import { Pressable, Text, TextInput, View, Modal, ToastAndroid } from 'react-native'
import { LockClosedIcon, UserIcon } from "react-native-heroicons/solid";
import styles from '../../../utils/styles/styles';
import RegEx from '../../../utils/RegEx/RegEx';
import auth from '@react-native-firebase/auth';

const ResetModal = ({ modalVisible, setModalVisible, navigation }) => {

    const [ count, setCount ] = useState(1)

    const [ emailPhoneErr, setEmailPhoneErr ] = useState("");
    const [ emailPhone, setEmailPhone ] = useState("");

    const [ otp, setOtp ] = useState(0);
    const [ otpErr, setOtpErr ] = useState("")

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [ confirmPasswordError, setConfirmPasswordError ] = useState("");

    const handleInput = (text) => {
        if(!isNaN(text)){
            if(!RegEx.phone.test(text)){
                setEmailPhoneErr("Please enter 10 digit mobile number !");
                setEmailPhone(0)
            }else{
                setEmailPhoneErr("");
                setEmailPhone(text)
            }
        }else{
            if(!RegEx.email.test(text)){
                setEmailPhoneErr("Please enter valid email address !");
                setEmailPhone("a")
            }else{
                setEmailPhoneErr("")
                setEmailPhone(text)
            }
        }
    }

    const sendOTP = () => {
        if(emailPhone === ""){
            setEmailPhoneErr("Email / Mobile number cannot be empty !")
        }else{

            auth()
                .sendPasswordResetEmail(emailPhone)
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            // setCount(2)
        }
    }

    const verifyOTP = () => {
        if(otp === ""){
            setOtpErr("Please enter correct otp")
        }else{
            setCount(3)
        }
    }

    const resetPassword = () => {
        if(password === ""){
            setPasswordError("Password cannot be empty !");
            setConfirmPasswordError("Password cannot be empty !")
        }else{
            setCount(1)
            ToastAndroid.showWithGravity("Password reset successfull", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            setModalVisible(false)
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible) }
            style={{ overlay: { background: '#fff' } }}
        >
            {
                count === 1 ?
                    <View style={{ height: '55%', marginTop: "auto", backgroundColor: "#1F2128", borderRadius: 16, padding: 24, paddingTop: 32 }}>
                        <Text style={ styles.title }>Forgot Password</Text>
                        <Text style={[ styles.subTitle, { marginBottom: 48 } ]}>Please enter email / mobile to continue</Text>
                        <Text style={ styles.label }>Email / Mobile</Text>
                        <View style={ styles.inputWrapper }>
                            <UserIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                            <TextInput 
                                style={[ styles.textInput]}
                                placeholder="Email Address / Mobile"
                                placeholderTextColor="#8B8B8B"
                                onChangeText={(text) => handleInput(text)}
                            />
                        </View>
                        { emailPhoneErr ? <Text style={[ styles.label, { fontSize: 12, color: "#f56", marginTop: 6, marginBottom: 0 } ]}>{emailPhoneErr}</Text> : null }
                        <View style={{ borderRadius: 6, width: "100%" }}>
                            <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => sendOTP()}>
                                <Text style={ styles.btnText }>SEND OTP</Text>
                            </Pressable>
                        </View>
                    </View>
                :
                count === 2 ?
                    <View style={{ height: '55%', marginTop: "auto", backgroundColor: "#1F2128", borderRadius: 16, padding: 24, paddingTop: 32 }}>
                        <Text style={ styles.title }>OTP</Text>
                        <Text style={[ styles.subTitle, { marginBottom: 48 } ]}>Please enter OTP to continue</Text>
                        <Text style={ styles.label }>Enter OTP</Text>
                        <View style={ styles.inputWrapper }>
                            <LockClosedIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                            <TextInput 
                                style={ styles.textInput }
                                placeholder="OTP"
                                placeholderTextColor="#8B8B8B"
                                onChangeText={(text) => setOtp(text) }
                            />
                        </View>
                        { otpErr ? <Text style={[ styles.label, { fontSize: 12, color: "#f56", marginTop: 6, marginBottom: 0 } ]}>{otpErr}</Text> : null }
                        <View style={{ borderRadius: 6, width: "100%" }}>
                            <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => verifyOTP()}>
                                <Text style={ styles.btnText }>CONTINUE</Text>
                            </Pressable>
                        </View>
                    </View>
                :
                    <View style={{ height: '70%', marginTop: "auto", backgroundColor: "#1F2128", borderRadius: 16, padding: 24, paddingTop: 32 }}>
                        <Text style={ styles.title }>Reset Password</Text>
                        <Text style={[ styles.subTitle, { marginBottom: 48 } ]}>Please enter new password</Text>
                        <Text style={ styles.label }>New Password</Text>
                        <View style={ styles.inputWrapper }>
                            <LockClosedIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                            <TextInput 
                                style={[ styles.textInput]}
                                placeholder="New Password"
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
                                style={[ styles.textInput ]}
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
                            <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => resetPassword()}>
                                <Text style={ styles.btnText }>RESET PASSWORD</Text>
                            </Pressable>
                        </View>
                    </View>
                }
        </Modal>
    )
}

export default ResetModal

