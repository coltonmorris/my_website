import React, { Component } from 'react';
import logo from './logo.svg';
import spinner from './spinner4.svg';
import './App.css';
import * as _ from 'lodash'
import parseDomain from 'parse-domain'
import superagent from 'superagent'
import rp from 'request-promise'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      show: true,
      spinner: false,
      retryButton: false,
      imageRes: '',
      imageErr: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRetry = this.handleRetry.bind(this);
    this.calculateImage = this.calculateImage.bind(this);
  }

  calculateImage(url) {
    console.log('trying cop-classifier')
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      uri: 'http://cop-classifier/image',
      json: false,
      body: JSON.stringify({ url: url })
    }

    return rp(options)
    .then((res) => {
      console.log('response: ', res)
      this.setState({imageRes: JSON.stringify(res), imageErr: ''})
    })
    .catch((err) => {
      console.log('error getting image info')
      console.log('error keys: ', Object.keys(err))
      console.log('error obj: ', err)

      this.setState({imageErr: err.message, imageRes: ''})
    })
    .then(() => {
      // show a retry button that when clicked shows the form
      this.setState({retryButton: true, spinner: false, show: false})
    })
    .then(() => {
      console.log('trying super agent now')
      return superagent
      .post('http://cop-classifier/image')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({url:url}))
      .then((res) => {
        console.log('response keys: ', Object.keys(res))
        console.log('res body person: ', res.body.person)
        console.log('res body result: ', res.body.result)
      })
      .catch((err) => {
        console.log('error getting image info')
        console.log(Object.keys(err))
        console.log('err.response: ', err.response)
        console.log('err all: ', err)
      })
    })
    .then(() => {
      console.log('trying axios now')
      return axios({method: 'post', url:'http://cop-classifier/image', data: url})
      .then((res) => {
        console.log('response keys: ', Object.keys(res))
        console.log('res body person: ', res.body.person)
        console.log('res body result: ', res.body.result)
      })
      .catch((err) => {
        console.log('error getting image info')
        console.log(Object.keys(err))
        console.log('err.response: ', err.response)
        console.log('err obj: ', err)
      })
    })
  }

  handleRetry(event) {
    this.setState({imageRes: '', imageErr: '', retryButton: false, spinner: false, show: true, value:''})
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (_.isNull(parseDomain((this.state.value)))){
      return this.setState({show:false, imageErr: 'Invalid URL', retryButton: true})
    }

    // make form dissapear and show spinner
    this.setState({show: false, spinner: true})

    this.calculateImage(this.state.value)
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
          { this.state.retryButton && <input type="button" value="Try another" onClick={this.handleRetry}/>}
          <p>
          Result: { this.state.imageRes }
          </p>
          <p>
          Error: { this.state.imageErr }
          </p>
        </p>
      </div>
    );
  }
}

export default App;
