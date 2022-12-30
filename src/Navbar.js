import { Icon } from '@iconify/react';


export default function Navbar(props){

    return (
        <div className='nav__container'>
            <nav className="nav">
                <div className="heading">
                <h1>Project Gutenberg</h1>
                </div>
                <div className="filter__container">
                    <Icon 
                    icon="fa-solid:plus" 
                    onClick={props.filterLang}/>
                    <Icon icon="fa:heart"
                    onClick={props.openModal}
                    />
                
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
                    placeholder="Kitaplarda Arayın!"
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