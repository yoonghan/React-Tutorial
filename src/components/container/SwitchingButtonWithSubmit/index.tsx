import * as React from "react";
import produce from "immer";
import {compose} from 'redux';
import withConnectivityOnSubmit from "./hoc/withConnectivityOnSubmit";
import {UnsuspendButton} from "./UnsuspendButton";
import {SuspendButton} from "./SuspendButton";

export interface ControlButtonsProps {
  id: string;
}

export interface ControlButtonsStates {
  isSuspend: boolean;
}

export class SwitchingButtonWithSubmit extends React.PureComponent<ControlButtonsProps, ControlButtonsStates>  {

  constructor(props:ControlButtonsProps) {
    super(props);
    this.state = {
      isSuspend: false
    }
  }

  _determineButtonDisplay = () => {
    const {isSuspend} = this.state;
    const {id} = this.props;
    if(isSuspend) {
      return <SuspendButton id={id} successCallback={this._switchButton}/>;
    }
    else {
      return <UnsuspendButton id={id} successCallback={this._switchButton}/>;
    }
  }

  _switchButton = () => {
    console.log("Ok let's switch");
    this.setState(
      produce<ControlButtonsStates>(draft => {
        draft.isSuspend = !draft.isSuspend; //true->false, false->true
      })
    );
  }

  render() {
    const {id} = this.props;
    /** form group always span to total of 12, not 10 **/
    return (
      <div>
        {this._determineButtonDisplay()}
      </div>
    );
  }
}
