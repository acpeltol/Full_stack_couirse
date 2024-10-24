import { useState , useEffect} from 'react'
import axios from 'axios'

const Country = ({country, single}) => {
  console.log(country)
  return(
    <>
    <p>{country.name.common}
    <button onClick={() => single(country)}>show</button>
    </p>
    </>
  )
}

const Countries = ({countries, inWord, single}) => {

  //const lenght = countries.map(resp => resp.name.common)

  const str = countries.filter(i => i.name.common.includes(inWord))

  console.log(str)
  if (str.length > 10){
    return(
      <>
      <p>Too many matches, specify another filter</p>
      </>
    )
  }else if (str.length > 1){
    console.log("hier gut")
    return(
      <>
      {str.map(country => 
      <Country key = {country.name.common} country = {country} single={single}/>
      )}
      </>
    )
  }else if (str.length === 1){
      return(
        <>
        
        <h1>{str[0].name.common}</h1>

        <p>capital {str[0].capital[0]}</p>

        <p>area {str[0].area}</p>

        <h2>languages: </h2>

        <ul>
          {Object.entries(str[0].languages).map(([key,value]) => 
          <li key = {key}> {value}</li>
          )}
        </ul>

        <div className = "Flag">
        {str[0].flag}
        </div>





        </>
      )
  }
}


function App() {

  const [inWord,setinWOrd] = useState('')
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => response.data)
    .then(response =>
      setCountries(response)
    )
  }, [])

  const inWordchange = (event) => {
    console.log(event.target.value)
    setinWOrd(event.target.value)
  }

  const single = (country) =>{
    console.log(country)
    setinWOrd(country.name.common)
  }

  return (
    <>
    <div>
      <p>found countries  <input value= {inWord}
       onChange = {inWordchange}/></p>
    </div>


    <Countries countries={countries} single={single} inWord={inWord}/>
      </>
  )
}

export default App
