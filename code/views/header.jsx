import React, {Component, PropTypes} from 'react';

export default class Header extends React.Component {
  static propTypes = {
    repoNameChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {issueState: this.props.issueState};

    this.handleChangeStateClick = this.handleChangeStateClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleEnterKeyPressed = this.handleEnterKeyPressed.bind(this);
    this.handleSearchRepo = this.handleSearchRepo.bind(this);
  }

  handleChangeStateClick(e) {
    e.preventDefault();
    const issueState = e.target.textContent;
    this.setState({
      issueState
    });
    this.props.onStateChange(issueState);
  }

  handleEnterKeyPressed(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      console.log('repoName', repoName);
      const repoName = this.repoInput.value;
      this.handleSearchRepo(repoName);
    }
  }

  handleSearchClick(e) {
    e.preventDefault();
    console.log('handleSearchClick', this.repoInput.value);
    const repoName = this.repoInput.value;
    this.handleSearchRepo(repoName);
  }

  handleSearchRepo(repoName) {
    this.props.repoNameChange(this.repoInput.value || 'rails/rails');
  }

  render() {
    const {issueState} = this.state;
    const {repoName} = this.props;

    const style = {
      textTransform: 'capitalize'
    };

    const states = ['open', 'closed', 'all'].map((state, index) => {
      return (
        <li
          className={issueState === state ? 'active' : ''}
          style={style}
          key={index}
          onClick={this.handleChangeStateClick}
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

              <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="i.e. rails/rails"
                    ref={(c) => this.repoInput = c} />
                </div>
                <button
                  type="submit"
                  className="btn btn-default"
                  onClick={this.handleSearchClick}
                >
                  Search
                </button>
              </form>

              <div className="collapse navbar-collapse" id="state-menu-navbar">
                <ul className="nav navbar-nav navbar-right">
                  {states}
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="jumbotron">
          <h2>Browsing repo: {repoName}</h2>
        </div>

      </div>
    )
  }
}
