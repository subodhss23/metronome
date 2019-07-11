import React, {Component} from 'react';
import './Metronome.css';

import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component{
  constructor(props){
    super(props);

    this.state ={
      palying: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    //creating audio objects with the files 
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.startStop = this.startStop.bind(this);
    this.handleBpmChange = this.handleBpmChange.bind(this);
    this.playClick = this.playClick.bind(this);
  }

  //handeling bmp 
  handleBpmChange(event) {
    const bpm = event.target.value;
   
    if (this.state.playing){
      //stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // set the new bpm, and rest the beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // otherwise just update the BPM
      this.setState({ bpm });
    }
  };

  startStop(){
   if (this.state.playing){
     // stop the timer
     clearInterval(this.timer);
     this.setState({
       playing: false
     });
   } else {
     //start a timer with a current BPM
     this.timer = setInterval(
       this.playClick,
       (60 / this.state.bpm) * 1000
     )
     this.setState(
       {count : 0,
        playing: true
        // play a click "immdeiately" (afte setState finishes)
      },
      this.playClick
     );
   }
  }

  playClick(){
      const { count, beatsPerMeasure } = this.state;

      // The first bear will have a different sound than that others
      if ( count % beatsPerMeasure === 0){
        this.click2.play();
      } else {
        this.click1.play();
      }

      //leep track of which bear we're on
      this.setState(state =>({
        count: (state.count + 1) % this.state.beatsPerMeasure
      }))
  }

  render(){
    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
        <div>{bpm} BPM</div>  
        <input 
              type="range" 
              min="60" 
              max="240" 
              value={bpm} 
              onChange = {this.handleBpmChange}
              />
        </div>  
        <button onClick={this.startStop}> 
                {playing ? 'Stop' : 'Start'} 
        </button>
      </div>
    );
  }
}

export default Metronome;