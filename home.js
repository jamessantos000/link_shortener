import { StatusBar } from 'expo-status-bar';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';
import styles from './src/styles';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinkContext } from './context/context';

export default function Home() {
  const { newLink, linksData, setLinksData, saveStorage } = useContext(LinkContext) // CONTEXT API
  const navigation = useNavigation()
  const [link, setLink] = useState(null) // TEXTO URL A SER ENCURTADA
  const [erro, setErro] = useState(null)
  const [load, setLoad] = useState(null)
  const [linkReturn, setLinkReturn] = useState(null)

  function criarLink() {
    if (link != '' && link != null && link.length > 10) {
      setLoad(true)
      newLink(link, callback => {
        setLink('')
        setLoad(null)
        setLinkReturn(callback)
        Alert.alert("Sucesso",  "Confira o link na tela histórico")
      })
    } else {
      setErro(true)
    }
  }

  if(load === true){
    setTimeout(() => {
      setLoad(null)
    }, 2500);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Lottie
          source={require('./src/carregando.json')}
          style={{ width: 300, height: 300 }} autoPlay loop
        />
        <Text style={styles.txtLottie}>Link encurtado em 3,2,1...</Text>
      </View>

    )
  }

  if (erro === true) {
    setTimeout(() => {
      setErro(null)
    }, 3000);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Lottie
          source={require('./src/erro.json')}
          style={{ width: 300, height: 300 }} autoPlay loop
        />
        <Text style={styles.txtLottie}>INSIRA UMA URL VÁLIDA PARA ENCURTAR</Text>
      </View>

    )
  }

  return (
    <LinearGradient colors={["#1cd8d2", "#93edc7"]} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <StatusBar barStyle="ligt-content" />

      <View style={{ alignItems: 'center' }}>
        <Lottie source={require('./src/link.json')} style={{ width: 200, height: 200 }} autoPlay loop />
        <Text style={{ fontSize: 20, fontWeight: '100' }}>Encurtador de link</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          value={link}
          onChangeText={setLink}
          placeholder="Digite o link com http://"
          style={styles.inputLink}
        />
        <TouchableOpacity style={styles.btnEncurta} onPress={() => criarLink()}>
          <Text style={styles.txtEncurta}>Encurtar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnEncurta} onPress={() => navigation.navigate('History')}>
          <Text style={styles.txtEncurta}>Histórico de link</Text>
        </TouchableOpacity>

        <View style={styles.lastlink}>
          <Text>Ultimo link:</Text>
          <Text>{linkReturn != null ? linkReturn : ''}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}