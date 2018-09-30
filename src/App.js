import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Joukkueet from './components/Joukkueet/Joukkueet';
import Tulos from './components/Tulos/Tulos';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      league: '',
      round: 0,
      homeTeam: '',
      awayTeam: '',
      homeGoals: 0,
      awayGoals: 0,
      homexG: 0,
      awayxG: 0
    }
  }

  onTeamChanged = (event) => {
    console.log('onTeamChanged', event.target.value);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Veikkausappi</h1>
        </header>
        <div>
          <Joukkueet onTeamChanged={this.onTeamChanged} name='homeTeam'/>
          <Joukkueet onTeamChanged={this.onTeamChanged} name='awayTeam'/>
          <Tulos />
          <Tulos />
          <Tulos />
          <Tulos />
          <button>Lähetä</button>
        </div>
      </div>
    );
  }
}

export default App;
