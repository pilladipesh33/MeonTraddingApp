import React from 'react';
import {Routes} from './src/navigations/routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';

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
