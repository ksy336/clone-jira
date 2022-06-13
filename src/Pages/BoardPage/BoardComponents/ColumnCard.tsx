import React, { useEffect } from 'react';
import ColumnItem from './ColumnItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  order?: number;
  files?: Array<string>;
}

const ColumnCard = () => {
  let columns = useSelector((state: RootState) => state.board.boardData.columns);

  useEffect(() => {}, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(columns);
    console.log(items, result);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    //setDraggableColumns(items);
    columns = items;
    return columns;
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="columns">
          {(provided) => (
            <div className="columns-container" {...provided.droppableProps} ref={provided.innerRef}>
              {columns?.map(({ id, title }: IColumn, index: number) => (
                <Draggable key={Math.random().toString()} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <ColumnItem titleForColumn={title} id={id} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ColumnCard;
