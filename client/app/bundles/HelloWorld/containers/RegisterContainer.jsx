import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import SubmitButton from '../components/SubmitButton'
import RegisterHeader from '../components/RegisterHeader'
import LoginLink from '../components/LoginLink'
import Error from '../components/Error'

export default class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  user: {
                     email: '',
                     password: '',
                     password_confirmation: '',
                   },
                   errors: {},
                   items: [],
                   translation: this.props.data.translation,
                };
  }

// TextBox's Onchange

  updateEmail(e) {
    var newUser = this.state.user;
    newUser.email = e.target.value;
    this.setState({user: newUser});
  }


  updatePassword(e) {
    var newUser = this.state.user;
    newUser.password = e.target.value;
    this.setState({user: newUser});
  }

  updateConfirmPassword = (e) => {
    var newUser = this.state.user;
    newUser.password_confirmation = e.target.value;
    this.setState({user: newUser});
  }

  submitSignUp(e){
    e.preventDefault();
    var data = {
      user: this.state.user
    }
    console.log(data);
    // Submit form via jQuery/AJAX
    $.ajax({
        url: '/users',
        type: 'POST',
        data: data,
        dataType: "json",
        success: (data) => {
          console.log("success ma che"+ data);

          this.setState({
            user: {
              name: '',
              email: '',
              username: '',
              password: '',
              password_confirmation: ''
            },
            errors: {}
          });
          window.location="http://localhost:3000";
        },
        error: (data) => {
          this.setState({errors: data.responseJSON.errors})
          console.log(data.responseJSON.errors);
          this.show_error()
          //console.log("error ma che");
        }
      });
  }
  show_error = () => {
    this.state.items = []
    var pairs = this.state.items

    console.log(this.state.errors.email);

    if (this.state.errors.email != null){
      this.state.errors.email.map(function(player){
        pairs.push("Email " + player);
      })
    }

    if (this.state.errors.password != null){
      this.state.errors.password.map(function(player){
        pairs.push("Password " + player);
      })
    }
    if (this.state.errors.password_confirmation != null){
      this.state.errors.password_confirmation.map(function(player){
        pairs.push("Confirm Password " + player);
      })
    }
    this.setState({items: pairs})
    console.log(this.state.items);
  }

// Form Submit
  render() {
    var errors = this.state.items.map(function(item){
      return (
        <Error error={item} key={item}></Error>
      );
    });
    return (
      <div>
        <div id="floating_alert">
          {errors}
        </div>
        <div className="log-in-track">
          <div className="">
            <h3>Register Now</h3>
            <form role='form' acceptCharset="UTF-8" action='/users' method='post' onSubmit={this.submitSignUp.bind(this)}>

              <div className="form-group">
                <label>Email</label>
                <input className="form-control"
                  type="text"
                  value={this.state.user.email}
                  onChange={this.updateEmail.bind(this)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input className="form-control"
                  type="password"
                  value={this.state.user.password}
                  onChange={this.updatePassword.bind(this)} />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input className="form-control"
                  type="password"
                  value={this.state.user.password_confirmation}
                  onChange={this.updateConfirmPassword.bind(this)}
                />
              </div>
              <SubmitButton submit="Submit"/>
              <LoginLink sign_in={this.state.translation.sign_in}/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
