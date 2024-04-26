import './DeckEditor.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../hooks/redux';
import { useAppDispatch } from '../../hooks/redux';
import { deleteDeck } from '../../redux/Deck/action';
import {
  fetchCard,
  cardCreate,
  deleteCard,
  updateDeck,
  updateCard,
} from '../../redux/Card/action';
import HomeButton from '../HomeButton/HomeButton';
import { toast } from 'react-toastify';
import Card from '../Card/Card';
import { MouseEvent } from 'react';

function DeckEditor() {
  const { id } = useParams();
  const deckId = parseInt(id!);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [isCardUpdateModalOpen, setIsCardUpdateModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const deck = useAppSelector((state) => state.deck.deck);
  const card = useAppSelector((state) => state.deck.deck?.flashcards?.[index]);
  const [titleFront, setTitleFrontData] = useState('');
  const [titleBack, setTitleBackData] = useState('');
  const [titleDeck, setDeckTitle] = useState('');

  const [isClickDeck, setIsClickDeck] = useState(false);
  const navigate = useNavigate();
  const isSameUserId = useAppSelector(
    (state) => state.user.user?.id === state.deck.deck?.user_id
  );
  const shareId = useAppSelector((state) => state.deck.deck?.share_id);

  // UseEffect pour afficher les cartes
  useEffect(() => {
    if (id) {
      dispatch(
        fetchCard({
          deck_id: deckId,
          title_front: '',
          title_back: '',
          id: undefined,
        })
      );
    }
  }, [id]);

  useEffect(() => {
    dispatch({ type: 'deck/UPDATETITLE', payload: deck });
  }, [deck]);

  const handleOpenModal = () => {
    setIsDeleteModalOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDeckModal = () => {
    setIsDeleteModalOpen(false);
    setIsDeckModalOpen(true);
  };

  const handleCloseDeckModal = () => {
    setIsDeckModalOpen(false);
  };
  const cardTitleFrontHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleFrontData(event.target.value);
  };
  const titleDeckHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(event.target.value);
  };
  const cardTitleBackHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleBackData(event.target.value);
  };

  // Fonction pour créer une carte
  const handleCreateCard = () => {
    setIsDeleteModalOpen(false);
    setTitleFrontData('');
    setTitleBackData('');
    if (!titleFront) {
      toast.error('Veuillez renseigner un recto');
      return;
    }
    if (!titleBack) {
      toast.error('Veuillez renseigner un verso');
      return;
    }
    dispatch(
      cardCreate({
        title_front: titleFront,
        title_back: titleBack,
        deck_id: deckId,
        id: undefined,
      })
    );
    setIsModalOpen(false);
    toast.success('La carte a bien été ajoutée');
  };
  // fonction pour supprimer une carte, elle permet de savoir si je clique sur un deck ou une carte

  const handleYesClick = () => {
    if (!isClickDeck) {
      const currentIndex = index;
      console.log(isClickDeck, 'mon index dans yesclick');
      const card = deck?.flashcards?.[currentIndex];
      console.log(card, 'mon card dans yesclick');
      dispatch(
        deleteCard({
          id: card?.id,
          title_back: titleBack,
          title_front: titleFront,
          deck_id: deckId,
        })
      );
    }
    if (isClickDeck) {
      dispatch(
        deleteDeck({
          id: deckId,
          title: '',
        })
      );
      navigate('/');
    }
    setIsDeleteModalOpen(false);
    toast.success("L'élément a bien été supprimé");
  };
  const handleCardDeleteModal = (index: number) => {
    setIndex(index);
    setIsDeleteModalOpen(true);
  };

  // Fonction pour supprimer un deck, elle ouvre le toast de confirmation de suppression
  const handleDeckDelete = () => {
    setIsDeleteModalOpen(true);
    setIsClickDeck(true);
  };

  //Fonction pour modifier un deck

  const handleDeckUpdate = () => {
    setIsDeleteModalOpen(false);
    if (!titleDeck) {
      toast.error('Veuillez renseigner un nouveau titre');
      return;
    }
    setDeckTitle('');
    handleCloseDeckModal();
    dispatch(updateDeck({ id: deckId, title: titleDeck }));
    toast.success('Le titre a bien été modifié');
  };

  // Fonction qui ouvre la modale updateCard
  const handleCardUpdateModal = (index: number) => {
    setIsCardUpdateModalOpen(true);
    setIsDeleteModalOpen(false);
    setIndex(index);
  };
  // Fonction qui ferme la modale updateCard
  const handleCloseCardUpdateModal = () => {
    setIsCardUpdateModalOpen(false);
  };
  //Fonction pour mettre à jour la carte côté BDD
  const handleUpdateCard = (index: number) => {
    const currentIndex = index;
    const cardId = deck?.flashcards?.[currentIndex].id;
    dispatch(
      updateCard({
        id: cardId,
        title_back: titleBack,
        title_front: titleFront,
        deck_id: deckId,
      })
    );
    setIsCardUpdateModalOpen(false);
    toast.success('La flashcard a bien été modifiée');
  };

  if (!deck) {
    return null;
  }
  return (
    <main id="deck_page">
      <div className="deck-editor">
        <AppHeader>
          <HomeButton />
        </AppHeader>
        <span className="deck-title-top">{deck.title}</span>

        <h2 className="shareId ">Partage ton deck : {shareId}</h2>

        {isDeckModalOpen ? (
          <>
            <input
              type="text"
              placeholder={deck.title}
              className="deck-title"
              onChange={titleDeckHandleChange}
            />
            <button
              type="button"
              className="deck-title"
              value={titleDeck}
              onClick={handleDeckUpdate}
            >
              Changer le titre du deck
            </button>
          </>
        ) : isSameUserId ? (
          <button
            aria-label="modale"
            type="button"
            className="deck-title-modif"
            onClick={handleOpenDeckModal}
          >
            <i className="fa-solid fa-pen" />
          </button>
        ) : (
          ''
        )}

        {isModalOpen ? (
          <div className="modal">
            <div className="modal-content">
              <h2>Votre nouvelle Carte</h2>
              <form>
                <input
                  className="SearchBar"
                  type="text"
                  id="title"
                  placeholder="Titre recto"
                  value={titleFront}
                  onChange={cardTitleFrontHandleChange}
                />

                <input
                  className="SearchBar"
                  type="text"
                  id="title"
                  placeholder="Titre verso"
                  value={titleBack}
                  onChange={cardTitleBackHandleChange}
                />
                <button
                  className="button-modal"
                  type="button"
                  onClick={handleCreateCard}
                >
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
        ) : (
          isSameUserId && (
            <button className="creation-button" onClick={handleOpenModal}>
              Crée ta
              <i className="fa-solid fa-square-plus" />
              carte
            </button>
          )
        )}

        {!isCardUpdateModalOpen && (
          <div className="flashcards-container">
            {deck.flashcards &&
              deck.flashcards.map((card, index) => (
                <div key={card.id} id="divCard" className="flashcard">
                  <Card recto={card.title_front} verso={card.title_back} />
                  {isSameUserId && (
                    <div className="button-card-container">
                      <button
                        className="button-card"
                        onClick={() => handleCardDeleteModal(index)}
                      >
                        <i className="fas fa-times cross" />
                      </button>
                      <button
                        className="button-card"
                        onClick={() => handleCardUpdateModal(index)}
                      >
                        <i className="fa-solid fa-pen  " />
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {isCardUpdateModalOpen && (
          <div className="card-update-modal">
            <form>
              <input
                placeholder={card?.title_front}
                className="SearchBar-deckEditor"
                type="text"
                id="title"
                value={titleFront}
                onChange={cardTitleFrontHandleChange}
              />

              <input
                placeholder={card?.title_back}
                className="SearchBar-deckEditor"
                type="text"
                id="title"
                value={titleBack}
                onChange={cardTitleBackHandleChange}
              />
              <button
                className="button-modal"
                type="button"
                onClick={() => handleUpdateCard(index)}
              >
                Valider
              </button>
              <button
                type="button"
                className="button-modal"
                onClick={handleCloseCardUpdateModal}
              >
                ANNULER
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="footer-deckEditor">
        <Footer />
      </div>

      {isDeleteModalOpen &&
        toast(
          <div>
            <h3>
              Voulez-vous VRAIMENT supprimer cet élément ?
              <button onClick={handleYesClick}> Oui</button>
            </h3>
          </div>
        )}
      {isSameUserId && (
        <button className="delete-button" onClick={handleDeckDelete}>
          Supprimer le deck
        </button>
      )}
    </main>
  );
}

export default DeckEditor;
