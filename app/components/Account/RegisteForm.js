import React,{ useState} from "react";
import { StyleSheet, View} from "react-native";
import { Input, Icon, Button } from "react-native-elements";

import { validateEmail} from '../../utils/Validation';

import firebase from 'firebase';
import Loading from '../Loading';
import { withNavigation} from 'react-navigation';

function RegisterForm(props) {
    
    const {toastRef, navigation} = props;
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepeatPassword, setHideRepeatPassword] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const register= async () => {


      setIsVisibleLoading(true);
       
      if (!email || !password || !repeatPassword){
        console.log("todos los campos son obligatorios");
        toastRef.current.show("Todos los campos son obligatorios");
      }else {
        if (!validateEmail(email)){
          console.log("el email no es correcto");
          toastRef.current.show("El email no es correcto");
        }else{
          if(password !== repeatPassword){
            console.log("las contraseñas no son iguales");
            toastRef.current.show("Las contraseñas no son iguales");
          }else{
            console.log("correcto...");

            await firebase.auth().createUserWithEmailAndPassword(email,password).then(() => {
              console.log('usuario creado correctamente');
              navigation.navigate("MyAccount");
            }).catch(() => {
              console.log("error al crear la cuenta, intentelo mas tarde");
              toastRef.current.show("Error al crear la cuenta, Por favor intentelo mas tarde");
            })
          }
        }
      }

      setIsVisibleLoading(false);
    };


  return (
    <View style={styles.formcontainer} behavior="padding" enabled>
      <Input
        placeholder="correo Electronico"
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
            onPress={() => setHidePassword(!hidePassword)}
          ></Icon>
        }
      ></Input>
      <Input
        placeholder="Confirmar contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={hideRepeatPassword}
        onChange={e => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassword ? "eye-outline": "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          ></Icon>
        }
      ></Input>
      <Button
      title="Unirse"
      containerStyle={styles.btnContainerRegister}
      buttonStyle={styles.btnRegister}
      onPress={register}></Button>
      <Loading text="Creando Cuenta" isVisible={isVisibleLoading}></Loading>
    </View>
  );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainerRegister:{
      marginTop:20,
      width:"95%",

  },
  btnRegister:{
      backgroundColor:"#00a680",

  }
});
