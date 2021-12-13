import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import makeStore from "./store/makeStore";
import reportWebVitals from './reportWebVitals';
import { PersistGate } from "redux-persist/integration/react";
import { MainProvider } from './context/mainContext'
import MainLayout from './components/mainLayout';
import MainSpinner from './components/utils/mainSpinner';
import { SnackbarProvider } from 'notistack';
import { AlertProvider } from './context/alertContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

const { store, persistor } = makeStore();

store.subscribe(() => {
  console.log(store.getState())
})


render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiPickersUtilsProvider utils={MomentUtils} locale={'es'}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <AlertProvider>
            <MainProvider>
              <MainSpinner />
              <MainLayout />
            </MainProvider>
          </AlertProvider>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
