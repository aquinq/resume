import * as React from "react";
import Details from "../Details/Details";
import Timeline from "../Timeline/Timeline";
import Skills from "../Skills/Skills";

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
  getExperiences = () => {
    const experiences = [
      {
        company: "Thales Training & Simulation",
        description: "Stage 2nd année",
        endDate: new Date(2016, 11, 23, 0, 0, 0, 0),
        isCurrent: false,
        location: "Osny",
        name: "Thales Training & Simulation",
        position: "Intern",
        startDate: new Date(2016, 6, 4, 0, 0, 0, 0)
      },
      {
        company: "Avanade",
        description: "CDI",
        endDate: new Date(),
        isCurrent: true,
        location: "Issy-Les-Moulineaux",
        name: "Avanade",
        position: "Consultant Software Engineering",
        startDate: new Date(2018, 0, 8, 0, 0, 0, 0)
      }
    ];
    return experiences;
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
