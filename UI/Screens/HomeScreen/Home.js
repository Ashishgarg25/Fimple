import React, { useState, useEffect } from 'react'
import { Text, View, Image, ScrollView, FlatList, Dimensions, TouchableOpacity, ImageBackground, Modal, ToastAndroid } from 'react-native'
import styles from '../../../utils/styles/styles';
import { ChatIcon, HeartIcon, LockClosedIcon, LogoutIcon, ShareIcon, TrendingDownIcon, TrendingUpIcon, UserIcon } from "react-native-heroicons/solid";
import { ChatIcon as ChatIconOutline, ShareIcon as ShareIconOutline, TrendingDownIcon as TrendingDownIconOutline, TrendingUpIcon as TrendingUpIconOutline } from "react-native-heroicons/outline"
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import CommentModal from '../../Components/CommentModal/CommentModal';
import firestore from '@react-native-firebase/firestore';
import GlobalStore from '../../../utils/GlobalStore/GlobalStore';

const DATA=[
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
        title: "Stock market news & other fun stuff",
        no: "100+",
        tag: "Popular"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1633120059477-a05c57ed01d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
        title: "Stock market news & other fun stuff",
        no: "10+",
        tag: ""
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1619445306123-fd2e6f5c9471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
        title: "Stock market news & other fun stuff",
        no: "100+",
        tag: "Popular"
    }
]

const Home = ({route, navigation}) => {

    const width = Dimensions.get("window").width;

    const [ name, setName ] = useState("");
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ post, setPost ] = useState({})

    const { user } = route.params;

    useEffect(() => {
        getUser();
        getPosts();
    },[])

    const getUser = async() => {

        console.log(route.params)

        
        console.log("=================NAME IS============", user)
        setName(user.displayName);
        GlobalStore.user = user;

        // const { uid } = route.params;

        // const user = await firestore().collection('Users').doc(uid).get();
        // setName(user.name)

       
    }

    const getPosts = async() => {

        let newData = [];
        const data = await firestore().collection('posts').get();
        data.docs.map(doc => newData.push({
            data: doc.data(),
            id: doc.id
        }));

        setData(newData)
    }

    console.log("NEW POST DATA IS =============>",data)

    const signOut = () => {
        console.log("working")

        auth()
        .signOut()
        .then(() => {
            ToastAndroid.showWithGravity("Logged out", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            navigation.goBack();
        });
    }

    const addLike = async(item) => {
       
        firestore()
          .collection('posts')
          .doc(item.id)
          .update({
            likes: item.likes.includes(user.uid) ? item.likes.filter(likeId => likeId !== user.uid) : [...item.likes, user.uid],
            likesCount: item.likes ? item.likesCount + 1 : item.likesCount - 1
          })
          .then(() => {
            ToastAndroid.showWithGravity("Like Added", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
          });

         
    }

    const handleCommentBox = (item) => {
        GlobalStore.post = item;
        setModalVisible(true)
    }

    const renderItem = ({item}) => {
        
        return(
            <View style={{ flex:1 }}>
                <View style={{ marginBottom: 16 }} >
                    <ImageBackground source={{ uri: item.data.photo }} style={{ width: width/1.06, height: 240 }} imageStyle={{ borderRadius: 8 }}>
                        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .6)']} style={{ borderRadius: 8 }}>
                            <Text numberOfLines={2} ellipsizeMode="tail" style={ [styles.label, { fontSize: 16, paddingHorizontal: 16, paddingTop: 161 }] }>{item.data.title}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingLeft: 16, paddingBottom: 11 }}>
                                <Image source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" }} style={{ width: 25, height: 25, borderRadius: 30 }} />
                                <Text style={[styles.label, { paddingHorizontal: 12, marginTop: 0, color: "#aaaaaa", paddingBottom: 2 }]}>Admin Name</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: 'flex-end', paddingBottom: 16, paddingTop: 8 }}> 
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} onPress={() => addLike(item.data)}>
                            <TrendingUpIcon color={item.data.likes.includes(user.uid) ? "#63D879" : "#fff"} size={24}/>
                            <Text style={[styles.label, { marginTop: 0, marginHorizontal: 8, paddingTop: 6 }]}>{item.data.likes.length > 0 ? item.data.likes.length : "Likes"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: 24 }} onPress={() => handleCommentBox(item.data)}>
                            <ChatIcon color="#fff" size={24}/>
                            <Text style={[styles.label, { marginTop: 0, marginHorizontal: 8, paddingTop: 6 }]}>{item.data.comments.length > 1 ? item.data.comments.length : "Comments"}</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: 18 }}>
                            <ShareIcon color="#fff" size={24}/>
                            <Text style={[styles.label, { marginTop: 0, marginHorizontal: 8, paddingTop: 6 }]}>Share</Text>
                        </View>

                    </View>
                </View>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[ styles.containerWithoutFlex, { paddingTop: 24, paddingLeft: 11, paddingRight: 0 } ]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', width: width/1.1 }}>
                <Text style={[ styles.title, { fontSize: 18 } ]}>Hi {name}!</Text>
                <LogoutIcon color="#fff" size={18} onPress={() => signOut() }/>
            </View>
            
            <View style={{ flex: 1, marginTop: 32 }}> 
                <FlatList 
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View >

            <CommentModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />

        </ScrollView>
    )
}

export default Home
