import { userData } from '../../data';

import './AppHeader.scss';
import Login from './LogIn/LogIn';
import Signup from './SignUp/SingUp';
import { useSelector } from 'react-redux';

import Logo from '../../assets/logo 4.svg';
import { RootState } from '../../redux/store';

interface AppHeaderProps {
  children: React.ReactNode;
}
function AppHeader({ children }: AppHeaderProps) {
  //Quand je click sur Login, la modal SignUp disparait
  const { displayModalLogIn } = useSelector(
    (store: RootState) => store.settings
  );
  //Quand je click sur SignUp, la modal Login disparait
  const { displayModalSignUp } = useSelector(
    (store: RootState) => store.settings
  );
  return (
    <header className="header">
      <div className="header-content">{children}</div>
      <img src={Logo} alt="Logo Cardamom" className="header-logo" />
      <h1>CardAMom</h1>
      <div>
        {displayModalLogIn ? (
          <Login />
        ) : (
          <>
            {displayModalSignUp ? (
              <Signup />
            ) : (
              <>
                <Login />
                <Signup />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
