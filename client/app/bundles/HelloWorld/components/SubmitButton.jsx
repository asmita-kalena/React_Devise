import React from 'react';

export default class SubmitButton extends React.Component{

  render() {
    return (
      <div className="submit-tag text-center">
        <input type="submit" className="btn-default btn" value={this.props.submit}/>
      </div>
    );
  }
}
