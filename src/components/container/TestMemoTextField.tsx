/**
 * See how component is not being rerendered.
 **/

import * as React from "react";
import {MemoTextField} from "./MemoTextField";
import {TextField} from "../util/TextField";
import produce from "immer";

export interface TestMemoTestFieldProps {
};

export interface TestMemoTestFieldStates {
  value1: string;
  value2: string;
};

export class TestMemoTextField extends React.PureComponent<TestMemoTestFieldProps, TestMemoTestFieldStates> {
  constructor(props:TestMemoTestFieldProps) {
    super(props);
    this.state = {
      value1: "",
      value2: ""
    }
  }

  _onChangeValue1 = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState(
      produce<TestMemoTestFieldStates>(draft => {
        draft.value1 = value;
      })
    );
  }

  _onChangeValue2 = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState(
      produce<TestMemoTestFieldStates>(draft => {
        draft.value2 = value;
      })
    );
  }

  render() {
    console.log("Re render");
    return (
      <div>
        <TextField onChange={this._onChangeValue1} placeholder={"Change Text 1"}/>
        <TextField onChange={this._onChangeValue2} placeholder={"Change Text 2"}/>
        <div>See memo 2 NOT getting rerendered when value 1 change</div>
        <MemoTextField value={this.state.value1} name={"memo 1"}/>
        <div>See memo 1 NOT getting rerendered when value 2 change</div>
        <MemoTextField value={this.state.value2} name={"memo 2"}/>
      </div>
    );
  }
}
