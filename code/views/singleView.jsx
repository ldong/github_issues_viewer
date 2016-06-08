import React, {Component, PropTypes} from 'react';

export default class SingleView extends Component {
  static propTypes = {
    data:  PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onAction();
  }

  render() {
    const {
      number, title, labels, body,
      user: {avatar_url, login},
      created_at
    } = this.props.data;

    // truncate the body to maximum length of 140
    // const login = 'John Doe';
    // const body = "I'm not sure if this a bug, but the behaviour looks weird. Tested on both master and rails 4.21\r\n\r\n### Steps to reproduce\r\nPlease find this gist that illustrate the problem: https://gist.github.com/Edouard-chin/b7fe1c9ce8bc86a734aeaf6b5fdd4c1d\r\n\r\n### Expected behavior\r\nWhen `accepts_nested_attributes_for` gets called, the `validate_associated_records_for_xx` validation callbacks gets created. The associated model gets correctly validated at the right moment when we call `validate validate_associated_records_for_xx` and the errors are in the good order.\r\n\r\nBut this doesn't work in case your model defines validation before calling `accepts_nested_attributes_for`. The associated model gets validated **after** all validation on the parent was called even when explicitly calling `validate validate_associated_records_for_xx`\r\n```ruby\r\nclass Post < ActiveRecord::Base\r\n  validates :topic, presence: true\r\n  validate :validate_associated_records_for_comments\r\n  validates :title, presence: true\r\n\r\n  has_many :comments\r\n  accepts_nested_attributes_for :comments\r\nend\r\n```\r\nThe associated `comment` model will get validated after `topic` and `title`\r\n\r\n### System configuration\r\n**Rails version**:\r\n4.2.1\r\n\r\n**Ruby version**:\r\n2.2.1";
    // const number = 111111;
    // const title = 'some issue';
    // const avatar_url = 'http://lorempixel.com/64/64/';
    // const labels = [
    //   {
    //     "url": "https://api.github.com/repos/rails/rails/labels/actioncable",
    //     "name": "actioncable",
    //     "color": "bfdadc"
    //   },
    //   {
    //     "url": "https://api.github.com/repos/rails/rails/labels/backport",
    //     "name": "backport",
    //     "color": "f9d0c4"
    //   },
    //   {
    //     "url": "https://api.github.com/repos/rails/rails/labels/docs",
    //     "name": "docs",
    //     "color": "02d7e1"
    //   }
    // ];

    const labelList = labels.map((el, index)=> {
      const {url, name, color} = el;
      let style = {
        backgroundColor: `#${color}`,
        color: '#f3f3f3'
      };

      return (
        <a
          key={index}
          href={url}
          target={'_blank'}
          style={style}
          className="list-group-item issue-label"
        >
          {name}
        </a>
      )
    });

    let message = body.length >= 140 ? body.substr(0, 140) : body;
    if (body.length >= 140) {
      message = body.substr(0, 140);
      if (/\s/.test(message[139])) {
        // go back to the previous which is a non-space
        message = message.match(/.+\s/gm).join();
      }
    }

    return (
      <li className={this.props.className}>
        <div className="media">
          <a href="#" className="pull-left">
            <img alt="Github User Profile" src={avatar_url} className="media-object avatar" />
          </a>
          <div className="media-body">
            <h4 className="media-heading">
              {login}
            </h4>
          </div>
        </div>

        <div className="list-group list-inline">
          Issue labels: {labelList}
        </div>

        <h4>Summary (140 Characters)</h4>
        <p className="para-140-characters">
          {message}
        </p>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={this.handleClick}
        >
          View Issue Detail
        </button>
      </li>
    );
  }
}
