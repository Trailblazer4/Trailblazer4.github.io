import ProjectCard from "./Components/ProjectCard";
import CFlatPlayground from "./CFlatPlayground";
import reactimg from "./assets/react.svg";
import trails from "./assets/trails1.png";
import rogueRacer from "./assets/rogue_racer.png";
import cFlatLogo from "./assets/cflat_logo_full.png";
import portrait from "./assets/portrait.png";
import bomb from "./assets/Bomb.png";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const projects = [
    {
      title: "Truth X",
      img: reactimg,
      genres: ["Game", "RPG", "Story", "3D"],
      link: "https://google.com"
    },
    {
      title: "Trails in the Sky the First",
      img: trails,
      genres: ["Game", "RPG", "Turn-Based", "Story", "2D", "Remake"],
      link: "https://trailsfirstchapter.com/",
      bgColor: "rgb(39, 159, 196)"
    },
    {
      title: "Rogue Racer",
      img: rogueRacer,
      genres: ["Game", "Racing", "Roguelike", "2D", "AI", "Procedural"],
      link: "https://github.com/rahoi/2025_racing_roguelike",
      bgColor: "rgb(197, 115, 255)"
    },
    {
      title: "Free Fields and Dangerous Dungeons!",
      img: reactimg,
      genres: ["Game", "RPG", "Story", "2D", "Turn-Based", "Dialogue", "Parser"],
      link: "https://github.com/Trailblazer4/Field_Dungeon-Exploration-2.1",
    },
    {
      title: "CFlat Compiler",
      img: cFlatLogo,
      genres: ["Compiler", "Parser", "Rust", "Systems Programming"],
      link: "https://github.com/usf-compilers-s25/cflat-Trailblazer4"
    },
    {
      title: "Hyper-Rosen",
      img: reactimg,
      genres: ["Game", "3D", "Physics"],
      link: "https://github.com/BakedSoups/HyperRosen"
    },
    {
      title: "Minesweeper+",
      img: bomb,
      genres: ["Game", "puzzle", "2D", "Customizable"],
      link: "/MinesweeperGodot/index.html",
      pixelArt: true
    }
  ];

  return (
    <>
      <div className="about-me">
        <img src={portrait} alt="Isaiah Walker" height={250}/>
        <div style={{padding: 30}}>
          <h1>Isaiah Walker</h1>
          <p id="blurb">
            Hi, my name is Isaiah Walker and I make games.
            I graduated from the University of San Francisco in 2025 with my B.S. in Computer Science
            and a minor in Japanese Studies.
            I've worked on games such as a turn-based RPG with an elemental/status system,
            a Racing Roguelike for my senior team project,
            a Minesweeper clone,
            and a Super Mario Galaxy-inspired 3D platformer tech demo with
            abnormal gravity and physics (which won a hackathon in 2024).
            I've also worked on projects like a Compiler for a language called CFlat,
            and an itinerary curator based on your location.
          </p>
        </div>
      </div>

      <div className="project-list" id="projects">
        { projects.map(project => <ProjectCard {...project}/>) }
      </div>

      <CFlatPlayground/>
    </>);
}

export default App;



// TODO: resume page, home button, new picture, about me section
// run projects in docker or some other container
