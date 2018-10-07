import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Joukkueet from './components/Joukkueet/Joukkueet';
import Tulos from './components/Tulos/Tulos';
import Liigat from './components/Liigat/Liigat';
import {premierLeagueTeams} from './components/Joukkueet/joukkuelista.js';

const defaults = {
  league: 'PREMIERLEAGUE',
  round: 0,
  homeTeam: premierLeagueTeams[0].abbr,
  awayTeam: premierLeagueTeams[0].abbr,
  homeGoals: 0,
  awayGoals: 0,
  homexG: 0,
  awayxG: 0
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = defaults;
  }

  onChangehomeGoals = (event) => {
    this.setState({homeGoals: Number(event.target.value)})
  }

  onChangeawayGoals = (event) => {
    this.setState({awayGoals: Number(event.target.value)})
  }

  onChangehomexG = (event) => {
    this.setState({homexG: Number(event.target.value)})
  }

  onChangeawayxG = (event) => {
    this.setState({awayxG: Number(event.target.value)})
  }

  onChangeRound = (event) => {
    this.setState({round: Number(event.target.value)})
  }

  onHomeTeamChange = (event) => { // todo: yhdistä tämä ja alempi
    this.setState({homeTeam: event.target.value})
  }

  onAwayTeamChange = (event) => { // todo: yhdistä tämä ja alempi
    this.setState({awayTeam: event.target.value})
  }
  
  onLeagueChange = (event) => {
      this.setState({league: event.target.value})
  }

  onButtonSave = () => {
    fetch('http://localhost:3001/match', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(this.state) // body data type must match "Content-Type" header
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.id) {
        alert(`Match between ${data.hometeam} and ${data.awayteam} added to database`)
      } else {
        alert(`Match could not be added to database`);
      }
    });
  }

  onClickReset = () => {
    this.setState(defaults);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Veikkausappi</h1>
        </header>
        <div>
          <Liigat onLeagueChange={this.onLeagueChange} labeli="League" currentValue={this.state.league}/>
          <Tulos onResultChange={this.onChangeRound} labeli="Round" currentValue={this.state.round} />
          <Joukkueet onTeamChange={this.onHomeTeamChange} labeli="Home" teams={premierLeagueTeams} currentValue={this.state.homeTeam}/>
          <Joukkueet onTeamChange={this.onAwayTeamChange} labeli="Away" teams={premierLeagueTeams} currentValue={this.state.awayTeam}/>
          <Tulos onResultChange={this.onChangehomeGoals} labeli="Home Goals" currentValue={this.state.homeGoals}/>
          <Tulos onResultChange={this.onChangeawayGoals} labeli="Away Goals" currentValue={this.state.awayGoals}/>
          <Tulos onResultChange={this.onChangehomexG} labeli="Home xG" currentValue={this.state.homexG}/>
          <Tulos onResultChange={this.onChangeawayxG} labeli="Away xG" currentValue={this.state.awayxG}/>
          <button onClick={this.onButtonSave}>Lähetä</button>
          <button onClick={this.onClickReset} type="button">Tyhjennä</button>
        </div>
      </div>
    );
  }
}

export default App;

// TODO:
// yhdistä funktiot?
// muotoilut
// lisää liiga - tulisiko olla yksi listaelementti: liiga + joukkue
