import React, {Component, PropTypes} from 'react';

export default class Footer extends Component {

  static propTypes = {
    onAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageIndex) {
    this.props.onAction(parseInt(pageIndex));
  }

  handlePrevPageClick(e) {
    e.preventDefault();
    const {pageIndex} = this.props;
    this.handlePageChange(pageIndex-1);
  }

  handleNextPageClick(e) {
    e.preventDefault();
    const {pageIndex} = this.props;
    this.handlePageChange(pageIndex+1);
  }

  render() {
    // const {currentPageIndex} = this.state;
    const {pageIndex} = this.props;

    // const pages = Array.from(Array(pageTotal)).map((el, index)=> {
    //   const pageIndex = index+1;

    //   return (
    //       <li
    //         className={currentPageIndex === pageIndex ? 'active' : ''}
    //         key={pageIndex}
    //         onClick={this.handleClick}
    //       >
    //         <a href="#">{pageIndex}</a>
    //       </li>
    //     )
    // });

    const showPrevIndex = pageIndex > 1 ? true : false;
    return (
      <div className="footer">
        <div className="text-center">
          <ul className="pagination">
           {showPrevIndex && (
              <li>
                <a
                  href="#"
                  onClick={this.handlePrevPageClick}
                >
                  &lt;
                </a>
              </li>
            )}
            <li><a href="#">{pageIndex}</a></li>
            <li>
              <a
                href="#"
                onClick={this.handleNextPageClick}
              >
                &gt;
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
