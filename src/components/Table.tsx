import * as React from 'react'

interface TableItem {
  name: string;
  age: number;
}

interface TableState {
  values: Array<TableItem>;
  filter: TableItem;
}

export class Table extends React.PureComponent<{}, TableState> {

  constructor(props:any) {
    super(props);
    this.state = {
      values:[
        {name: "han", age: 38},
        {name: "lee wan", age: 40}
      ],
      filter: {name:'',age: 40} //This is the example, e.g. if {name:'lee wan': age: -1}, show leewan, {name:'', age:-1} show all
    }
  }

  _tableHeader = () => {
    return [
      <th key="hName">Name</th>,
      <th key="hAge">Age</th>,
    ];
  }

  _tableBody = () => {
    const {values, filter} = this.state;

    //YOUR MAGIC is here in filter!!!, you can do shrink, expand your record with filter like C#. No need loading cause this is client side calculation.

    return values
    .filter((eachValue) => {
      return (
        (filter.age === -1 && filter.name === '') ||
        (filter.name === '' && eachValue.age === filter.age) ||
        (filter.age === -1 && eachValue.name === filter.name) ||
        (eachValue.age === filter.age && eachValue.name === filter.name)
      )
    })
    .map((eachValue) => {
      return (
        <tr key={"_"+eachValue.name}>
          <td>{eachValue.name}</td>
          <td>{eachValue.age}</td>
        </tr>);
    });
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              {this._tableHeader()}
            </tr>
          </thead>
          <tbody>
            {this._tableBody()}
          </tbody>
        </table>
      </div>
    )
  }
}
