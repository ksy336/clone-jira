import React, { useState } from 'react';
import { Button, Card } from 'antd';
import Modal from '../../../components/Modal/Modal';
import { dispatchStore, RootState } from '../../../types/types';
import { removeColumn } from '../../../store/slices/board-slice';
import deleteColumn from '../../../store/actions/deleteColumn-actions';
import { useSelector } from 'react-redux';
import BoardTasks from './BoardTasks';
import { useTranslation } from 'react-i18next';

const ColumnItem = ({ titleForColumn, id }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const boardId = useSelector((state: RootState) => state.board.boardData.id);
  const { t } = useTranslation();

  const modalHandler = () => {
    setDeleteModal(false);
  };

  const deleteColumnHandler = () => {
    dispatchStore(removeColumn(id));
    dispatchStore(deleteColumn(boardId, id));
    setDeleteModal(false);
  };

  const openModalHandler = () => {
    setDeleteModal(true);
  };

  return (
    <>
      {deleteModal && (
        <Modal onConfirm={modalHandler}>
          <header className="header">
            <h2>{t('modalColumn')}</h2>
          </header>
          <footer className="actions">
            <Button type="primary" onClick={deleteColumnHandler}>
              {t('delete')}
            </Button>
            <Button type="primary" onClick={modalHandler}>
              {t('cancel')}
            </Button>
          </footer>
        </Modal>
      )}

      <div className="column-content">
        <Card
          title={titleForColumn}
          extra={
            <Button type="primary" onClick={openModalHandler}>
              {t('deleteColumn')}
            </Button>
          }
          style={{ width: 300, borderRadius: 10, cursor: 'grab' }}
        >
          <BoardTasks columnId={id} boardId={boardId} />
        </Card>
      </div>
    </>
  );
};

export default ColumnItem;
