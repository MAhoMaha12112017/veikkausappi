import React, {Component} from 'react';
// import Joukkueet from '../../components/Joukkueet/Joukkueet';
// import Tulos from '../../components/Tulos/Tulos';
// import Liigat from '../../components/Liigat/Liigat';
// import HomeAway from '../../components/HomeAway/HomeAway';
import teamList from '../../components/Joukkueet/joukkuelista.js';

const defaults = {
  id: 0,
  league: teamList[0].league, // onko oltava?
  round: 0,
  homeTeam: '',
  awayTeam: '',
  homeGoals: 0,
  awayGoals: 0,
  homexG: 0,
  awayxG: 0
}

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = defaults;
  }
  render() {
    return(
      <div>
      {/*
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
      */}
      </div>
    )
  }
}
export default Search;