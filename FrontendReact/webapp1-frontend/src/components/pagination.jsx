import React, { Component } from 'react';
class Pagination extends Component {
    getButtonClass = (pageNum)=>{
        return pageNum === this.props.currPage ? "btn btn-primary " : "btn page-link";
    }
    renderPageButtons = ()=>{
        const {numOfPages} = this.props;
        let buttonList = [];
        for(let pageNum = 1;pageNum<=numOfPages;pageNum++){
            buttonList.push((
                <li className="page-item" key={pageNum}>
                    <button 
                    className={this.getButtonClass(pageNum)}
                    onClick={()=>{this.props.onPaginate(pageNum)}}
                    >
                        {pageNum}
                        </button>
                    </li>
            ));
        }
        return buttonList;
    }
    // {numOfPages, currPage}
    render() { 
        const {currPage,onPaginate,numOfPages} = this.props;
        return (  <ul className="pagination">
        <li className="page-item"><button className="btn page-link" onClick={currPage === 1 ? ()=>{onPaginate(currPage)} : ()=>{onPaginate(currPage-1)}}>Previous</button></li>
        {this.renderPageButtons()}
        <li className="page-item"><button className="btn page-link" onClick={currPage === numOfPages ? ()=>{onPaginate(currPage)} : ()=>{onPaginate(currPage+1)}}>Next</button></li>
      </ul> );
    }
}
 
export default Pagination;