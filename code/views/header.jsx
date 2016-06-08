import React, {Component, PropTypes} from 'react';

export default class Header extends React.Component {
  static propTypes = {
    onAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {issueState: this.props.issueState};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const issueState = e.target.textContent;
    this.setState({
      issueState
    });
    this.props.onAction(issueState);
  }

  render() {
    const {issueState} = this.state;

    const style = {
      textTransform: 'capitalize'
    };

    const states = ['open', 'close', 'all'].map((state, index) => {
      console.log('issueState === state', issueState, state);
      return (
        <li
          className={issueState === state ? 'active' : ''}
          style={style}
          key={index}
          onClick={this.handleClick}
        >
          <a href="#">{state}</a>
        </li>
      );
    });

    return (
      <div className="header">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-default" role="navigation">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#state-menu-navbar">
                   <span className="sr-only">Toggle navigation</span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Github Issues Viewer</a>
              </div>

              <div className="collapse navbar-collapse" id="state-menu-navbar">
                <ul className="nav navbar-nav navbar-right">
                  {states}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}
