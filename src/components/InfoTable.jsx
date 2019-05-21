import React, { Component } from 'react';

export default class InfoTable extends Component {
  constructor(props) {
    super(props);
  }
  Row = () => {
    var rows;
    try {
      rows = this.props.info.map(info =>
        <tr className="flex text-center border-b-2">
          <td className="w-1/5 text-center">{info[0]}</td>
          <td className="w-1/5 text-center">{info[1]}</td>
          <td className="w-1/5 text-center">{info[2]}</td>
          <td className="w-1/5 text-center">{info[3]}</td>
          <td className="w-1/5 text-center">{info[4]}</td>
          <td className="w-1/5 text-center">{info[5].replace(";", "")}</td>
        </tr>
      )
    } catch (error) {
    }finally{
      return rows;
    }
  };

  render() {
    return (
      <table className="flex flex-col w-full inline-block border-grey border-2 border-solid">
        <thead>
          <tr className="flex items-center h-10 w-full border-b-2">
            <th className="w-1/6 h-10">Date Out</th>
            <th className="w-1/6 h-10">Date In</th>
            <th className="w-1/6 h-10">Client Id</th>
            <th className="w-1/6 h-10">Movie Id</th>
            <th className="w-1/6 h-10">Rent Id</th>
            <th className="w-1/6 h-10">Due</th>
          </tr>
        </thead>
        <tbody>
          <this.Row />
        </tbody>
      </table>
    );
  }
}