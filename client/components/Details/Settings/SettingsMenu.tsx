import * as React from "react";

interface ISettingsMenuProps {
  isOpen: boolean;
}

export default class SettingsMenu extends React.Component<ISettingsMenuProps> {
  constructor(props: ISettingsMenuProps) {
    super(props);
  }

  render() {
    return (
      <div id="general-settings-menu" className={`${this.props.isOpen ? "open" : ""}`}>
        <div id="general-settings-menu-color">
          <i className="material-icons">color_lens</i>
        </div>
      </div>
    );
  }
}
