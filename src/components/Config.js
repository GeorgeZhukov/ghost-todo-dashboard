import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LinkIcon from '@material-ui/icons/Link';
import SettingsIcon from '@material-ui/icons/Settings';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

class Config extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      config: props.config,
      show: false,
    }

    this.renderUrls = this.renderUrls.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.toggleConfig = this.toggleConfig.bind(this);
    this.renderShowConfigBtn = this.renderShowConfigBtn.bind(this);
  }

  componentDidMount() {
    return this.setState({
      config: this.props.config,
    })
  }

  renderUrls() {
    const buildUrl = (path) => [this.state.config.apiUrl, path].join('')

    const renderItem = ([name, path]) => {
      const url = buildUrl(path);
      return (
        <ListItem button key={path} onClick={() => window.open(url)}>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary={name} secondary={url} />
        </ListItem>
      )
    }

    return (
      <List dense subheader={<ListSubheader >API Urls</ListSubheader>}>
        {Object.entries(this.state.config.urls).map(renderItem)}
      </List>
    )
  }

  renderInputs() {
    const keys = ['environment', 'apiUrl', 'tokenPrefix', 'localStorageTokenKey']

    return (
      <form action="#">
        {keys.map((key) => (
          <TextField
            InputProps={{
              readOnly: true,
            }}
            label={key}
            type="text"
            value={this.state.config[key]}
            fullWidth
            variant="filled"
            key={key}
          />
        ))}
      </form>
    )
  }

  toggleConfig(show) {
    return this.setState({ show })
  }

  renderShowConfigBtn() {
    return (
      <Button
        onClick={() => this.setState({ show: true })}
        startIcon={<SettingsIcon/>}
        className={this.props.classes.showConfigBtn}
      >
        Show Config
      </Button>
    )
  }

  render() {
    const { config, show } = this.state

    if (!show) {
      return this.renderShowConfigBtn();
    }

    if (!config) {
      return null;
    }

    return (
      <Dialog open aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Config</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can see the list of current configurations.
          </DialogContentText>

          <Grid container justify="center">
            <Grid item xs>
              {this.renderInputs()}
              {this.renderUrls()}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({ show: false })} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const styles = {
  showConfigBtn: {
    fontSize: 10,
  }
};

export default withStyles(styles)(Config);