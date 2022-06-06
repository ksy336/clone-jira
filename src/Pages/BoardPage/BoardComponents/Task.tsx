import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/types';
import TaskItem from './TaskItem';

const Task = ({tasks}) => {
  const tasksArr = useSelector((state: RootState) => state.task.tasks);
  console.log(tasksArr, tasks);

  return (
    <>
      {tasks?.map((task)=> {
          return <TaskItem
                    key={Math.random().toString()}
                    taskTitle={task.title}
                    taskDescription={task.description}
                    />
      }
      )}
   </>
  );
};

export default Task;