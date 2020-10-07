import React from 'react';

// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';

// import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';


class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.renderProject = this.renderProject.bind(this);
  }

  logout() {
    axios.defaults.headers.common['Authorization'] = ''

    this.props.logout()
  }

  renderProject(project) {
    const a = () => {

      axios.get('http://localhost:8000/users/?format=json').then((resp) => console.info(resp))
    }
    // debugger
    console.info(this.props.classes.root)
    return (<Card className={this.props.classes.root}>
      <CardHeader

        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia

        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>)
    return (
      <List aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            icon
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button onClick={a}>
          <ListItemIcon>
            icon
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
    )
  }

  render() {

    return (
      <div>
        <Typography variant="h4">
          List of projects
        </Typography>
        { this.props.projects.map((project) => this.renderProject(project)) }

        <Button onClick={this.logout}>
          Logout
      </Button>
      </div>
    );
  }
}

const styles = {
  root: {
    marginTop: 20,
  },
};


export default withStyles(styles)(Projects);

