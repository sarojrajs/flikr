import { useState } from 'react'
import Button from '../Button/Button'
import DropDown from '../DropDown/DropDown'
import './Header.css'
const Header=(props)=>{
    let category=[]
    let year=[]
    const [categorySelected,setCategorySelected]=useState('')
    const [yearSelected,setYearSelected]=useState('')
    props.defaultList.forEach((item)=>{
        if(!category.includes(item.category)){
            category.push(item.category)
        }
        if(!year.includes(item.year)){
            year.push(item.year)
        }
    })
    const getCategory=(value)=>{
        setCategorySelected(value)
        props.setCategory(value)
    }
    const getYear=(value)=>{
        setYearSelected(value)
        props.setYear(value)
    }
    const changeScreen=(value)=>()=>{
        props.changeScreen(value)
    }
    return (
        <header className='header'>
            <div className='headerLeft'>
                <DropDown 
                    defaultValue='Category'
                    value={categorySelected}
                    setValue={getCategory}
                    optionsArray={category}
                />
                <DropDown 
                    defaultValue='Year'
                    value={yearSelected}
                    setValue={getYear}
                    optionsArray={year}
                />
                <Button 
                type='primary'
                onClick={props.reset}>Reset</Button>

            </div>
            <div className='headerRight'>
                <Button onClick={changeScreen('special')}>Special</Button>
                <Button onClick={changeScreen('main')}>Main</Button>
            </div>
        </header>
    )
}

export default Header;