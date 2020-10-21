import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowRight from '@material-ui/icons/ArrowRight';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';


import { withStyles } from '@material-ui/core/styles';

import api from '../services/api';
import config from '../config';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        error: null,
        username: {
          value: '',
          error: null,
        },
        password: {
          value: '',
          error: null,
        },
      },
    };

    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUsernameChanged(event) {
    const form = {
      ...this.state.form,
      error: null,
      username: {
        value: event.target.value,
        error: null
      }
    }
    this.setState({ form });
  }

  onPasswordChanged(event) {
    const form = {
      ...this.state.form,
      error: null,
      password: {
        value: event.target.value,
        error: null
      }
    }
    this.setState({ form });
  }

  onSubmit(event) {
    event.preventDefault();

    const { form: { username, password } } = this.state;
    const params = {
      username: username.value,
      password: password.value,
    }

    api.post(config.urls.auth, params).then((response) => {
      const { token } = response.data;

      localStorage.setItem(config.localStorageTokenKey, token);

      this.props.onLogin({ username: params.username }); // TODO: fixit
    }).catch((error) => {
      const { detail, non_field_errors, password, username } = error.response.data;

      const prevForm = this.state.form
      const form = {
        ...prevForm,
        error: detail || non_field_errors,
        username: {
          ...prevForm.username,
          error: username,
        },
        password: {
          ...prevForm.password,
          error: password,
        }
      }

      this.setState({ form });
    })
  }

  render() {
    const { form: { error, username, password} } = this.state;

    return (
      <form autoComplete="off" onSubmit={this.onSubmit} noValidate className={this.props.classes.root}>
        <Card  >
          <CardContent>
            <Typography variant="h5" component="h2">Login</Typography>
            <Typography color="textSecondary">Enter your data to login</Typography>

            <Collapse in={!!error}>
              <Alert severity="error">{error}</Alert>
            </Collapse>

            <TextField
              label="Username"
              value={username.value}
              onChange={this.onUsernameChanged}
              autoComplete="new-password"
              autoFocus
              required
              fullWidth
              margin="normal"
              error={!!username.error}
              helperText={username.error}
            />
            <TextField
              label="Password"
              value={password.value}
              onChange={this.onPasswordChanged}
              autoComplete="new-password"
              fullWidth
              required
              type="password"
              error={!!password.error}
              helperText={password.error}
            />

          </CardContent>
          <CardActions>
            <Grid container justify="flex-end">
              <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button
                  color="default"
                  disableElevation
                  onClick={this.props.onShowSignup}
                >
                  Signup
                </Button>

                <Button
                  startIcon={<ArrowRight />}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  disabled={!!error}
                >
                  Login
                </Button>
              </ButtonGroup>



            </Grid>

          </CardActions>
        </Card>
      </form>
    );
  }
}


const styles = {
  root: {
    width: 400,
    margin: "0 auto"
  },
};

export default withStyles(styles)(Login);

