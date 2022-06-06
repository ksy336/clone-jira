import React, { useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import Modal from '../../../components/Modal/Modal';
import { dispatchStore, RootState } from '../../../types/types';
import { getEnteredTitle, removeColumn } from '../../../store/slices/board-slice';
import deleteColumn from '../../../store/actions/deleteColumn-actions';
import getBoardById from '../../../store/actions/getBoardById-actions';
import { useSelector } from 'react-redux';
import {getTitle, getDescription} from "../../../store/slices/task-slice";
import { getCookie } from 'typescript-cookie';
import addTask from '../../../store/actions/addTask-actions';
import Task from './Task';
import {addTaskItem} from "../../../store/slices/task-slice";

const CardItem = ({titleForColumn, order, id, tasks}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const columnArr = useSelector((state: RootState) => state.board.boardData.columns);
  // const columnId = useSelector((state: RootState) => state.board.columnId);
  const boardId = useSelector((state: RootState) => state.board.boardData.id);
  const {title, description} = useSelector((state: RootState) => state.task);
 //const userId = useSelector((state: RootState) => state.signUp.id);
  const userId = getCookie("id");
  console.log(boardId, id, userId);

  const modalHandler = () => {
    setDeleteModal(true);
  }
  const modalCloseHandler = () => {
    setShowTaskModal(false);
  }
  const deleteColumnHandler = () => {
    dispatchStore(removeColumn(id));
    dispatchStore(deleteColumn(boardId, id));
    setDeleteModal(false);
  }

  const openModalHandler = () => {
    setDeleteModal(true);
  }
  const addTaskModalHandler = () => {
    setShowTaskModal(true);
  }
  const createTaskSubmit = () => {
    const taskData = {
      title,
      description,
      userId
    }
    dispatchStore(addTask(boardId, id, taskData));
    dispatchStore(getBoardById(boardId));
    dispatchStore(addTaskItem(taskData));
    setShowTaskModal(false);
  }

  return (
    <>
    {deleteModal && (
      <Modal onConfirm={modalHandler}>
        <header className="header">
          <h2>Are You sure to delete column?</h2>
        </header>
            <footer className="actions">
              <Button type="primary" onClick={deleteColumnHandler}>
                Delete
              </Button>
              <Button type="primary" onClick={modalHandler}>
                Cancel
              </Button>
            </footer>
      </Modal>
    )}
      {showTaskModal && (
        <Modal onConfirm={modalCloseHandler}>
          <header className="header">
            <h2>Add new task</h2>
          </header>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            onFinish={createTaskSubmit}
            autoComplete="off"
          >
            <Input
              style={{margin: 10,
                marginRight: 10.
              }}
              placeholder="Enter task title"
              onChange={(e) => {dispatchStore(getTitle(e.target.value))}}
            />
            <Input
              style={{margin: 10,
                marginRight: 10.
              }}
              placeholder="Enter task description"
              onChange={(e) => {dispatchStore(getDescription(e.target.value))}}
            />
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <footer className="actions">
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
                <Button type="primary" onClick={modalCloseHandler}>
                  Cancel
                </Button>
              </footer>
            </Form.Item>
          </Form>
        </Modal>
      )}
      <div className="column-content">
        <Card title={titleForColumn} extra={<Button type="primary" onClick={openModalHandler}>Delete column</Button>} style={{ width: 300, borderRadius: 10, cursor: 'grab' }}>
          <div>
            <Task tasks={tasks} />
          </div>
          <Button type="dashed" onClick={addTaskModalHandler}>+ Add Task</Button>
        </Card>
      </div>
      </>
  );
};

export default CardItem;