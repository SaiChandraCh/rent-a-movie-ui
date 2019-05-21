import React, { Component } from 'react';

export default class Table extends Component {
  constructor(props) {
    super(props);
    // this.state={
    //   rows:""
    // }

  }
  heading = () => {
    var heading = null;
    try {
      if (this.props.flag) {
        heading =
          <tr className="border-b-2">
            <th>Name</th>
            <th>Id</th>
            <th>Deleted</th>
          </tr>
      } else {
        heading =
          <tr className="border-b-2">
            <th>Name</th>
            <th>Id</th>
            <th>Rented</th>
          </tr>
      }
    } catch (error) {

    } finally{
      return heading;
    }
  }
  Row = () => {
    var rows = null;
    try {
      rows = this.props.data.map(client =>
        <tr className="border-b-2">
          <td className="text-center">{client[0]}</td>
          <td className="text-center">{client[1]}</td>
          <td className="text-center">{client[2]}</td>
        </tr>
      )
    } catch (error) {
      console.log(error)
    } finally {
      return rows;
    }
  };

  render() {
    return (
      <table className="w-full border-grey border-2 border-solid">
        <thead>
          <this.heading />
        </thead>
        <tbody>
          <this.Row />
        </tbody>
      </table>
    );
  }
}