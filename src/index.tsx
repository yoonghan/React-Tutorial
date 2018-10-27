import * as React from "react";
import * as ReactDOM from "react-dom";
import Route from "./components/route/AuthExample";
import {MultiSelectDropDown} from "./components/util/MultiSelectDropdown";
import {UsingTextField} from "./components/container/UsingTextField";
import {TextFieldWithLessRender} from "./components/container/TextFieldWithLessRender";
import {TextFieldWithConnectionWrapper} from "./components/container/TextFieldWithConnection";
import {TextFieldWithConnectionAndLoader} from "./components/container/TextFieldWithConnectionAndLoader";
import {TextFieldWithConnectionWithConnection} from "./components/container/TextFieldWithConnectionWithConnection";
import {SwitchingButtonWithSubmit} from "./components/container/SwitchingButtonWithSubmit";
import {TestMemoTextField} from "./components/container/TestMemoTextField";

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
 * Display a hoc issue, this demos the component get reset when the page rerenders.
 * E.g. Such example encountered is that, I added a componentWillMount in the main Component then create an external connect to the hoc, when the main components rerenders it triggers the hoc's componentWillMount again, and this cause the component to reset.
 **/
// ReactDOM.render(
//     <TextFieldWithConnectionAndLoader value={"sample"}/>,
//     document.getElementById("example")
// );

/**
 * Test how text field with a URL Connection call ontop of another URL Connection.
 **/
 //A hack on the top.
//  const props:any = {
//    value: "Sample Value for HOC 2"
//  }
// ReactDOM.render(
//     <TextFieldWithConnectionWithConnection {...props} />,
//     document.getElementById("example")
// );

/**
 * Triggering a changing button, upon click it triggers the database and before the buttons toggles into another state
 * Suspend -> Click -> Trigger DB -> Unsuspend show -> Click -> Trigger DB -> ...
 **/
// ReactDOM.render(
//     <SwitchingButtonWithSubmit id="55"/>,
//     document.getElementById("example")
// );

/**
 * Using the new memo in react 16.6, which we can use React.SFC instead of PureComponent.
 * See the MemoTextField doesn't get re-rendered if only the first textbox is changed.
 **/
ReactDOM.render(
    <TestMemoTextField/>,
    document.getElementById("example")
);
