import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigations/routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'

import restaurantReducer from '@/store/reducers/restaurants';

const rootReducer = combineReducers({
  restaurants: restaurantReducer,
});

const store = createStore(rootReducer);


const App = () => (
  <Provider store={store}>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator/>
    </ApplicationProvider>
  </Provider>
);

export default App;