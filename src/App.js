import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';

import Login from './components/Login';
import Signup from './components/Signup';

import Projects from './components/Projects';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      showSignUp: false
    };

    this.loggedIn = this.loggedIn.bind(this);
    this.content = this.content.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleSignupForm = this.toggleSignupForm.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    this.handleLogin(token ? {} : null)
  }

  loggedIn() {
    return !!this.state.user;
  }

  handleLogout() {
    localStorage.removeItem('token');
    return this.setState({ user: null });
  }

  handleLogin(user) {
    return this.setState({ user });
  }

  toggleSignupForm() {
    this.setState({ showSignUp: !this.state.showSignUp });
  }

  content() {
    if (this.loggedIn()) {
      return (
        <Projects
          handleLogout={this.handleLogout}
          user={this.state.user}
          projects={this.state.user.projects}
        />
      )
    }

    if (this.state.showSignUp) {
      return (<Signup onClose={this.toggleSignupForm}/>)
    }

    return (<Login onLogin={this.handleLogin} onShowSignup={this.toggleSignupForm}/>)
  }

  render() {
    const { classes } = this.props;

    return (
      <Container fixed>
        <CssBaseline />

        <Grid className={classes.root} justify="center" container spacing={3}>
          <Grid item sm={6}>
            { this.content() }
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const styles = {
  root: {
    marginTop: 40,
  },
};

export default withStyles(styles)(App);
