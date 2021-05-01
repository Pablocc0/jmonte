import React from 'react';
import Log, { NOME_USUARIO } from '../services/auth';
import { Route, Redirect } from 'react-router';

const PrivateRoute = props => {
  const isLogado = !!localStorage.getItem(NOME_USUARIO);
  return isLogado ? <Route {...props} /> : <Redirect to="/auth/login" />
}

export default PrivateRoute;