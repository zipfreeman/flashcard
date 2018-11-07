//the purpose of this is to create note cards in a printable format. back & front.

import React, { Component } from 'react';
import './App.css';
import testData from './testdata.json'; //it really hates commas at the end of lists

const newData = formatData(testData)
function formatData(data){
  let names = []
  let infos= []
  for(let obj of data) {
    names.push(obj.name)
    infos.push(obj.info)
  }
  let names2d = []
  let infos2d = []

  while(names.length > 0){
    while(names.length < 6) names.push('');
    while(infos.length < 6) infos.push('');
    names2d.push(names.splice(0,6))
    infos2d.push(infos.splice(0,6))
  }
  return {names: names2d, infos: infos2d}
}
/*
 i want the names on the front and the info on the back
 but need to print all the front first together
 then put the paper in the printer again and print the back

DID
> bring data in
> separate the function names from their info
> so the app needs to accept the Front Side data, and break it down into pages
> *** and put the text on opposide sides of the layout so it ends up on the back: arr = arr.splice(3,3) + arr
      when you cut out the card***
  -- names go left to right top to bottom
  -- infos go right to left top to bottom
> and the Pages need to divide the data into 6 cards
  -- how to divide into 6-box pages?
  -- splice into two dimensional array of 6

  > so i have the data formatted into two-deimensional arrays
  > the Page should accept an array and makes a Card for each item in that array (always 6 or less)
  > App creates Page for each set of arrays

TODO:
> set up some different VIEWS:
  -- a view for showing all the front

*/
const Card = props =>{
  // console.log(props)
    if( props.type === "front"){
      return <div className="Card front"><p>{props.text === '' ? '' : props.text +'()'}</p></div>
    }else if( props.type === "back"){
      return <div className="Card back" ><p>{props.text}</p></div>
    }
}

const Page = props => {
  // console.log(props.set)
  if(props.type === "front"){
    return (
      <div className="Page">
        {props.set.map( (item, inx) => <Card key={inx} index={inx} text={item} type={props.type} /> )}
      </div>
    )
  }else if(props.type === "back"){
    let set = [...props.set]
    let reorder = set.splice(0,3)
    set = [...set, ...reorder];
    return (
      <div className="Page">
        {set.map( (item, inx) => <Card key={inx} text={item} type={props.type} /> )}
      </div>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      view: 'front'
    }
  }
  setView(view){
    this.setState({view})
  }
  render() {//maybe this should be using state
    let data;
    switch(this.state.view){
      case "front":
        data = newData.names
      break
      case "back":
        data = newData.infos
      break
      default:
    }

    return (
      <div className="App">
        <div className="page_container">
          {data.map( (set, inx) =>
            (<Page key={inx} set={set} type={this.state.view}/>)
          )}
        </div>
        <div className="menubar">
        <button id='helpBtn'>?</button>
        <div className='help'>
          <p>
            TODO: <br/>
            -- accept some kind of upload data to make cards<br/>
            -- custom entry of cards<br/>
            -- is the Help section okay?<br/>
            -- make "View Alternating"
            <br/>
            ------------<br/>
            HELP:<br/>
            ------------<br/>
            Use the browser's print option. (cmd + P or ctrl + P, usually)<br/>
            Remove Margins in the print options, and set it to Landscape.<br/>
            There should be 6 cards per page, filling up the whole page (minus a couple millimeters)<br/>
            <br/>
            If your printer is a double-sided printer, then use the "View Alternating"<br/>
            so your printer can print the front and backs all in one go.<br/>
            <br/>
            If you don't have a fancy printer, print all the the fronts,<br/>
            then "View Back" and print all the backs. Make sure you put the paper in<br/>
            the right direction when you print the second time!<br/>
          </p>
        </div>
        <button id='front' onClick={() => this.setView('front')}>View Front</button>
        <button id='back' onClick={() => this.setView('back')}>View Back</button>
        {//TODO:
        //<button id='' onClick={() => this.setView('')}>View Alternating</button>
        }
        </div>


      </div>
    );
  }
}

export default App;
