import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PersonSignUp from '../pages/PersonSignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import SupplierDashboard from '../pages/SupplierDashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/person-signup" exact component={PersonSignUp} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />

      <Route path="/dashboard" exact component={SupplierDashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
