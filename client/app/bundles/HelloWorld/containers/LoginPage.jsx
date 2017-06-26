import React from 'react'
import ReactOnRails from 'react-on-rails'
import LoginForgetPassword from '../components/LoginForgetPassword'
import LoginSignUp from '../components/LoginSignUp'
import TextField from '../components/TextField'
import RegisterHeader from '../components/RegisterHeader'
import SubmitButton from '../components/SubmitButton'
import Error from '../components/Error'

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  user:
                  {
                    email: '',
                    password: ''
                  },
                  errors: {},
                  items: [],
                  translation: this.props.data.translation,
                };
  }

// TextBox's Onchange
  updateLogin(e) {
    var newUser = this.state.user;
    newUser.email = e.target.value;
    this.setState({user: newUser});
  }

  updatePassword(e) {
    var newUser = this.state.user;
    newUser.password = e.target.value;
    this.setState({user: newUser});
  }

  show_error = () => {
    this.state.items = []
    var pairs = this.state.items;
    pairs.push(this.state.errors.error);
    this.setState({items: pairs});
    console.log(this.state.items);
  }

  submitPage(e){
    e.preventDefault();
    var data = {
      user: this.state.user
    }
    console.log(data);
    // Submit form via jQuery/AJAX
    $.ajax({
        url: '/users/sign_in',
        type: 'POST',
        data: data,
        dataType: "json",
        success: () => {
          console.log("Logged In");
          console.log(data);
          this.setState({
            user: {
              email: '',
              password: '',
            },
            errors: {}
          });

          window.location.pathname = "/";
          window.location.href = "/";

        },
        error: (xhr) => {
          var jsonResponse = JSON.parse(xhr.responseText);
          console.log(jsonResponse);
          this.setState({errors: jsonResponse});
          this.show_error();
        }
      });
  }

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
          <h3>Welcome to Login</h3>
         <form role='form' acceptCharset="UTF-8" action='/users/sign_in' method='post' onSubmit={this.submitPage.bind(this)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" type="text" required="" name="user[email]" value={this.state.user.email} onChange={this.updateLogin.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password</label>
              <input className="form-control" type="password" required="" name="user[password]" value={this.state.user.password} onChange={this.updatePassword.bind(this)} />
            </div>
            <SubmitButton submit="Submit"></SubmitButton>
            <LoginForgetPassword forgot_password={this.state.translation.forgot_password}/>
            <LoginSignUp sign_up={this.state.translation.sign_up}/>

         </form>
        </div>
      </div>
    );
  }
}
