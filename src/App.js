import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import './App.css';


import config from './config'

import Login from './components/Login';
import Signup from './components/Signup';
import Projects from './components/Projects';
import Config from './components/Config';
import api from './services/api'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      showSignUp: false,
    };

    this.loggedIn = this.loggedIn.bind(this);
    this.content = this.content.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleSignupForm = this.toggleSignupForm.bind(this);
    this.loadUserByToken = this.loadUserByToken.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    this.loadUserByToken();
  }

  loadUserByToken () {
    const token = localStorage.getItem(config.localStorageTokenKey);
    if (token) {
      api.get(config.urls.currentUser).then((resp) => {
        this.handleLogin(resp.data)
      }).catch((error) => {
        this.handleLogin(null)
      })
    }
  }

  loggedIn() {
    return !!this.state.user;
  }

  handleLogout() {
    localStorage.removeItem(config.localStorageTokenKey);
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

    return (<Login onLogin={this.loadUserByToken} onShowSignup={this.toggleSignupForm}/>)
  }

  renderHeader() {
    const { user } = this.state

    return (
      <Grid container justify="flex-end">
        {user && <Chip
          avatar={user.userprofile && <Avatar alt="Natacha" src={user.userprofile.avatar} />}
          label={user.username}
          onDelete={this.handleLogout}
        />}
        <Config config={config} />
      </Grid>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <Container fixed>
        <CssBaseline />

        {this.renderHeader()}

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
