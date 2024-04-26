import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { Link, useParams } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import './MemoTest.scss';
import { Deck } from '../../types/index';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchCard } from '../../redux/Card/action';
import { fetchStats } from '../../redux/Stats/action';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function MemoTest() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('jwtToken');
  const flashcards = useAppSelector((state) => state.deck.deck?.flashcards);
  const stats = useAppSelector((state) => state.stats);
  const [know, setKnow] = useState(false);
  const [currentCardMemo, setCurrentCardMemo] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalResult, setFinalResult] = useState(1);
  const { id } = useParams();

  const handleRestartSession = () => {
    setCurrentCardMemo(0);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNoClick = () => {
    handleCloseModal();
    navigate('/');
  };

  useEffect(() => {
    if (id && token) {
      dispatch(
        fetchCard({
          deck_id: parseInt(id),
          title_front: '',
          title_back: '',
          id: 0,
          token,
        })
      );
    }
  }, [id, token]);

  useEffect(() => {
    if (id && token) {
      console.log('ici: ', id);
      dispatch(fetchStats(parseInt(id)));
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    if (
      flashcards &&
      flashcards.length > 0 &&
      currentCardMemo >= flashcards.length
    ) {
      handleOpenModal();
    }
  }, [currentCardMemo, flashcards]);

  const handleKnow = () => {
    if (stats) {
      const { user_id, deck_id } = stats;
      dispatch(fetchStats({ nb_card_success: 1, deck_id, user_id }));
    }
  };

  const handleUnknow = () => {
    setKnow(false);
    setCurrentCardMemo(currentCardMemo + 1);
  };

  function findDeck(deckList: Deck[], id: number) {
    const deck = deckList.find((testedDeck) => {
      return testedDeck.id === id;
    });

    return deck;
  }

  const currentDeck = useAppSelector((state) =>
    findDeck(state.decks.list, parseInt(id!))
  );

  const currentCard = flashcards && flashcards[currentCardMemo];

  return (
    <main id="deck_page">
      <div className="memo-test">
        <AppHeader>
          <Link to="/" className="return-button">
            ACCUEIL
          </Link>
        </AppHeader>
        <span className="deck-title">{currentDeck?.title}</span>
        {currentCard && (
          <Card
            key={currentCard.id}
            recto={currentCard.title_front}
            verso={currentCard.title_back}
          />
        )}
        <div className="know-button">
          <button className="buttonMemo" onClick={handleUnknow}>
            A revoir
          </button>
          <button className="buttonMemo" onClick={handleKnow}>
            Aller next!
          </button>
        </div>
      </div>
      {isModalOpen &&
        toast(
          <div className="modal-Memo">
            <div className="modal-content-memo">
              <p> Session terminée. Voulez-vous recommencer ?</p>
              <button
                className="square-memo"
                onClick={() => {
                  handleRestartSession();
                  handleCloseModal();
                  toast.dismiss();
                }}
              >
                Oui
              </button>
              <button
                className="square-memo"
                onClick={() => {
                  handleNoClick();
                  handleCloseModal();
                  toast.dismiss();
                }}
              >
                Non
              </button>
            </div>
          </div>,
          { className: 'custom-toast' }
        )}
      <Footer />
    </main>
  );
}

export default MemoTest;
