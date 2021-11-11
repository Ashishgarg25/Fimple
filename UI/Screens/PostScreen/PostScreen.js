import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, Switch, Pressable, TouchableOpacity, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import { ArrowCircleRightIcon, ChevronLeftIcon, EmojiHappyIcon, LinkIcon, PlusIcon, ReplyIcon, UserIcon, XIcon } from 'react-native-heroicons/solid';
import styles from '../../../utils/styles/styles';
import { utils } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';

const PostScreen = () => {

    const [ isEnabled, setIsEnabled ] = useState(false);
    const [ isEnabled1, setIsEnabled1 ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false)

    const [ data, setData ] = useState();
    const [ image, setImage ] = useState(null)

    useEffect(() => {
        setData({
            ...data,
            isPostEnabled: false,
            isChatAllowed: false
        })

    },[])

    const create = async() => {

        setIsLoading(true);

        var parts = image.split("/");
        var result = parts[parts.length - 1];

        // console.log("Result",image);
        console.log(utils.FilePath.CACHES_DIRECTORY+"/"+result)

        var ref = storage().ref(`images/community/${result}`)
        const task = await ref.putFile(utils.FilePath.CACHES_DIRECTORY+"/"+result);

        console.log(task);
        getDownloadURL(result);

    }

    const getDownloadURL = async(result) => {

        const user = auth().currentUser;

        const url = await storage().ref(`images/community/${result}`).getDownloadURL();
        console.log(url);

        firestore()
            .collection('posts')
            .doc(uuid.v4())
            .set({
                id: uuid.v4(),
                adminId: user.uid,
                communityId: uuid.v4(),
                title: data?.title,
                description: data?.desc,
                photo: url,
            })
            .then(() => {
                setIsLoading(false);
                ToastAndroid.showWithGravity("Community Post Added!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                //navigation.goBack();
            });
    }

    const addImage = async() => {
        launchImageLibrary({
            mediaType: "photo",
            quality: .8,
        }, res => {
            setImage(res.assets[0].uri)
        })
    }

    if(isLoading){
        return(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#63D879" />
            </View>
        )
    }else{
        return (
            <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16, marginBottom: 12, backgroundColor: "#000" }}>
                    <ChevronLeftIcon color="#fff" size={24} style={{ marginLeft: 8 }}/>
                    <Text style={ styles.title }>Create Post</Text>
                    <ChevronLeftIcon color="#fff" size={24} style={{ opacity: 0 }}/>
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'space-evenly', alignItems: "flex-start" }}>
                
                    {
                        image !== null ?
                            <View style={{ flex: 1 }} onPress={() => addImage()}>
                                <XIcon color="#63D879" size={18} onPress={() => setImage(null)} style={{ position: "absolute", top: 0, right: 8, zIndex: 99999 }}/>
                                <Image source={{ uri: image }} style={{alignSelf: "stretch", height: 240, marginTop: 16 }} />
                            </View>
                        :
                            <TouchableOpacity style={{ flex: 1, marginHorizontal: 16, backgroundColor: "#000", marginTop: 16, alignSelf: "stretch", height: 240, borderRadius: 8, flexDirection: "column", justifyContent: "center", alignItems: "center"}} onPress={() => addImage()}>
                                <PlusIcon color="#fff" size="48" />
                                <Text style={[ styles.label, { marginTop: 8 } ]}>Add Post Image</Text>
                            </TouchableOpacity>
                    }
                </View>

                <View style={{ marginHorizontal: 16 }}>
                    <Text style={styles.label}>Post Title</Text>
                    <TextInput 
                        style={[ styles.textInput, { paddingLeft: 16 } ]}
                        placeholder="Post Title..."
                        placeholderTextColor="#8B8B8B"
                        onChangeText={(text) => setData({ ...data, title: text })}
                    />
                </View>

                <View style={{ marginHorizontal: 16 }}>
                    <Text style={styles.label}>Post Description</Text>
                    <TextInput 
                        style={[ styles.textInput, { paddingLeft: 16, height: 120, paddingVertical: 10, textAlignVertical: "top" } ]}
                        placeholder="Post Description..."
                        placeholderTextColor="#8B8B8B"
                        multiline
                        numberOfLines={6}
                        onChangeText={(text) => setData({ ...data, desc: text })}
                    />
                </View>

                {/* <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 24 }}>
                    <Switch
                        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginLeft: 16 }}
                        trackColor={{ false: "#767577", true: "#63D879" }}
                        thumbColor={isEnabled ? "#363943" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(val) => {setIsEnabled(val); setData({ ...data, isPostEnabled: val }) } }
                        value={isEnabled}
                    />
                    <Text style={[styles.label, { marginTop: 2, paddingLeft: 16, fontWeight: "bold", fontSize: 16 }]}>Only admin can post</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 24 }}>
                    <Switch
                        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginLeft: 16 }}
                        trackColor={{ false: "#767577", true: "#63D879" }}
                        thumbColor={isEnabled1 ? "#363943" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(val) => { setIsEnabled1(val); setData({ ...data, isChatAllowed: val }) } }
                        value={isEnabled1}
                    />
                    <Text style={[styles.label, { marginTop: 2, paddingLeft: 16, fontWeight: "bold", fontSize: 16 }]}>Members can chat</Text>
                </View> */}

                <View style={{ borderRadius: 6, width: "92%", marginHorizontal: 16, marginTop: 80 }}>
                    <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => create()}>
                        <Text style={ styles.btnText }>CREATE</Text>
                    </Pressable>
                </View>
                {/* <View style={{ marginHorizontal: 16 }}>
                    <Text style={ styles.label }>Author Name</Text>
                    <View style={ styles.inputWrapper }>
                        <UserIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                        <TextInput 
                            style={[ styles.textInput ]}
                            placeholder="Author Name"
                            placeholderTextColor="#8B8B8B"
                            
                        />
                    </View>
                </View> */}
            </View>
        )
    }
}

export default PostScreen
