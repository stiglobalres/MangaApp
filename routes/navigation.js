import React from "react";

import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import List from "../app/list";
import MangaInfo from '../app/manga'
import Pages from "../app/pages";

const Stack = createNativeStackNavigator();

const headerTitle =(title)=>{
    return(
        <View style={{ width:'100%', paddingLeft:15}}>
            <Text style={{ color:'#C4C4BE', fontSize:25, fontWeight:700}}>{title}</Text>
        </View>
    );
}

export default  function RootNavigator({history, navigation, route }) {
    return (
        <NavigationContainer>
            <Stack.Navigator 
      initialRouteName="List"
      screenOptions={{
        headerShown: true,
        headerStyle:{
            backgroundColor: '#302F2F',
        }
      }}>
                <Stack.Screen 
                    name={'List'} 
                    component={List} 
                    options={{
                        headerLeft:null,
                        headerTitle: (props)=> ( headerTitle('Manga') ),
                        headerRight:null,
                        headerShown:false
                    }}
                />
                <Stack.Screen 
                name={'MangaInfo'} component={MangaInfo} 
                options={{
                    headerBackTitle: 'Back',
                    headerTitle: '',
                    headerTintColor: '#ffffff',
                  }}
                />
                <Stack.Screen 
                name={'Pages'} component={Pages} 
                options={{
                    headerBackTitle: 'Back',
                    headerTitle: '',
                    headerTintColor: '#ffffff',
                  }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

