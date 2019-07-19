import React from 'react';
import "./App.css";


const transfer = (String) => {
    var sec_num = parseInt(String, 10); // don't forget the second param
    var minutes = Math.floor((sec_num / 60));
    var seconds = sec_num - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes + ':' + seconds;
}


export default class Pomodoro extends React.Component {
    constructor(props){
        super(props);

        this.decrementBreak = this.decrementBreak.bind(this);
    }

    break = 5;
    session = 25;

    componentDidMount(){
        document.getElementById("break-length").innerText = this.break;
        document.getElementById("session-length").innerText = this.session;
        document.getElementById("time-left").innerHTML = transfer(this.session * 60);
    }


    decrementBreak(label){
        if(this.label > 1){
            this.label -= 1;
            document.getElementById("break-length").innerText = this.label;
        }else{
            alert("The break cannot be shorter than one minute.")
        }

    }
    

    render(){
        return(
            <div id="app-container">
                <div id="break-container">
                    <span id="break-label">Break Length:</span><br />
                    <span id="break-decrement" className="downArrow" onClick={() => {this.decrementBreak("break")}}>&#8592; </span>
                    <span id="break-length"></span>
                    <span id="break-increment" className="upArrow"> &#8594;</span>
                </div>
                <div id="session-container">
                    <span id="session-label">Session Length:</span><br />
                    <span id="session-decrement" className="downArrow" onClick={() => {}}>&#8592; </span>
                    <span id="session-length"></span>
                    <span id="session-increment" className="upArrow"> &#8594;</span>
                </div>
                <div id="time-container">
                    <div>
                        <span id="start_stop">Start/Stop</span>    
                    </div>
                    <div>
                        <span id="timer-label">Session</span><br />
                        <span id="time-left" ></span>
                    </div>
                    <div>
                    <span id="reset">Reset</span>    
                    </div>
                </div>
            </div>
        )
    }
}