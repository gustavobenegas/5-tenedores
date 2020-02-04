import React,{useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Input , Button } from 'react-native-elements';
import firebase from 'firebase'; 
import { reauthenticate} from '../../utils/Api';

export default function ChangeEmailForm(props){
    const {email, setIsVisibleModal, setReloadData, toastRef} = props;
    const [newEmail,setNewEmail]= useState("");
    const [ password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [ hidePassword, setHidePassword ] =useState(true);
    const [isLoading, setIsloading] = useState(false);

    const updateEmail = ()=>{
        setError({});
        if(!newEmail || email=== newEmail){
            setError({email:"El email no puede ser igual o no puede estar vacio"});
        }else{
            setIsloading(true);
            reauthenticate(password).then(() => {
                firebase.auth().currentUser.updateEmail(newEmail).then(() => {
                    setIsloading(false)
                    setReloadData(true)
                    toastRef.current.show("Email actualizado correctamente")
                    setIsVisibleModal(false);

                }).catch(() => {
                    setError({email:"Error al actualizar el email."})
                    setIsloading(false)
                })

            }).catch(() => {
                setError({password: "la contraseña no es correcta"});
                setIsloading(false);
            })
        }
        console.log('email actualizado')
    }


    return(
        <View style={styles.view}>
            <Input
            placeholder="Correo Electronico"
            containerStyle={styles.Input}
            defaultValue={email && email}
            onChange={e => setNewEmail(e.nativeEvent.text)}
            rightIcon={{
                type:"material-community",
                name:"at",
                color:"#c2c2c2"
            }}
            errorMessage={error.email}

            ></Input>
            <Input
            placeholder="Contraseña"
            containerStyle={styles.Input}
            password={true}
            secureTextEntry={hidePassword}
            onChange={ e => setPassword(e.nativeEvent.text)}
            rightIcon={{
                type:"material-community",
                name:hidePassword ? "eye-outline": "eye-off-outline",
                color:"#c2c2c2",
                onPress:() => setHidePassword(!hidePassword)
            }}
            errorMessage={error.password}
            ></Input>
            <Button
            title="Cambiar Email"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={updateEmail}
            loading={isLoading}
            ></Button>
        </View>
    );
}

const styles= StyleSheet.create({
    view:{
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
    },
    Input:{
        marginBottom:10,
        marginTop:10,
    },
    btnContainer:{
        marginTop:20,
        width:"95%"
    },
    btn:{
        backgroundColor:"#00a680"
    }
})