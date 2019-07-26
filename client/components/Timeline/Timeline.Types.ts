// Timeline
export interface IDates {
  startDate: Date;
  endDate: Date;
}

export interface ITimelineDates {
  startDate: Date;
  endDate: Date;
  totalDaysCount: number;
}

// Experience Timeline
export interface IExperienceTimelineProps {
  color: string;
  height: number;
  leftPos: number;
  level: number;
  position: IExperienceTimelinePosition;
  width: number;
}

export enum IExperienceTimelinePosition {
  Top,
  Bottom
}

export interface IExperienceDependentProperties {
  container: number;
  leftRamp: number;
  body: number;
  rightRamp: number;
}

// Experience
export interface IExperienceProps {
  company: string;
  description: string;
  endDate: Date;
  isCurrent: boolean;
  location: string;
  name: string;
  position: string;
  startDate: Date;
}
