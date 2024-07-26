import './Loader.scss'
import logo from '../../assets/image/favicon.ico'

function Loader() {
    return(
        <div className='loader'>
            <div id="loader-section">
                <img src={logo}/>
                <h1>CHƯƠNG TRÌNH ĐÀO TẠO HUSC</h1>
            </div>
        </div>
    )
}

export default Loader