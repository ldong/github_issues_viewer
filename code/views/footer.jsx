import React, {Component, PropTypes} from 'react';

export default class Footer extends Component {

  static propTypes = {
    onAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {currentPageIndex: 1};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const pageIndex = e.target.textContent;
    const currentPageIndex = parseInt(pageIndex);

    this.setState({
      currentPageIndex
    });

    this.props.onAction(currentPageIndex);
  }

  render() {
    const {currentPageIndex} = this.state;
    const {pageTotal} = this.props;

    const pages = Array.from(Array(pageTotal)).map((el, index)=> {
      const pageIndex = index+1;

      return (
          <li
            className={currentPageIndex === pageIndex ? 'active' : ''}
            key={pageIndex}
            onClick={this.handleClick}
          >
            <a href="#">{pageIndex}</a>
          </li>
        )
    });

    return (
      <div className="footer">
        <div className="text-center">
          <ul className="pagination">
            <li><a href="#">&lt;</a></li>
            {pages}
            <li><a href="#">&gt;</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
