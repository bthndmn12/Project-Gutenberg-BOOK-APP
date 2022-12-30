import { Icon } from "@iconify/react"

export default function Favorites(props){
    return(
        
       <div className="bookCard__container">
            <img 
            className='book__img'
            src={`https://www.gutenberg.org/cache/epub/${props.data.id}/pg${props.data.id}.cover.medium.jpg`} 
            alt={props.data.title}>
            </img>

            <div className="book__info">
                <h2 className='book__title'>{props.data.title}</h2>
                <h3 className='book__author'>Yazar: {props.author}</h3>
                <p className='book__language'>Dil: {props.language}</p>
            </div>

            <div className="buttons__container">
            <a 
            className='readBook__btn'
            href={`https://www.gutenberg.org/files/${props.data.id}/${props.data.id}-h/${props.data.id}-h.htm`}> 
            <span className='btn__txt'>Oku</span>
            <Icon 
            className='book__iconBtn'
            icon="fa6-solid:book-open" />
            </a>

    
            {!props.favIds.includes(props.data.id) ?  
            <Icon icon="fa6-solid:heart-circle-plus" 
            className='book__icon'
            onClick={props.addFavorites}
            />  :
            <Icon icon="fa:heart" 
            className='book__icon book__iconRemove'
            onClick={props.removeFavorites}
            />}
           
          
            </div>
        
        
            
        </div>
    )
}