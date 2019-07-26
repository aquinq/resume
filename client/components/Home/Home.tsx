import * as React from "react";
import Details from "../Details/Details";
import Timeline from "../Timeline/Timeline";
import Skills from "../Skills/Skills";
import { ChromePicker } from "react-color";
import { IExperienceProps } from "../Timeline/Timeline.Types";

enum Theme {
  Dark = "dark",
  Light = "light"
}

interface IHomeState {
  theme: Theme;
}

export default class Home extends React.Component<{}, IHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      theme: Theme.Light
    };
  }
  getExperiences = (): IExperienceProps[] => {
    const experiences = [
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2016, 5, 30, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2016, 0, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2016, 8, 30, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2016, 3, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2017, 0, 1, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2016, 4, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2017, 5, 30, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2017, 0, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2017, 8, 30, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2017, 3, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2018, 0, 1, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2017, 4, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2018, 5, 30, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2018, 0, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2018, 8, 30, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2018, 3, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2019, 0, 1, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2018, 4, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2019, 5, 30, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2019, 0, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2019, 8, 30, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2019, 3, 1, 0, 0, 0, 0)
      },
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2020, 0, 1, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2019, 4, 1, 0, 0, 0, 0)
      }
    ];
    return experiences;
  };

  renderColorPicker = () => {
    return <ChromePicker />;
  };

  render() {
    return (
      <div className={`home-page ${this.state.theme}`}>
        <Details />
        <Timeline experiences={this.getExperiences()} />
        <Skills />
      </div>
    );
  }
}
