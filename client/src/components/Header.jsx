import kudologo from '../assets/kudo-logo.png'
import { Link } from 'react-router'

const Header = () => {
  return (
    <header className="App-header">
      <Link to="/">
        <img className='kudoLogo' src={kudologo} alt='kudo-logo'/>
      </Link>
      <h1>KUDOBOARD</h1>
    </header>
  )
}

export default Header;