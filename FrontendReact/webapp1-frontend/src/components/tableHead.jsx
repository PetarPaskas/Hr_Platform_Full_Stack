import React, { Component } from 'react';
class TableHead extends Component {
    render() { 
        const {headings} = this.props;
        return (
            <thead>
                <tr>
                {headings.map((heading,ind)=><th style={{color:"rgb(80, 80, 80)"}} key={ind}>{heading}</th>)}
                </tr>
            </thead>
        );
    }
}
 
export default TableHead;