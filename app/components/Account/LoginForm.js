import React,{ useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail} from '../../utils/Validation';
import Loading from '../Loading';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';

function LoginForm(props){
    const {toastRef, navigation} = props;

    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    const login =  async () =>{

        setIsVisibleLoading(true);

        if(!email || !password){
            toastRef.current.show("Todos los campos son obligatorios");
        }else{
            if(!validateEmail(email)){
                toastRef.current.show("El email no es correcto");
            }else{
                // TO Do: logica firebase 
                await firebase.auth().signInWithEmailAndPassword(email, password).then(() =>{
                    console.log("login Correcto");
                    navigation.navigate("MyAccount");
                }).catch(() =>{
                    toastRef.current.show("Email o contraseña incorrecta");
                })
            }

        }

        setIsVisibleLoading(false);
    }


    return(
        <View style={styles.formContainer}>
            <Input 
            placeholder="Correo electronico"
            containerStyle={styles.inputForm}
            onChange={e => setEmail(e.nativeEvent.text)}
            rightIcon={
                <Icon
                type="material-community"
                name="at"
                iconStyle={styles.iconRight}
                ></Icon>
            }
            ></Input>
            <Input
            placeholder="Contraseña"
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={hidePassword}
            onChange={e => setPassword(e.nativeEvent.text)}
            rightIcon={
                <Icon
                type="material-community"
                name={hidePassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress={() => setHidePassword(!hidePassword)}></Icon>
                
            }
            ></Input>
            <Button title="Iniciar sesion"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={login}></Button>
            <Loading isVisible={isVisibleLoading} text="Iniciando sesion"></Loading>
        </View>
    )
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,

    },
    inputForm:{
        width:"100%",
        marginTop:20,

    },
    iconRight:{
        color:"#c1c1c1",

    },
    btnContainerLogin:{
        marginTop:20,
        width:"95%"
    },
    btnLogin:{
        backgroundColor:"#00a680",
    }
})