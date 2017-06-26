import React from 'react'
import ReactOnRails from 'react-on-rails'
import HomeContainer from '../containers/HomeContainer'

const Home = (props, _railsContext) => {
  const reactComponent = (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <HomeContainer />
        </div>
      </div>
    </div>
  );
  return reactComponent;
};

ReactOnRails.register( {Home} );
