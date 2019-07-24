import * as React from "react";
import SettingsButton from "./SettingsButton";
import SettingsMenu from "./SettingsMenu";

interface ISettingsProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

interface ISettingsState {
  showComplexColorPicker: boolean;
}

export default class Settings extends React.Component<ISettingsProps, ISettingsState> {
  constructor(props: ISettingsProps) {
    super(props);
    this.state = {
      showComplexColorPicker: false
    };
  }

  render() {
    return (
      <div className="general-settings">
        <SettingsButton isOpen={this.props.isOpen} toggleOpen={this.props.toggleOpen} />
        <SettingsMenu isOpen={this.props.isOpen} />
      </div>
    );
  }
}
