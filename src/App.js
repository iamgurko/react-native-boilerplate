import React, { Component,Fragment } from 'react';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
// import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppTheme from './styles';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (

        <ThemeProvider
            theme={AppTheme}
        >
      <Provider store={store}>
      	<Root>
          <Router />
        </Root>
      </Provider>
        </ThemeProvider>
    );
  }
}

export default App;
