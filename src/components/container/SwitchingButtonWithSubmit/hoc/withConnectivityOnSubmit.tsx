/**
 * Used to submit form data.
 **/

import * as React from 'react';
import {compose} from "redux";
import produce from "immer";

export interface States {
  isLoading: boolean;
  isError: boolean;
  error: string;
  success: any;
}

export interface ConnectivityOnSubmitModal {
  connectOnSubmit?: (input:any, errorMessage:string) => void;
  isLoadingOnSubmit?: boolean;
  isErrorOnSubmit?: boolean;
  errorOnSubmit?: string;
  successOnSubmit?: object;
}

const withConnectivityOnSubmit = (path:string) => <T extends React.Component, OriginalProps extends {}>(Component: React.ComponentClass<OriginalProps>) => {
  type PrivateProps = {forwardedRef: React.RefObject<T>}
  type Props = OriginalProps & PrivateProps;

  class Connectivity extends React.Component<Props, States> {
    constructor(props:any) {
      super(props);
      this.state = {
        isLoading: false,
        isError: false,
        error: '',
        success:null
      }
    }

    _connect = (input:any, errorMessage:string) => {
      if(this.state.isLoading) {
        console.log("I am still loading, sorry no deal on clicking me again.");
        return;
      }
      this._startConnection();
      // fetch(path,{
      //   method: 'GET',
      //   //body: JSON.stringify(input),
      //   mode: "cors",
      //   credentials:'include',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(resp => resp.json())
      //   .then(data => this._handleReturnData(data, errorMessage))
      //   .catch(error => this._handleException(error));
      const self = this;
      setTimeout( () =>
        {
          self._handleReturnData({sample:"data"}, errorMessage);
        }
      , 1000);
    }

    _checkForError = (data: any) => {
      if(!data || data === undefined) {
        throw Error("No valid data");
      }
    }

    _startConnection = () => {
      this.setState(
        produce<States>(draft => {
          draft.isLoading = true;
          draft.isError = false;
          draft.error = '';
          draft.success = null;
        })
      );
    }

    _handleReturnData = (successfulData: any, errorMessage: string) => {
      if(!successfulData || successfulData === undefined) {
        throw Error("No valid data");
      } else {
        if (successfulData.Error) {
          this.setState(
            produce<States>(draft => {
              draft.isLoading = false;
              draft.isError = true;
              draft.error = errorMessage;
            })
          );
        } else {
          this.setState(
            produce<States>(draft => {
              draft.isLoading = false;
              draft.isError = false;
              draft.success = successfulData;
            })
          );
        }
      }
    }

    _handleException = (errorText:string) => {
      this.setState(
        produce<States>(draft => {
          draft.isLoading = false;
          draft.isError = true;
          draft.error = '' + errorText;
        })
      );
    }

    render() {
      const {isError, error, success, isLoading} = this.state;
      const {forwardedRef, ...otherProps} = this.props as PrivateProps;
      const componentProps = otherProps as OriginalProps;

      const functions:ConnectivityOnSubmitModal = (
        {
          connectOnSubmit: this._connect,
          isLoadingOnSubmit: isLoading,
          isErrorOnSubmit: isError,
          errorOnSubmit: error,
          successOnSubmit: success
        } as any); //hack to pass function
      return <Component {...componentProps} {...functions} ref={forwardedRef}/>
    }
  }

  const RefForwardingFactory = (props: Props, ref: T) => {return <Connectivity {...props} forwardedRef={ref}/>};

  return React.forwardRef<T, OriginalProps>(RefForwardingFactory as any);
}

export default withConnectivityOnSubmit;
