import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../modal";
import ChangeDisplayNameForm from "../Account/ChangeDisplayNameform";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {

  const { userInfo, setReloadData,toastRef} = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const menuOptions = [
    {
      title: "Cambiar Nombre y apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName")
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("Email")
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("Password")
    }
  ];

  const selectedComponent = key => {
    switch (key) {
      case "displayName":
        setRenderComponent(<ChangeDisplayNameForm displayName={userInfo.displayName} setIsVisibleModal={setIsVisibleModal} setReloadData={setReloadData}
        toastRef={toastRef}/>);
        setIsVisibleModal(true);
        console.log("Abriendo Formulario de cambio de nombre");
        break;
      case "Email":
        setRenderComponent(<ChangeEmailForm email={userInfo.email} setIsVisibleModal={setIsVisibleModal} setReloadData={setReloadData}
          toastRef={toastRef}></ChangeEmailForm>);
        setIsVisibleModal(true);
        console.log("abriendo formulario de cambio de email");
        break;
      case "Password":
        setRenderComponent(<ChangePasswordForm  setIsVisibleModal={setIsVisibleModal}
          toastRef={toastRef}></ChangePasswordForm>);
        setIsVisibleModal(true);
        console.log("abriendo formulario de cambio de contraseña");
        break;

      default:
        break;
    }
  };
  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight
          }}
          onPress={menu.onPress}
          containerStyle={StyleSheet.menuItem}
        ></ListItem>
      ))}

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
