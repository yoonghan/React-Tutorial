import * as React from "react";
import * as ReactDOM from "react-dom";
import Route from "./components/route/AuthExample";
import {MultiSelectDropDown} from "./components/util/MultiSelectDropdown";
import {UsingTextField} from "./components/container/UsingTextField";
import {TextFieldWithLessRender} from "./components/container/TextFieldWithLessRender";
import {TextFieldWithConnectionWrapper} from "./components/container/TextFieldWithConnection";
import {TextFieldWithConnectionAndLoader} from "./components/container/TextFieldWithConnectionAndLoader";
import {TextFieldWithConnectionWithConnection} from "./components/container/TextFieldWithConnectionWithConnection";


/**
 * Example to use route.
 **/
// ReactDOM.render(
//     <Route />,
//     document.getElementById("example")
// );

/**
 * Example of importing external JS and write your own typescript declaration
 */
// ReactDOM.render(
//     <MultiSelectDropDown
//       title={"test"}
//       options={[{label:"A", value:"a"}, {label:"B", value:"b"}, {label:"C", value:"c"}, {label:"D", value:"d"}]}
//       callback={()=>{}}
//     />,
//     document.getElementById("example")
// );

/**
 * Example of default values in input box.
 **/
// ReactDOM.render(
//     <UsingTextField value={"Default Value"}/>,
//     document.getElementById("example")
// );


/**
 * Because the component keep rerender, this example improves performance
 **/
// ReactDOM.render(
//     <TextFieldWithLessRender value={"Default Value"}/>,
//     document.getElementById("example")
// );


/**
 * Show how ref is used
 **/
// ReactDOM.render(
//     <TextFieldWithConnectionWrapper value={"sample"}/>,
//     document.getElementById("example")
// );


/**
 * How hoc is used, this also shows if Loading is put in render, the add/removal of component resets the value.
 **/
// ReactDOM.render(
//     <TextFieldWithConnectionAndLoader value={"sample"}/>,
//     document.getElementById("example")
// );

/**
 * Test how text field with Connection that call ontop of it another connection first.
 **/
 //A hack on the top.
 const props:any = {
   value: "Sample Value for HOC 2"
 }
ReactDOM.render(
    <TextFieldWithConnectionWithConnection {...props} />,
    document.getElementById("example")
);
