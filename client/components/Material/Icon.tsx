import * as React from "react";

interface IconProps {
  className?: string;
  name: string;
  style?: React.CSSProperties;
}

export default class Icon extends React.PureComponent<IconProps> {
  private getClassName = () => {
    return this.props.className ? `material-icons ${this.props.className}` : "material-icons";
  };

  render() {
    return (
      <i className={this.getClassName()} style={this.props.style}>
        {this.props.name}
      </i>
    );
  }
}
