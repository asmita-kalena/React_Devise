import React from 'react';

export default class RegisterHeader extends React.Component {
render()
  {
    return (
      // <div className="wel-com-tag">{this.props.header}</div>
      <h1 className="text-center">{this.props.header}</h1>
    );
  }
}
