import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import './HomeGuest.scss';

function HomeGuest() {
  return (
    <div className="app">
      <AppHeader children />
      <h1 className="Welcome">
        Bienvenue sur Cardamom, ceci est un site pour créer ses propres
        flashcards afin de stimuler votre mémoire et améliorer vos
        connaissances. Pour commencer l'expérience CardAMom, veuillez vous
        connecter ou créer un compte.
      </h1>
      <Footer />
    </div>
  );
}

export default HomeGuest;
