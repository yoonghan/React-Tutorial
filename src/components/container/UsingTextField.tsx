/**
 * See how default values are set.
 **/

import * as React from "react";
import {TextField} from "../util/TextField";

export interface UsingTextFieldProp {
  value: string
};

export interface UsingTextFieldState {
  value: string
};

export class UsingTextField extends React.PureComponent<UsingTextFieldProp, UsingTextFieldState> {
  constructor(props:UsingTextFieldProp) {
    super(props);
    this.state = {
      value: (this.props.value ? this.props.value :"")
    }
  }

  getAllValue = () => {
    return this.state.value;
  }

  _onChange = (event:React.FormEvent<HTMLInputElement>) => {
    const _value = event.currentTarget.value;
    this.setState((state, props) => ({
      value: _value
    }))
  }

  render() {
    console.log("Re render text box on each type");
    return <TextField value={this.state.value} onChange={this._onChange} placeholder={"Enter a text"}/>;
  }
}
