import React,{useState} from 'react';
import { SocialIcon} from 'react-native-elements';
import firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { FacebookApi} from '../../utils/Social';
import Loading from '../Loading';
import { Alert } from 'react-native';

export default function LoginFacebook(props){

    const { toastRef, navigation} = props;
    const [isLoading, setIsLoading] = useState(false);

    async function login(){
        try{
            await Facebook.initializeAsync('561013641416188');
            const {type, token, expires, 
                permissions, declinedPermissions,} = await Facebook.logInWithReadPermissionsAsync({
                    permissions:['public_profile'],
                });
                if (type === 'success'){
                    setIsLoading(true);
                    const credentials = firebase.auth.FacebookAuthProvider.credential(token);
                    await firebase.auth().signInWithCredential(credentials).then(() => {
                        navigation.navigate("MyAccount");
                    }).catch(() => {
                        console.log("error");
                        toastRef.current.show("Error accediendo con Facebook, intentelo mas tarde");
                    })
                }else if (type === "cancel") {
                    toastRef.current.show("Inicio de sesion cancelado");
                    console.log("cancelado");

                }else{
                    toastRef.current.show("Error desconocido, intentelo mas tarde");
                    console.log("Error desconocido");
                }
                setIsLoading(false);

        }catch({message}){
            alert(`Facebook login Error: ${message}`);
        }
    };

    return(
        <>
        <SocialIcon
        title="Iniciar sesion con facebook"
        button
        type="facebook"
        onPress={login}/>
        <Loading isVisible={isLoading} text="Iniciando sesion"/>
        </>
        
    );
}