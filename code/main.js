import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Header from './views/header.jsx';
import Content from './views/content.jsx';
import Footer from './views/footer.jsx';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleHeaderStateChange = this.handleHeaderStateChange.bind(this);
    this.handleFooterPagenationChange = this.handleFooterPagenationChange.bind(this);

    this.state = {
      pageIndex: 1,
      issueState: 'open',
      pageTotal: 10
    };
  }

  componentDidMount() {

  }

  handleHeaderStateChange(issueState) {
    console.log('handleHeaderStateChange run with state', issueState);
    this.setState({
      issueState
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
    const {pageTotal} = this.state;

    return (
      <div>
        <Header
          issueState={this.state.issueState}
          onAction={this.handleHeaderStateChange}
        />
        <Content />
        <Footer
          pageTotal={pageTotal}
          onAction={this.handleFooterPagenationChange}
        />
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
