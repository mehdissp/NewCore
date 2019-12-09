

import React, { Component } from 'react';
//--------------------------------------
import { BrowserRouter as Router, Link, NavLink, Redirect, Switch } from 'react-router-dom';
//------------------------------------------------------------------------------------
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//import classNames from 'classnames';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import compose from 'recompose/compose';
import withWidth from '@material-ui/core/withWidth';
import PasswordField from 'material-ui-password-field';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { custom_SecurityRequiredF, custom_SecurityRequiredS} from './component_Validation';
//import logo2 from '../../../contents/images/b1.png';

import axios from 'axios';
import { serverUrl } from './baseRoute';
//------------------------------------------------------------------------------------ react-reveal
import Shake from 'react-reveal/Shake';
import Bounce from 'react-reveal/Bounce';
//------------------------------------------------------------------------------------ react-animations
//import styled, { keyframes } from 'styled-components';
// import
// {
//     bounce,
//     fadeIn,
//     rollIn,
//     rubberBand,
//     flash,
//     wobble
// } from 'react-animations';
//------------------------------------------------------------------------------------
//import $ from "jquery";

//const Flash = styled.div`animation: 3s ${keyframes`${flash}`} infinite`;


const styles = theme =>
    ({
        root:
        {
            flexGrow: 1,
           
            direction: 'rtl'

        },
        card:
        {
            boxShadow: 'none !important',
            border: 'none !important'
        },
        title:
        {
            color: '#504c4c',
            fontSize: '17px'
        },
        cardForm:
        {
            paddingTop: '0px',
            border: 'none !important',
            boxShadow: 'none !important'
        },
        grid:
        {
            border: 'none !important',
            boxShadow: 'none !important'
        },
    });


class Component_SignIn extends Component
{
    constructor(props)
    {
        super(props);

        this.state = this.initializeState();
        //----------------------------------- 
        this.form = React.createRef();
        //----------------------------------- 
        this.log_stateChanges = this.log_stateChanges.bind(this);   
        //----------------------------------- 
        this.signinF = this.signinF.bind(this);        
        //----------------------------------- 
        this.forgetPass = this.forgetPass.bind(this);  
    }
    //------------------------------  
    componentDidMount()
    {
        localStorage.removeItem('i4F2H1u1R');
       
        custom_SecurityRequiredF(this);
        custom_SecurityRequiredS(this);



        window.scrollTo(0, document.body.scrollHeight);

        
    }



    //==================================================[ Actions ]============================================

    //======================================[ initialize State ]========
    initializeState()
    {
        const initialState =
        {
            userNameF: '',
            passwordF: '',         
            //-----------------
            isRedirectLayout: false,
            isRedirectFG: false,
            isRedirectUser:false,
            //-----------------
            errorMsg: '' 
        };

        return initialState;
    }
    //======================================[ log_stateChanges ]========
    log_stateChanges(e)
    {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errorMsg: ''  });
    }
    //======================================[ signin ]========
    signinF()
    {
     
        if (this.state.userNameF != '' && this.state.passwordF != '')
        {
            let flag_User = false;
let flag_Admin=false;
            let option =
            {
                headers:
                {
                    'Content-Type': 'application/json', 'Accept': 'application/json'
                }
            };

            axios.post(serverUrl + 'api/auth/Login', { UserName: this.state.userNameF, Password: this.state.passwordF }, option).then((response) =>
            {
                this.setState({ errorMsg: response.data.message });
                if (response.data.token != null)
                {
                  //  alert("خوش اومدید")
                  if (response.data.role=="Admin")
                  {
                    localStorage.setItem('role', response.data.role);
                    flag_Admin= true;
//alert(response.data.role);
                  }
                  if(response.data.role=="User")
                  {
                    localStorage.setItem('role', response.data.role);
                   flag_User=true;
                  }
                    localStorage.setItem('i4F2H1u1R', response.data.token);

                   
                }
                if (flag_Admin == true)
                {
                    this.setState({ isRedirectLayout: true });
                }
                if (flag_User == true){
                    this.setState({isRedirectUser:true});
                }
                if (response.data.token == null)
                {
                    this.setState({ errorMsg: "نام کاربری و یا پسورد اشتباه می باشد."});
                }

            }).catch((err) =>
            {
                this.setState({ errorMsg: "نام کاربری و یا پسورد اشتباه می باشد."});
                console.log("Error in response");
                console.log(err);
            })


            

        }
        else if(this.state.userNameF == '' && this.state.passwordF == '')
        {
            this.setState({ errorMsg: 'لطفا نام کاربری و رمز عبور خود را وارد کنید' });
        }
        else if (this.state.userNameF == '' && this.state.passwordF != '')
        {
            this.setState({ errorMsg: 'لطفا نام کاربری خود را وارد کنید' });
        }
        else if (this.state.userNameF != '' && this.state.passwordF == '')
        {
            this.setState({ errorMsg: 'لطفا رمز عبور خود را وارد کنید' });
        }
    } 
    //======================================[ forgetPass ]========
    forgetPass()
    {
        this.setState({ isRedirectFG: true });
    }






    //--------------------------------------------------------------------------------------


    render()
    {
        const classes  = this.props;
        const isRedirect_L = this.state.isRedirectLayout;
        const isRedirect_FG = this.state.isRedirectFG;
        const isRedirectUser=this.state.isRedirectUser;
        if (isRedirect_L)
        {
            return <Redirect push to="/rAVu7p94Q79t4IQCE2mlzxU" />
        }
        if (isRedirectUser)
        {
            return <Redirect push to="/rUVu7p94Q79t4IQCE2mlzxU" />
        }

        return (
           
            <Grid className="sImg" >

                <Bounce left >

                    <center className="gridS" id="loginF">
                        <div className="center2">

                            <div className="TopSLogo">
                                <Shake>
                                    <center>
                                        
                                    </center>
                                </Shake>
                            </div>

                            <div className="gridS">

                                <form>

                                    <TextField
                                        fullWidth
                                        name="userNameF"
                                        placeholder="نام کاربری"
                                        margin="normal"
                                        value={this.state.userNameF}
                                        onChange={this.log_stateChanges}
                                    />

                                </form>


                                <div>

                                    <PasswordField className="mrgT"
                                        fullWidth
                                        name="passwordF"
                                        value={this.state.passwordF}
                                        onChange={this.log_stateChanges} />

                                </div>

                                <label className="errF">{this.state.errorMsg}</label>
                                <br/>

                                <Button className="SBtnF"
                                    style={{ cursor: 'pointer  !important' }}
                                    fullWidth
                                    variant="contained"

                                    onClick={this.signinF}
                                >
                                    ورود
                                           </Button>

                            </div>

                        </div>
                    </center>


               

                </Bounce>
            </Grid>


        );

    }
}

export default withStyles(styles)(Component_SignIn);

