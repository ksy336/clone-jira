import React, { useState } from 'react';
import BoardView from './Board-View';
import { useSelector } from 'react-redux';
import { dispatchStore, RootState } from '../../types/types';
import postColumns from '../../store/actions/postColumns-actions';
import getBoardById from '../../store/actions/getBoardById-actions';
import ColumnCard from './BoardComponents/ColumnCard';
import { addColumn, getBoardData } from '../../store/slices/board-slice';
import './Board.scss';

const BoardContainer = () => {
  const [showColumnModal, setShowColumnModal] = useState(false);
  const {
    title: titleValue,
    description,
    id,
  } = useSelector((state: RootState) => state.board.boardData);
  const { titleColumn: title } = useSelector((state: RootState) => state.board);
  const createColumnHandler = () => {
    setShowColumnModal(true);
  };
  const modalHandler = () => {
    setShowColumnModal(false);
  };
  const createColumnSubmit = () => {
    const columnTitle = {
      title,
    };
    dispatchStore(postColumns(id, columnTitle));
    dispatchStore(getBoardById(id));
    //dispatchStore(getBoardData(columnTitle));
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
    />
  );
};

export default BoardContainer;
