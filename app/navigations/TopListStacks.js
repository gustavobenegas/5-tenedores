import {  createStackNavigator } from 'react-navigation-stack';
import TopRestaurantScreen from '../screens/TopRestaurants';

const TopListScreenStacks = createStackNavigator({
    TopRestaurants:{
        screen:TopRestaurantScreen,
        navigationOptions:()  =>({
            title: "Los mejores restaurantes"
        })
    }
});

export default TopListScreenStacks;