import * as React from "react";
import { IExperienceProps } from "./Experience";
import { Time } from "client/helpers/Time";
import ExperienceTimeline, { IExperienceTimelineProps } from "./ExperienceTimeline";

export interface ITimelineProps {
  experiences: IExperienceProps[];
}

export interface ITimelineState {
  timelineDates: ITimelineDates;
  isTimelineAxisRefSet: boolean;
}

export interface IDates {
  startDate: Date;
  endDate: Date;
}

export interface ITimelineDates {
  startDate: Date;
  endDate: Date;
  totalDaysCount: number;
}

export default class Timeline extends React.PureComponent<ITimelineProps, ITimelineState> {
  timelineAxis: React.RefObject<HTMLDivElement>;
  timelineHeight = 32;
  constructor(props: ITimelineProps) {
    super(props);
    const timelineDates = this.getTimelineDates();
    this.state = {
      isTimelineAxisRefSet: false,
      timelineDates: timelineDates
    };
    this.timelineAxis = React.createRef();
  }
  // #region Lifecycle
  componentDidMount() {
    // Refs are set after being rendered. Thus a second render needs to be triggered to use refs.
    this.setState({
      isTimelineAxisRefSet: true
    });
  }

  componentDidUpdate(prevProps: ITimelineProps, prevState: ITimelineState) {}
  // #endregion

  private getTimelineDates = (): ITimelineDates => {
    if (this.props.experiences.length === 0) {
      return {
        startDate: Time.toMidnightUTC(new Date()),
        endDate: Time.toMidnightUTC(new Date()),
        totalDaysCount: 1
      };
    } else {
      const startDate = Time.toMidnightUTC(Time.getMinDate(this.props.experiences.map(_ => _.startDate)));
      const endDate = Time.toMidnightUTC(Time.getMaxDate(this.props.experiences.map(_ => _.endDate)));
      const totalDaysCount = Time.getDaysNumber(startDate, endDate);
      return {
        endDate: endDate,
        startDate: startDate,
        totalDaysCount: totalDaysCount
      };
    }
  };
  private renderExperienceTimelines = () => {
    if (!this.state.isTimelineAxisRefSet) {
      return;
    }
    const timelineAxisWidth = this.timelineAxis.current.clientWidth;
    let experienceTimeline: JSX.Element[] = [];

    for (let i = 0; i < this.props.experiences.length; i++) {
      const currentExperience = this.props.experiences[i];
      const startDaysDiff = Time.getDaysNumber(this.state.timelineDates.startDate, currentExperience.startDate);
      const expDaysDiff = Time.getDaysNumber(currentExperience.startDate, currentExperience.endDate);

      const currentExperienceTimelineProps: IExperienceTimelineProps = {
        height: this.timelineHeight + 16,
        leftPos: (startDaysDiff / this.state.timelineDates.totalDaysCount) * timelineAxisWidth,
        width: (expDaysDiff / this.state.timelineDates.totalDaysCount) * timelineAxisWidth
      };

      experienceTimeline.push(<ExperienceTimeline key={`exp-${i}`} {...currentExperienceTimelineProps} />);
    }

    return experienceTimeline;
  };

  render() {
    return (
      <div className="timeline">
        <div className="timeline-container">
          <div id="timeline-start">
            <div id="timeline-start-point" />
          </div>
          <div ref={this.timelineAxis} id="timeline-main-axis">
            <div id="timeline-main-axis-body" style={{ zIndex: this.props.experiences.length }} />
            {this.renderExperienceTimelines()}
          </div>
          <div id="timeline-end">
            <div id="timeline-end-point" />
            <div id="timeline-end-arrow" />
          </div>
        </div>
      </div>
    );
  }
}
