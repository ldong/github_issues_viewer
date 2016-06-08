import React, {Component} from 'react';
import SingleView from './singleView.jsx';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIssues: null
    };
  }

  componentDidMount() {
    const {repoLink, pageIndex, issuesPerPage, issueState} = this.props;
    const url = `https://api.github.com/repos/${repoLink}/issues?page=${pageIndex}&per_page=${issuesPerPage}&state=${issueState}`;

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
          <SingleView
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
        <h1>rails/rails repo issues</h1>
        <ul className="list-group">
          {issues}
        </ul>
      </div>
    )
  }
}
