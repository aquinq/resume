import * as React from "react";
import { Time } from "client/helpers/Time";
import { experienceColors } from "client/globals/Colors";
import {
  ITimelineDates,
  IExperienceTimelineProps,
  IExperienceTimelinePosition,
  IExperienceProps,
  IDates
} from "./Timeline.Types";
import ExperienceTimeline from "./ExperienceTimeline";

export const timelineUIConfig = {
  timelineHeight: 32,
  experienceUnitHeight: 32,
  experienceTimelineRampBorderRadius: 6
};

export interface ITimelineProps {
  experiences: IExperienceProps[];
}

export interface ITimelineState {
  isTimelineAxisRefSet: boolean;
  showColorPicker: boolean;
  timelineAxisWidth: number;
  timelineDates: ITimelineDates;
}

export default class Timeline extends React.PureComponent<ITimelineProps, ITimelineState> {
  timelineAxis: React.RefObject<HTMLDivElement>;
  timelineResizeEventListener: number;
  experienceColorsUsed: { [key: number]: number };
  constructor(props: ITimelineProps) {
    super(props);
    const timelineDates = this.getTimelineDates();
    this.state = {
      isTimelineAxisRefSet: false,
      showColorPicker: false,
      timelineDates: timelineDates,
      timelineAxisWidth: 0
    };
    this.timelineAxis = React.createRef();
    this.experienceColorsUsed = {};
  }

  // #region Lifecycle
  componentDidMount() {
    // Refs are set after being rendered. Thus a second render needs to be triggered to use refs.
    this.setState(
      {
        isTimelineAxisRefSet: true,
        timelineAxisWidth: this.timelineAxis.current.clientWidth
      },
      this.attachTimelineResizeEventListener
    );
  }

  componentDidUpdate(prevProps: ITimelineProps, prevState: ITimelineState) {}

  componentWillUnmount() {
    clearInterval(this.timelineResizeEventListener);
  }
  // #endregion

  attachTimelineResizeEventListener = () => {
    return setInterval(() => {
      if (
        this.state.isTimelineAxisRefSet &&
        this.timelineAxis.current &&
        this.state.timelineAxisWidth !== this.timelineAxis.current.clientWidth
      ) {
        this.setState({
          timelineAxisWidth: this.timelineAxis.current.clientWidth
        });
      }
    }, 400);
  };

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

  private getRandomExperienceColor = () => {
    const index = Math.floor(Math.random() * experienceColors.length);
    return experienceColors[8];
  };

  private getExperiencesByDate = (date: Date): IExperienceProps[] => {
    return this.props.experiences.filter(_ => _.startDate <= date && date <= _.endDate);
  };

  /**
   * Returns all experiences matching the dates provided.
   * @param experiences The experiences list to iterate over.
   * @param dates The dates to compare with.
   */
  private getExperiencesForDateRange = (experiences: IExperienceProps[], dates: IDates): IExperienceProps[] => {
    return experiences.filter(
      _ =>
        (_.startDate < dates.startDate && dates.startDate < _.endDate) ||
        (_.startDate < dates.endDate && dates.endDate < _.endDate)
    );
  };

  //#region Rendering
  private renderExperienceTimelines = () => {
    if (!this.state.isTimelineAxisRefSet) {
      return;
    }
    let experienceTimeline: JSX.Element[] = [];
    this.experienceColorsUsed = {};
    let experiencesUsed: IExperienceProps[] = [];

    // Reverse loop to display old experiences under newest ones.
    for (let i = this.props.experiences.length - 1; i >= 0; i--) {
      const currentExperience = this.props.experiences[i];

      const daysNumberBeforeStart = Time.getDaysNumber(this.state.timelineDates.startDate, currentExperience.startDate);
      const experienceDaysNumber = Time.getDaysNumber(currentExperience.startDate, currentExperience.endDate);

      const currentExperienceTimelineProps: IExperienceTimelineProps = {
        color: this.getRandomExperienceColor().value,
        height: Math.floor(timelineUIConfig.experienceUnitHeight),
        leftPos: Math.floor(
          (daysNumberBeforeStart / this.state.timelineDates.totalDaysCount) * this.state.timelineAxisWidth
        ),
        level: this.getExperiencesForDateRange(experiencesUsed, {
          startDate: currentExperience.startDate,
          endDate: currentExperience.endDate
        }).length,
        position: IExperienceTimelinePosition.Top,
        width: Math.floor(
          (experienceDaysNumber / this.state.timelineDates.totalDaysCount) * this.state.timelineAxisWidth
        )
      };

      // Add elelement at the beggining of the array so that newest experiences will be positionned in front of older ones.
      experienceTimeline.unshift(<ExperienceTimeline key={`exp-${i}`} {...currentExperienceTimelineProps} />);
      experiencesUsed.push(currentExperience);
    }

    return experienceTimeline;
  };

  private renderTimelineScale = () => {
    return;
  };

  render() {
    return (
      <div className="timeline-wrap">
        <div className="timeline">
          <div className="timeline-container">
            <div id="timeline-start">
              <div id="timeline-start-zone" />
            </div>
            <div ref={this.timelineAxis} id="timeline-main-axis">
              <div id="timeline-main-axis-body" />
              {this.renderExperienceTimelines()}
              {this.renderTimelineScale()}
            </div>
            <div id="timeline-end">
              <div id="timeline-end-zone" />
              <div id="timeline-end-arrow" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  //#endregion
}
