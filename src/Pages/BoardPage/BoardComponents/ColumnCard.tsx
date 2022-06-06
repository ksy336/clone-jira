import React from 'react';
import ColumnItem from "./CardItem";
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/types';

export interface IColumn {
  id: string;
  title: string;
  order?: number;
  tasks?: ITask[];
}
export interface ITask {
  id: string;
  title: string;
  description: string;
  userId: string;
  order?:number;
  files?: Array<string>;
}

const ColumnCard = ({boardId}) => {
  const columns = useSelector((state:RootState) => state.board.boardData.columns);
  return (
    <>
      {columns?.length > 0 ? (
          <div className="columns-container">
            {columns?.map(({id, title, order, tasks}: IColumn) => (
              <ColumnItem
                key={Math.random().toString()}
                titleForColumn={title}
                order={order}
                id={id}
                tasks={tasks}
              />
              ))}
          </div>)
        : (<div>No columns</div>)
      }
    </>
  );
};

export default ColumnCard;