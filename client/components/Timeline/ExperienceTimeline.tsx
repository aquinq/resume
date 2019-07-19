import * as React from "react";

export interface IExperienceTimelineProps {
  leftPos: number;
  width: number;
  height: number;
}

export default class ExperienceTimeline extends React.Component<IExperienceTimelineProps> {
  constructor(props: IExperienceTimelineProps) {
    super(props);
  }
  render() {
    return (
      <div
        className="experience-timeline-body"
        style={{ left: this.props.leftPos, width: this.props.width, height: this.props.height }}
      />
    );
  }
}
