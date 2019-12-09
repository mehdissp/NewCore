import React, { Component } from 'react';
import axios from 'axios';
import { axiosCustom } from './security'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { MultiSelect, ComboBox} from '@progress/kendo-react-dropdowns';
import '@progress/kendo-theme-default/dist/all.css';
//------------------------------------------------------------------------------------
import { serverUrl } from './baseRoute';
import { custom_Required, custom_MaxNumber, custom_MinNumber } from './component_Validation';
//import GridComponent_S4T01 from './grids/gridComponent_S4T01';
//------------------------------------------------------------------------------------
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
//========================================================================================== MA
//import { manageAccess } from '../../../substructions/security/components/component_AccessHandler';
//========================================================================================== MA
import Grid from '@material-ui/core/Grid';
import { string } from 'prop-types';
import GridShow from './grid/grid';
//------------------------------------------------------------------------------------
const styles = theme =>
    ({
        container:
        {
            display: 'flex',
            flexWrap: 'wrap',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing.unit * 3,
            height: '100vh',
            overflow: 'auto',
        },
    });
//------------------------------------------------------------------------------------
let errorArray = [];
let numberErrorArray = [];
let rowNumbers ='';
//------------------------------------------------------------------------------------


class Component_S4T01 extends Component
{
    
    //=========================================================================================================
    constructor(props)
    {
        super(props)
        //==========================MA
        // var displayAlert = manageAccess(this.props);
        // if (displayAlert == true) {
        //     alert("کاربر گرامی شما به صفحه ی مورد نظر دسترسی ندارید");
        // }

        this.state = this.initializeState();
        this.get_S4T03 = this.get_S4T03.bind(this);
        this.log_stateChanges_S4T01_cmb = this.log_stateChanges_S4T01_cmb.bind(this);
        //-----------------------------------
        this.log_stateChanges = this.log_stateChanges.bind(this);
        this.resetState = this.resetState.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.refresh = this.refresh.bind(this);
       // this.get_S4T01 = this.get_S4T01.bind(this);
        this.get_SelectedItem = this.get_SelectedItem.bind(this);
        this.post_S4T01 = this.post_S4T01.bind(this);
        this.put_S4T01 = this.put_S4T01.bind(this);
        this.delete_S4T01 = this.delete_S4T01.bind(this);
        this.onDatastateChange = this.onDatastateChange.bind(this);
        //------------------------------------
        this.form = React.createRef();
        //------------------------------------
        this.onDatastateChange = this.onDatastateChange.bind(this);
    }
    //------------------------------  
    componentDidMount()
    {
        this.get_S4T03();
        custom_Required(this);
    }
    onDatastateChange(dataState) {
        this.setState({ gridDatastate: dataState });
    }
    log_stateChanges_S4T01_cmb(e) {

        this.setState({ [e.target.name]: e.target.value });
      
       
    }


    //==================================================[ Actions ]============================================

    //======================================[ initialize State ]========
    initializeState()
    {
        const initialState =
        {
            onEndRequest: '',
            value_S4T01: {},     list_S4T01_cmb: [],
            list_grid:[],
            gridDatastate: {
                skip: 0,
                take: 25
            },
            id: '',
            title: '',
            cvv:'',
            cardNumber:'',
            keyTitle: '',
            resultFlag: '',
            resultMessage: '',
            successMessages: [],
            errorMessages: [],
            list_S4T01: [],
            selectedItems: [],
            item: '',
            onEndRequest: '',
            disable_save: true,
            disable_update: true,
            disable_delete: true,
            gridDatastate: {
                skip: 0,
                take: 25
            }
        };

        return initialState;
    }
    //======================================[ Log StateChanges ]========
    log_stateChanges(e)
    {
        this.setState({ [e.target.name]: e.target.value });     
    }
    //======================================[ Reset State ]=============
    resetState()
    {
        this.setState(this.initializeState());
    }
    //*****************************************************************// */

