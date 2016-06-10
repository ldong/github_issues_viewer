import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Header from './views/header.jsx';
import Content from './views/content.jsx';
import Footer from './views/footer.jsx';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleHeaderStateChange = this.handleHeaderStateChange.bind(this);
    this.handleHeaderRepoNameChange = this.handleHeaderRepoNameChange.bind(this);
    this.handleFooterPagenationChange = this.handleFooterPagenationChange.bind(this);

    this.state = {
      repoName: 'rails/rails',
      pageIndex: 1,
      issueState: 'open',
      issuesPerPage: 25
    };
  }

  handleHeaderRepoNameChange(repoName) {
    console.log('handleHeaderRepoNameChange run with state', repoName);
    this.setState({
      repoName,
      pageIndex: 1,
    });
  }

  handleHeaderStateChange(issueState) {
    console.log('handleHeaderStateChange run with state', issueState);
    this.setState({
      issueState,
      pageIndex: 1
    });
  }

  handleFooterPagenationChange(pageIndex) {
    console.log('handlePagenationChange run with index', pageIndex);
    this.setState({
      pageIndex
    });
  }

  handleContentChange(pageIndex) {
    console.log('handleContentChange run with index', pageIndex);
    this.setState({
      pageIndex
    });
  }

  render() {
    const {repoName, pageIndex, issueState, issuesPerPage} = this.state;

    return (
      <div>
        <Header
          issueState={issueState}
          repoName={repoName}
          onStateChange={this.handleHeaderStateChange}
          repoNameChange={this.handleHeaderRepoNameChange}
        />
        <Content
          repoName={repoName}
          issueState={issueState}
          pageIndex={pageIndex}
          issuesPerPage={issuesPerPage}
        />
        <Footer
          pageIndex={pageIndex}
          onAction={this.handleFooterPagenationChange}
        />
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
