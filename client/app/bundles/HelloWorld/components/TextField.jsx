import React from 'react';
import PropTypes from 'prop-types';

export default class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.value };
  }
  updateTextBox = (e) => {
    this.setState({name: e.target.value})
  }
  render()
  {
    return (
      <div className="form-group">
        <label>{this.props.labeltext}</label>
        <input
          name={this.props.name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          className="form-control"
        />
      </div>
    );
  }
}
