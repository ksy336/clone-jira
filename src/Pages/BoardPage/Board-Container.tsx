import React, { useEffect, useState } from 'react';
import BoardView from './Board-View';
import { useSelector } from 'react-redux';
import { dispatchStore, RootState } from '../../types/types';
import getBoardById from '../../store/actions/getBoardById-actions';
import { addColumn } from '../../store/slices/board-slice';
import columnsService from '../../api/columns/columns-service';
import './Board.scss';
import { useTranslation } from 'react-i18next';

const BoardContainer = () => {
  const { t } = useTranslation();
  const [showColumnModal, setShowColumnModal] = useState(false);
  const {
    title: titleValue,
    description,
    id,
  } = useSelector((state: RootState) => state.board.boardData);
  console.log(id)
  const { titleColumn: title } = useSelector((state: RootState) => state.board);

  useEffect(() => {
    getColumnData();
  }, []);

  const getColumnData = async () => {
    try {
      await columnsService.getAllColumns(id);
    } catch (e) {
      throw new Error('Getting column data failed!');
    }
  };
  const createColumn = async (boardId: string, title) => {
    try {
      await columnsService.addColumn(boardId, title);
      await getColumnData();
    } catch (e) {
      throw new Error('Failed');
    }
  };

  const createColumnHandler = () => {
    setShowColumnModal(true);
  };
  const modalHandler = () => {
    setShowColumnModal(false);
  };

  const createColumnSubmit = async () => {
    const columnTitle = {
      title,
    };
    await createColumn(id, columnTitle);
    dispatchStore(getBoardById(id));
    getColumnData();
    dispatchStore(addColumn(columnTitle));
    setShowColumnModal(false);
  };

  return (
    <BoardView
      titleValue={titleValue}
      description={description}
      createColumnHandler={createColumnHandler}
      showColumnModal={showColumnModal}
      modalHandler={modalHandler}
      createColumnSubmit={createColumnSubmit}
      boardId={id}
      t={t}
    />
  );
};

export default BoardContainer;
