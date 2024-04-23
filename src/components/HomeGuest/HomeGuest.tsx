import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import './HomeGuest.scss';

function HomeGuest() {
  return (
    <div className="app">
      <AppHeader children />
      <h1 className="Welcome">
        Bienvenue sur Cardamom, veuillez vous connecter
      </h1>
      <Footer />
    </div>
  );
}

export default HomeGuest;
