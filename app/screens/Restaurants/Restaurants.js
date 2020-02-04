import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import AddRestaurant from './AddRestaurants';


export default function Restaurants(props){
    console.log(props);

    const { navigation } = props;

    return(
        <View style={styles.viewBody}>
            <Text>Estamos en Restaurantes</Text>
            <AddRestaurantButton navigation={navigation}></AddRestaurantButton>
        </View>
    );
}

function AddRestaurantButton(props){
    const { navigation } = props;
    return (
        <ActionButton 
        buttonColor="#00a680"
        onPress={() => navigation.navigate('AddResctaurant')}></ActionButton>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
    }
})
