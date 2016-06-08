import React from 'react';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      per_page: 25,
      state: 'closed'
    };
  }

  componentDidMount() {
    const {page, per_page, state} = this.state;
    const url = `https://api.github.com/repos/rails/rails/issues?page=${page}&per_page=${per_page}&state=${state}`;

    fetch(url, {
      method: 'get'
    }).then(response => {
      console.log(response);
      if (response.ok) {
        response.json().then(data => {
          // console.log(data);
          this.setState({
            currentIssues: data
          });
        });
      }
    }).catch( err => {
      console.log('Error', err);
    });
  }

  render() {
    const {currentIssues} = this.state;
    console.log('currentIssues');
    console.log(currentIssues);

    if (currentIssues || 1) {

    }

    const content = (
       <div className="row">
        <div className="col-md-4">
          <h2>
            Heading
          </h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
          </p>
          <p>
            <a className="btn" href="#">View details »</a>
          </p>
        </div>
        <div className="col-md-4">
          <h2>
            Heading
          </h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
          </p>
          <p>
            <a className="btn" href="#">View details »</a>
          </p>
        </div>
        <div className="col-md-4">
          <h2>
            Heading
          </h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
          </p>
          <p>
            <a className="btn" href="#">View details »</a>
          </p>
        </div>
      </div>
    )

    return (
      <div className="header">
        <h1>Hello</h1>
        {/*{currentIssues}*/}
        {content}
      </div>
    )
  }
}
