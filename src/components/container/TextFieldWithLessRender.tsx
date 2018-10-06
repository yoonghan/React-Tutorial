/**
 * See how default values are set.
 **/

import * as React from "react";
import {UsingTextFieldProp, UsingTextField} from "./UsingTextField";

export interface TextFieldWithLessRenderProp extends UsingTextFieldProp {
  value: string
};

export interface TextFieldWithLessRenderState {
  value: string
};

export class TextFieldWithLessRender extends React.PureComponent<TextFieldWithLessRenderProp, TextFieldWithLessRenderState> {
  private textFieldRef = React.createRef<UsingTextField>();

  constructor(props:UsingTextFieldProp) {
    super(props);
    this.state = {
      value: (this.props.value ? this.props.value :"")
    }
  }

  _onClick_Button = () => {
    console.log("This component never re-render");
    console.log("Value: " + (this.textFieldRef).current.getAllValue());
  }

  render() {
    console.log("Re render less");
    return (
      <div>
        <UsingTextField value={"Another Default Value"}  ref={this.textFieldRef}/>
        <input type="button" onClick={this._onClick_Button} value="Click Me"/>
      </div>
    );
  }
}
