import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import ParticlesJSX from './Particles';
import Signin from './components/SignIn';
import Register from './components/Register';
import Rank from './components/Rank';
import Navigation from './components/Navigation';
import ImageLinkForm from './components/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition';
import Logo from './components/Logo';
import './index.css';
import 'tachyons';

const ApiRequestOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Key 7dcf6aefbd1c410d8672a7f0072fd0cc'
  },
  body: JSON.stringify({
    "user_app_id": {
      "user_id": 'ampalatsi_kal',
      "app_id": 'smartbrain'
    },
    "inputs": [{ "data": { "image": { "url": 'https://shorturl.at/CIU79' } } }]
  })
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: '',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { ...initialState };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    const output = {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height),
    }
    return output;
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    };
    this.setState({ route: route })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })

    // The response.json() corresponding to the box is 
    // response.outputs[0].data.regions[0].region_info.bounding_box
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", ApiRequestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3001/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(result))
      })
      .catch(console.log)
  }

  render() {
    return <div id='App'>
      <ParticlesJSX />

      {/* If the route is home, show the home page */}
      {(this.state.route === 'home') ?
        <div className='home'>
          <Navigation onRouteChange={this.onRouteChange}>
            <Logo />
            <Rank username={this.state.user.name} entries={this.state.user.entries} />
          </Navigation>
          <ImageLinkForm onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>

        // Otherwise, show the signin page if route is signin, 
        // or the register page if it is anything else

        : (this.state.route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
    </div>
  }
}

// Render on the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)