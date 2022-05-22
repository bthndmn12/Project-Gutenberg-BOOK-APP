import { Icon } from '@iconify/react';


export default function Navbar(props){

    return (
        <div className='nav__container'>
            <nav className="nav">
                <div className="heading">
                <h1>Project Gutenberg</h1>
                <h3>Free E-books click away !</h3>
                </div>
                <div className="filter__container">
                
                    <select
                    id = "language"
                    value = {props.optionsValue}
                    onChange={props.inputChange}
                    name = "language"
                    className='filter__select'
                    >
                    <option value="en">EN</option>
                    <option value="pl">PL</option>
                    <option value="es">ES</option>
                    <option value="it">IT</option>
                    <option value="ru">RU</option>
                    </select>
                    <Icon 
                    icon="fa-solid:plus" 
                    onClick={props.filterLang}/>
                    <Icon icon="fa:heart" />
                
                </div>
            </nav>
                <form className="search__container"
                onSubmit={(e)=>props.getSearch(e)}
                >
        
                    <div className="searchbar__container">
                    <input 
                    className="searchBar"
                    type="text" 
                    value={props.searchValue}
                    onChange={props.inputChange}
                    name="search"
                    placeholder="Search for Books"
                    >
                    </input>
                    <Icon icon="fa:search"
                    className='searchIcon' 
                    onClick={props.getSearch}
                    />
                    </div>
                </form>
            </div>
    )
}