    get_S4T03() {
        let option =
        {
            headers:
            {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            }
        };

        axiosCustom.get(serverUrl + 'api/auth/GetTypeName', option).then((response) => {
    
            this.setState({ list_grid: response.data.datagrid });
            this.setState({ list_S4T01_cmb: response.data.data });


        }).catch((err) => {
            console.log(err);
        })

    }
    //======================================[ Reset Form ]=============
    resetForm()
    {
        this.setState({
            cvv:'',
            cardNumber:'',
            id: '',
            title: '',
            keyTitle: '',
            resultFlag: '',
            resultMessage: '',
            successMessages: [],
            errorMessages: [],
            validators:[],
            selectedItems: [],
            item: '',
            onEndRequest: '',
            disable_save: true,
            disable_update: true,
            disable_delete: true
        });
    }
    //======================================[ Handle Messages ]=========
    get_SelectedItem(item, selectedItems, selectedItems_Count)
    {
        
        if (selectedItems_Count == 1)
        {
            numberErrorArray.length = 0;
            errorArray.length = 0;
            this.resetForm();

            this.setState({
                id: item.id,
                cvv: item.cvv,
                cardNumber: item.cardNumber,
                title: item.name,
                resultMessage: item.resultMessage
            });

            this.setState({ item: item, disable_save: true, disable_update: false, disable_delete: false });

            if (item.resultFlag == true)
            {
                errorArray.push(item.resultMessage);
                this.setState({ errorMessages: errorArray, disable_update: true, disable_delete: true, disable_save: true });
            }
        }
        else if (selectedItems_Count == 0)
        {
            this.resetForm();
            errorArray.length = 0;
            numberErrorArray.length = 0;
        }
        else if (selectedItems_Count > 1)
        {
            this.resetForm();
            errorArray.length = 0;
            numberErrorArray.length = 0;
            rowNumbers = '';
            this.setState({ selectedItems: selectedItems, disable_update: true, disable_save: true, disable_delete: false });
            //----------------------------------------------------------------------------
            for (let index = 0; index < selectedItems.length; ++index)
            {
                if (selectedItems[index].resultFlag == true)
                {
                    errorArray.push(selectedItems[index].resultMessage);
                    if (index==0)
                    {
                        rowNumbers = selectedItems[index].rowNumber;
                    }
                    else if (index > 0)
                    {
                        if (rowNumbers !='')
                        {
                            rowNumbers = rowNumbers + 'و' + selectedItems[index].rowNumber;
                        }
                        else
                        {
                            rowNumbers = selectedItems[index].rowNumber;
                        }
                       
                    }
                }
            }
            //----------------------------------------------------------------------------
            if (errorArray.length != 0)
            {              
                if (errorArray.length == 1)
                {
                    numberErrorArray.push('از بین رکورد های انتخاب شده شماره ردیف ' + rowNumbers +' قابلیت حذف شدن را ندارد');                  
                }
                if (errorArray.length > 1)
                {
                    numberErrorArray.push('از بین رکورد های انتخاب شده شماره ردیف های ' + rowNumbers + ' قابلیت حذف شدن را ندارند');
                }
                this.setState({ errorMessages: numberErrorArray, disable_delete: true });
            }
            else if (errorArray.length == 0)
            {
                this.setState({ disable_delete: false});
                errorArray.length=0;
            }
        }

    }
    //======================================[ Refresh ]=================
    refresh()
    {      
        this.resetState();
        this.get_S4T03();
    }
    //======================================[ Get ]=====================

    //======================================[ Post ]====================
    post_S4T01()
    {
        var model = {};
        
        model.name = this.state.title;
        model.cvv = this.state.cvv;
        model.cardNumber=this.state.cardNumber;
        axiosCustom.post(serverUrl +'api/auth/Insert', { name: model.name,cvv:model.cvv ,cardNumber:model.cardNumber }).then((response) => {
            this.refresh();
            this.setState({ onEndRequest: true });
            
       
        }).catch((err) => {
            console.log("Error in response");
            console.log(err);
        })

    }
    //======================================[ Put ]=====================
    put_S4T01() {
        var model = {};
        model.id = this.state.item.id;
        model.name = this.state.title;
        model.cvv = this.state.cvv;
        model.cardNumber=this.state.cardNumber;

      
        axiosCustom.post(serverUrl + 'api/auth/Update', { id: model.id,name:model.name,cvv:model.cvv,cardNumber:model.cardNumber }).then((response) => {
            this.refresh();
            this.setState({ onEndRequest: true });
            this.handleMessages(response.data);

        }).catch((err) => {
            console.log("Error in response");
            console.log(err);
        })

    }
    //======================================[ Delete ]==================
    delete_S4T01()
    {
      
        if (this.state.selectedItems.length == 0)
        {
            this.state.selectedItems.push(this.state.item);
        }
        var Id=this.state.selectedItems[0].id
        var Name =this.state.selectedItems[0].name
        var CVV =this.state.selectedItems[0].cvv
        var CardNumber=this.state.selectedItems[0].cardNumber
        //---------------------------------------------------------------------------------------------------
        axiosCustom.post(serverUrl + 'api/auth/Delete', { Id:Id,Name:Name,CVV:CVV,CardNumber:CardNumber }).then((response) =>
        {
            this.refresh();
            this.setState({ onEndRequest: true });
            this.handleMessages(response.data);

        }).catch((err) => {
            console.log("Error in response");
            console.log(err);
        })

    }
    //======================================[ handleMessages ]===========
    handleMessages(data) {
        if (data.errorMessages.length != 0) {
            this.setState({ errorMessages: data.errorMessages });
        }
        if (data.successMessages.length != 0) {
            this.setState({ successMessages: data.successMessages });
        }
    }
   
