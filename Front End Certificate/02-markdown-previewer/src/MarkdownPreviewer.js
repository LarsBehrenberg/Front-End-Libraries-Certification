/* eslint-disable no-multi-str */
import React from 'react';
import './MarkdownPreviewer.css';
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

// Initial text displayed in the #editor input field
var text = "# Welcome to my React Markdown Previewer!\n\n## Sub header\n\n Heres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n }\n}\n```\n\nYou can also make text **bold**... whoa!\n\nThere's also [links](https://www.freecodecamp.com), and\n> 'Block Quotes!' by somebody\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...!\n\n![React Logo w/ Text](https://goo.gl/Umyytc)"

// Main class later exported to #root div
export default class MarkdownPreviewer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      input: text, // setting intitial state as previously defined text
    };

    this.handleChange = this.handleChange.bind(this); //binding handleChange function
  }

  // Called onChange in the textarea, sets new state.input
  handleChange(event) {
    this.setState({
      input: event.target.value
    })
  }

  // function of marked -> returning the state.input as html to display in the #preview div
  getMarkdownText() {
    return { __html: marked(this.state.input, {sanitize: true})};
  }

  render(){
    return (
      <div className="MarkdownPreviewer">
        <textarea id="editor" value={this.state.input} onChange={this.handleChange} autoFocus name="# Default" >{this.state.input}</textarea>
        <div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()} />
      </div>
    );
  }
  
}