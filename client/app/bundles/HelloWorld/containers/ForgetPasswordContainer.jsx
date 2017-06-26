
import React from 'react'
import ReactOnRails from 'react-on-rails'
import LoginSignUp from '../components/LoginSignUp'
import TextField from '../components/TextField'
import SubmitButton from '../components/SubmitButton'
import Error from '../components/Error'

export default class LoginForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  user:
                  {
                    email: '',
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

    show_error = () => {
      //console.log(this.state.errors.errors.email);
      this.state.items = []
      var pairs = this.state.items

      pairs.push(this.state.errors.errors.email);
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
        url: '/users/password',
        type: 'POST',
        data: data,
        dataType: "json",
        success: () => {
          console.log("success ma che");
          //console.log(data);
          this.setState({
            user: {
              email: '',
            },
            errors: {}
          });
          //
          // window.location.pathname = "/";
          // window.location.href = "/";

        },
        error: (xhr) => {
          //console.log(JSON.parse(xhr.responseText));
          //console.log("error ma che");

          var jsonResponse = JSON.parse(xhr.responseText);
          //console.log(jsonResponse);
          this.setState({errors: jsonResponse});
          //console.log(this.state.errors.errors.email);
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
          <h3>Forget Password</h3>
         <form role='form' acceptCharset="UTF-8" action='/users/sign_in' method='post' onSubmit={this.submitPage.bind(this)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" type="text" required="" name="user[email]" value={this.state.user.email} onChange={this.updateLogin.bind(this)} />
            </div>
            <SubmitButton submit="Send me reset password intruction"></SubmitButton>
            <LoginSignUp sign_up={this.state.translation.sign_up}/>

         </form>
        </div>
      </div>
    );
  }
}







// import React from 'react';
//
// export default class LoginPassword extends React.Component{
//   render() {
//     return (
//       <div className="">
//         <label><a href="/users/password/new">Forgot Password</a></label>
//       </div>
//     );
//   }
// }
