import * as React from "react";
import { timelineUIConfig } from "./Timeline";
import {
  IExperienceTimelineProps,
  IExperienceTimelinePosition,
  IExperienceDependentProperties
} from "./Timeline.Types";
import { Trigonometry } from "client/helpers/Trigonometry";

export default class ExperienceTimeline extends React.Component<IExperienceTimelineProps> {
  constructor(props: IExperienceTimelineProps) {
    super(props);
  }

  private getContainerTranslateY = (experienceHeight: number) => {
    return `translateY(${this.props.position === IExperienceTimelinePosition.Top ? "-" : ""}${(experienceHeight +
      timelineUIConfig.timelineHeight) /
      2}px)`;
  };

  private getExperienceWidth = (experienceHeight: number): IExperienceDependentProperties => {
    const rampWidth = experienceHeight / 2;
    return {
      container: this.props.width,
      leftRamp: rampWidth,
      body: this.props.width - 2 * rampWidth,
      rightRamp: rampWidth
    };
  };

  /**
   * Returns the opacity of the experience.
   * Values between
   */
  getExperienceOpacity = (): number => {
    return 1 - 0.1 * (this.props.level % 9);
  };

  private getContainerStyle = (
    experienceHeight: number,
    containerWidth: IExperienceDependentProperties
  ): React.CSSProperties => {
    return {
      height: experienceHeight,
      left: this.props.leftPos,
      transform: this.getContainerTranslateY(experienceHeight),
      opacity: this.getExperienceOpacity(),
      width: containerWidth.container,
      zIndex: 100 / (this.props.level + 1)
    };
  };

  private getLeftRampStyle = (experienceHeight: number, leftRampWidth: number): React.CSSProperties => {
    return {
      backgroundColor: this.props.color,
      borderTopLeftRadius: timelineUIConfig.experienceTimelineRampBorderRadius,
      height: experienceHeight,
      transform: this.getRampTransform(false, experienceHeight, leftRampWidth),
      width: leftRampWidth
    };
  };

  private getBodyStyle = (experienceHeight: number, bodyWidth: number): React.CSSProperties => {
    return {
      backgroundColor: this.props.color,
      height: experienceHeight,
      width: bodyWidth
    };
  };

  private getRightRampStyle = (experienceHeight: number, rightRampWidth: number): React.CSSProperties => {
    return {
      backgroundColor: this.props.color,
      borderTopRightRadius: timelineUIConfig.experienceTimelineRampBorderRadius,
      height: experienceHeight,
      transform: this.getRampTransform(true, experienceHeight, rightRampWidth),
      width: rightRampWidth
    };
  };

  /**
   * Returns the CSS transform property for experiences ramps.
   */
  /*
   * How it works :
   *
   *     ________________________            __________________
   *    |   |                |   |          /|                |\
   *    |   |                |   |   ==>   / |                | \
   *    |___|________________|___|        /__|________________|__\
   *
   *
   *
   *               __   __
   *            /|        /
   *           / |
   *          /  |      /
   *         /\__|
   *        /  a |    /
   *       /     | h
   *      /      |  /
   *     /       |
   *    /________|/
   *         w
   *
   *
   * => angle = arctan(w / h)
   *
   * The width w here is (width - border_radius).
   * Border radius is included in calculation, otherwise it would be hidden by the experience body.
   * Also, it must be counted in translateX to compensate what is substracted for the angle calculation.
   *
   */
  private getRampTransform = (right: boolean, height: number, width: number) => {
    // tan(angle) = width / height.
    // Wait... Did I just finally use sohcahtoa for a non-scholar purpose ?
    let angle = Math.floor(
      Trigonometry.radiansToDegrees(Math.atan((width - timelineUIConfig.experienceTimelineRampBorderRadius) / height))
    );
    if (!right) {
      angle = -angle;
    }
    return `translateX(${right ? "-" : ""}${(width - timelineUIConfig.experienceTimelineRampBorderRadius) /
      2}px) skewX(${angle}deg)`;
  };

  render() {
    const experienceHeight = this.props.height * (1 + this.props.level / 2);
    const experienceWidth = this.getExperienceWidth(experienceHeight);

    const containerStyle: React.CSSProperties = this.getContainerStyle(experienceHeight, experienceWidth);
    const leftRampStyle: React.CSSProperties = this.getLeftRampStyle(experienceHeight, experienceWidth.leftRamp);
    const bodyStyle: React.CSSProperties = this.getBodyStyle(experienceHeight, experienceWidth.body);
    const rightRampStyle: React.CSSProperties = this.getRightRampStyle(experienceHeight, experienceWidth.leftRamp);

    return (
      <div className="experience-timeline-container" style={containerStyle}>
        <div className="experience-timeline-ramp experience-timeline-left-ramp" style={leftRampStyle} />
        <div className="experience-timeline-body" style={bodyStyle} />
        <div className="experience-timeline-ramp experience-timeline-right-ramp" style={rightRampStyle} />
      </div>
    );
  }
}
