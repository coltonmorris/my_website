import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
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
          <p>Paste the url to the image you would like to classify, then wait for our calculations to find out the probability of a cop being in the picture.</p>
          <form onSubmit={this.handleSubmit}>
            <label>
            Url:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </p>
      </div>
    );
  }
}

export default App;
