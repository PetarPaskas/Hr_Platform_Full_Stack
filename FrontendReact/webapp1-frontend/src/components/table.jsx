import React, { Component } from 'react';
import TableHead from './tableHead';
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { headings } = this.props;
    return (
      <table className="table">
        <TableHead headings={headings} />
        <TableBody data={this.props.data} perPage={this.props.perPage}/>
      </table>
    );
  }
}

export default Table;