import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    form:{
        width: '80%',
        marginTop: 50,
        alignItems: "center"
    },
    inputLink:{
        borderWidth: 1,
        borderColor: '#000',
        padding: 15,
        borderRadius: 20,
        width: '100%'
    },
    btnEncurta:{
        backgroundColor: '#48b1bf',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginTop: 10
    },
    txtEncurta:{
        color: '#fff',
        fontSize: 15,
        fontWeight: '200',
        textTransform: 'uppercase',
        textAlign: "center"
    },
    lastlink:{
        width: '100%',
        marginTop: 30,
        borderRadius: 5,
        padding: 10
    },
    linkOriginal:{ 
        fontSize: 14, 
        color: '#332E13' 
    },
    txtLottie:{ 
        color: '#000', 
        fontWeight: '100', 
        fontSize: 15 
    }

  });  

export default styles