import React from 'react';
import { View, StyleSheet, ScrollView,Text,Image } from 'react-native';
import { Button } from 'react-native-elements';

import { withNavigation} from 'react-navigation';

function UserGuest(props){

    const {navigation} = props;
    return (

       <ScrollView style={styles.viewBody} centerContent={true} >
           <Image source={require("../../../assets/img/user-guest.jpeg")}
           style={styles.image}
           resizeMode="contain"></Image>
           <Text style={styles.title}>Consulta tu perfil de 5 tenedores</Text>
           <Text style={styles.description}>Como describiria tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla
           ,vota cual te ha gustado mas y comenta como ha sido tu experiencia.</Text>
           <View style={styles.viewBtn}>
               <Button 
               buttonStyle={styles.btnStyle}
               containerStyle={styles.btncontainer}
               title="Ver tu perfil"
               onPress={() => navigation.navigate("Login") }
               />

           </View>

       </ScrollView>
    );
} 

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,

    },
    image:{
        height:300,
        width:"100%",
        marginBottom:40,
    },
    title: {
        fontWeight: 'bold',
        fontSize:19,
        marginBottom:10,
        textAlign:"center",
    },
    description:{
        textAlign:"center",
        marginBottom:20,

    },
    viewBtn:{
        flex:1,
        alignItems:"center",

    },
    btnStyle:{
        backgroundColor:'#00a680',
    },
    btncontainer:{
        
        width:"70%",
    }
})