import React from 'react'
import ReactOnRails from 'react-on-rails'
import ForgetPasswordContainer from '../containers/ForgetPasswordContainer'

const ForgetPassword = (props, _railsContext) => {
  const reactComponent = (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <ForgetPasswordContainer {...props} />
        </div>
      </div>
    </div>
  );
  return reactComponent;
};

ReactOnRails.register( {ForgetPassword} );
