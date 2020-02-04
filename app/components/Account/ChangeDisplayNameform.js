import React,{useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from 'firebase';

export default function ChangeDisplayNameForm(props) {

  const {displayName, setIsVisibleModal, setReloadData, toastRef} = props;  
  const [newDisplayName,setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [ isLoading, setIsloading] = useState(false);

  const updateDisplayName = () => {
    console.log("nombre del usuario actualizado");
    setError(null);
    if(!newDisplayName){
        setError("El Nombre de usuario no ha cambiado")
    }else{
        setIsloading(true);
        const update ={
            displayName:newDisplayName
        }

        firebase.auth().currentUser.updateProfile(update).then(() =>{
            setIsloading(false);
            setReloadData(true);
            toastRef.current.show("Nombre actualizado correctamente");
            setIsVisibleModal(false);
        }).catch(() => {
            setError("error al actualizar el nombre");
            setIsloading(false)
        })
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2"
        }}
        errorMessage={error}
      ></Input>
      <Button
        title="Cambiar Nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayName}
        loading={isLoading}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width:"95%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
