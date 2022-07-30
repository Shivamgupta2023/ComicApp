/**
 * @format
 */
 import 'react-native-gesture-handler'
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './redux/Store';
import { Provider} from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const RNRedux = () => (
    <Provider store = {configureStore}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RNRedux));

// AppRegistry.registerComponent(appName, () => App);
