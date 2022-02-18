import './Header.css'
const Header=(props)=>{
    let category=[]
    let year=[]
    props.defaultList.forEach((item)=>{
        if(!category.includes(item.category)){
            category.push(item.category)
        }
        if(!year.includes(item.year)){
            year.push(item.year)
        }
    })
    const getCategory=(e)=>{
        props.setCategory(e.target.value)
    }
    const getYear=(e)=>{
        props.setYear(e.target.value)
    }
    console.log(category,year)
    return (
        <header className='header'>
            <select onChange={getCategory}>
                <option value=""></option>
                {
                    category.map((item,index)=>(
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select>
            <select onChange={getYear}>
                <option value=""></option>
                {
                    year.map((item,index)=>(
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select>
            <button  onClick={props.reset}>Reset</button>
        </header>
    )
}

export default Header;