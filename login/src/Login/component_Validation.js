
import { ValidatorForm } from 'react-material-ui-form-validator';
let handleChar = 'r1r2r3r4r5r6r7r8r9r10r11r12r13r14r15r16r17r18r19r20r21r22r23r24r25r26r27r28r29r30';
//====================================================================================
const custom_Required = (component)=>
{  
    ValidatorForm.addValidationRule('custom_Required', (value) =>
    {       

        let array = [];
        let finalID = false;
        let formChilds = component.form.current.childs;
         //----------------------------------------------------------------------------------
        for (let index = 0; index < formChilds.length; ++index)
        {
            if (handleChar.toString().includes((formChilds[index].props.id).toString())==true)
            {
                if (formChilds[index].props.value == '')
                {
                    array.push(true);
                }
            }         
        }
        //------------------------------------------------------------------
        if ((formChilds.slice(-1)[0]).props.value == value)
        {
            finalID = true;
        }
        //------------------------------------------------------------------
        if (array.length != 0)
        {
            component.setState({ disable_save: true, disable_update: true });
        }
        if (array.length == 0)
        {
            component.setState({ disable_save: false });

            if (component.state.item != "")
            {
                component.setState({ disable_update: false });
            }
        }
        //----------------------------------------------------------------------------------
        if (value == "")
        {
            return false;
        }
        if (value != "")
        {
            if (component.state.selectedItems.length != 0 || component.state.item != "")
            {
                component.setState({ disable_save: true });
            }

            handleCMB(component, finalID);

            return true;
        }
    });
};
//====================================================================================
const handleCMB = (component,finalID) =>
{
    switch (component.state.cmb_Count)
    {
        case '1':
            if (isNull(component.state.c1_Value)== true)
            {
                component.setState({ disable_save: true });

                if (finalID == true && component.state.selectedItems.length == 0)
                {
                    component.setState({ c1_error: 'این فیلد اجباری است' });
                }
            }
           
            break;
        //-------------------------------
        case '2':
            if (isNull(component.state.c1_Value) == true || isNull(component.state.c2_Value) == true)
            {
                component.setState({ disable_save: true });
                if (finalID == true && component.state.selectedItems.length == 0)
                {
                    component.setState({ c1_error: 'این فیلد اجباری است', c2_error: 'این فیلد اجباری است' });
                }
            }
          
            break;
        //-------------------------------
        case '3':
            if (isNull(component.state.c1_Value) == true || isNull(component.state.c2_Value) == true ||
                isNull(component.state.c3_Value) == true )
            {
                component.setState({ disable_save: true });
                if (finalID == true && component.state.selectedItems.length == 0)
                {
                    component.setState({
                        c1_error: 'این فیلد اجباری است', c2_error: 'این فیلد اجباری است',
                        c3_error: 'این فیلد اجباری است'
                    });
                }
            }
           

            break;
        //-------------------------------
        case '4':

            if (isNull(component.state.c1_Value) == true || isNull(component.state.c2_Value) == true ||
                isNull(component.state.c3_Value) == true || isNull(component.state.c4_Value) == true )
            {
                component.setState({ disable_save: true });

                if (finalID == true && component.state.selectedItems.length == 0) {
                    component.setState({
                        c1_error: 'این فیلد اجباری است', c2_error: 'این فیلد اجباری است',
                        c3_error: 'این فیلد اجباری است', c4_error: 'این فیلد اجباری است'
                    });
                }
            }
         

            break;
        //-------------------------------
        case '5':
            if (isNull(component.state.c1_Value) == true || isNull(component.state.c2_Value) == true ||
                isNull(component.state.c3_Value) == true || isNull(component.state.c4_Value) == true ||
                isNull(component.state.c5_Value) == true)
            {
                component.setState({ disable_save: true });

                if (finalID == true && component.state.selectedItems.length == 0) {
                    component.setState({
                        c1_error: 'این فیلد اجباری است', c2_error: 'این فیلد اجباری است',
                        c3_error: 'این فیلد اجباری است', c4_error: 'این فیلد اجباری است',
                        c5_error: 'این فیلد اجباری است'
                    });
                }

            }
           
            break;
        //-------------------------------
        case '6':

            if (isNull(component.state.c1_Value) == true || isNull(component.state.c2_Value) == true ||
                isNull(component.state.c3_Value) == true || isNull(component.state.c4_Value) == true ||
                isNull(component.state.c5_Value) == true || isNull(component.state.c6_Value) == true)
            {
                component.setState({ disable_save: true });

                if (finalID == true && component.state.selectedItems.length == 0) {
                    component.setState({
                        c1_error: 'این فیلد اجباری است', c2_error: 'این فیلد اجباری است',
                        c3_error: 'این فیلد اجباری است', c4_error: 'این فیلد اجباری است',
                        c5_error: 'این فیلد اجباری است', c6_error: 'این فیلد اجباری است'
                    });
                }

            }
           
            break;
        //-------------------------------
        case '7':
            if (isNull(component.state.c1_Value) == true || isNull(component.state.c2_Value) == true ||
                isNull(component.state.c3_Value) == true || isNull(component.state.c4_Value) == true ||
                isNull(component.state.c5_Value) == true || isNull(component.state.c6_Value) == true ||
                isNull(component.state.c7_Value) == true )
            {
                component.setState({ disable_save: true });

                if (finalID == true && component.state.selectedItems.length == 0) {
                    component.setState({
                        c1_error: 'این فیلد اجباری است', c2_error: 'این فیلد اجباری است',
                        c3_error: 'این فیلد اجباری است', c4_error: 'این فیلد اجباری است',
                        c5_error: 'این فیلد اجباری است', c6_error: 'این فیلد اجباری است',
                        c7_error: 'این فیلد اجباری است'
                    });
                }

            }
           

            break;
        //-------------------------------
        case '8':
            if (isNull(component.state.c1_Value) == true || isNull(component.state.c2_Value) == true ||
                isNull(component.state.c3_Value) == true || isNull(component.state.c4_Value) == true ||
                isNull(component.state.c5_Value) == true || isNull(component.state.c6_Value) == true ||
                isNull(component.state.c7_Value) == true || isNull(component.state.c8_Value) == true )
            {
                component.setState({ disable_save: true });

                if (finalID == true && component.state.selectedItems.length == 0) {
                    component.setState({
                        c1_error: 'این فیلد اجباری است', c2_error: 'این فیلد اجباری است',
                        c3_error: 'این فیلد اجباری است', c4_error: 'این فیلد اجباری است',
                        c5_error: 'این فیلد اجباری است', c6_error: 'این فیلد اجباری است',
                        c7_error: 'این فیلد اجباری است', c8_error: 'این فیلد اجباری است'
                    });
                }

            }
          
            break;
        //-------------------------------
        case '9':
            if (isNull(component.state.c1_Value) == true || isNull(component.state.c2_Value) == true ||
                isNull(component.state.c3_Value) == true || isNull(component.state.c4_Value) == true ||
                isNull(component.state.c5_Value) == true || isNull(component.state.c6_Value) == true ||
                isNull(component.state.c7_Value) == true || isNull(component.state.c8_Value) == true ||
                isNull(component.state.c9_Value) == true )
            {
                component.setState({ disable_save: true });

                if (finalID == true && component.state.selectedItems.length == 0) {
                    component.setState({
                        c1_error: 'این فیلد اجباری است', c2_error: 'این فیلد اجباری است',
                        c3_error: 'این فیلد اجباری است', c4_error: 'این فیلد اجباری است',
                        c5_error: 'این فیلد اجباری است', c6_error: 'این فیلد اجباری است',
                        c7_error: 'این فیلد اجباری است', c8_error: 'این فیلد اجباری است',
                        c9_error: 'این فیلد اجباری است'
                    });
                }
            }
         
            break;
        //-------------------------------
        case '10':
            if (isNull(component.state.c1_Value) == true || isNull(component.state.c2_Value) == true ||
                isNull(component.state.c3_Value) == true || isNull(component.state.c4_Value) == true ||
                isNull(component.state.c5_Value) == true || isNull(component.state.c6_Value) == true ||
                isNull(component.state.c7_Value) == true || isNull(component.state.c8_Value) == true ||
                isNull(component.state.c9_Value) == true || isNull(component.state.c10_Value) == true)
            {
                component.setState({ disable_save: true });

                if (finalID == true && component.state.selectedItems.length == 0) {
                    component.setState({
                        c1_error: 'این فیلد اجباری است', c2_error: 'این فیلد اجباری است',
                        c3_error: 'این فیلد اجباری است', c4_error: 'این فیلد اجباری است',
                        c5_error: 'این فیلد اجباری است', c6_error: 'این فیلد اجباری است',
                        c7_error: 'این فیلد اجباری است', c8_error: 'این فیلد اجباری است',
                        c9_error: 'این فیلد اجباری است', c10_error: 'این فیلد اجباری است'
                    });
                }
            }
          
            break;
        //-------------------------------
        default:
            break;
    }
}
//====================================================================================
const isNull = (object) =>
{
    let flag = true;
    let array = [];
    //------------------------------
    for (var member in object) {
        if (object[member] != null || object[member] != '') {
            array.push(object[member]);
        }
    }
    if (array.length != 0) {
        flag = false;
    }
    return flag;
};
//====================================================================================
const custom_MaxNumber = (component,number) =>
{
    ValidatorForm.addValidationRule('custom_MaxNumber', (value) =>
    {
        if (value != "")
        {
            if (value > number) {
                component.setState({ disable_save: true });
                return false;
            }
            else if (value <= number) {
                if (component.state.selectedItems.length == 0 && component.state.item != "") {
                    component.setState({ disable_save: true });
                }
                else if (component.state.selectedItems.length != 0 && component.state.item == "") {
                    component.setState({ disable_save: true });
                }
                else if (component.state.selectedItems.length == 0 && component.state.item == "") {
                    component.setState({ disable_save: false });
                }
                return true;
            }
        }
    });
};
//====================================================================================
const custom_MinNumber = (component, number) =>
{
    ValidatorForm.addValidationRule('custom_MinNumber', (value) =>
    {
        if (value != "")
        {
            if (value < number)
            {
                component.setState({ disable_save: true });
                return false;
            }
            else if (value <= number)
            {
                if (component.state.selectedItems.length == 0 && component.state.item != "") {
                    component.setState({ disable_save: true });
                }
                else if (component.state.selectedItems.length != 0 && component.state.item == "") {
                    component.setState({ disable_save: true });
                }
                else if (component.state.selectedItems.length == 0 && component.state.item == "") {
                    component.setState({ disable_save: false });
                }
                return true;
            }
            return true;
        }
    });
};
//====================================================================================
const custom_SecurityRequiredF = (component) =>
{
    ValidatorForm.addValidationRule('custom_SecurityRequiredF', (value) => {

        let array = [];
        let formChilds = component.form.current.childs;
        //----------------------------------------------------------------------------------
        for (let index = 0; index < formChilds.length; ++index)
        {
            if (handleChar.toString().includes((formChilds[index].props.id).toString()) == true)
            {
                if (formChilds[index].props.value == '')
                {
                    array.push(true);
                }
            }
        }
        if (array.length != 0)
        {
            component.setState({ disable_SignInF: true });
        }
        if (array.length == 0)
        {
            component.setState({ disable_SignInF: false });
        }
        //----------------------------------------------------------------------------------
        if (value == "")
        {
            return false;
        }
        if (value != "")
        {
            return true;
        }
    });
};
//====================================================================================
const custom_SecurityRequiredS = (component) =>
{
    ValidatorForm.addValidationRule('custom_SecurityRequiredS', (value) =>
    {

        let array = [];
        let formChilds = component.form.current.childs;
        //----------------------------------------------------------------------------------
        for (let index = 0; index < formChilds.length; ++index) {
            if (handleChar.toString().includes((formChilds[index].props.id).toString()) == true) {
                if (formChilds[index].props.value == '') {
                    array.push(true);
                }
            }
        }
        if (array.length != 0)
        {
            component.setState({ disable_SignInS: true });
        }
        if (array.length == 0)
        {
            component.setState({ disable_SignInS: false });
        }
        //----------------------------------------------------------------------------------
        if (value == "") {
            return false;
        }
        if (value != "") {
            return true;
        }
    });
};


export
{
    custom_Required,
    custom_MaxNumber,
    custom_MinNumber,
    custom_SecurityRequiredF,
    custom_SecurityRequiredS
};
