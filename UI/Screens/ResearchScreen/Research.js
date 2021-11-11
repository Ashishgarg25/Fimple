import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Text, View, Image, ScrollView, FlatList, Dimensions, TextInput, Pressable, TouchableOpacity, Modal } from 'react-native'
import { SearchIcon } from 'react-native-heroicons/solid';
import styles from '../../../utils/styles/styles';
import axios from 'axios';

const Research = ({ navigation }) => {

    const [ openModal, setOpenModal ] = useState(false);
    const [ searchText, setSearchText ] = useState("")

    const [ data, setData ] = useState([])

    const showResult = () => {

        const region = "IN";

        const config = {
            headers: {
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                'x-rapidapi-key': '4a01d589d6msh0d43b1f33cc9008p105745jsn14a9e364f1ea'
              }
        }

          axios.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=${searchText}&region=${region}`, config)
            .then(({ data }) => {
                console.log(data)
                setData(data.quotes)
            })
    }

    return (
        <ScrollView contentContainerStyle={{ marginVertical: 32 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Text style={[ styles.title, { paddingLeft: 16 } ]}>Research</Text>
                <SearchIcon color="#fff" size={24} style={{ marginRight: 16 }} onPress={() => setOpenModal(true)}/>
            </View>

            <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginTop: 16, marginHorizontal: 8, marginLeft: 16 }} onPress={() => navigation.navigate("Stock")}>
                    <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: 320, height: 200, borderRadius: 12 }}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 16, marginHorizontal: 8  }}>
                    <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: 320, height: 200, borderRadius: 12 }}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 16, marginHorizontal: 8, marginRight: 16  }}>
                    <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: 320, height: 200, borderRadius: 12 }}/>
                </TouchableOpacity>
            </ScrollView>

            <View  style={{ flex: 1, marginTop: 48, marginHorizontal: 16 }}>
                <Text style={ styles.title }>Baskets</Text>

                <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 24, marginBottom: 8 }}>
                    <TouchableOpacity style={{ backgroundColor: "#63D879", paddingHorizontal: 16, borderRadius: 24, marginHorizontal: 4 }}>
                        <Text style={[{ textAlignVertical: 'center', color: "#000", fontWeight: "600", paddingVertical: 6 } ]}>Latest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#000", paddingHorizontal: 16, borderRadius: 24, marginHorizontal: 4 }}>
                        <Text style={[{ textAlignVertical: 'center', color: "#fff", fontWeight: "600", paddingVertical: 6 } ]}>Best Stocks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#000", paddingHorizontal: 16, borderRadius: 24, marginHorizontal: 4 }}>
                        <Text style={[{ textAlignVertical: 'center', color: "#fff", fontWeight: "600", paddingVertical: 6 } ]}>Stocks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#000", paddingHorizontal: 16, borderRadius: 24, marginHorizontal: 4 }}>
                        <Text style={[{ textAlignVertical: 'center', color: "#fff", fontWeight: "600", paddingVertical: 6 } ]}>Stocks</Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View>
                        <View style={{ marginTop: 16 }}>
                            <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: 170, height: 200, borderRadius: 12 }}/>
                        </View>
                        <View style={{ paddingTop: 6 }}>
                            <Text style={[ styles.title, { fontSize: 16 } ]}>Admin Name</Text>
                            <Text style={[ styles.title, { fontSize: 14, color: "#aaaaaa" } ]}>Developer</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <View style={{ marginTop: 16 }}>
                            <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: 170, height: 200, borderRadius: 12 }}/>
                        </View>
                        <View style={{ paddingTop: 6 }}>
                            <Text style={[ styles.title, { fontSize: 16 } ]}>Admin Name</Text>
                            <Text style={[ styles.title, { fontSize: 14, color: "#aaaaaa" } ]}>Developer</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <View style={{ marginTop: 16 }}>
                            <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: 170, height: 200, borderRadius: 12 }}/>
                        </View>
                        <View style={{ paddingTop: 6 }}>
                            <Text style={[ styles.title, { fontSize: 16 } ]}>Admin Name</Text>
                            <Text style={[ styles.title, { fontSize: 14, color: "#aaaaaa" } ]}>Developer</Text>
                        </View>
                    </View>
                </ScrollView>
                
            </View>

            <View  style={{ flex: 1, marginVertical: 48, marginHorizontal: 16 }}>
                <Text style={ styles.title }>Most Popular</Text>

                <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View>
                        <View style={{ marginTop: 16 }}>
                            <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: 170, height: 200, borderRadius: 12 }}/>
                        </View>
                        <View style={{ paddingTop: 6 }}>
                            <Text style={[ styles.title, { fontSize: 16 } ]}>Admin Name</Text>
                            <Text style={[ styles.title, { fontSize: 14, color: "#aaaaaa" } ]}>Developer</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <View style={{ marginTop: 16 }}>
                            <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: 170, height: 200, borderRadius: 12 }}/>
                        </View>
                        <View style={{ paddingTop: 6 }}>
                            <Text style={[ styles.title, { fontSize: 16 } ]}>Admin Name</Text>
                            <Text style={[ styles.title, { fontSize: 14, color: "#aaaaaa" } ]}>Developer</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <View style={{ marginTop: 16 }}>
                            <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: 170, height: 200, borderRadius: 12 }}/>
                        </View>
                        <View style={{ paddingTop: 6 }}>
                            <Text style={[ styles.title, { fontSize: 16 } ]}>Admin Name</Text>
                            <Text style={[ styles.title, { fontSize: 14, color: "#aaaaaa" } ]}>Developer</Text>
                        </View>
                    </View>
                </ScrollView>
                
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={openModal}
                onRequestClose={() => setOpenModal(!openModal) }
                style={{ overlay: { background: '#fff' } }}
            >
                <ScrollView contentContainerStyle={{ height: '45%', marginTop: "auto", backgroundColor: "#000", borderRadius: 16, padding: 24, paddingTop: 32 }}>
                    <Text style={[ styles.title, { marginBottom: 16 } ]}>Search Stocks</Text>
                    <View style={ styles.inputWrapper }>
                        <SearchIcon color="#8B8B8B" size={18} style={ styles.icon }/>
                        <TextInput 
                            style={[ styles.textInput, ]}
                            placeholder="Search..."
                            placeholderTextColor="#8B8B8B"
                            onChangeText={(text) => setSearchText(text)}
                        />
                    </View>
                    <View style={{ borderRadius: 6, width: "100%" }}>
                        <Pressable style={ styles.btn } android_ripple={{ color: "#3CBA53", borderless: false }} onPress={() => showResult()}>
                            <Text style={ styles.btnText }>SEARCH</Text>
                        </Pressable>
                    </View>

                    {
                        data.map(item => (
                            item.exchange === "BSE" ?
                                <TouchableOpacity key={item.symbol} style={{ backgroundColor: "#363943", paddingHorizontal: 16, borderRadius: 6, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 0, paddingBottom: 8 }} onPress={() => setData([]) }>
                                    <Text style={ [styles.label, { fontWeight: "bold" }] }>{item.shortname}</Text>
                                    <View style={{ paddingBottom: 8 }}>
                                        <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 0, backgroundColor: "#63D879", paddingHorizontal: 16, color: "#000", borderRadius: 16 }] }>{item.score}</Text>
                                    </View>
                                </TouchableOpacity> 
                            :
                                <View>
                                    <Text>Nothing to display</Text>
                                </View>
                        ))
                    }
                </ScrollView>
            </Modal>
        </ScrollView>
    )
}

export default Research
