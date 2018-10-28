import React, {Component} from 'react';
import Joukkueet from '../../components/Joukkueet/Joukkueet';
import Tulos from '../../components/Tulos/Tulos';
import Liigat from '../../components/Liigat/Liigat';
import teamList from '../../components/Joukkueet/joukkuelista.js';
import savematchdata from '../../helpers/savematchdata';

const defaults = {
  id: 0, // tarviiko?
  league: teamList[0].league, // onko oltava?
  round: 0,
  homeTeam: '',
  awayTeam: '',
  homeGoals: 0,
  awayGoals: 0,
  homexG: 0,
  awayxG: 0
}

class SaveMatch extends Component {
  
  constructor (props) {
    super(props);
    this.state = defaults;
  }
  
  // button events
  onButtonSave = () => {
    savematchdata('http://localhost:3001/match', this.state)
    .then((data) => {
      console.log('savematchdata, returned data ', data);
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

  // edits
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
  onHomeTeamChange = (event) => { 
    this.setState({homeTeam: event.target.value})
  }
  onAwayTeamChange = (event) => { 
    this.setState({awayTeam: event.target.value})
  }
  onLeagueChange = (event) => {
    this.setState({league: event.target.value});
  }

  render() {
    return(
      <div>
        <Liigat onLeagueChange={this.onLeagueChange} labeli="League" currentValue={this.state.league}/>
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
    )
  }
}
export default SaveMatch;