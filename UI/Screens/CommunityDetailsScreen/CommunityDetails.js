import React, { useState, useEffect, useCallback } from 'react'
import { Text, StyleSheet, View, Image, ScrollView, FlatList, Dimensions, Switch, Pressable, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import { ArrowCircleRightIcon, ChevronLeftIcon, EmojiHappyIcon, LinkIcon, ReplyIcon, ChatIcon, LogoutIcon, ShareIcon, TrendingUpIcon, PlusCircleIcon, DotsVerticalIcon, XIcon } from 'react-native-heroicons/solid';
import styles from '../../../utils/styles/styles';
import { GiftedChat, Bubble, Send, InputToolbar, ChatInput } from 'react-native-gifted-chat'
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import GlobalStore from '../../../utils/GlobalStore/GlobalStore';

const width = Dimensions.get("window").width;

const CommunityDetails = ({ navigation, route }) => {

    const [ buttonState, setButtonState ] = useState(false);
    const [ messages, setMessages ] = useState([]);
    const [ newMessages, setNewMessages ] = useState([]);
    const [ settingModal, setSettingModal ] = useState(false)
    const [ isEnabled, setIsEnabled ] = useState(false);
    const [ isEnabled1, setIsEnabled1 ] = useState(false);
    const [ data, setData ] = useState();

    let id = route.params.id;
    console.log("ID==============>",route)

    useEffect(() => {
        const data = firestore().collection('communities').doc(id).get();
        setIsEnabled(data.isChatable);
        setIsEnabled1(data.isPostable);

        getPosts();
    },[])

    useEffect(() => {  
        const subscribe = firestore().collection('communities').doc(id).onSnapshot(docSnapshot => {
          console.log(docSnapshot.data())
            if(docSnapshot.data() !== undefined){
            const msg = docSnapshot.data().chat.map(item => {
              return {
                _id: item._id,
                text: item.text,
                user: { _id: item.user._id },
                createdAt: item.createdAt.toDate()
              }
              
            })
            setMessages(msg);
          }
          
        })
  
        return () => subscribe();
      },[GlobalStore.post.id])

      const getPosts = async() => {

        let newData = [];
        const data = await firestore().collection('posts').get();
        data.docs.map(doc => newData.push({
            data: doc.data(),
            id: doc.id
        }));

        setData(newData)
    }

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        messages.map(item => {
            firestore()
            .collection('communities')
            .doc(id)
            .update({
              chat: firestore.FieldValue.arrayUnion({
                  _id: item._id,
                  user: { _id: GlobalStore.user.uid },
                  text: item.text,
                  createdAt: item.createdAt
              })
            })
            .then(() => {
              console.log('Comment Added!');
            });
          })

    }, [])

    const onSendChat = useCallback((messages = []) => {
        setNewMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    })

    function renderBubble(props) {
        return (
          // Step 3: return the component
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: "#63D879", 
                paddingHorizontal: 8, 
                paddingVertical: 0, 
                marginRight: 8, 
                marginBottom: 4, 
                borderTopLeftRadius: 999, 
                borderBottomRightRadius: 999, 
                borderBottomLeftRadius: 999, 
                borderTopRightRadius: 99 
              },
              left:{
                backgroundColor: "#2E2E32", 
                paddingHorizontal: 8, 
                paddingVertical: 0, 
                marginRight: 8, 
                marginBottom: 4, 
                borderTopRightRadius: 999, 
                borderBottomRightRadius: 999, 
                borderBottomLeftRadius: 999, 
                borderTopLeftRadius: 99
              }
            }}
            textStyle={{
              right: {
                color: '#000'
              },
              left: {
                color: '#fff'
              }
            }}
          />
        );
      }

      function renderSend(props) {
        return (
          // Step 3: return the component
            <Send {...props}>
                <View style={{ margin: 16 }}>
                    <ArrowCircleRightIcon color="#63D879" size={42} style={{ bottom: 20, right: 8 }} />
                </View>
            </Send>
        );
      }

      function renderInputToolbar(props){
          return(
            <InputToolbar
                {...props}
                containerStyle={ newStyles.giftedChatInput }
            />
          )
      }

      const save = () => {
        firestore()
        .collection('communities')
        .doc("8xZ1z9uGgQwVGZGXEEOq")
        .update({
            isChatable: isEnabled,
            isPostable: isEnabled1,
        })
      }
    

    return (
        <ScrollView contentContainerStyle={{ marginVertical: 6, marginTop: 0 }}>
            <View style={{ backgroundColor: "#000", paddingVertical: 16, marginBottom: 32, paddingBottom: 0 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={[ styles.title, { paddingLeft: 16 } ]}>Communities</Text>
                    <DotsVerticalIcon color="#fff" style={{ marginRight: 16 }} onPress={() => setSettingModal(true)}/>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 16, paddingLeft: 16 }}>
                    <TouchableOpacity onPress={() => setButtonState(false)}>
                        <Text style={[styles.label, { fontWeight: "bold", color: !buttonState ? "#63D879" : "#fff", borderBottomWidth: !buttonState ? 2 : 0, borderBottomColor: "#63D879" }]}>DISCUSSION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setButtonState(true)}>
                        <Text style={[styles.label, { fontWeight: "bold", marginLeft: 64, color: buttonState ? "#63D879" : "#fff", borderBottomWidth: buttonState ? 2 : 0, borderBottomColor: "#63D879" }]}>CHAT</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {
                !buttonState ?
                    <View style={{ flex: 1 }}>
                        
                        {
                            data?.map(item => (
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
                                            <TrendingUpIcon color={item.data.likes.includes(GlobalStore.user.uid) ? "#63D879" : "#fff"} size={24}/>
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
                            ))
                        }

                        <TouchableOpacity style={{ position: "absolute", bottom: 16, right: 16, borderRadius: 32, backgroundColor: "#000" }} onPress={() => navigation.navigate("Post")}>
                            <PlusCircleIcon size={64} color="#63D879"  />
                        </TouchableOpacity>
                    </View>
                :
                    <View style={{ height: 645 }}>
                       
                        <GiftedChat 
                             messages={messages.sort((a,b) => a < b)}
                             onSend={messages => onSend(messages)}
                             user={{
                                 _id:  GlobalStore.user.uid,
                             }}
                             alwaysShowSend
                             renderSend={renderSend}
                             renderBubble={renderBubble}
                             renderInputToolbar={renderInputToolbar}
                             textInputStyle={{
                                 color: "#fff"
                             }}
                             scrollToBottom
                             alignTop
                             infiniteScroll
                        />
                    </View>
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={settingModal}
                onRequestClose={() => setSettingModal(!settingModal) }
                
            >
                <View style={{ backgroundColor: "#000", marginTop: "100%", paddingBottom:32 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={[ styles.title, { padding: 16, paddingTop: 24 } ]}>Settings</Text>
                        <XIcon color="#fff" style={{ marginRight: 16 }} onPress={() => setSettingModal(false)}/>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 24 }}>
                        <Switch
                            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginLeft: 16 }}
                            trackColor={{ false: "#767577", true: "#63D879" }}
                            thumbColor={isEnabled ? "#363943" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(val) => setIsEnabled(val) }
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
                            onValueChange={(val) => setIsEnabled1(val)}
                            value={isEnabled1}
                        />
                        <Text style={[styles.label, { marginTop: 2, paddingLeft: 16, fontWeight: "bold", fontSize: 16 }]}>Members can chat</Text>
                    </View>

                    <View style={{ borderRadius: 6, width: "92%", marginHorizontal: 16, marginTop: 72, marginBottom: 32 }}>
                        <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => save()}>
                            <Text style={ styles.btnText }>SAVE</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    )
}

export default CommunityDetails

const newStyles = StyleSheet.create({
    giftedChatInput: {
        backgroundColor: "#363943",
        color: "#fff",
        borderTopWidth: 0,
        paddingVertical: 12,
        paddingLeft: 24,
    },
})
