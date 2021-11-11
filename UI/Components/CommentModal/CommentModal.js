import React, { useState, useEffect, useCallback } from 'react'
import { Text, StyleSheet, View, TextInput, Modal, Dimensions, ScrollView } from 'react-native'
import { ArrowCircleRightIcon, ChevronLeftIcon, EmojiHappyIcon, LinkIcon, ReplyIcon } from 'react-native-heroicons/solid';
import styles from '../../../utils/styles/styles';
import { GiftedChat, Bubble, Send, InputToolbar, ChatInput } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import GlobalStore from '../../../utils/GlobalStore/GlobalStore';

const CommentModal = ({ modalVisible, setModalVisible, navigation, }) => {

    const width = Dimensions.get("window").width;
    
    const [ buttonState, setButtonState ] = useState(false);
    const [ messages, setMessages ] = useState([]);
    const [ newMessages, setNewMessages ] = useState([]);

    useEffect(() => {  
      const subscribe = firestore().collection('posts').doc(GlobalStore.post.id).onSnapshot(docSnapshot => {
        if(docSnapshot.data() !== undefined){
          const msg = docSnapshot.data().comments.map(item => {
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

    const onSend = useCallback((messages = []) => {

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        console.log("====>msggg", messages)

        messages.map(item => {
          firestore()
          .collection('posts')
          .doc(GlobalStore.post.id)
          .update({
            comments: firestore.FieldValue.arrayUnion({
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
      
      console.log("POST================>",messages)

    return (
        <View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible) }
            
        >
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1F2128", }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 16, marginBottom: 12, alignSelf: "stretch" }}>
                    <ChevronLeftIcon color="#fff" size={24} onPress={() => setModalVisible(false)}/>
                    <Text style={ styles.title }>Comments</Text>
                    <ChevronLeftIcon color="#fff" size={24} style={{ opacity: 0 }}/>
                </View>

                <View style={{ flex:1, width: "100%" }}>
                    <GiftedChat 
                        messages={messages.sort((a,b) => a < b)}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: GlobalStore.user.uid,
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
                
            </ScrollView>
        </Modal>
        </View>
    )
}

export default CommentModal

const newStyles = StyleSheet.create({
    giftedChatInput: {
        backgroundColor: "#363943",
        color: "#fff",
        borderTopWidth: 0,
        paddingVertical: 12,
        paddingLeft: 24,
    },
})
