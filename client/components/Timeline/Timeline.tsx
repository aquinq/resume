import * as React from "react";
import { IExperienceProps } from "./Experience";

export interface ITimelineProps {
  experiences: IExperienceProps[];
}

export interface ITimelineState {
  endDate: Date;
  startDate: Date;
}

export default class Timeline extends React.PureComponent<ITimelineProps, ITimelineState> {
  timelineAxis: React.RefObject<HTMLDivElement>;
  constructor(props: ITimelineProps) {
    super(props);
    this.state = {
      endDate: new Date(Math.max(...props.experiences.map(_ => _.endDate.getTime()))),
      startDate: new Date(Math.min(...props.experiences.map(_ => _.startDate.getTime())))
    };
    this.timelineAxis = React.createRef();
  }
  // #region Lifecycle
  componentDidMount() {}

  componentDidUpdate(prevProps: ITimelineProps, prevState: ITimelineState) {}
  // #endregion

  private renderExperiences = () => {
    for (let i = 0; i < this.props.experiences.length; i++) {
      const currentExperience = this.props.experiences[i];
    }
  };

  render() {
    return (
      <div className="timeline">
        <div id="timeline-start">
          <div id="timeline-start-point" />
        </div>
        <div ref={this.timelineAxis} id="timeline-main-axis">
          <div id="timeline-main-axis-body" />
          {this.renderExperiences()}
        </div>
        <div id="timeline-end">
          <div id="timeline-end-point" />
        </div>
      </div>
    );
  }
}
