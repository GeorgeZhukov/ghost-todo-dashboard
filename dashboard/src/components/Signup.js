import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowRight from '@material-ui/icons/ArrowRight';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';


import { withStyles } from '@material-ui/core/styles';

import api from '../services/api';


class Signup extends React.Component {
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

        passwordConfirm: {
          value: '',
          error: null,
        },

      },
    };

    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onPasswordConfirmChanged = this.onPasswordConfirmChanged.bind(this);
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

  onPasswordConfirmChanged(event) {
    const form = {
      ...this.state.form,
      error: null,
      passwordConfirm: {
        value: event.target.value,
        error: null
      }
    }
    this.setState({ form });
  }

  onSubmit(event) {
    event.preventDefault();

    const { form: { username, password, passwordConfirm } } = this.state;
    if(username.value.length< 4 ){
      const form = {
        ...this.state.form,

        username: {
          ...this.state.form.username,
          error: 'username is too short',
        }
      }

      this.setState({ form });
      return 
    }

    if(password.value.length < 4 ){
      const form = {
        ...this.state.form,

        passwordConfirm: {
          ...this.state.form.passwordConfirm,
          error: 'password is too short',
        }
      }

      this.setState({ form });
      return 
    }
    if (password.value !== passwordConfirm.value){
      const form = {
        ...this.state.form,

        passwordConfirm: {
          ...this.state.form.passwordConfirm,
          error: 'Passwords do not match',
        }
      }

      this.setState({ form });
      return 
    }
    
    const params = {
      username: username.value,
      password: password.value,
    }

    api.post('/users/', params).then((response) => {
        debugger
      const { token } = response.data;

      localStorage.setItem('token', token);

      this.props.onLogin({ username: params.username }); // TODO: fixit
    }).catch((error) => {
        debugger
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
    const { form: { error, username, password, passwordConfirm} } = this.state;

    return (
      <form autoComplete="off" onSubmit={this.onSubmit} noValidate className={this.props.classes.root}>
        <Card  >
          <CardContent>
            <Typography variant="h5" component="h2">Signup</Typography>
            <Typography color="textSecondary">Enter your data to Signup</Typography>

            <Collapse in={!!error}>
              <Alert severity="error">{error}</Alert>
            </Collapse>

            <TextField
              label="Username"
              value={username.value}
              onChange={this.onUsernameChanged}
              autoComplete="off"
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
              autoComplete="off"
              fullWidth
              required
              type="password"
              error={!!password.error}
              helperText={password.error}
            />
            <TextField
            label="Password confirm"
            value={passwordConfirm.value}
            onChange={this.onPasswordConfirmChanged}
            autoComplete="off"
            fullWidth
            required
            type="password"
            error={!!passwordConfirm.error}
            helperText={passwordConfirm.error}
          />

          </CardContent>
          <CardActions>
            <Grid container justify="flex-end">
              
              <Button
                startIcon={<ArrowRight />}
                type="submit"
                variant="contained"
                color="default"
                disableElevation
                disabled={!!error}
              >
                Signup
              </Button>
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

export default withStyles(styles)(Signup);

