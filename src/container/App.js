import React, { Component } from "react";
import Nav from "../Nav/nav";
import Logo from "../Logo/logo";
import Clarifai from "clarifai";
import FaceRecognition from "../Face/Face";
import ImageLinkForm from "../Image/imagelink";
import "./App.css";
import Rank from "../Rank/rank";
import Particles from "react-particles-js";
import Signin from "../Signin/Sign";
import Register from "../register/register";

//API PERSONAL KEY
const app = new Clarifai.App({
  apiKey: "87cba5286f8e45c28cdbab61447347ff",
});

//DISPLAY BACKGROUND PARTICLES
const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 250,
      },
    },
  },
};

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

//CLASS APP COMPONENT
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const Face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: Face.left_col * width,
      topRow: Face.top_row * height,
      rightCol: width - Face.bottom_row * width,
      bottomRow: height - Face.bottom_row * height,
    };
  };

  displayBox = (box) => {
    this.setState({ box: box });
  };

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((data) => {
        if (data) {
          fetch("https://fathomless-refuge-48138.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayBox(this.calculateFaceLocation(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    console.log(this.state.route);
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    console.log(route);
    return (
      <div>
        <Particles className="particles" params={particleOptions} />
        <Nav onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />

        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
            />
            <FaceRecognition imageURL={imageURL} box={box} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
