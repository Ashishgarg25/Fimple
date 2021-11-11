import React, { useState, useEffect } from 'react'
import { Text, View, Image, ScrollView, FlatList, Dimensions, TextInput, Pressable, TouchableOpacity, Modal } from 'react-native'
import { SearchIcon, PencilIcon, SparklesIcon, LockClosedIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';
import { UserGroupIcon as UserGroupIconOutline } from "react-native-heroicons/outline";
import styles from '../../../utils/styles/styles';

const Category = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={{ flex: 1, marginBottom:16 }}>
            <View style={{ backgroundColor: "#000", paddingVertical: 16, marginBottom: 32, paddingBottom: 0 }}>
                <Text style={[ styles.title, { paddingLeft: 16 } ]}>Communities</Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 16, paddingLeft: 16 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Community")}>
                        <Text style={[styles.label, { fontWeight: "bold" }]}>JOINED</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Community")}>
                        <Text style={[styles.label, { fontWeight: "bold", marginLeft: 64 }]}>EXPLORE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Category")}>
                        <Text style={[styles.label, { fontWeight: "bold", marginLeft: 64, color: "#63D879", borderBottomWidth: 2, borderBottomColor: "#63D879" }]} >CATEGORY</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginHorizontal: 16 }}>
                <Text style={[styles.label, { fontWeight: "bold", fontSize: 18 }]}>Latest Releases</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 8 }}>
                    <TouchableOpacity style={{ backgroundColor: "#FF0055", flex: 1, alignSelf:"stretch", height: 100, borderRadius: 6, padding: 8, paddingLeft: 16 }}>
                        <Text style={[styles.label, { fontWeight: "bold" }]}>Category 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#6355FF", flex: 1, alignSelf:"stretch", height: 100, borderRadius: 6, padding: 8, paddingLeft: 16, marginLeft: 16 }}>
                        <Text style={[styles.label, { fontWeight: "bold" }]}>Category 2</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 16 }}>
                    <TouchableOpacity style={{ backgroundColor: "#2849BE", flex: 1, alignSelf:"stretch", height: 100, borderRadius: 6, padding: 8, paddingLeft: 16 }}>
                        <Text style={[styles.label, { fontWeight: "bold" }]}>Category 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#EF6539", flex: 1, alignSelf:"stretch", height: 100, borderRadius: 6, padding: 8, paddingLeft: 16, marginLeft: 16 }}>
                        <Text style={[styles.label, { fontWeight: "bold" }]}>Category 4</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginHorizontal: 16, marginTop: 24 }}>
                <Text style={[styles.label, { fontWeight: "bold", fontSize: 18 }]}>Latest Releases</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 8 }}>
                    <TouchableOpacity style={{ backgroundColor: "#11998E", flex: 1, alignSelf:"stretch", height: 100, borderRadius: 6, padding: 8, paddingLeft: 16 }}>
                        <Text style={[styles.label, { fontWeight: "bold" }]}>Category 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#ff5566", flex: 1, alignSelf:"stretch", height: 100, borderRadius: 6, padding: 8, paddingLeft: 16, marginLeft: 16 }}>
                        <Text style={[styles.label, { fontWeight: "bold" }]}>Category 2</Text>
                    </TouchableOpacity>
                </View>
                
            </View>

            <View style={{ marginHorizontal: 16, marginTop: 24 }}>
                <Text style={[styles.label, { fontWeight: "bold", fontSize: 18 }]}>Latest Releases</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 8 }}>
                    <TouchableOpacity style={{ backgroundColor: "#FF9900", flex: 1, alignSelf:"stretch", height: 100, borderRadius: 6, padding: 8, paddingLeft: 16 }}>
                        <Text style={[styles.label, { fontWeight: "bold" }]}>Category 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#6355FF", flex: 1, alignSelf:"stretch", height: 100, borderRadius: 6, padding: 8, paddingLeft: 16, marginLeft: 16 }}>
                        <Text style={[styles.label, { fontWeight: "bold" }]}>Category 2</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>
    )
}

export default Category
