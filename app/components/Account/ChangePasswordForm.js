import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "firebase";
import { reauthenticate } from "../../utils/Api";

export default function ChangePasswordForm(props) {
  const { setIsVisibleModal, toastRef } = props;

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true);

  const updatePassword = () => {
    setError({});
    if(!password || !newPassword || !newPasswordRepeat){
        let objError ={};
        !password && (objError.password= "No pueden estar vacio");
        !newPassword && (objError.newPassword = "No puede estar vacio");
        !newPasswordRepeat && (objError.newPasswordRepeat ="No puede estar vacio");
        setError(objError)
    }else{
        if(newPassword !== newPasswordRepeat){
            setError({
                newPassword:"Las nuevas contraseñas tienen que ser iguales",
                newPasswordRepeat: "Las nuevas contraseñas tienen que ser iguales"
            })
        }else{
            setIsloading(true);
            reauthenticate(password).then(() => {
                firebase.auth().currentUser.updatePassword(newPassword).then(() => {
                    setIsloading(false);
                    toastRef.current.show("Contraseña actualizada correctamente");
                    setIsVisibleModal(false);
                    //firebase.auth().signOut();

                }).catch(() => {
                    setError({general:"Error al actualizar la contraseña"});
                    setIsloading(false);

                })

            }).catch(() =>{
                setError({password:"La contraseña no es correcta"});
                setIsloading(false);
            })
        }
    }
  };

  return (
    <View style={styles.View}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.Input}
        password={true}
        secureTextEntry={hidePassword}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHidePassword(!hidePassword)
        }}
        errorMessage={error.password}
      ></Input>
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.Input}
        password={true}
        secureTextEntry={hideNewPassword}
        onChange={e => setNewPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideNewPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewPassword(!hideNewpassword)
        }}
        errorMessage={error.newPassword}
      ></Input>
      <Input
        placeholder="Repetir Nueva contraseña"
        containerStyle={styles.Input}
        password={true}
        secureTextEntry={hideNewPasswordRepeat}
        onChange={e => setNewPasswordRepeat(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hideNewPasswordRepeat ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat)
        }}
        errorMessage={error.newPasswordRepeat}
      ></Input>
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updatePassword}
        loading={isLoading}
      ></Button>
      <Text>{error.general}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  Input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
