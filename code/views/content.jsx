import React, {Component} from 'react';
import SingleView from './singleView.jsx';
import DetailView from './detailView.jsx';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIssues: null,
      isExpanded: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const {repoLink, pageIndex, issuesPerPage, issueState} = this.props;
    const url = `https://api.github.com/repos/${repoLink}/issues?page=${pageIndex}&per_page=${issuesPerPage}&state=${issueState}`;

    fetch(url, {
      method: 'get'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({
            currentIssues: data
          });
        });
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  handleClick() {
    console.log('handleClick for singleView');
    const {isExpanded} = this.state;
    this.setState({
      isExpanded: !isExpanded
    });
  }

  render() {
    let issues;
    const {currentIssues, isExpanded} = this.state;

    if (currentIssues) {
      issues = currentIssues.map((issue, index)=> {
        let cls = index % 2 === 0 ? '': 'list-item-even';

        return (
          <div key={index}>
            <SingleView
              className={`list-group-item ${cls}`}
              data={issue}
              onAction={this.handleClick}
            />
            {isExpanded && (<DetailView className="bounce-in" />)}
          </div>
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
