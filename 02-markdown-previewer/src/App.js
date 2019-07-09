/* eslint-disable no-multi-str */
import React from 'react';
import './App.css';
import marked from 'marked';

// Set options for marked -> set breaks = true for freeCodeCamp test number 7 on this challenge
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});


var text = "# Welcome to my React Markdown Previewer!\n\n## Sub header\n\n Heres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n }\n}\n```\n\nYou can also make text **bold**... whoa!\n\nThere's also [links](https://www.freecodecamp.com), and\n> 'Block Quotes!' by somebody\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...!\n\n![React Logo w/ Text](https://goo.gl/Umyytc)"

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      input: text,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    })
    console.log(this.state.input);
  }

  getMarkdownText() {
    var rawMarkup = marked(this.state.input, {sanitize: true});
    return { __html: rawMarkup};
  }

  render(){
    return (
      <div className="App">
        <h1 style={{color: "white"}}>Markdown Previewer</h1>
        <textarea id="editor" value={this.state.input} onChange={this.handleChange} autofocus name="# Default" >{this.state.input}</textarea>
        <div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()} />
      </div>
    );
  }
  
}

export default App;




 
// ----------  OLD CODE !!!!  ----------

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
