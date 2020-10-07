import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


import axios from 'axios';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null
    };

    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChanged(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChanged(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const {email, password} = this.state;
    const params = { email, password };

    axios.post('http://localhost:8000/api-token-auth/?format=json', params).then((response) => {
      const { token } = response.data;

      console.info('token: ', token)
      axios.defaults.headers.common['Authorization'] = `Token ${token}`

      this.props.onLogin({projects: [1,2,3]}); // TODO: fixit
    }).catch((error) => {
      const {detail, non_field_errors} = error.response.data;

      this.setState({ error: detail || non_field_errors });
    })
    console.info('on submit: ', email, password)
  }

  render() {
    const { error, username, password } = this.state;

    return (
      <form autoComplete="off" onSubmit={this.onSubmit}>
        <Card variant="outlined" >
          <CardContent>
            <Typography variant="h5" component="h2">Login</Typography>
            <Typography color="textSecondary">Enter your data to login</Typography>

            { error && <Typography color="error">{error}</Typography> }

            <TextField label="Login" value={username} onChange={this.onEmailChanged} autoComplete="off" autoFocus required fullWidth variant="outlined" margin="normal" />
            <TextField label="Password" value={password} onChange={this.onPasswordChanged} autoComplete="off" fullWidth required variant="outlined" type="password" />
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" fullWidth color="primary">Login</Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}
export default Login;

