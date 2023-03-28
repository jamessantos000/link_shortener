import Clipboard from "@react-native-community/clipboard";
import React, { useEffect, useContext } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { LinkContext } from "../context/context";
import styles from "../src/styles";

export default function ListLink() {
    const { setLinksData, linksData } = useContext(LinkContext)

    useEffect(() => {
    }, [])

    function copyLink(indexURL){
        const linkCopy = linksData[indexURL][1].toString()
        Clipboard.setString(linkCopy)
        Alert.alert("Sucesso", "Link copiado")
    }

    function delLink(indexLink){
        const linkSelected = linksData[indexLink]
        setLinksData(linksData.filter(links => links != linkSelected))
    }

    const RenderItem = ({ item, index }) => (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: 'rgba(114,238,242,0.2)', margin: 15, borderRadius: 20, padding: 10 }}>
            <View>
                <Text style={styles.linkOriginal}>{item[0]}</Text>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>{item[1]}</Text>
            </View>

            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }} onPress={() => copyLink(index) }>
                <Text style={{color: '#fff'}}>COPIAR LINK</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{display: "flex", alignItems: "center", justifyContent: "center"}} onPress={() => delLink(index) }>
            <MaterialIcons name="delete" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    )

    return (
        <LinearGradient colors={["#149995", "#629E85"]} style={{ flex: 1, paddingTop: 20 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={{ marginTop: 20, width: '100%' }}>
                <FlatList
                    data={linksData}
                    renderItem={RenderItem}
                />
            </View>

        </LinearGradient>
    )
}