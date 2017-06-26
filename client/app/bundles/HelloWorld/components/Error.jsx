import React from 'react';
import ReactOnRails from 'react-on-rails';
import PropTypes from 'prop-types';

export default class Error extends React.Component {

  render()
  {
    const { error } = this.props;
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }
}
