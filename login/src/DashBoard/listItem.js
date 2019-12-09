import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    NavLink
} from 'react-router-dom';

const styles = theme =>
    ({
        colorfont: {
            color: 'black !important'
        }
  
    });
   
export const mainListItems = (
    
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText inset primary={<Link class="colorfont" to="/rAVu7p94Q79t4IQCE2mlzxU">Dashboard</Link>} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText inset primary={<Link class="colorfont" to="/rAVu7p94Q79t4IQCE2mlzxU/Crud">crud</Link>} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText inset primary={<Link class="colorfont" to="/rAVu7p94Q79t4IQCE2mlzxU/CreateUser">create users</Link>} />
    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText inset primary={<Link class="colorfont" to="/0gNnxvTpuM6vZOujEl11cIelo24jvhrbMJI0Ra1WKE0">Exit</Link>} />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
 
  </div>
);