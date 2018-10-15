import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Joukkueet from './components/Joukkueet/Joukkueet';
import Navigation from './components/Navigation/Navigation';
import Tulos from './components/Tulos/Tulos';
import Liigat from './components/Liigat/Liigat';
import HomeAway from './components/HomeAway/HomeAway';
import teamList from './components/Joukkueet/joukkuelista.js';


const defaults = {
  id: 0,
  league: teamList[0].league,
  round: 0,
  homeTeam: '',
  awayTeam: '',
  homeGoals: 0,
  awayGoals: 0,
  homexG: 0,
  awayxG: 0,
  homeaway: 'all',
  use: 'save'
}
// const defaults = {
//   id: 0,
//   league: teamList[0].league,
//   round: 0,
//   homeTeam: teamList[0].abbr,
//   awayTeam: teamList[1].abbr,
//   homeGoals: 0,
//   awayGoals: 0,
//   homexG: 0,
//   awayxG: 0,
//   homeaway: 'all',
//   use: 'save'
// }


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
  onChangeId = (event) => {
    this.setState({id: Number(event.target.value)})
  }
  onHomeTeamChange = (event) => { // todo: yhdistä tämä ja alempi
    this.setState({homeTeam: event.target.value})
  }
  onAwayTeamChange = (event) => { // todo: yhdistä tämä ja alempi
    this.setState({awayTeam: event.target.value})
  }
  onLeagueChange = (event) => {
    this.setState({league: event.target.value});
  }
  onHomeAwayChange = (event) => {
    this.setState({homeaway: event.target.value});
  }
  onUseChange = (use) => {
    this.setState({use});
    // if (use === 'search') {
    //   this.setState({...searchDefaults, use: use});
    // } else if (use === 'save') {
    //   this.setState({...defaults, use: use});
    // }
  }

  onButtonSave = () => {
    fetch('http://localhost:3001/match', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(this.state) 
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.id) {
        alert(`Match between ${data.hometeamabbr} and ${data.awayteamabbr} added to database`)
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
        <Navigation onUseChange={this.onUseChange} />
        <div>
          
          <Liigat onLeagueChange={this.onLeagueChange} labeli="League" currentValue={this.state.league}/>
          <Tulos onResultChange={this.onChangeRound} labeli="Round" currentValue={this.state.round} />
        {this.state.use === 'search' 
          ?
            <div>
              <Joukkueet onTeamChange={this.onHomeTeamChange} labeli="Home" league={this.state.league} currentValue={this.state.homeTeam}/>
              <Joukkueet onTeamChange={this.onAwayTeamChange} labeli="Away" league={this.state.league} currentValue={this.state.awayTeam}/>
              <HomeAway onHomeAwayChange={this.onHomeAwayChange} labeli="Home / Away" currentValue={this.state.homeaway} />
              <Tulos onResultChange={this.onChangeId} labeli="Id" currentValue={this.state.id} />
              <button onClick={this.onButtonSearch}>Hae</button>
            </div>
          :
            <div>
              <Joukkueet onTeamChange={this.onHomeTeamChange} labeli="Home" league={this.state.league} currentValue={this.state.homeTeam}/>
              <Joukkueet onTeamChange={this.onAwayTeamChange} labeli="Away" league={this.state.league} currentValue={this.state.awayTeam}/>
              <Tulos onResultChange={this.onChangehomeGoals} labeli="Home Goals" currentValue={this.state.homeGoals}/>
              <Tulos onResultChange={this.onChangeawayGoals} labeli="Away Goals" currentValue={this.state.awayGoals}/>
              <Tulos onResultChange={this.onChangehomexG} labeli="Home xG" currentValue={this.state.homexG}/>
              <Tulos onResultChange={this.onChangeawayxG} labeli="Away xG" currentValue={this.state.awayxG}/>
              <button onClick={this.onButtonSave}>Lähetä</button>
              <button onClick={this.onClickReset} type="button">Tyhjennä</button>
            </div>
        } 
        </div>
      </div>
    );
  }
}

export default App;

// TODO:
// yhdistä funktiot?
// muotoilut
// lisää liiga - tulisiko olla yksi listaelementti: liiga + joukkue children-tekn?
