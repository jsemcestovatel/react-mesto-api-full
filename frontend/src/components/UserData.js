import {Link} from 'react-router-dom';

function UserData({ email, onSignOut }) {
    return (
        <div className="header__userdata">
        <div className="header__link link-opacity">{email}</div>
        <Link
          to="/"
          className="header__link link-opacity"
          onClick={onSignOut}
        >
          Выйти
        </Link>
      </div>
    )
}
export default UserData;