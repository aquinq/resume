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

  private getContainerTranslateY = () => {
    return `translateY(${this.props.position === IExperienceTimelinePosition.Top ? "-" : ""}${(this.props.height +
      timelineUIConfig.timelineHeight) /
      2}px)`;
  };

  private getExperienceWidth = (): IExperienceDependentProperties => {
    const rampWidth = (this.props.height / 2) * this.props.level;
    return {
      container: this.props.width,
      leftRamp: rampWidth,
      body: this.props.width - 2 * rampWidth,
      rightRamp: rampWidth
    };
  };

  private getContainerStyle = (experienceHeight: number, containerWidth: IExperienceDependentProperties) => {
    return {
      height: experienceHeight,
      left: this.props.leftPos,
      transform: this.getContainerTranslateY(),
      width: containerWidth.container
    };
  };

  private getLeftRampStyle = (experienceHeight: number, leftRampWidth: number) => {
    return {
      backgroundColor: this.props.color,
      height: experienceHeight,
      transform: this.getRampTransform(false, experienceHeight, leftRampWidth),
      width: leftRampWidth
    };
  };

  private getBodyStyle = (experienceHeight: number, bodyWidth: number) => {
    return {
      backgroundColor: this.props.color,
      height: experienceHeight,
      width: bodyWidth
    };
  };

  private getRightRampStyle = (experienceHeight: number, rightRampWidth: number) => {
    return {
      backgroundColor: this.props.color,
      height: experienceHeight,
      transform: this.getRampTransform(true, experienceHeight, rightRampWidth),
      width: rightRampWidth
    };
  };

  private getRampTransform = (right: boolean, height: number, width: number) => {
    let angle = Math.floor(Trigonometry.radiansToDegrees(Math.atan(width / 2 / height)));
    if (!right) {
      angle = -angle;
    }
    return `translateX(${right ? "-" : ""}${width / 2}px) skewX(${angle}deg)`;
  };

  render() {
    const experienceHeight = this.props.height * this.props.level;
    const experienceWidth = this.getExperienceWidth();

    const containerStyle: React.CSSProperties = this.getContainerStyle(experienceHeight, experienceWidth);
    const leftRampStyle: React.CSSProperties = this.getLeftRampStyle(experienceHeight, experienceWidth.leftRamp);
    const bodyStyle: React.CSSProperties = this.getBodyStyle(experienceHeight, experienceWidth.body);
    const rightRampStyle: React.CSSProperties = this.getRightRampStyle(experienceHeight, experienceWidth.leftRamp);

    return (
      <div className="experience-timeline-container" style={containerStyle}>
        <div className="experience-timeline-left-ramp" style={leftRampStyle} />
        <div className="experience-timeline-body" style={bodyStyle} />
        <div className="experience-timeline-right-ramp" style={rightRampStyle} />
      </div>
    );
  }
}
