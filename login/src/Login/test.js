
import React, { Component } from 'react';


import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { axiosCustom, setAuthHeader } from './security';
import dashboard from'../DashBoard/dashBoard.js'
import dashboardUser from '../DashBoard/dashboardUser'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    NavLink
} from 'react-router-dom';
//_____________________________________________________________________________________________________
//Mine
import PropTypes from 'prop-types';

//===========================================================================================



const styles = theme =>
    ({
        paper: {
            marginRight: theme.spacing.unit * 2,
        },
        //------------------980119
        sidebarText: {
            color: '#e5e8dc',
            fontSize: '14px',
            float: 'right',
            paddingRight: '4px'
        },


        sidebarIcon: {
            color: '#e5e8dc',
            fontSize: '1.2rem',
        },
       
        nested:
        {
            paddingLeft: theme.spacing.unit * 4,
        },
        root:
        {
            display: 'flex',
           
        },
        toolbar: {
            paddingRight: 24,
            backgroundColor: '#094e54',
        },
        toolbarIcon: {
            backgroundColor: '#094e54',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        drw: { backgroundColor: '#094e54',},
        appBar: {
            backgroundColor: '#094e54',
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,

            }),
        },
      
        menuButton: {
            marginLeft: 12,
            marginRight: 36,
            color: '#e6e2e2  !important'
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
            color:'#e6e2e2  !important'
        },
      
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing.unit * 7,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing.unit * 9,
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing.unit * 3,
            height: '100vh',
            overflow: 'auto',
        },
        chartContainer: {
            marginLeft: -22,
        },
        tableContainer: {
            height: 320,
        },
        h5: {
            marginBottom: theme.spacing.unit * 2,
        },
        typography: {
            padding: theme.spacing.unit * 2,
        },
    });

//_____________________________________________________________________________________________________


class Component_Layout extends Component
{

    constructor(props)
    {
       
        super(props);



        var getT = localStorage.getItem('i4F2H1u1R');
        var getUser=localStorage.getItem('role')
        if (getT == null)
        {
            alert("کاربر گرامی شما به صفحه ی مورد نظر دسترسی ندارید");
            this.props.history.push('/0gNnxvTpuM6vZOujEl11cIelo24jvhrbMJI0Ra1WKE0')
        }
        if(getUser=="User"){
            alert("کاربر گرامی شما به صفحه ی   ادمین مورد نظر دسترسی ندارید");
            this.props.history.push('/0gNnxvTpuM6vZOujEl11cIelo24jvhrbMJI0Ra1WKE0')
          //  return false;
        }
        else if (getT != null && getUser=="Admin")
        {
            //----------------------------------------------------
            this.state =
                {
                    disMenuBtn:true,
                    loggedIn: false,
                    isButtonDisabled: true,
                    openSidebar: false,
                    displayMenu: false,
                    userName: '',
                    roleName: '',
                    gradeName: '',
                    educationName: '',
                    showFlag: false,
                    routeArray: [],
                    urlArray: [],
                    redirect_Dash: ''
                };
            //----------------------------------------------------
            setAuthHeader(localStorage.getItem('i4F2H1u1R'));
        
        //--------------------------------------------------------------------------------------------
            
        }
     
       
    }
    //===========================================================================
    componentDidMount()
    {
        var getT = localStorage.getItem('i4F2H1u1R');

        if (getT == null)
        {
            alert("کاربر گرامی شما به صفحه ی مورد نظر دسترسی ندارید");
            this.props.history.push('/0gNnxvTpuM6vZOujEl11cIelo24jvhrbMJI0Ra1WKE0')
        }
        else if (getT != null)
        {
           


           
        }
       
    }
    //===========================================================================
    componentDidUpdate()
    {
        var getT = localStorage.getItem('i4F2H1u1R');

        if (getT == null)
        {
            alert("کاربر گرامی شما به صفحه ی مورد نظر دسترسی ندارید");
            this.props.history.push('/0gNnxvTpuM6vZOujEl11cIelo24jvhrbMJI0Ra1WKE0')
        }
        else if (getT != null)
        {

             //if (localStorage.getItem('urlArray').includes(this.props.location.pathname.toUpperCase()) == true) {

        //    var getRole = localStorage.getItem('role');
        //    if (getRole == 'T') {
        //        this.props.history.push('/rAVu7p94Q79t4IQCE2mlzxU/DashboardT');
        //    }
        //    if (getRole == 'A') {
        //        this.props.history.push('/rAVu7p94Q79t4IQCE2mlzxU/DashboardA');
        //    }
        //    alert("کاربر گرامی شما به صفحه ی مورد نظر دسترسی ندارید");
        //}

        }
      
    }
   //===========================================================================


   //===========================================================================
  
    

   //===========================================================================

    state = {
        anchorEl: null,
        open: false
    };


  

    //Toggle Menu

    //--------------980120
    render()
    {

        const { classes } = this.props;
        const a = [];
        const { anchorEl, open } = this.state;
        const id = open ? 'simple-popper' : null;
        
      
        
        return (

          

            

<div>
<Route exact path="/rAVu7p94Q79t4IQCE2mlzxU"/>



<Route path='/rAVu7p94Q79t4IQCE2mlzxU' component={dashboard} />
<Route path='/rUVu7p94Q79t4IQCE2mlzxU' component={dashboardUser} />
</div>
           

        );
    }
}


Component_Layout.propTypes =
{
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Component_Layout);














