import React, {useState, useEffect} from 'react';

import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import store from './../store/store'

import RootNavigator from '../routes/navigation';

const app=()=> {
    return(
        <SafeAreaView style={{ flex:1}}>
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        </SafeAreaView>
    );
}

export default app;