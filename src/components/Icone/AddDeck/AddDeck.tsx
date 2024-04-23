import { ChangeEvent, useState } from 'react';
import { deckCreate } from '../../../redux/Deck/action';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddDeck.scss';
import { ImCross } from 'react-icons/im';

function AddDeck() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setDeckTitle] = useState('');
  const token = Cookies.get('jwtToken');
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const titleHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(event.target.value);
  };
  const handleCreateDeck = async () => {
    setIsModalOpen(false);
    setDeckTitle('');
    const response = await dispatch(
      deckCreate({
        token,
        title,
        id: undefined,
      })
    );
    const newDeck = response.payload;
    const DeckId = newDeck.id;
    navigate(`DeckEditor/${DeckId}`);
    //window.location.href = `/DeckEditor/${DeckId}`;
    console.log(DeckId, " le deckid après l'api");
    toast.success('Le deck a bien été créé');
  };

  //console.log('ce que contient currentdeck :', currentDeck);
  return (
    <div className="icone-container">
      <div className="icone-add">
        {!isModalOpen && (
          <>
            <button className="buttonIcone-add" onClick={handleOpenModal}>
              <i className="fas fa-plus-square"></i>
            </button>
          </>
        )}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Votre nouveau Deck</h2>
              <form>
                <input
                  className="SearchBar"
                  type="text"
                  id="title"
                  value={title}
                  placeholder="Titre du deck"
                  onChange={titleHandleChange}
                />
                <button className="button-modal" onClick={handleCreateDeck}>
                  Créer
                </button>

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
        )}
      </div>
    </div>
  );
}

export default AddDeck;
