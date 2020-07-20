import React, {Component, Fragment, PropTypes} from 'react';

const propTypes = {};

export class PaginationButtons extends Component {

    getPageNumbers = () => {
        console.log(`pageCount ${this.props.pageCount} , currentPage : ${this.props.currentPage}`)
        if (this.props.pageCount < 4) {
            return [...Array(this.props.pageCount + 1).keys()].slice(1);
            // 1,2,3
        } else if (this.props.currentPage <= 4) {
            return [1,2,3,4,5];
        } else if (this.props.currentPage > this.props.pageCount - 4) {
          return [...Array(5).keys()].reverse().map(v => this.props.pageCount - v);
        } else {
            return [this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1];
        }
    };
    render() {
        const current = this.props.currentPage;
        const pageCount = this.props.pageCount;
        const navigate = this.props.navigate;
        return <Fragment>
            <button onClick={ () => navigate( current - 1)}
                    disabled={ current === 1} className="btn btn-secondary mx-1">
                    Previous
            </button>
            {
                current > 4 &&
                <Fragment>
                    <button className="btn btn-secondary mx-1"
                            onClick={ ()=> navigate(1) }>1</button>
                    <span className="h4">...</span>
                </Fragment>
            }
            {
                this.getPageNumbers().map(num =>
                    <button className={ `btn mx-1 ${num === current ? "btn-primary": "btn-secondary"}`}
                    onClick={ () => navigate(num)} key={num}>
                        { num }
                    </button>
                )
            }
            {
                current <= (pageCount - 4) &&
                <Fragment>
                    <span className="h4">...</span>
                    <button className="btn btn-secondary mx-1"
                            onClick={ () => navigate(pageCount)}>
                        { pageCount }
                    </button>
                </Fragment>
            }
            <button onClick={() => navigate(current + 1) }
                    disabled={ current === pageCount }
                    className="btn btn-secondary mx-1">
                Next
            </button>
        </Fragment>
    }
}

PaginationButtons.propTypes = propTypes;