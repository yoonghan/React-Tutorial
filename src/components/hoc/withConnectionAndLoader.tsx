/**
 * Used to auto load data upon start up.
 * Not suitable if the data to load needs to read from parameter
 **/

import * as React from 'react';
import {compose} from "redux";
import produce from "immer";

interface States {
  isLoading: boolean;
  isError: boolean;
  error: string;
  success: any;
}

export interface ConnectionOnLoadModal {
  connect?: (input:any, errorMessage:string) => void;
  isError?: boolean;
  error?: string;
  success?: object;
}

const withConnectionAndLoader = (path:string, input:any, errorMessage:string) => <T extends React.Component, OriginalProps extends {}>(Component: React.ComponentClass<OriginalProps>) => {
  type PrivateProps = {forwardedRef: React.RefObject<T>}
  type Props = OriginalProps & PrivateProps;

  class Connectivity extends React.Component<Props, States> {
    constructor(props:any) {
      super(props);
      this.state = {
        isError: false,
        error: '',
        success:null,
        isLoading: false
      }
    }

    componentWillMount() {

      // fetch(path,{
      //   method: 'POST',
      //   body: JSON.stringify(input),
      //   mode: "cors",
      //   credentials:'include',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(resp => resp.json())
      //   .then(data => {this._checkForError(data); return data})
      //   .then(data => this._handleReturnData(data, errorMessage))
      //   .catch(error => this._handleException(error));
      const self = this;

      this._startLoading();

      setTimeout( () =>
        {
          self._handleReturnData({sample:"data"}, errorMessage);

          setTimeout( () =>
            {

              self.componentWillMount();

            }
          , 5000);
        }
      , 3000);
    }

    _startLoading = () => {
      this.setState(
        produce<States>(draft => {
            draft.isLoading = true;
        })
      );
    }

    _checkForError = (data: any) => {

      if(!data || data === undefined) {
        throw Error("No valid data");
      }
    }

    _handleReturnData = (successfulData: any, errorMessage: string) => {

      if(!successfulData || successfulData === undefined) {
        throw Error("No valid data");
      } else {
        if (successfulData.Error) {
          this.setState(
            produce<States>(draft => {
                draft.isError = true;
                draft.isLoading = false;
            })
          );
        } else {
          this.setState(
            produce<States>(draft => {
                draft.isError = false;
                draft.isLoading = false;
                draft.success = successfulData;
            })
          );
        }
      }
    }

    _handleException = (errorText:string) => {
      this.setState(
        produce<States>(draft => {
            draft.isError = true;
            draft.isLoading = false;
            draft.error = '' + errorText;
        })
      );
    }

    render() {
      const {isError, error, success, isLoading} = this.state;
      const {forwardedRef, ...otherProps} = this.props as PrivateProps;
      const componentProps = otherProps as OriginalProps;

      const functions = (
        {
          isError: isError,
          error: error,
          success: success
        } as any); //hack to pass function

      return isLoading? <div>LOADING</div> :<Component  {...componentProps} {...functions} ref={forwardedRef}/>
    }
  }


  const RefForwardingFactory = (props: Props, ref: T) => {return <Connectivity {...props} forwardedRef={ref}/>};

  return React.forwardRef<T, OriginalProps>(RefForwardingFactory as any);
}

export default withConnectionAndLoader;
