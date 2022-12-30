import { Icon } from "@iconify/react"


export default function Footer(props){
    return(
        <footer className="footer">
            <div className="footer__container">
            <div className="footer__info-container">
                <div className="footer__txt">
                    <h1 className="footer__h1">Customized Visual Bookshelf from Gutenberg Project</h1>
                </div>
              
            </div>
            <div className="footer__nav">
            <div className="filter__container">
                <Icon 
                icon="fa-solid:plus" 
                onClick={props.filterLang}/>
                <Icon icon="fa:heart"
                onClick={props.openModal}
                />
            
            </div>
            </div>
            </div>
            <div className="footer__dateInfo-container">
                <p className="date">2022</p>
            </div>    
        </footer>

    )
}