import * as React from "react";
import {UsingTextField} from "./UsingTextField";
import withConnection from "../hoc2/withConnection";
import withConnectionUsingWithConnection from "../hoc2/withConnectionUsingWithConnection";
import {ConnectionWithConnectionWithConnectionModal} from "../hoc2/withConnectionUsingWithConnection";
import {ConnectionOnLoadModal} from "../hoc2/withConnection";
import {compose} from 'redux';

interface TextFieldWithConnectionProps extends ConnectionOnLoadModal {
  value:string;
}

export class _TextFieldWithConnectionWithConnection extends React.PureComponent<TextFieldWithConnectionProps, {}> {
  public anotherRef = React.createRef<UsingTextField>();

  printValue = () => {
    console.log("printValue");
  }

  render() {
    console.log(this.props);
    return  <UsingTextField value={this.props.value} ref={this.anotherRef}/>;
  }
}


export const TextFieldWithConnectionWithConnection = compose(
  withConnectionUsingWithConnection,
  withConnection("path",{},"errorMessage"))(_TextFieldWithConnectionWithConnection);

console.log(TextFieldWithConnectionWithConnection);
