import React, {Component, PropTypes} from 'react';

export default class DetailView extends Component {
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
    // const {issueState} = this.state;

    return (
      <li className={this.props.className}>
        hello world
      </li>
    )
  }
}
