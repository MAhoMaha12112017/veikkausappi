import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Joukkueet from './components/Joukkueet/Joukkueet';
import Navigation from './components/Navigation/Navigation';
import Tulos from './components/Tulos/Tulos';
import Liigat from './components/Liigat/Liigat';
import HomeAway from './components/HomeAway/HomeAway';
import teamList from './components/Joukkueet/joukkuelista.js';
import footballicon from './icons8-soccer-ball-48.png';
import fetchteamdata from './helpers/fetchteamdata';


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
  selectedTeam: '',
  use: 'save',
  results: {},
  extendedResults: {}
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
  onSelectedTeamChange = (event) => {
    this.setState({selectedTeam: event.target.value});
  }
  onUseChange = (use) => {
    if (use ==='search') {
      this.setState({
        use,
        homeGoals: 0, // voisko laittaa null / undefined?
        awayGoals: 0,
        homexG: 0,
        awayxG: 0,
        selectedTeam: ''
      });
    } else if (use === 'save') {
      this.setState({use})
    }
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

  onButtonSearch = () => {
    const searchBody = {
      id: this.state.id || undefined,
      league: this.state.league || undefined,
      round: this.state.round || undefined,
      team1: this.state.homeTeam || undefined,
      team2: this.state.awayTeam || undefined,
      homeaway: this.state.homeaway || undefined,
      team: this.state.selectedTeam || undefined
    }
    console.log('onButtonSearch.searchBody', searchBody);

    fetch('http://localhost:3001/matchsearch', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(searchBody) 
    })
    .then((res)=> res.json())
    .then((data) => {
      if (data[0].id) {
        console.log(data);
        this.setState({use: 'results', results: data});
      } else {
        alert('data not found')
      }
    })
    .catch((err) => console.log(err));
  }

  onButtonExtendedSingleTeamData = () => {
    const searchBody = {
      team: this.state.selectedTeam || undefined,
      homeaway: this.state.homeaway || undefined
    }
    
    // let homeData = {};
    // let awayData = {};
    // let response = {};
    // let extendedResults = {};
    
   
    if (this.state.homeaway === 'home' || this.state.homeaway === 'away') {
      console.log('searchBody.homeaway ', searchBody.homeaway)
      fetchteamdata('http://localhost:3001/teamdata', searchBody)
      .then(response => {
        console.log('home or away', response);
        this.setState({use: 'extendedSearch', extendedResults: response});
      });
    } else if (this.state.homeaway === 'all') {  // todo, oltava yhdistetty data, mergeHomeAndAwayData?
      console.log('haetaan molemmat ja yhdistetään data');
      searchBody.homeaway = 'home';
      fetchteamdata('http://localhost:3001/teamdata', searchBody)
      .then(response => {
        console.log('home', response);
        // extendedResults = response;
      });
      searchBody.homeaway = 'away';
      fetchteamdata('http://localhost:3001/teamdata', searchBody)
      .then(response => {
        console.log('away', response);
        // extendedResults = response;
      });
    }
    console.log('this.state.extendedResults', this.state.extendedResults);
  }

  // extendedResults extendedResults
  // mergeHomeAndAwayData = (homeData, awayData) => {
  //   const goals = homeData.allHomeGoals + awayData.allAwayGoals;
  //   const xGoals = homeData.allHomeXG + awayData.allAwayXG; 
  //   const wins = homeData.wins + awayData.wins;
  //   const draws = homeData.draws + awayData.draws;
  //   const losses = homeData.losses + awayData.losses;
  // }

  onClickReset = () => {
    this.setState(defaults);
  }
  onClickSearchReset = () => {
    this.setState({...defaults, use: 'search'});
  }
  onClickTable = () => {
    console.log('onClickTable');
  }
  onButtonExtendedTeamPairData = () => {
    console.log('onButtonExtendedTeamPairData');
  }

  render() {
    let show = '';
    
      if (this.state.use === 'results') {
        show =  
          <div>
            <h3>Match Results</h3>
            <ul>
            {this.state.results.map((result) => {
              return (
                <li key={result.id}>Kierros {result.round}. {result.hometeamabbr} {result.homegoals} - {result.awayteamabbr} {result.awaygoals} xG: {result.homexg} - {result.awayxg} </li>
              );
            })}
            </ul>
          </div>
      }
      else if (this.state.use === 'search' ) {
        show = (
            <div>
              <Liigat onLeagueChange={this.onLeagueChange} labeli="League" currentValue={this.state.league}/>
              <Tulos onResultChange={this.onChangeRound} labeli="Round" currentValue={this.state.round} />
              <p>Team Pair Data:</p>
              <Joukkueet onTeamChange={this.onHomeTeamChange} labeli="Team 1" league={this.state.league} currentValue={this.state.homeTeam}/>
              <Joukkueet onTeamChange={this.onAwayTeamChange} labeli="Team 2" league={this.state.league} currentValue={this.state.awayTeam}/>
              <button onClick={this.onButtonExtendedTeamPairData}>Extended Team Pair Data</button>
              <hr />
              <Joukkueet onTeamChange={this.onSelectedTeamChange} labeli="Single Team Match Data" league={this.state.league} currentValue={this.state.selectedTeam}/>
              <HomeAway onHomeAwayChange={this.onHomeAwayChange} labeli="Home / Away" currentValue={this.state.homeaway} />
              <button onClick={this.onButtonExtendedSingleTeamData}>Extended Single Team Data</button>
              <hr />
              <Tulos onResultChange={this.onChangeId} labeli="Id" currentValue={this.state.id} />
              <button onClick={this.onButtonSearch}>Hae otteludata</button>
              <button onClick={this.onClickSearchReset} type="button">Tyhjennä</button>
            </div>
        )
      } else { 
        show =  (
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
      )
      
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={footballicon} alt="football icon"/><img src={footballicon} alt="football icon"/><img src={footballicon} alt="football icon"/>
          <h1 className="App-title">Veikkausappi</h1>
        </header>
        <Navigation onUseChange={this.onUseChange} onClickTable={this.onClickTable}/>
        {show}
        
      </div>
    );
  }
}

export default App;

// TODO:
// yhdistä funktiot?
// lisää liiga - tulisiko olla yksi listaelementti: liiga + joukkue children-tekn?
