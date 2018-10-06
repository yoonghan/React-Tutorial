import * as React from "react";
import {UsingTextField} from "./UsingTextField";
import withConnection from "../hoc/withConnection";
import {ConnectionOnLoadModal} from "../hoc/withConnection";
import {compose} from 'redux';

interface TextFieldWithConnectionProps extends ConnectionOnLoadModal{
  value:string;
}


export class _TextFieldWithConnection extends React.PureComponent<TextFieldWithConnectionProps, {}> {
  public anotherRef = React.createRef<UsingTextField>();

  printValue = () => {
    console.log("printValue");
  }

  render() {
    console.log(">>"+this.props.success);
    return  <UsingTextField value={this.props.value} ref={this.anotherRef}/>;
  }
}

export const TextFieldWithConnection = compose(withConnection("path",{},"errorMessage"))(_TextFieldWithConnection);

export class TextFieldWithConnectionWrapper extends React.PureComponent<TextFieldWithConnectionProps, {}> {
  //Created the real component class not the composed component.
  private textFieldRef = React.createRef<_TextFieldWithConnection>();

  click = () => {
    console.log("CLICK");
    this.textFieldRef.current.printValue();
    console.log("INNER CLICK");
    console.log(this.textFieldRef.current.anotherRef.current.getAllValue());
  }

  render() {
    return  (
      <div>
        <TextFieldWithConnection value={this.props.value} ref={this.textFieldRef}/>
        <input type="button" onClick={this.click} value={"Click"}/>
      </div>
    );
  }
}
