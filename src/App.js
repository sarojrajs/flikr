import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card/Card'
import Header from './components/Header/Header'

function App () {
  const [defaultList, setDefaultList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [category, setCategory] = useState('')
  const [year, setYear] = useState('')
  const [currentScreen, setCurrentScreen] = useState('main', 'special')

  let people = []
  if (defaultList.length !== 0) {
    let freq = {}
    defaultList.forEach(item => {
      if (freq[`${item.firstname}${' '}${item?.surname}`]) {
        freq[`${item.firstname}${' '}${item?.surname}`]++
      } else {
        if (item.surname) {
          freq[`${item.firstname}${' '}${item?.surname}`] = 1
        }
      }
    })
    for (let i in freq) {
      if (freq[i] > 1) {
        people.push(i)
      }
    }
  }

  useEffect(() => {
    let array = defaultList
    if (category !== '') {
      array = array.filter(item => item.category === category)
    }
    if (year !== '') {
      array = array.filter(item => item.year === year)
    }
    setFilteredList([...array])
  }, [category, year, defaultList])

  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true)
      try {
        const { data } = await axios.get(
          'https://api.nobelprize.org/v1/prize.json'
        )
        let array = []
        data.prizes.forEach(prize => {
          const temp = prize.laureates
            ? prize.laureates.map(laureate => ({
                ...laureate,
                category: prize.category,
                year: prize.year
              }))
            : []
          array = [...array, ...temp]
          return [...temp]
        })
        setDefaultList([...array])
        setFilteredList([...array])
      } catch (error) {
        console.log(error)
      }
      setPageLoading(false)
    }
    fetchData()
  }, [])
  const reset = () => {
    setFilteredList(defaultList)
  }

  const changeScreen = value => {
    setCurrentScreen(value)
  }

  return (
    <div className='app'>
      <Header
        defaultList={defaultList}
        setCategory={setCategory}
        setYear={setYear}
        reset={reset}
        changeScreen={changeScreen}
      />
      <div className='appContainer'>
        {pageLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentScreen === 'main' ? (
              filteredList.length === 0 ? (
                <p>List is empty</p>
              ) : (
                filteredList.map((prize, index) => (
                  <Card
                    key={index}
                    category={prize.category}
                    year={prize.year}
                    firstName={prize.firstname}
                    surName={prize.surname}
                    motivation={prize.motivation}
                    share={prize.share}
                  />
                ))
              )
            ) : (
              <div>
                <h1>
                  People who have won more than 1 noble prize are as follows:
                </h1>
                {people.map((person, index) => (
                  <div className='textBox'>
                    <p key={index}>{person}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
