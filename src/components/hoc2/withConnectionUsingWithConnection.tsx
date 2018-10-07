/**
 * There may be time there are request needs to be triggered before rending the component.
 * Such scenario is that, a form needs to call another API to get all the abbreviation full name.
 * So in this case triggered the call for a first fetch before loading the form.
 **/

import * as React from 'react';
import {compose} from "redux";
import produce from "immer";
import withConnection from "./withConnection";

interface States {}

export interface ConnectionWithConnectionWithConnectionModal {
  firstCalledInfo: string
}

//No parameters to pass
const _withConnectionUsingWithConnection = <T extends React.Component, OriginalProps extends {}>(Component: React.ComponentClass<OriginalProps>) => {
  type PrivateProps = {forwardedRef: React.RefObject<T>}
  type Props = OriginalProps & PrivateProps;

  class Connectivity extends React.Component<Props, States> {
    constructor(props:any) {
      super(props);
    }

    render() {
      const {forwardedRef, ...etcProps} = this.props as PrivateProps;
      const {success, ...otherProps} = etcProps as any; //remove the success value
      const componentProps = otherProps as OriginalProps;

      if(success != null) {
        const functions = (
          {
            firstCalledInfo: "Hello"
          } as any); //hack to pass function

          return <Component {...componentProps} {...functions} ref={forwardedRef}/>
      }
      else {
        return <div>Loading first</div>
      }
    }
  }


  const RefForwardingFactory = (props: Props, ref: T) => {return <Connectivity {...props} forwardedRef={ref}/>};

  return React.forwardRef<T, OriginalProps>(RefForwardingFactory as any);
}

export const withConnectionUsingWithConnection = compose(
  withConnection("URL", {}, "Error") , //Call the first connection
  _withConnectionUsingWithConnection //
);

export default withConnectionUsingWithConnection;
