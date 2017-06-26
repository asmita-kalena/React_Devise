import React from 'react';

export default class LoginLink extends React.Component{
  render() {
    return (
      <div>
        <label><a href="/users/sign_in">Login</a></label>
      </div>
    );
  }
}
