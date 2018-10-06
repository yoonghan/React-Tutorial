import * as React from "react";
import {UsingTextField} from "./UsingTextField";
import withConnectionAndLoader from "../hoc/withConnectionAndLoader";
import {ConnectionOnLoadModal} from "../hoc/withConnectionAndLoader";
import {compose} from 'redux';

interface TextFieldWithConnectionProps extends ConnectionOnLoadModal{
  value:string;
}


export class _TextFieldWithConnectionAndLoader extends React.PureComponent<TextFieldWithConnectionProps, {}> {
  public anotherRef = React.createRef<UsingTextField>();

  printValue = () => {
    console.log("printValue");
  }

  render() {
    console.log(">>"+this.props.success);

    return (
      <div>
        <div>Try change the text and see that the text value resets after 5 seconds.</div>
        <div>To overcome this loading problem. 1) Used modal/dialog to display loading, or put into the compoent.</div>
        <UsingTextField value={this.props.value} ref={this.anotherRef}/>
      </div>
    );
  }
}

export const TextFieldWithConnectionAndLoader = compose(withConnectionAndLoader("path",{},"errorMessage"))(_TextFieldWithConnectionAndLoader);
