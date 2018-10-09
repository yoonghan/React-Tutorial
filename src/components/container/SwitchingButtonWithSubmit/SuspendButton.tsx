import * as React from "react";
import produce from "immer";
import {compose} from 'redux';
import withConnectivityOnSubmit from "./hoc/withConnectivityOnSubmit";
import {ConnectivityOnSubmitModal} from "./hoc/withConnectivityOnSubmit";

export interface SuspendButtonProps  extends ConnectivityOnSubmitModal{
  id: string;
  successCallback: ()=>void;
}

export class _SuspendButton extends React.PureComponent<SuspendButtonProps, {}>  {

  constructor(props:SuspendButtonProps) {
    super(props);
  }

  _onClick_Suspend_Button = () => {
    const {id} = this.props;
    var suspendData = {id: id};
    (this.props as any).connectOnSubmit(suspendData, "Invalid Data");
  }

  /** Make effort to check over here, if there are success update the state **/
  componentWillUpdate(nextProps:any, nextState:any) {
    const {isErrorOnSubmit, successOnSubmit, successCallback} = nextProps;
    console.log(successOnSubmit && this.props.successCallback);
    if(successOnSubmit != null) {
      console.log("Suspend");
      successCallback();
      return false;
    }
    return true;
  }

  render() {
    //Cannot put the checking into this render part. The reason being that render has not completed and
    //we are triggering the state change of the parent.
    return (
      <input type="button" onClick={this._onClick_Suspend_Button} value="Suspend"/>
    );
  }
}

export const SuspendButton = compose(
  withConnectivityOnSubmit("https://www.walcron.com")
)(_SuspendButton);
