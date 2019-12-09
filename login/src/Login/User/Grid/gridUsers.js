import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
//------------------------------------------------------------------------------

import {
    Grid,
    GridColumn as Column,
    GridToolbar
} from "@progress/kendo-react-grid";
//import { ExcelExport } from "@progress/kendo-react-excel-export";
import "@progress/kendo-theme-default/dist/all.css";
import { process } from "@progress/kendo-data-query";


class gridUsers extends Component {

    constructor(props) {
        super(props)
        this.state = this.initializeState();
        //---------------------------------------
        this.get_SelectedItem = this.get_SelectedItem.bind(this);
        this.dataStateChange = this.dataStateChange.bind(this);
        this.expandChange = this.expandChange.bind(this);
        this.isGroupable = this.isGroupable.bind(this);
    }
    //------------------------------ 
    componentWillReceiveProps(props) {
        this.forceUpdate();
        if (props.list != undefined) {
            this.setState({ data: props.list });
            this.setState({ result: process(props.list, props.gridDatastate) });

        }
        if (props.onEndRequest == true) {
            this.setState({ selectedItems: [] });
        }
        this.setState({ dataState: props.gridDatastate });
      
    }

    //*****************************************************************************************//

    initializeState() {
        const initialState =
        {
            result: null,
            dataState: {},
            data: [],
            selectedItems: [],
            pageable: this.state
                ? this.state.pageable
                : {
                    buttonCount: 5,
                    info: true,
                    type: "input",
                    pageSizes: false,
                    previousNext: true
                }
        };

        return initialState;
    }

    get_SelectedItem = (event) => {
        event.dataItem.selected = !event.dataItem.selected;
        if (event.dataItem.selected == true) {
            this.state.selectedItems.push(event.dataItem);
        }
        if (event.dataItem.selected == false) {
            var index = this.state.selectedItems.indexOf(event.dataItem);
            if (index > -1) {
                this.state.selectedItems.splice(index, 1);
            }
        }
        //-------------------------------------------------------------------
        let item = this.state.selectedItems[0];
        let selectedItems = this.state.selectedItems;
        let selectedItems_Count = this.state.selectedItems.length;
        //-------------------------------------------------------------------
        this.props.onSelectItem(item, selectedItems, selectedItems_Count);
    }

    headerSelectionChange = (event) => {
        const checked = event.syntheticEvent.target.checked;
        this.state.selectedItems.splice(0, this.state.selectedItems.length);
        if (checked == true) {
            const gridData = event.target.props.data;
            gridData.data.map(item => { this.state.selectedItems.push(item) });
        }
        //---------------------------------------------------------
        let item = this.state.selectedItems[0];
        let selectedItems = this.state.selectedItems;
        let selectedItems_Count = this.state.selectedItems.length;
        //---------------------------------------------------------
        this.props.onSelectItem(item, selectedItems, selectedItems_Count);

        this.state.data.forEach(item => item.selected = checked);
        this.forceUpdate();
    }

    dataStateChange = event => {
        this.setState({ result: process(this.props.list, event.data), dataState: event.data });
        this.props.onDatastateChange(event.data);
    };

    expandChange = event => {
        event.dataItem[event.target.props.expandField] = event.value;
        this.setState({
            result: Object.assign({}, this.state.result),
            dataState: this.state.dataState
        });
    };

    isGroupable = field => {
        return !(this.state.dataState.group || []).find(g => g.field === field);
    };

    //*****************************************************************************************//



    render() {
        return (

            <div className="gridDiv">

                <Grid
                    //Data
                    data={this.state.result}
                    onDataStateChange={this.dataStateChange}
                    {...this.state.dataState}
                    style={{ height: '400px' }}
                    //Selectable
                    selectedField="selected"
                    onSelectionChange={this.get_SelectedItem}
                    onHeaderSelectionChange={this.headerSelectionChange}
                    //Filterable
                    filterable={true}
                    //Groupable
                    groupable={true}
                    onExpandChange={this.expandChange}
                    expandField="expanded"
                    //Pageable
                    pageable={this.state.pageable}
                    //Sortable
                    sortable={{
                        allowUnsort: true,
                        mode: "multiple"
                    }}

                   // resizable
                    reorderable

                >

                    <Column
                        className="chkB"
                        field="selected"
                        width="50px"
                        locked={true}
                        filterable={false}
                        headerSelectionValue={this.state.data.findIndex(dataItem => dataItem.selected === false) === -1} />


                    <Column title="userName" field="userName"  filter="text" groupable={this.isGroupable("userName")} />
                    <Column title="roleName " field="roleName" filter="text" groupable={this.isGroupable("roleName")} />

                   
                  
                </Grid>
            </div>);
    }
}


gridUsers.propTypes =
    {
        classes: PropTypes.object.isRequired,
    };
export default gridUsers;




















































































