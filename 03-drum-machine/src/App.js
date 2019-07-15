import React from 'react';
import './App.css';


class DrumPad extends React.Component {
  constructor(props){
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }


  // When component mounted then create EventListener for the 9 different key values and execute handlePress when key is pressed
  componentDidMount(){
    document.addEventListener("keydown", function(event) {
      event.preventDefault();
      switch(event.keyCode){
        case 81: document.getElementById(event.key.toUpperCase()).click()
        break;
        case 87: document.getElementById(event.key.toUpperCase()).click()
        break;
        case 69: document.getElementById(event.key.toUpperCase()).click()
        break;
        case 65: document.getElementById(event.key.toUpperCase()).click()
        break;
        case 83: document.getElementById(event.key.toUpperCase()).click()
        break;
        case 68: document.getElementById(event.key.toUpperCase()).click()
        break;
        case 90: document.getElementById(event.key.toUpperCase()).click()
        break;
        case 88: document.getElementById(event.key.toUpperCase()).click()
        break;
        case 67: document.getElementById(event.key.toUpperCase()).click()
        break;
        default:
      }
    })
  }


  handlePress(keyid, key) {
    // Displaying current key in display div
    document.getElementById("display").innerHTML = key;

    // Triggering the audio
    var audio1 = document.getElementById(keyid);
    audio1.play();

  }

  // Object with FreeCodeCamp audio file links
  audioArray = {
    "Heater 1": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    "Heater 2": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    "Heater 3": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    "HiHat": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    "Kick'n'Hat": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    "Ching": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    "Piano Chord": "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    "Give us a light": "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    "Dry Ohh": "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  } 

  // Rendering the Drum Pads with values for the key as well as name display in display <div>
  render(){
    return(
      <div className="col-3 drum-pad" id={this.props.id + "key"} onClick={() => this.handlePress(this.props.id, this.props.track)}>
        <p>{this.props.id}</p>
        <audio id={this.props.id} className="clip" src={this.audioArray[this.props.track]}></audio>
      </div>
    )
  }
}



// This component renders the general structure and give key values and naems to each drumpad
export default class DrumMachine extends React.Component {

  render(){
    return (
      // Overall drum machine div
      <div id="drum-machine">
        {/* Left hand side displaying the keys */}
        <div id="left-section">
            <DrumPad id="Q" track="Heater 1"/>
            <DrumPad id="W" track="Heater 2"/>
            <DrumPad id="E" track="Heater 3"/>
            <DrumPad id="A" track="HiHat"/>
            <DrumPad id="S" track="Kick'n'Hat"/>
            <DrumPad id="D" track="Ching"/>
            <DrumPad id="Z" track="Piano Chord"/>
            <DrumPad id="X" track="Give us a light"/>
            <DrumPad id="C" track="Dry Ohh"/>
        </div>
  
        {/* Right hand side showing the display */}
        <div id="right-section">
          <div id="display"></div>
        </div>
      </div>
    );
  }
}
