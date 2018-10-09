import * as React from "react";
import produce from "immer";
import {compose} from 'redux';
import withConnectivityOnSubmit from "./hoc/withConnectivityOnSubmit";
import {ConnectivityOnSubmitModal} from "./hoc/withConnectivityOnSubmit";

export interface UnsuspendButtonProps  extends ConnectivityOnSubmitModal{
  id: string;
  successCallback: ()=>void;
}

export class _UnsuspendButton extends React.Component<UnsuspendButtonProps, {}>  {

  constructor(props:UnsuspendButtonProps) {
    super(props);
  }

  _onClick_Unsuspend_Button = () => {
    const {id} = this.props;
    var unSuspendData = {id: id};
    (this.props as any).connectOnSubmit(unSuspendData, "Invalid Data");
  }

  /** Make effort to check over here, if there are success update the state **/
  componentWillUpdate(nextProps:any, nextState:any) {
    const {isErrorOnSubmit, successOnSubmit, successCallback} = nextProps;
    console.log(successOnSubmit);
    if(successOnSubmit != null && this.props.successCallback) {
      console.log("Unsuspend");
      successCallback();
    }
    return false;
  }

  render() {
    //Cannot put the checking into this render part. The reason being that render has not completed and
    //we are triggering the state change of the parent.
    return (
      <input type="button" onClick={this._onClick_Unsuspend_Button} value="Unsuspend" />
    );
  }
}

export const UnsuspendButton = compose(
  withConnectivityOnSubmit("https://www.walcron.com")
)(_UnsuspendButton);
