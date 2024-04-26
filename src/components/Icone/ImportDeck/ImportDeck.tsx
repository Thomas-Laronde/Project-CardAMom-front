import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { toast } from 'react-toastify';
import './ImportDeck.scss';
import { fetchImportDeck } from '../../../redux/Deck/action';

function ImportDeck() {
  const dispatch = useAppDispatch();
  const [importCode, setImportCode] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const importCodeHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImportCode(event.target.value);
  };

  const handleShareDeck = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (importCode === '') {
      alert('veuillez entrer un code');
      return;
    }
    const shareId = parseInt(importCode);
    dispatch(
      fetchImportDeck({
        shareId,
        title: '',
        id: undefined,
      })
    );
    toast.success('Le deck a bien été importé');
    console.log('Deck importé ');
    handleCloseModal();
  };

  return (
    <div className="icone-container">
      {isModalOpen ? (
        <div className="icone-import">
          <div className="modal">
            <div className="modal-content-import">
              <h2>Importer Deck</h2>
              <form onSubmit={handleShareDeck}>
                <input
                  className="SearcBar"
                  type="text"
                  id="title"
                  placeholder="Code du deck"
                  value={importCode}
                  onChange={importCodeHandleChange}
                />
                <button className="button-modal">Valider</button>
                <button
                  className="button-modal"
                  type="button"
                  onClick={handleCloseModal}
                >
                  Annuler
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <button className="buttonIcone-import" onClick={handleOpenModal}>
          <i className="fas fa-circle-down"></i>
        </button>
      )}
    </div>
  );
}

export default ImportDeck;
