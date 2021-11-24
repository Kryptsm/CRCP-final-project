import './App.css';
import './hexagons.css';
import { Howl, Howler } from 'howler';
import Game from './Game.js';

import brightbulb from "./images/brightbulb.png";
import darkbulb from "./images/darkbulb.png";

import testSound from "./sounds/testsound.mp3";
import bubbles from "./sounds/bubbles.mp3";
import magic from "./sounds/magic.mp3";
import sleigh from "./sounds/sleigh.mp3";
import mallet from "./sounds/mallet.mp3";
import rifle from "./sounds/rifle.mp3";
import shout from "./sounds/shout.mp3";

import blaster from "./sounds/AlienBlaster.mp3";
import radio from "./sounds/AlienRadio.mp3";
import ambient from "./sounds/AmbientSciFi.mp3";
import borealis from "./sounds/Borealis.mp3";
import mario from "./sounds/Mario.mp3";
import organ from "./sounds/Organ.mp3";
import R2D2 from "./sounds/R2D2.mp3";

import black from "./images/buttonOff.png";
import white from "./images/buttonOn.png";

var storedSounds = [testSound, blaster, radio, ambient, borealis, mario, organ, R2D2, mallet];
var turnOnArray = [[], [], [], [], [], [], [], [], []];
var soundsArray = []
var setSounds = []

var doRandoms = true;
var randomClicks = false;
var randomInterval = 150;
var theInterval;

var currentSoundNum = 0;

function App() {
  initializeRandoms();
  initializeSounds(0);
  initializeSetSounds();

  return (
    <div>
      <div className="appContainer">
        <div className="float-container">
          <div className="float-child theGame">
            <button className="randomClicksButton center" onClick={() => handleRandomClicks()}>Toggle Automation</button>
            <div className="justTheGame">
              <Game />
            </div>
          </div>
          <div className="float-child theHex">
            <ul id="hexGrid">
              <li className="hex">
                <div className="hexIn">
                  <div className="hexLink ">
                    <img src={black} alt="lightbulb" id="black" className="bulb hidden" hidden />
                  </div>
                </div>
              </li>
              <li className="hex">
                <div className="hexIn">
                  <div className="hexLink ">
                    <img src={black} alt="lightbulb" id="black" className="bulb hidden" hidden />
                  </div>
                </div>
              </li>
              <li className="hex">
                <div className="hexIn">
                  <div className="hexLink ">
                    <img src={black} alt="lightbulb" id="black" className="bulb button-1" onClick={() => lightButton(1)} />
                  </div>
                </div>
              </li>
              <li className="hex">
                <div className="hexIn">
                  <div className="hexLink ">
                    <img src={black} alt="lightbulb" id="black" className="bulb button-2" onClick={() => lightButton(2)} />
                  </div>
                </div>
              </li>
              <li className="hex">
                <div className="hexIn">
                  <div className="hexLink ">
                    <img src={black} alt="lightbulb" id="black" className="bulb button-3" onClick={() => lightButton(3)} />
                  </div>
                </div>
              </li>
              <li className="hex">
                <div className="hexIn">
                  <div className="hexLink ">
                    <img src={black} alt="lightbulb" id="black" className="bulb button-4" onClick={() => lightButton(4)} />
                  </div>
                </div>
              </li>
              <li className="hex">
                <div className="hexIn">
                  <div className="hexLink ">
                    <img src={black} alt="lightbulb" id="black" className="bulb button-5" onClick={() => lightButton(5)} />
                  </div>
                </div>
              </li>

              <li className="hex">
                <div className="hexIn">
                  <div className="hexLink ">
                    <img src={black} alt="lightbulb" id="black" className="bulb button-6" onClick={() => lightButton(6)} />
                  </div>
                </div>
              </li>
              <li className="hex">
                <div className="hexIn">
                  <div className="hexLink ">
                    <img src={black} alt="lightbulb" id="black" className="bulb button-7" onClick={() => lightButton(7)} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

//initializes the array of sounds to the sound number specified
export function initializeSounds(number) {
  currentSoundNum = number;
  if (soundsArray.length > 0)
    soundsArray = [];

  for (var x = 0; x < 7; x++) {
    if(x === 4){
      soundsArray.push(
        new Howl({
          src: storedSounds[number],
          rate: ((Math.random() * 5) + 1),
          volume: 1.0,
        })
      )
    }
    else{
      soundsArray.push(
        new Howl({
          src: storedSounds[number],
          rate: ((Math.random() * 5) + 1),
          volume: 0.2,
        })
      )
    }
  }
}

function initializeSetSounds() {
  for (var x = 0; x < 7; x++) {
    setSounds.push(
      new Howl({
        src: storedSounds[x],
        rate: 1,
        volume: 0.5,
      })
    )
  }
}

//initializes the random lights that each light also triggers when clicked
function initializeRandoms() {
  if (turnOnArray) {
    for (var x = 0; x < 7; x++) {
      var newArray = [];
      for (var counter = 0; counter < randomIntFromInterval(1, 4); counter++) {
        var randomVal = randomIntFromInterval(1, 7);
        while (randomVal === x + 1 || newArray.includes(randomVal))
          randomVal = randomIntFromInterval(1, 7);

        newArray.push(randomVal);
      }
      turnOnArray[x] = newArray;
    }
  }
}

//handles the random clicks button, setting an interval that clicks a random button in a set time
function handleRandomClicks() {
  if (randomClicks) {
    clearInterval(theInterval);
    for(var x = 0; x < 7; x++){
      soundsArray[x].stop();
    }
  } else if (!randomClicks) {
    theInterval = setInterval(function () {
      lightButton(randomIntFromInterval(1, 7));
    }, randomInterval);
  }
  randomClicks = !randomClicks;
}

//gets a random int on the interval. Used to get a random light number
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//lights the specified button, as well as all the buttons it randomly effects
function lightButton(number) {
  toggleLight(number);

  if (doRandoms) {
    var specificArray = turnOnArray[number - 1];
    for (var x = 0; x < specificArray.length; x++) {
      toggleLight(specificArray[x]);
    }
  }
}

//lights the specified light number
function toggleLight(number) {
  var elementClass = "button-" + number;
  var element = document.getElementsByClassName(elementClass)[0];
  if (element) {
    if (element.id.includes("white")) {
      element.id="black";
      element.src = black;

      soundsArray[number - 1].stop();
    }
    else if (element.id.includes("black")) {
      element.id = "white";
      element.src = white;

      soundsArray[number - 1].play();
      if(currentSoundNum === 4){
        soundsArray[number - 1].fade(1, 0.0, 3000);
      }
      else
        soundsArray[number - 1].fade(0.2, 0.0, 1000);
    }
  }
}

export default App;
