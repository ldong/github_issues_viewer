import React, {Component, PropTypes} from 'react';

export default class ModalView extends Component {
  static propTypes = {
    onAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onAction();
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

    const message = body.replace(/@(\w+)/g, '<a href="http://github.com/$1">@$1</a>');

    return (
      <li className={`${this.props.className} modal-view`}>
        <div className="modal modal-view-box">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true"
                  onClick={this.handleClick}>×</button>
                <h4 className="modal-title">Issue-{number}: {title}</h4>
              </div>
              <div className="modal-body">


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

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <i className="glyphicon glyphicon-pencil"></i><span className="modal-view-title">{title}</span>
                    </h4>
                  </div>
                  <div className="panel-body">
                    <h5><i className="glyphicon glyphicon-file"></i><span className="modal-view-summary">Full Summary</span></h5>
                    <p dangerouslySetInnerHTML={{ __html:message} }/>
                  </div>
                </div>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleClick}>Close</button>
              </div>
            </div>
          </div>
      </div>
      </li>
    )
  }
}
