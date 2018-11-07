import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Search from './components/Search/Search';
import SaveMatch from './components/SaveMatch/SaveMatch';
import ExtendedData from './components/ExtendedData/ExtendedData';
import MatchResults from './components/MatchResults/MatchResults';
// import teamList from './components/Joukkueet/joukkuelista.js';
import footballicon from './icons8-soccer-ball-48.png';
// import logo from './logo.svg';

const defaults = {
  // id: 0,
  // league: teamList[0].league,
  // round: 0,
  // homeTeam: '',
  // awayTeam: '',
  // homeGoals: 0,
  // awayGoals: 0,
  // homexG: 0,
  // awayxG: 0,
  // homeaway: 'all',
  // selectedTeam: '',
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

  
  // used by Navigation
  handleModeChange = (use) => {
    this.setState({use});
  }

  onClickReset = () => {
    this.setState(defaults);
  }
  onClickTable = () => {
    console.log('onClickTable clicked');
  }
  onButtonExtendedTeamPairData = () => {
    console.log('onButtonExtendedTeamPairData clicked');
  }
  showMatchData = (results) => {
    if (results) {
      console.log('showMatchData');
      console.log(results);
      this.setState({use: 'matchresults', results});
    }
  }
  showExtendedData = (results) => {
    if (results) {
      console.log('showExtendedData');
      console.log(results);
      this.setState({use: 'extendedData', extendedResults: results});
    }
  }

  
  render() {

    // different data showed based to state.use
    let show = '';
      if (this.state.use === 'matchresults') { 
        show = <MatchResults results={this.state.results} />
      } else if (this.state.use === 'extendedData') { 
        show = <ExtendedData 
            extendedResults={this.state.extendedResults} 
            selectedTeam={this.state.selectedTeam} 
            homeaway={this.state.homeaway} />
      } else if (this.state.use === 'search' ) { 
        show = <Search handleModeChange={this.handleModeChange} showExtendedData={this.showExtendedData} showMatchData={this.showMatchData}/>
      } else if (this.state.use === 'save') {  
        show = <SaveMatch handleModeChange={this.handleModeChange} showExtendedData={this.showExtendedData}/>
      } 

      return (
        <div className="App">
          <header className="App-header">
            <img src={footballicon} alt="football icon"/><img src={footballicon} alt="football icon"/><img src={footballicon} alt="football icon"/>
            <h1 className="App-title">Veikkausappi</h1>
          </header>
          <Navigation handleModeChange={this.handleModeChange} onClickTable={this.onClickTable}/>
          {show}
        </div>
      );
    }
}

export default App;