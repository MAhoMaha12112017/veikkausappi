import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Joukkueet from './components/Joukkueet/Joukkueet';
import Navigation from './components/Navigation/Navigation';
import Tulos from './components/Tulos/Tulos';
import Liigat from './components/Liigat/Liigat';
import HomeAway from './components/HomeAway/HomeAway';
import Search from './components/Search/Search';
import SaveMatch from './components/SaveMatch/SaveMatch';
import ExtendedData from './components/ExtendedData/ExtendedData';
import MatchResults from './components/MatchResults/MatchResults';
import teamList from './components/Joukkueet/joukkuelista.js';
import footballicon from './icons8-soccer-ball-48.png';
import fetchteamdata from './helpers/fetchteamdata';
// import savematchdata from './helpers/savematchdata';
import fetchmatchsearch from './helpers/fetchmatchsearch';


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
  extendedResults: {},
  homeResults: {},
  awayResults: {}
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = defaults;
  }

  // for edits of data
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
  onHomeTeamChange = (event) => { 
    this.setState({homeTeam: event.target.value})
  }
  onAwayTeamChange = (event) => { 
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
 
  // ohjelman tilan muutos, tuottaa erilaisia tulostusvaihtoehtoja. Vähällä käytöllä, poistettava tai lisättävä vaihtoehtoja
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

  // onButtonSave = () => {
  //   savematchdata('http://localhost:3001/match', this.state)
  //   .then((data) => {
  //     console.log('savematchdata, returned data ', data);
  //     if (data.id) {
  //       alert(`Match between ${data.hometeamabbr} and ${data.awayteamabbr} added to database`)
  //     } else {
  //       alert(`Match could not be added to database`);
  //     }
  //   });
  // }

  // datan haku - perusdata
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

    fetchmatchsearch('http://localhost:3001/matchsearch', searchBody)
    .then((data) => {
      if (data[0].id) {
        console.log(data);
        this.setState({use: 'matchresults', results: data}); // siirto results-näytölle
      } else {
        alert('data not found')
      }
    })
    .catch((err) => console.log(err));
  }

  // datan haku - laajennettu data
  onButtonExtendedSingleTeamData = () => {
    const searchBody = {
      team: this.state.selectedTeam || undefined,
      homeaway: this.state.homeaway || undefined
    }
   
    if (this.state.homeaway === 'home' || this.state.homeaway === 'away') {
      console.log('searchBody.homeaway ', searchBody.homeaway)
      fetchteamdata('http://localhost:3001/teamdata', searchBody)
      .then(response => {
        console.log('home or away', response);
        this.setState({use: 'extendedData', extendedResults: response}); // toteutus puuttuu?
      });
    } else if (this.state.homeaway === 'all') {  // todo, oltava yhdistetty data, mergeHomeAndAwayData?
        console.log('haetaan molemmat ja yhdistetään data');
        searchBody.homeaway = 'home';
        fetchteamdata('http://localhost:3001/teamdata', searchBody)
        .then(response => {
          this.setState({use: 'extendedData', homeResults: response});
        });
        searchBody.homeaway = 'away';
        fetchteamdata('http://localhost:3001/teamdata', searchBody)
        .then(response => {
          this.setState({use: 'extendedData', awayResults: response});
        });
    }
  }

  mergeHomeAndAwayData = (homeData, awayData) => {
    const goals = homeData.HomeGoals + awayData.AwayGoals;
    const xGoals = homeData.HomeXG + awayData.AwayXG; 
    const wins = homeData.wins + awayData.wins;
    const draws = homeData.draws + awayData.draws;
    const losses = homeData.losses + awayData.losses;
    const games = homeData.lenght + awayData.length;
    const avgGoals = goals / games;
    const avgXG = xGoals / games;
    return {
      goals,
      xGoals,
      wins,
      draws,
      losses,
      games,
      avgGoals,
      avgXG
    } 
  }

  onClickReset = () => {
    this.setState(defaults);
  }
  onClickSearchReset = () => {
    this.setState({...defaults, use: 'search'});
  }
  onClickTable = () => {
    console.log('onClickTable clicked');
  }
  onButtonExtendedTeamPairData = () => {
    console.log('onButtonExtendedTeamPairData clicked');
  }

  render() {

    // different data showed based to state.use
    let show = '';
    
      if (this.state.use === 'matchresults') { 
        show =  <MatchResults results={this.state.results} />
      } else if (this.state.use === 'extendedData') { 
        show = 
          <ExtendedData extendedResults={this.state.extendedResults} selectedTeam={this.state.selectedTeam} homeaway={this.state.homeaway} />
      } else if (this.state.use === 'search' ) { // hakuikkuna
        show = (
          <div>
            <Search />
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
      } else if (this.state.use === 'save') {  // syöttöikkuna 
        show =  (
        <SaveMatch />
        
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

{/*
<div>
          <Tulos onResultChange={this.onChangeRound} labeli="Round" currentValue={this.state.round} />
          <Joukkueet onTeamChange={this.onHomeTeamChange} labeli="Home" league={this.state.league} currentValue={this.state.homeTeam}/>
          <Joukkueet onTeamChange={this.onAwayTeamChange} labeli="Away" league={this.state.league} currentValue={this.state.awayTeam}/>
          <Tulos onResultChange={this.onChangehomeGoals} labeli="Home Goals" currentValue={this.state.homeGoals}/>
          <Tulos onResultChange={this.onChangeawayGoals} labeli="Away Goals" currentValue={this.state.awayGoals}/>
          <Tulos onResultChange={this.onChangehomexG} labeli="Home xG" currentValue={this.state.homexG}/>
          <Tulos onResultChange={this.onChangeawayxG} labeli="Away xG" currentValue={this.state.awayxG}/>
          <button onClick={this.onButtonSave}>Lähetä</button>
          <button onClick={this.onClickReset} type="button">Tyhjennä</button>
        </div>
*/}