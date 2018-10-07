declare module "@khanacademy/react-multi-select" {

  export interface MultiSelectItem {
    label: string;
    value: string;
  }

  export interface MultiSelectProps {
    options:Array<MultiSelectItem>;
    selected:Array<MultiSelectItem>;
    selectAllLabel:string;
    disableSearch:boolean;
    valueRenderer:(selected:Array<MultiSelectItem>, options:Array<MultiSelectItem>)=>void;
    filterOptions:(options: Array<MultiSelectItem>, filter: string)=>Array<MultiSelectItem>;
    onSelectedChanged: (selected:Array<MultiSelectItem>)=>void;
  }

  class MultiSelect extends React.Component<MultiSelectProps, {}> {
  }

  export default MultiSelect;
}
