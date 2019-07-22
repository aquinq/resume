import * as React from "react";
import Settings from "./Settings/Settings";

export default class Details extends React.Component {
  render() {
    return (
      <div>
        <div>Photo</div>
        <Settings isOpen={false} />
      </div>
    );
  }
}
