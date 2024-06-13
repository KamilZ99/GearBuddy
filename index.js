import { registerRootComponent } from 'expo';
import App from './App';
import {AppRegistry} from 'react-native';
import HomeScreen from './src/screens/HomeScreen'; 
import {name as appName} from './app.json';

registerRootComponent(App);
AppRegistry.registerComponent(appName, () => HomeScreen);
