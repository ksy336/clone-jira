import React from 'react';
import ColumnItem from './ColumnItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/types';
import { useTranslation } from 'react-i18next';

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
  const columns = useSelector((state: RootState) => state.board.boardData.columns);
  const {t} = useTranslation();
  return (
    <>
      {columns?.length > 0 ? (
        <div className="columns-container">
          {columns?.map(({ id, title }: IColumn) => (
            <ColumnItem key={Math.random().toString()} titleForColumn={title} id={id} />
          ))}
        </div>
      ) : (
        <div>{t('noColmns')}</div>
      )}
    </>
  );
};

export default ColumnCard;
