import './Card.css'
const Card=(props)=>{
    const {category,year,firstName,surName,motivation}=props
    return(
        <div className='card'>
            <h2>{category}</h2>
            <h3>{year}</h3>
            <p>{firstName}{" "}{surName}</p>
            <p>{motivation}</p>
        </div>
    )
}

export default Card;