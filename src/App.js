import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/Card/Card';
import Header from './components/Header/Header';

function App() {
  const [defaultList,setDefaultList]=useState([])
  const [filteredList,setFilteredList]=useState([])
  const [pageLoading,setPageLoading]=useState(false)
  const [category,setCategory]=useState('')
  const [year,setYear]=useState('')

  useEffect(()=>{
    let array=defaultList
    if(category!==''){
      array=array.filter((item)=>item.category===category)
    }
    if(year!==''){
      array=array.filter((item)=>item.year===year)
    }
    setFilteredList([...array])
  },[category,year,defaultList])

  useEffect(()=>{
    const fetchData=async()=>{
      setPageLoading(true)
      try{
        const {data}=await axios.get('http://api.nobelprize.org/v1/prize.json')
        let array=[]
        const newData=data.prizes.map((prize)=>{
          const temp= prize.laureates?prize.laureates.map((laureate)=>(
            {
              ...laureate,
              category:prize.category,
              year:prize.year
            }
          )):[]
          console.log(temp)
          array=[...array,...temp]
          return [...temp]
        })
        console.log(array)
        console.log(newData)
        setDefaultList([...array])
        setFilteredList([...array])
      }catch(error){
        console.log(error)
      }
      setPageLoading(false)
    }
    fetchData()
  },[])
  const reset=()=>{
    setFilteredList(defaultList)
  }

  return (
    <div className="app">
      <Header defaultList={defaultList} setCategory={setCategory} setYear={setYear} reset={reset}/>
      <div className='appContainer'>
        {
          pageLoading?(
            <p>Loading...</p>
          ):(
              
                filteredList.length===0?(
                  <p>List is empty</p>
                ):(
                  filteredList.map((prize,index)=>(
                    <Card key={index} category={prize.category} year={prize.year} firstName={prize.firstname} surName={prize.surname} motivation={prize.motivation} share={prize.share}/>
                  ))
                )
              
          )
        }
      </div>
    </div>
  );
}

export default App;
