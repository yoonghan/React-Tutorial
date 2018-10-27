import * as React from "react";

export interface MemoTextFieldProps {
  value: string;
  name: string;
};

//If this is PureComponent, only if props change the component rerender
//If this is Component, props change or NOT, the component will rerender
export class MemoTextField extends React.PureComponent<MemoTextFieldProps, {}> {
  render() {
    console.log("Render:"+this.props.name);
    return <h3>{this.props.value}</h3>;
  }
}

// New React 16.6, will act like PureComponent, unfortunately not available at state of testing.
//
// export const _MemoTextField: React.SFC<MemoTextFieldProps> = (props:any) => {
//   console.log("This component is being rendered");
//   return <h3>{props.value}</h3>;
// }
//
// export const MemoTextField = React.memo(_MemoTextField);
