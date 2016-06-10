import React, {Component, PropTypes} from 'react';
import ModalView from './modalView.jsx';

export default class ListView extends Component {
  static propTypes = {
    data:  PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {isExpanded: false};

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    const {isExpanded} = this.state;
    this.setState({
      isExpanded: !isExpanded
    });
  }

  render() {
    const {
      number, title, labels, body, html_url,
      user: {avatar_url, login}, created_at
    } = this.props.data;

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

    // Replace @username with wrapped anchor tag
    message = message.replace(/@(\w+)/g, '<a href="http://github.com/$1">@$1</a>');
    const {isExpanded} = this.state;

    return (
      <div>
        <li className={this.props.className}>
          <div className="media">
            <span href="#" className="pull-left">
              <img alt="Github User Profile" src={avatar_url} className="media-object avatar" />
            </span>
            <div className="media-body">
              <h4 className="media-heading"
                  dangerouslySetInnerHTML={{ __html: `<a href="http://github.com/${login}">${login}</a>`}} />
              <h6 dangerouslySetInnerHTML={{ __html: `<a href=${html_url}>Issue#: ${number}</a>`}} />
            </div>
          </div>

          <div className="list-group list-inline">
            Issue labels: {labels.length > 0 ? labelList : 'NONE'}
          </div>

          <h4>Summary (&lt;140 Characters)</h4>
          <p className="para-140-characters" dangerouslySetInnerHTML={{ __html:message} }/>

          {!isExpanded && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={this.handleClick}
            >
              View Issue Detail
            </button>
          )}
        </li>

        {isExpanded && (
          <ModalView
            className="list-group-item bounce-in"
            {...this.props}
            onAction={this.handleClick}
          />
        )}
      </div>
    );
  }
}
