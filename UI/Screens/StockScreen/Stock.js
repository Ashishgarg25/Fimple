import React, { useState, useEffect } from 'react'
import { Text, View, Image, ScrollView, FlatList, Dimensions, TextInput, Pressable, TouchableOpacity } from 'react-native'
import { ChevronLeftIcon, SearchIcon } from 'react-native-heroicons/solid';
import styles from '../../../utils/styles/styles';

const Stock = ({ navigation }) => {

    const width = Dimensions.get("window").width;

    return (
        <ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 16 }}>
                <ChevronLeftIcon color="#fff" size={24} onPress={() => navigation.goBack()}/>
                <Text style={ styles.title }>Basket Name</Text>
                <ChevronLeftIcon color="#fff" size={24} style={{ opacity: 0 }}/>
            </View>
            <TouchableOpacity style={{ marginLeft: 16, marginTop: 24, marginRight: 64 }}>
                <Image source={{ uri: "https://img.etimg.com/thumb/msid-82253487,width-210,imgsize-96897,,resizemode-4,quality-100/52-week-highs.jpg" }} style={{ width: width/1.09, height: 200, borderRadius: 12 }}/>
            </TouchableOpacity>

            <View style={{ paddingHorizontal: 16 }}>
                <Text style={[ styles.label, { fontSize: 20, fontWeight: "bold", paddingBottom: 0 } ]}>Basket Details</Text>
                <Text style={[styles.label, { lineHeight: 20, color: "#aaaaaa", marginTop: 16 }]}>Cupidatat nostrud mollit ipsum eiusmod elit reprehenderit. Ad occaecat reprehenderit Lorem deserunt laboris et ex deserunt nulla Lorem do exercitation occaecat proident.</Text>
            </View>

            <View style={{ paddingHorizontal: 16, paddingTop: 24 }}>
                <Text style={[ styles.label, { fontSize: 20, fontWeight: "bold" } ]}>Stocks Included</Text>
                <TouchableOpacity style={{ backgroundColor: "#000", paddingHorizontal: 16, borderRadius: 6, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 }} onPress={() => navigation.navigate("StockDetails")}>
                    <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 16 }] }>SENSEX</Text>
                    <View>
                        <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 0, backgroundColor: "#63D879", paddingHorizontal: 16, color: "#000", borderRadius: 16 }] }>5582</Text>
                        <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 12, color: "#63D879", textAlign: "center", marginTop: 6 }] }>+145</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={{ backgroundColor: "#000", paddingHorizontal: 16, borderRadius: 6, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                    <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 16 }] }>SENSEX</Text>
                    <View>
                        <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 0, backgroundColor: "#f56", paddingHorizontal: 16, color: "#000", borderRadius: 16 }] }>5582</Text>
                        <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 12, color: "#f56", textAlign: "center", marginTop: 6 }] }>+145</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={{ backgroundColor: "#000", paddingHorizontal: 16, borderRadius: 6, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                    <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 16 }] }>SENSEX</Text>
                    <View>
                        <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 0, backgroundColor: "#63D879", paddingHorizontal: 16, color: "#000", borderRadius: 16 }] }>5582</Text>
                        <Text style={ [styles.label, { fontWeight: "bold", paddingBottom: 12, color: "#63D879", textAlign: "center", marginTop: 6 }] }>+145</Text>
                    </View>
                </TouchableOpacity> 
            </View>
        </ScrollView>
    )
}

export default Stock
