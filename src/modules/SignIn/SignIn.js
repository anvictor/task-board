import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'
import './SignIn.css'


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.classes = makeStyles(theme => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));

    this.state = {
      email:"",
      emailValid: false,
      emailMatched: false,
      password:"",
      passwordValid: false,
      passwordMatched: false,
      btnDisabled: true,
      users: [],
      path: "",
      error: false
    };


    this.validateField = this.validateField.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  validateField(e) {
    const inputName = e.target.name;
      const inputValue = e.target.value;
      let { emailValid, passwordValid, emailMatched, passwordMatched} = this.state;

    switch (inputName) {
      case 'email':
        //Devise library
        emailValid = inputValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        emailMatched = this.checkUser(inputValue);
        this.setState({
          emailValid: !!emailValid,
          email: inputValue,
          emailMatched: emailMatched
        });
        break;
      case 'password':
        passwordValid = inputValue.length >= 6;
        passwordMatched = this.checkUser(inputValue);
        this.setState({
          passwordValid: passwordValid,
          password: inputValue,
          passwordMatched: passwordMatched
        });
        break;
      default:
        break;
    }
    if (emailValid && passwordValid){
      this.setState({
        btnDisabled: false,
      });
    }
    if (emailMatched && passwordMatched){
      let userId = this.state.users.forEach((user)=>{
        console.log('user.email === emailMatched ********',user.email , this.state.email);
        if (user.email === this.state.email){
          this.setState({
            path: '/task-board/tasks',
            user: user,
          });
        }
      });
    }
  }

  checkUser(inputValue){
    let res = false;
    let users = this.state.users;
    users.forEach(user => {
      if (user.email === inputValue ){
        res = true
      }
      if (user.pass === inputValue ){
        res = true
      }
    });
    return res
  }

  submitHandler(){
    console.log('this.state.user', this.state.user);
    if (!this.state.path){
      this.setState({error: true})
    }else{
      this.props.setContact(this.state.user);
    }
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/anvictor/fakeJson/users')
      .then(response => response.json())
      .then(users => {
        this.setState({ users: users });
      });
  }

  render() {
    console.log(this.state.users);
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={this.classes.paper}>
          <Avatar className={this.classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={this.classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={this.state.emailValid?"Email valid":"Enter Email"}
              name="email"
              autoFocus
              value={this.state.email}
              onChange={this.validateField}
              onBlur={this.validateField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={this.state.passwordValid?"Password valid":"Enter Password at least 6 symbols"}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.validateField}
              onBlur={this.validateField}
              value={this.state.password}
            />
            <Link to = {this.state.path}
               onClick={this.state.btnDisabled?null:this.submitHandler}
               className={this.state.btnDisabled?"button-disabled":"button"}>
                  Sign In
            </Link>
          </form>
          <table className={"blueTable"}>
            <thead>
            <tr>
              <th>Login</th>
              <th>Password</th>
            </tr>
            </thead>
            <tbody>
            {this.state.users.map((user)=>
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.pass}</td>
            </tr>
            )}
            </tbody>
          </table>
        </div>
        <div className={this.state.error?"error-visible":"error"}>
          wrong email or password
        </div>
      </Container>
    );
  }

}

export default SignIn
