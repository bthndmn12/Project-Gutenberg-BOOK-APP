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
                    value = {props.value}
                    onChange={props.onChange}
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
                    onClick={props.onClick}/>
                    <Icon icon="fa:heart" />
                
                </div>
            </nav>
            </div>
    )
}