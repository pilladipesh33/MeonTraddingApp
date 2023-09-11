import React from 'react';
import {Routes} from './src/navigations/routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
        <Routes />
      {/* </NavigationContainer> */}
    </Provider>
  );
};

export default App;
