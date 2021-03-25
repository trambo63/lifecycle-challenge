import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: {}, 
      seconds: 10
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          darken: 'brightness(0%)',
        })
      })
      .catch((err) => console.log(err))
  }

  //clear the timer 
  //componentDidMount componentDidUpdate 
  //componentDidUnmount to clear something 

  //mount
  //didupdate
  //unmount

  secondsToTime(secs){
    let divisor_for_minutes = secs % (60 * 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.state.seconds == 0){
      this.setState({seconds: 10})
      this.timer = 0;
      this.timer = setInterval(this.countDown, 1000);
    }
    this.fetchPokemon()
    if (this.timer == 0 && this.state.seconds > 0) {
     this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds == 0) { 
      clearInterval(this.timer);
      this.setState({darken: 'brightness(100%)'})
    } 
  }
   
  componentDidUpdate(){
    
  } 

  componentWillUnmount(){
    
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={this.startTimer}>Start!</button>
        <h1 className={'timer'} >{this.state.seconds}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} style={{filter: this.state.darken}} src={this.state.pokeSprite}/>
          {
            this.state.seconds == 0 ? <h1 className={'pokeName'}>{this.state.pokeName}</h1> : <></>
          }
        </div>
      </div>
    )
  }
}

export default PokeFetch;

