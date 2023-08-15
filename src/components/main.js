import React, { useEffect, useState } from 'react'

const Main = () => {
    const[input, setInput] = useState('Ahmedabad');
    const[info, setInfo] = useState('');

    useEffect(()=>{
      apiCall();
    },[])

    const apiCall = async()=>{
      try {
        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=d56913cea88f4359cc9d6827637e8692&units=metric`);
        let data = await api.json();
        const {temp, humidity, pressure} = data.main;
        const {main: weathertype} = data.weather[0];
        const {country, sunset} = data.sys;
        const{speed} = data.wind;
        const{name} = data;
        const myInfo = {
          temp, name, humidity, pressure, weathertype,country, sunset, speed
        }



        setInfo(myInfo);
      } catch (error) {
        alert('Not Found:(');
      }
    }

    let img = ()=>{
        if(info.weathertype=='Sunny'){
          return 'wi wi-day-sunny'
        }
        else if(info.weathertype=='Clear'){
          return 'wi wi-cloudy'
        }
        else if(info.weathertype=='Smoke'){
          return 'wi wi-fog'
        }
        else if(info.weathertype=='Rain'){
          return 'wi wi-day-rain'
        }
        else if(info.weathertype=='Wind'){
          return 'wi wi-day-windy'
        }
        else{
          return 'wi wi-cloud'
        }
    }

    let day = (val)=>{
      if(val==1){
        return 'Monday';
      }
      else if(val==2){
        return 'Tuesday';
      }
      else if(val==3){
        return 'Wednesday';
      }
      else if(val==4){
        return 'Thursday';
      }
      else if(val==5){
        return 'Friday';
      }
      else if(val==6){
        return 'Saturday';
      }
      else if(val==7){
        return 'Sunday';
      }
      else{return 'Error'};
    }

  return (
    <>
    <div className='parent'>
    <div className='child'>
                <input value={input} onChange={(e)=>setInput(e.target.value)} name='search' type="text" />
                <button onClick={()=>{apiCall()}}>Search...</button>
            </div>
            <div className='box'>
                <div className='img-div'>
                  <div className='date-div'>
                <h1>{day(new Date().getDay())}</h1>
                <p>{new Date().toLocaleDateString()}</p>
                </div>
                <i className={img()} id='logo'></i>
                </div>

                <div className='child-div'>
                <h4>{info.temp}°C</h4>
                <h4 style={{padding:'5px', textAlign:'left'}}>{info.weathertype}<p>{`${info.name},${info.country}`}</p> </h4>
                <h4>{new Date().toLocaleTimeString()}</h4>
                </div>

                <div className='end-div'>
                  <div className='info-div'>
                    <i className='wi wi-sunset'></i>
                    <p>{new Date(info.sunset*1000).toLocaleTimeString()}<p>Sunset {} </p> </p>
                  </div>
                  <div className='info-div'>
                    <i className='wi wi-humidity'></i>
                    <p>{info.humidity}<p>Humidity</p> </p>
                  </div>
                  <div className='info-div'>
                    <i className='wi wi-rain'></i>
                    <p>{info.pressure}<p>Pressure</p> </p>
                  </div>
                  <div className='info-div'>
                    <i className='wi wi-strong-wind'></i>
                    <p>{info.speed}<p>Speed</p> </p>
                  </div>
                </div>
        </div>  
    </div>  
    </>
  )
}

export default Main
