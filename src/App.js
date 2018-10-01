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

  onChangehomeGoals = (event) => {
    this.setState({homeGoals: event.target.value})
  }

  onChangeawayGoals = (event) => {
    this.setState({awayGoals: event.target.value})
  }

  onChangehomexG = (event) => {
    this.setState({homexG: event.target.value})
  }

  onChangeawayxG = (event) => {
    this.setState({awayxG: event.target.value})
  }

  onChangeRound = (event) => {
    this.setState({round: event.target.value})
  }

  onHomeTeamChange = (event) => { // todo: yhdistä tämä ja alempi
    this.setState({homeTeam: event.target.value})
  }

  onAwayTeamChange = (event) => { // todo: yhdistä tämä ja alempi
    this.setState({awayTeam: event.target.value})
  }

  onButtonSave = () => {
    console.log('save data');
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Veikkausappi</h1>
        </header>
        <div>
          <Tulos onResultChange={this.onChangeRound} labeli="Round" />
          <Joukkueet onTeamChange={this.onHomeTeamChange} labeli="Home" />
          <Joukkueet onTeamChange={this.onAwayTeamChange} labeli="Away" />
          <Tulos onResultChange={this.onChangehomeGoals} labeli="Home Goals" />
          <Tulos onResultChange={this.onChangeawayGoals} labeli="Away Goals" />
          <Tulos onResultChange={this.onChangehomexG} labeli="Home xG" />
          <Tulos onResultChange={this.onChangeawayxG} labeli="Away xG" />
          <button onClick={this.onButtonSave}>Lähetä</button>
        </div>
      </div>
    );
  }
}

export default App;

// TODO:
// yhdistä funktiot
// nolla defaultiksi, roundilla 1
// muotoilut
// lisää liiga - tulisiko olla yksi listaelementti: liiga + joukkue
