import React, { Component } from 'react';
import axios from 'axios';

  class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameLogin : '',
      passwordLogin : '' ,
      usernameRegistration : '',
      passwordRegistration : '',
      confirmPassword : '',
      error: '123'
    }
    this.onHandleSubmitLogin = this.onHandleSubmitLogin.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }
  
    onHandleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
    
    onHandleSubmitLogin = (event) => {
      axios.post('/usersLogin', {
        usernameLogin: this.state.usernameLogin,
        passwordLogin: this.state.passwordLogin,
      })
      .then(function (response) {
      console.log(response)
      if(response.data) window.location.href = '/app'
      })
      .catch(function (error) {
        console.log(error);
      });
      event.preventDefault();
    }

    onHandleSubmitRegistration = (event) => {
      axios.post('/usersRegistration', {
            usernameRegistration: this.state.usernameRegistration,
            passwordRegistration: this.state.passwordRegistration,
            confirmPasswordRegistration : this.state.confirmPassword
          })
          .then(function (response) {
          // Login.setState({
          //   error : response.data
          // })
          console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
          event.preventDefault();
    }
    render() {
        return (
        <div>
          <div className=" bg-dark text-light">
            <div className = "row">
              <div className = 'col-6' style = {{textAlign : 'center',top : '20px' }}>
              <img  src="http://cdn.dota2.com/apps/dota2/images/nav/logo.png" />
              </div>
              <div className = 'col-6'>
              <form className = 'row' onSubmit = {(event) => this.onHandleSubmitLogin(event)}  >
              <div className = 'col-4'>
      <label>Tên đăng nhập:</label>
      <input onChange = {(event) => this.onHandleChange(event)} className="form-control" name="usernameLogin"/>
    </div>
    <div className = 'col-4'>
      <label>Mật khẩu:</label>
      <input onChange = {(event) => this.onHandleChange(event)} className="form-control" name="passwordLogin"/>
    </div>
    <input className="btn btn-primary mt-4 " type="submit"   value="Đăng nhập" data-test="submit" />

  </form>
  </div>
            </div>
          </div>
          <div class="container mt-5">
  <h2>Tạo tài khoản mới</h2>
  <p>Nhanh chóng dễ dàng</p>
  <form onSubmit = {(event) => this.onHandleSubmitRegistration(event)}>
    <div className="form-group">
      <label>Tên đăng nhập:</label>
      <input onChange = {(event) => this.onHandleChange(event)} className="form-control" name="usernameRegistration"/>
    </div>
    <div class="form-group">
      <label>Mật khẩu:</label>
      <input onChange = {(event) => this.onHandleChange(event)} className="form-control" name="passwordRegistration"/>
    </div>
    <div> 
      <label>Xác nhận lại mật khẩu</label>
      <input onChange = {(event) => this.onHandleChange(event)} className="form-control" name="confirmPassword"/>
     
    </div>
    <div style = {{color:'red'}} className = "mt-3">{this.state.error}</div>
    <input className="btn btn-primary mt-4 " type="submit"   value="Đăng kí" data-test="submit" />
  </form>
      
</div>

</div>
        );
    }
}
export default Login;