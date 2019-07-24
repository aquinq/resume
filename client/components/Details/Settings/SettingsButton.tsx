import * as React from "react";

interface ISettingsButtonProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export default class SettingsButton extends React.Component<ISettingsButtonProps> {
  constructor(props: ISettingsButtonProps) {
    super(props);
  }

  render() {
    return (
      <div id="general-settings-btn" className={`${this.props.isOpen ? "open" : ""}`} onClick={this.props.toggleOpen}>
        <i className="general-settings-icon material-icons">settings</i>
      </div>
    );
  }
}
