import * as React from "react";
import MultiSelect from '@khanacademy/react-multi-select';

export interface MultiSelectDropDownItem {
  label: string;
  value: string;
}

export interface MultiSelectDropDownState {
  selected: Array<MultiSelectDropDownItem>;
}

export interface MultiSelectDropDownProps {
  title: string;
  options: Array<MultiSelectDropDownItem>;
  callback: (response: Array<MultiSelectDropDownItem>) => void;
  selectAllPlaceholder?: string; //Optional: Text when everything is selected, default = All items are selected
  emptyPlaceholder?: string; //Optional: Text when nothing is selected, default = Select some items...
  selectAllLabel?: string; //Optional: Checkbox text for select all, default = Select All
  disableSearch?: boolean; //Optional: Disable Search text box, default = false
}

export class MultiSelectDropDown extends React.PureComponent<MultiSelectDropDownProps, MultiSelectDropDownState> {

  constructor(props:any) {
    super(props);
    this.state = {
      selected: []
    };
  }

  _handleSelectedChanged = (selected:Array<MultiSelectDropDownItem>) => {
      this.setState({selected});
      this.props.callback(selected);
  }

  _valueRenderer = (selected:Array<MultiSelectDropDownItem>, options:Array<MultiSelectDropDownItem>) => {
    const {selectAllPlaceholder, emptyPlaceholder} = this.props;

    if(selected.length === 0 && emptyPlaceholder) {
      return emptyPlaceholder;
    }
    if(selected.length===options.length && selectAllPlaceholder) {
      return selectAllPlaceholder;
    }

    return undefined;
  }

  _filterOptions = (options: Array<MultiSelectDropDownItem>, filter: string) => {
    const lowercaseFilter = filter.toLowerCase();
    return options.filter((option) => {
      const label = option.label || "";
      return label.toLowerCase().includes(lowercaseFilter);
    });
  }


  render() {
    const {selected} = this.state;
    const {options, title, selectAllLabel, disableSearch} = this.props;

    return (<div>
      <div>{title}</div>
      <MultiSelect
        options={options}
        selected={selected}
        disableSearch={disableSearch}
        selectAllLabel={selectAllLabel? selectAllLabel: "Select All"}
        valueRenderer={this._valueRenderer}
        filterOptions={this._filterOptions}
        onSelectedChanged={this._handleSelectedChanged.bind(this)} />
    </div>);
  }
}
