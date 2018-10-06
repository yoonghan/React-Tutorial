import * as React from "react";
import produce from "immer";

export enum TextFieldTypes {
  Text,
  Password
}

export enum TextFieldValidationTypes {
  Blank,
  Email,
  Blankcomment
}

export interface TextFieldProps {
  text?: string;
  placeholder: string;
  value?: string;
  defaultValue?: string;
  extraClassName?: string;
  type?: TextFieldTypes;
  errorText?: string;
  validation?: Array<TextFieldValidationTypes>;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

interface TextFieldState {
  isError: boolean;
  isTriggerExternal: boolean;
}

export class TextField extends React.PureComponent<TextFieldProps, TextFieldState> {

  constructor(props:TextFieldProps) {
    super(props);
    this.state = {
      isError: false,
      isTriggerExternal: false
    }
  }

  _checkType = () => {
    switch(this.props.type) {
      case TextFieldTypes.Password:
        return 'password';
      default:
        return 'text';
    }
  }

  validateTextField = (str:string) => {
    this._setTriggeredExternal(true);
    return this._validate(str);
  }

  _validate = (str:string) => {
    const {validation} = this.props;
    if(!validation) {
      return true;
    }

    var isValid = true;
    for(let loop = 0; loop < validation.length; loop++) {
      switch(validation[loop]) {
        case TextFieldValidationTypes.Email:
          isValid = this._checkIsEmailValid(str);
          break;
        case TextFieldValidationTypes.Blank:
          isValid = this._checkIsNotBlank(str);
          break;
        case TextFieldValidationTypes.Blankcomment:
          isValid = this._checkIsNotBlank(str);
          break;
        default:
          isValid = true;
      }
      if(!isValid) {
        this._setCheckingCondition(isValid);
        return false;
      }
    }
    this._setCheckingCondition(true);
    this._setTriggeredExternal(false);
    return true;
  }

  _setTriggeredExternal = (status: boolean) => {
    this.setState(
      produce<TextFieldState>(draft => {
        draft.isTriggerExternal = status;
      })
    );
  }

  _checkIsNotBlank = (str:string) => {
    return str && str.length > 0;
  }

  _checkIsEmailValid = (str:string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(str).toLowerCase());
  }

  _setCheckingCondition = (validity:boolean) => {
    this.setState(
      produce<TextFieldState>(draft => {
        draft.isError = !validity;
      })
    );
  }

  _onChange = (event: React.FormEvent<HTMLInputElement>) => {
    this._validate(event.currentTarget.value);
    if(this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const {isError, isTriggerExternal} = this.state;
    const {placeholder, text, errorText, extraClassName, defaultValue} = this.props;

    return (
      <div className={'edumill-textfield ' + (extraClassName?extraClassName : '') + ((isError && isTriggerExternal) ? ' error':'')}>
        <div>{text}</div>
        <input
          className={'input'}
          type={this._checkType()}
          placeholder={placeholder}
          onChange={this._onChange}
          value={this.props.value}
          defaultValue={defaultValue}/>
        {(isError && isTriggerExternal) && <div>{errorText}</div>}
      </div>
    );
  }
}
