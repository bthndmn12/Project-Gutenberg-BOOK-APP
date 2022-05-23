import { Icon } from "@iconify/react"


export default function Footer(props){
    return(
        <footer className="footer">
            <div className="footer__container">
            <div className="footer__info-container">
                <div className="footer__txt">
                    <h1 className="footer__h1">About This Project:</h1>
                    <p className="footer__p">This project is using: </p>
                    <p className="footer__p">Project Gutenberg API</p>
                    <p className="footer__p">A RESTful API to access the entire Project Gutenberg catalogue.</p>
                    <p className="footer__p">More info <span>
                    <a
                    className="api__link" 
                    href="https://gnikdroy.pythonanywhere.com/docs/#installation-and-setup">
                    Here
                    </a></span></p>
                    <p className="footer__p">Project Gutenberg Official 
                    <a className="api__link" href="https://www.gutenberg.org"> Website </a></p>
                    <p className="footer__p">Happy reading !</p>
                </div>
              
            </div>
            <div className="footer__nav">
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
                <Icon icon="fa:heart"
                onClick={props.openModal}
                />
            
            </div>
            </div>
            </div>
            <div className="social__icons-container">
                <a href="https://github.com/marcinzygan" className="footer__link">
                    <Icon icon="fa-brands:github-square" className="footer__icon"/></a>
                
                <a href="https://www.facebook.com/ZyganDesign" className="footer__link">
                    <Icon icon="fa-brands:facebook-square" className="footer__icon"/></a>
                
                <a href="https://twitter.com/MarcinZygan" className="footer__link">
                    <Icon icon="fa6-brands:twitter-square" className="footer__icon"/></a>
                
                <a href="https://www.behance.net/marcin-zygan" className="footer__link">
                    <Icon icon="fa-brands:behance-square" className="footer__icon"/></a>
                
                </div>
            <div className="footer__dateInfo-container">
                <p className="date">2022</p>
                <p className="copyright__txt">Ⓒ Designed and Developed by : <a className="marcin__link" href="https://marcin-zygan.com">Marcin Zygan</a></p>
            </div>    
        </footer>

    )
}