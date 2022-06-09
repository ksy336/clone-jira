import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Button } from 'antd';
import Modal from '../../../components/Modal/Modal';
import deleteBoard from '../../../store/actions/deleteBoard-actions';
import { removeBoard } from '../../../store/slices/board-slice';
import { dispatchStore, RootState } from '../../../types/types';
import getBoardById from '../../../store/actions/getBoardById-actions';
import { useTranslation } from 'react-i18next';
import './CardItem.scss';

const CardItem = (props) => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const { id, title, description } = props.item;
  const [showModal, setShowModal] = useState(false);
  const boardItems = useSelector((state: RootState) => state.board.boardItems);
  const error = useSelector((state: RootState) => state.board.error);
  const existingBoard = boardItems.find((item) => {
    return item.id === id;
  });
  const existingBoardId = existingBoard.id;

  const deleteBoardHandler = () => {
    setShowModal(true);
  };
  const deleteClickHandler = () => {
    dispatchStore(removeBoard(id));
    dispatchStore(deleteBoard(existingBoardId));

    setShowModal(false);
  };

  const modalHandler = () => {
    setShowModal(false);
  };
  const boardHandler = () => {
    dispatchStore(getBoardById(id));
    navigate(`/board/${id}`);
  };

  return (
    <>
      {showModal && (
        <Modal onConfirm={modalHandler}>
          <header className="header">
            <h2>{t("deleteBoard")}</h2>
          </header>
          <footer className="actions">
            <Button type="primary" onClick={deleteClickHandler}>
              {t('delete')}
            </Button>
            <Button type="primary" onClick={modalHandler}>
              {t('cancel')}
            </Button>
          </footer>
        </Modal>
      )}
      <div className="site-card-border-less-wrapper">
        {error && <p>{t('boardFailed')}</p>}
        <Card title={title} bordered={false} className="card-board" onClick={boardHandler}>
          <p>{description}</p>
        </Card>
        <Button
          type="primary"
          onClick={deleteBoardHandler}
          style={{ marginLeft: 150, marginTop: 10 }}
        >
          {t('deleteBoardButton')}
        </Button>
      </div>
    </>
  );
};

export default CardItem;
