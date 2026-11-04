import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">404 - Page Not Found</h1>
    <p className="not-found-description">
      Oops! The page you're looking for doesn't exist.
    </p>
    <button className="back-home-button"><Link to="/" className="not-found-link">Go to Home</Link></button>
  </div>
);

export default NotFound;