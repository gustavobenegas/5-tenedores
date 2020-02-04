import React from 'react';
import { StyleSheet, View, Text, YellowBox } from 'react-native';
import { Avatar} from 'react-native-elements';

import firebase from 'firebase';
import  * as Permissions from 'expo-permissions';
import * as  ImagePicker from 'expo-image-picker';


export default function InfoUser(props){
    const {userInfo: {uid, displayName, email, photoURL}, setReloadData, toastRef, setIsLoading, setTextLoading} = props;
    

    const changeAvatar = async () =>{
        
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermisionCamera = resultPermission.permissions.cameraRoll.status;
        if(resultPermisionCamera === "denied"){
            console.log("Es nesesario permiso");
            toastRef.current.show("Es nesesario aceptar permisos de la galeria");
        }else{
            const  result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]
            });

            if(result.cancelled){
                console.log("has cancelado la geleria");
                toastRef.current.show("Has cerrado la galeria sin seleccionar alguna imagen");

            }else{
                uploadImage(result.uri, uid).then(() => {
                    
                    console.log('Imagen subida correctamente');
                    updatePhotoUrl(uid);
                });
            }
        }

       console.log(resultPermisionCamera);
        
    };

    const uploadImage= async (uri, nameImage) => {
        setTextLoading("Actualizando Avatar");
        setIsLoading(true);
       const response = await fetch(uri);

       const blob = await response.blob();
      
       YellowBox.ignoreWarnings(['Setting a timer']);
       console.log(JSON.stringify(response));
       const ref = firebase.storage().ref().child(`avatar/${nameImage}`);

       return ref.put(blob);
       YellowBox.ignoreWarnings(['Setting a timer']);

    };

   const updatePhotoUrl = uid => {
        YellowBox.ignoreWarnings(['Setting a timer']);

        firebase
          .storage()
          .ref(`avatar/${uid}`)
          .getDownloadURL()
          .then(async result =>{
            const update = {
                
                photoURL:result
               
            };
            console.log(update);
            await firebase.auth().currentUser.updateProfile(update);
            setReloadData(true);
            setIsLoading(false);
            
        }).catch(() => {
            console.log("error al recuperar el avatar del servidor");
            toastRef.current.show("error al recuperar el avatar del servidor");
        });
        

    };



    return(
        <View style={styles.viewUserInfo}>
            <Avatar 
            rounded
            size="large"
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={styles.userAvatar}
            source={{
                uri:photoURL ? photoURL:"https://api.adorable.io/avatars/285/abott@adorable.png"
            }}></Avatar>
            <View>
                <Text style={styles.displayName}>{displayName ? displayName:"Anonimo"}</Text>
                <Text>{email ? email:"Social Login"}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop:30,
        paddingBottom:30,
    },
    userAvatar:{
        marginRight:20,
    },
    displayName:{
        fontWeight:"bold",
    }
})
