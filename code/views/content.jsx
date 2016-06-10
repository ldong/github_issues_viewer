import React, {Component} from 'react';
import ListView from './listView.jsx';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIssues: null
    };
  }

  componentDidMount() {
    this.fetchIssues(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchIssues(nextProps);
  }

  fetchIssues(props) {
    const {repoName, pageIndex, issuesPerPage, issueState} = props;
    const url = `https://api.github.com/repos/${repoName}/issues?page=${pageIndex}&per_page=${issuesPerPage}&state=${issueState}`;

    fetch(url, {
      method: 'get'
    }).then(response => {
      if (response.ok) {
        response.json().then(currentIssues => {
          this.setState({
            currentIssues
          });
        });
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  render() {
    let issues;
    const {currentIssues, isExpanded} = this.state;

    if (currentIssues) {
      issues = currentIssues.map((issue, index)=> {
        let cls = index % 2 === 0 ? '': 'list-item-even';

        return (
          <ListView
            key={index}
            className={`list-group-item ${cls}`}
            data={issue}
            onAction={this.handleClick}
          />
         )
      });
    }

    return (
      <div className="content">
        <ul className="list-group">
          {issues}
        </ul>
      </div>
    )
  }
}
