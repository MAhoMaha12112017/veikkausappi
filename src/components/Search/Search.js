import React, {Component} from 'react';
import Joukkueet from '../../components/Joukkueet/Joukkueet';
import Tulos from '../../components/Tulos/Tulos';
import Liigat from '../../components/Liigat/Liigat';
import HomeAway from '../../components/HomeAway/HomeAway';
import teamList from '../../components/Joukkueet/joukkuelista.js';
import fetchmatchsearch from '../../helpers/fetchmatchsearch';
import fetchteamdata from '../../helpers/fetchteamdata';

const defaults = {
  id: 0,
  league: teamList[0].league, // onko oltava?
  round: 0,
  homeTeam: '',
  awayTeam: '',
  homeaway: 'all',
  selectedTeam: '',
  results: {}, // miten käytetään?
  extendedResults: {} // miten käytetään?
}

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = defaults;
  }

  // button events handlers
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
        this.props.showMatchData(data);
      } else {
        alert('data not found')
      }
    })
    .catch((err) => console.log(err));
  }

  onButtonExtendedSingleTeamData = () => {
    // search parameters to object
    const searchBody = {
      team: this.state.selectedTeam || undefined,
      homeaway: this.state.homeaway || undefined
    }
   
    if (this.state.homeaway === 'home' || this.state.homeaway === 'away') {
      console.log('searchBody.homeaway ', searchBody.homeaway)
      fetchteamdata('http://localhost:3001/teamdata', searchBody)
      .then(response => {
        console.log('home or away', response);
        this.props.showExtendedData(response);
        // this.setState({extendedResults: response}); // use: 'extendedData', toteutus puuttuu? 
        
      });
    } else if (this.state.homeaway === 'all') {  // todo, oltava yhdistetty data, mergeHomeAndAwayData?
        console.log('haetaan molemmat ja yhdistetään data');
        searchBody.homeaway = 'home';
        fetchteamdata('http://localhost:3001/teamdata', searchBody)
        .then(response => {
          this.props.showExtendedData(response);
          // this.setState({extendedResults: response}); // use: 'extendedData', 
          
        });
        searchBody.homeaway = 'away';
        fetchteamdata('http://localhost:3001/teamdata', searchBody)
        .then(response => {
          this.props.showExtendedData(response);
          // this.setState({extendedResults: response}); // , 
        });
    }
  }

  mergeHomeAndAwayData = (homeData, awayData) => { // vois siirtää jonnekin muualle tästä tilaa viemästä!? helpersseihin?
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

  onButtonExtendedTeamPairData = () => {
    console.log('onButtonExtendedTeamPairData')
  }

  onClickSearchReset = () => {
    this.setState({...defaults}); // use: 'search'
  }

  // form field edits handeled
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

  render() {
    return(
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
  }
}
export default Search;