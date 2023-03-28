import React, { createContext, useEffect, useState } from "react"
export const LinkContext = createContext({})
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from "react-native"
import axios from "axios"

export default function LinkProvider({ children }) {
    const [linksData, setLinksData] = useState([]) // TODOS OS LINKS ENCURTADOS NO STORAGE 

    useEffect(() => {
        getLinksData()
    }, [])

    useEffect(() => {
        linksData.length !== 0 ? saveStorage(linksData) : saveStorage([])
    }, [linksData])

    const saveStorage = async (saveLink) => {
        try {
            await AsyncStorage.setItem('@links', JSON.stringify(saveLink))
        } catch (e) {
            console.log(e)
        }
    }

    const getLinksData = async () => {
        try {
            const linksDataG = await AsyncStorage.getItem('@links')
            if (JSON.parse(linksDataG) !== null) {
                setLinksData(JSON.parse(linksDataG))
            }
        } catch {
            Alert.alert("Erro", "Não foi possível recuperar seu histórico de links agora")
        }
    }

    async function newLink(link, callback) {
        const encoded = encodeURIComponent(link)
        await axios.get(`https://api.rebrandly.com/v1/links/new?destination=${encoded}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'apikey': 'SUA CHAVE API',
                'Host': 'api.rebrandly.com'
            },
        })
            .then(res => {
                const array = { originalURL: link, shortURL: res.data.shortUrl }
                const obj = Object.values(array)
                setLinksData([...linksData, obj])
                callback(res.data.shortUrl)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <LinkContext.Provider value={{
            newLink, // Recebido valor para encurtar o link
            linksData, setLinksData, // Array que recupera lista de links encurtados
            saveStorage
        }} >
            {children}
        </LinkContext.Provider>
    )
}