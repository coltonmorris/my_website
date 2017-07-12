import * as grpc from 'grpc'
import React, { Component } from 'react';
import logo from './logo.svg';
import spinner from './spinner4.svg';
import './App.css';

let protofile = __dirname + '/../proto/main.proto'
let mainProto = grpc.load(protofile).main
let client = new mainProto.Classify('cop-classifier:2000', grpc.credentials.createInsecure())

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      show: true,
      spinner: false,
      retryButton: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateImage = this.calculateImage.bind(this);
  }

  calculateImage(url) {
    console.log('Calculating: ', url)
    
    client.classifyUrl({url: url}, (err, res) => {
      console.log('error: ', err)
      console.log('response: ', res)
    })
    
    // show result
    // show a retry button that when clicked shows the form
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // make form dissapear and show spinner
    this.setState({show: false, spinner: true})

    this.calculateImage(this.state.value)
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Coltons website</h2>
        </div>
        <p className="App-intro">
          <h3>Cop Classifier</h3>
          { this.state.show &&
            <div>
              <p>Paste the url to the image you would like to classify, then wait for our calculations to find out the probability of a cop being in the picture.</p>
              <form onSubmit={this.handleSubmit}>
                <label>
                Url:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          }
          { this.state.spinner && <img src={spinner} className="App-logo" alt="loading" /> }
        </p>
      </div>
    );
  }
}

export default App;
