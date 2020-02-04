import React from 'react';
import { Icon } from 'react-native-elements'; // se llama a react y a react.elements para custimizacion

import { createAppContainer} from 'react-navigation';  //NAVEGADOR DE REACT
import { createBottomTabNavigator} from 'react-navigation-tabs';

import RestaurantsScreenStacks from './RestaurantsStacks'; // se llama al archivo  restaurantsStack
import TopListScreenStacks from './TopListStacks'; // se llama al archivo topListcreen
import SearchScreenStacks from './SearchStacks';  // se llama al archivo searchStacks
import AccountScreenStacks from './AccountStacks';  // se llama al archivo AccountScreenStacks

const NavigationStacks = createBottomTabNavigator({
    //stack de navegacion
    Restaurants:{                               //es un tab la cual llama al sreen de restaurantes
        screen: RestaurantsScreenStacks,
        navigationOptions: () => ({
            tabBarLabel:"Restaurantes",
            tabBarIcon:({ tintColor}) => (
                <Icon type="material-community" name="compass-outline" size={22} color={tintColor}>

                </Icon>
            )
        })
    },
    TopLists:{                                    //es un tab la cual llama al sreen de TopRestaurantes
        screen: TopListScreenStacks,
        navigationOptions:() => ({
            tabBarLabel:"Ranking",
            tabBarIcon:({ tintColor }) =>(
                <Icon type="material-community" name="star-outline" size={22} color={tintColor}>

                </Icon>
            )
        })
    },
    Search:{
        screen:SearchScreenStacks,
        navigationOptions:() => ({
            tabBarLabel:"Buscar",
            tabBarIcon:({tintColor}) => (
                <Icon type="material-community" name="magnify" size={22} color={tintColor}>

                </Icon>

            )
        })
    },
    MyAccount:{
        screen:AccountScreenStacks,
        navigationOptions:() => ({
            tabBarLabel:"Mi Cuenta",
            tabBarIcon:({tintColor}) => (
                <Icon type="material-community" name="home-outline" size={22} color={tintColor}>

                </Icon>

            )
        })
    }
},
{
    initialRouteName:"Restaurants",
    order:["Restaurants","TopLists","Search","MyAccount"],
    tabBarOptions:{
        inactiveTintColor:"#646464",
        activeTintColor:"#00a680"
    }
}
);


export default createAppContainer(NavigationStacks);


