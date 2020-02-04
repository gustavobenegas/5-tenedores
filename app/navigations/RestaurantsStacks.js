import {  createStackNavigator } from 'react-navigation-stack';
import RestaurantsScreen from '../screens/Restaurants/Restaurants';
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurants';

const RestaurantsScreenStacks =createStackNavigator({
    Restaurants:{
        screen: RestaurantsScreen,
        navigationOptions:() => ({
            title:"Restaurantes"
        })
    },
    AddRestaurantScreen:{
        screen: AddRestaurantScreen,
        navigationOptions: () => ({
            title:" Nuevo restaurante"
        })
    }
});

export default RestaurantsScreenStacks;