import * as React from "react";
import Settings from "./Settings/Settings";

export interface IDetailsState {
  settingsOpen: boolean;
}

export default class Details extends React.Component<{}, IDetailsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      settingsOpen: false
    };
  }

  toggleSettingsMenuOpen = () => {
    this.setState(prevState => ({
      settingsOpen: !prevState.settingsOpen
    }));
  };

  render() {
    return (
      <div className="details-container">
        <div>Photo</div>
        <Settings isOpen={this.state.settingsOpen} toggleOpen={this.toggleSettingsMenuOpen} />
      </div>
    );
  }
}
