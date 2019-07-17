import * as React from "react";

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

export default class Experience extends React.PureComponent<IExperienceProps> {}