    onDatastateChange(dataState) {
        this.setState({ gridDatastate: dataState });
    }


    

    //==================================================[ UI ]=============================================
    render()
    {
        const { classes } = this.props;

        return (

        
         
       
            <div >


                <h4> تست کراد</h4>
                <hr />

                <div className="nav-ul" variant="dense" >

                    <div className="nav-ul2">

                        <button className="navButton" variant="light" type="submit" onClick={this.post_S4T01} disabled={this.state.disable_save} ><AddIcon className="navIcon navIconSR" /> ذخیره</button>
                        <button className="navButton" variant="light" type="submit" onClick={this.put_S4T01} disabled={this.state.disable_update}><EditIcon className="navIcon navIconUD" /> ویرایش</button>
                        <button className="navButton" variant="light" type="submit" onClick={this.delete_S4T01} disabled={this.state.disable_delete} ><DeleteIcon className="navIcon navIconUD" /> حذف</button>
                        <button className="navButton" variant="light" type="submit" onClick={this.refresh} ><RefreshIcon className="navIcon navIconSR" /> به روز رسانی</button>

                    </div>


                </div>

                <hr />

                <div>
                    <ul className="ulErrors">
                        {this.state.errorMessages.map((item) => (<li>{item}</li>))}
                    </ul>
                    <ul className="ulSuccess">
                        {this.state.successMessages.map((item) => (<li>{item}</li>))}
                    </ul>
                </div>

                <ValidatorForm ref={this.form}>

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        spacing={32}
                    >

                       

                        <Grid item xs={12} sm={6} md={3} lg={3}>

                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3}>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} lg={3}>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>

<div>
<div>
                                    <ComboBox
                                        style={{ width: '100%' }}
                            name="value_S4T01"
                            data={this.state.list_S4T01_cmb}
                            placeholder=" گروه تحصیلی "
                            textField="name"
                             dataItemKey="id"
                            value={this.state.value_S4T01}
                            onChange={this.log_stateChanges_S4T01_cmb}
                          // disabled={this.state.disable_S4T01_cmb}


                                    />
                               
                                </div>
                                <br/>

    <TextValidator
        fullWidth
        name="title"
        placeholder=" نام"
        margin="normal"
        value={this.state.title}
        onChange={this.log_stateChanges}
        validators={['custom_Required']}
       errorMessages={['این فیلد اجباری است']}
        id='r1'
    />

</div>

<br />
<div>

    <TextValidator
        fullWidth
        name="cvv"
        placeholder=" cvv"
        margin="normal"
        value={this.state.cvv}
        onChange={this.log_stateChanges}
        validators={['custom_Required']}
        errorMessages={['این فیلد اجباری است']} id='r2'
    />

</div>
<br/>
<div>

    <TextValidator
        fullWidth
        name="cardNumber"
        placeholder=" cardNumber"
        margin="normal"
        value={this.state.cardNumber}
        onChange={this.log_stateChanges}
        validators={['custom_Required']}
        errorMessages={['این فیلد اجباری است']} id='r2'
    />

</div>
</Grid>
                    </Grid>

                
                </ValidatorForm>

              

                <br />

                <GridShow onEndRequest={this.state.onEndRequest} list={this.state.list_grid} onSelectItem={this.get_SelectedItem} gridDatastate={this.state.gridDatastate} onDatastateChange={this.onDatastateChange} />

            </div>
            
            );
        
    }

}



export default withStyles(styles)(Component_S4T01);

































////********************************************************************************
////--- In package.json
//"proxy": "http://localhost:1598/",
////********************************************************************************
////--- In Grid 
//var ParentComponent_S4T01 = require('../component_S4T01');
//componentDidMount()
//{
//   ParentComponent_S4T01.default.prototype.get_S4T01(this);
//}

////--- In Main 
//get_S4T01(childComponent)
//{
//    let option =
//    {
//        headers:
//        {
//            'Content-Type': 'application/json', 'Accept': 'application/json'
//        }
//    };

//    axios.get(serverUrl + 'S4T01/A04', option).then((response) =>
//    {
//        childComponent.setState({ data: response.data });

//    }).catch((err) => {
//        console.log(err);
//    })
//};
////********************************************************************************



//<TextField
//    name="title"
//    label="عنوان فارسی"
//    margin="normal"
//    value={this.state.title}
//    onChange={this.log_stateChanges} />