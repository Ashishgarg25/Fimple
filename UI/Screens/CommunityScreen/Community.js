import React, { useState, useEffect } from 'react'
import { Text, View, Image, ScrollView, FlatList, Dimensions, TextInput, Pressable, TouchableOpacity, Modal } from 'react-native'
import { SearchIcon, PencilIcon, SparklesIcon, LockClosedIcon } from 'react-native-heroicons/solid';
import { UserGroupIcon as UserGroupIconOutline } from "react-native-heroicons/outline";
import styles from '../../../utils/styles/styles';
import { FloatingAction } from "react-native-floating-action";
import firestore from '@react-native-firebase/firestore';

const Community = ({ navigation }) => {

    const actions = [
        {
            text: "JOIN",
            icon: require('../../../assets/images/join.png'),
            name: "bt_join",
            position: 2
          },
          {
            text: "CREATE",
            icon: require('../../../assets/images/create.png'),
            name: "bt_create",
            position: 1
          }
    ]

    const width = Dimensions.get("window").width;

    const [ buttonState, setButtonState ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ data, setData ] = useState()

    useEffect(() => {
        getData()
    },[])

    const getData = async() => {
        let newData = [];
        const data = await firestore().collection('communities').get();
        data.docs.map(doc => newData.push({
            data: doc.data(),
            id: doc.id
        }));

        setData(newData)
    }

    console.log("DATA===============>", data)

    return (
        <ScrollView contentContainerStyle={{ marginBottom: 32 }}>
            
            <View style={{ backgroundColor: "#000", paddingVertical: 16, marginBottom: 32, paddingBottom: 0 }}>
                <Text style={[ styles.title, { paddingLeft: 16 } ]}>Communities</Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 16, paddingLeft: 16 }}>
                    <TouchableOpacity onPress={() => setButtonState(false)}>
                        <Text style={[styles.label, { fontWeight: "bold", color: buttonState === false ? "#63D879" : "#fff", borderBottomWidth: buttonState === false ? 2 : 0, borderBottomColor: "#63D879" }]}>JOINED</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setButtonState(true)}>
                        <Text style={[styles.label, { fontWeight: "bold", marginLeft: 64, color: buttonState === true ? "#63D879" : "#fff", borderBottomWidth: buttonState === true ? 2 : 0, borderBottomColor: "#63D879" }]}>EXPLORE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Category")}>
                        <Text style={[styles.label, { fontWeight: "bold", marginLeft: 64 }]} >CATEGORY</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <View style={{ marginRight: -32, zIndex: !buttonState ? 9999 : 1 }}>
                    <TouchableOpacity style={[ styles.linkedInBtn, { borderRadius: 32, width: 150, backgroundColor: "#63D879" } ]} onPress={() => setButtonState(false)}>
                        <Text style={ [styles.linkedInBtnText, { paddingLeft: 0, color: "#000" }] }>Joined</Text>
                    </TouchableOpacity>
                </View>
               <View style={{ marginLeft: -32, zIndex: buttonState ? 9999 : 1 }}>
                    <TouchableOpacity style={[ styles.googleBtn, { borderRadius: 32, width: 150, backgroundColor: "#000" } ]} onPress={() => setButtonState(true)}>
                        <Text style={[ styles.googleBtnText, { paddingLeft: 0, color: "#fff" } ]}>Official</Text>
                    </TouchableOpacity>
               </View>
            </View> */}

            <View style={[ styles.inputWrapper, { marginHorizontal: 16, width: width-32, marginTop: 0, marginBottom: 24 } ]}>
                <SearchIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                <TextInput 
                    style={[ styles.textInput, ]}
                    placeholder="Search Communities..."
                    placeholderTextColor="#8B8B8B"
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "center", flexWrap: 'wrap', marginBottom: 145 }}>
            {
                data?.map(item => (
                    <TouchableOpacity style={{ backgroundColor: "#000", borderRadius: 6, width: "45%", margin: 16, marginHorizontal: 6, padding: 16, height: 200 }} onPress={() => navigation.navigate("CommunityDetails", { id: item.id })}>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-start" }}>
                            <View>
                                <Image source={{ uri: item.data.photo }} style={styles.image} />
                            </View>
                            <View style={{ paddingLeft: 16, height: 50}}>
                                <Text style={[ styles.title, { fontSize: 16 } ]}>{item.data.name}</Text>
                                <Text style={[ styles.title, { fontSize: 14, color: "#aaaaaa" } ]}>Developer</Text>
                                {/* <Text style={ styles.subTitle }>Developer</Text> */}
                            </View>
                        </View>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={[ styles.title, { fontSize: 22, paddingTop: 16 } ]}>{item.data.title}</Text>
                        <View style={{ backgroundColor: "#63D879", borderRadius: 60 , width: 48, height: 48, position: "absolute", zIndex: 9999, bottom: -16, right: 24 }}>
                            <Text style={[styles.label, { textAlign:"center", fontWeight: 'bold', color: "#000", fontSize: 18, marginTop: 12}]}>{item.data.member?.length < 0 || item.member?.length === undefined ? 0 : item.member?.length}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }

            </View>

            {/* FLOATING BUTTON */}
            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    if(name === "bt_join")
                        setModalVisible(true)
                    else if(name === "bt_create")
                        navigation.navigate("CreateCommunity")
                }}
                distanceToEdge={{
                    vertical: 48,
                    horizontal: 32
                }}
                
            />

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible) }
            style={{ overlay: { background: '#fff' } }}
        >
            <ScrollView style={{marginTop: "100%", backgroundColor: "#000", borderRadius: 16, padding: 24, paddingTop: 32 }}>
                <Image source={require("../../../assets/images/userIcon.png")} />
                <Text style={[ styles.title, { marginBottom: 32 } ]}>Enter code to join</Text>
                <View style={ styles.inputWrapper }>
                    <LockClosedIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                    <TextInput 
                        style={ styles.textInput }
                        placeholder="Code..."
                        placeholderTextColor="#8B8B8B"
                        
                    />
                </View>
                
                <View style={{ borderRadius: 6, width: "100%" }}>
                    <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }}>
                        <Text style={ styles.btnText }>JOIN</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </Modal>

            
        </ScrollView>
    )
}

export default Community
