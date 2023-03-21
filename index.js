import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {AppProvider} from './src/AppProvider';

// DebugUtil.enableMobxLogs();
AppRegistry.registerComponent(appName, () => AppProvider);
