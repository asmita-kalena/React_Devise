import React from 'react'
import ReactOnRails from 'react-on-rails'
import LoginPage from '../containers/LoginPage'

const Login = (props, _railsContext) => {
  const reactComponent = (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <LoginPage {...props} />
        </div>
      </div>
    </div>
  );
  return reactComponent;
};

ReactOnRails.register( {Login} );
