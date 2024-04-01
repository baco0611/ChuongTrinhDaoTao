import './Error.scss'
import logo from '../../assets/image/favicon.ico'
import { Link } from 'react-router-dom'

function Error() {
    return(
        <div id="error-section">
            <h1>4<span>0</span>4</h1>
            <h2>Page not found</h2>
            <Link to={'/'}>BACK TO HOME</Link>
        </div>
    )
}

export default Error