import AddDeck from './AddDeck/AddDeck';
import ImportDeck from './ImportDeck/ImportDeck';
import './Icone.scss';
function Icone() {
  return (
    <div className="icone">
      <AddDeck />
      <ImportDeck />
    </div>
  );
}

export default Icone;
