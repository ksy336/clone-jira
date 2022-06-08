import React, { useEffect, useState } from 'react';
import tasksService from '../../../api/tasks/tasks-service';
import { getCookie } from 'typescript-cookie';
import Modal from '../../../components/Modal/Modal';
import { Button, Card, Form, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { dispatchStore, RootState } from '../../../types/types';
import deleteTask from '../../../store/actions/deleteTask-actions';
import { getDescription, getTitle } from '../../../store/slices/task-slices';

interface BoardColumnsTaskCreate {
  title: string;
  description: string;
}
const BoardTasks = ({boardId, columnId}) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  //const taskId = useSelector((state: RootState) => state.task.taskId);
  const [currentTask, setCurrentTask] = useState();
  const userId = getCookie('id');
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
 // const { title, description } = useSelector((state: RootState) => state.task);


  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async() => {
    try {
      const tasks = await tasksService.getAllTasks(boardId, columnId);
      setTasks(tasks);
    } catch(e) {
      throw new Error("Getting tasks data failed!");
    }
  }
  const onCreateTask = async (columnId: string, values: unknown) => {
    const {title, description} = values as BoardColumnsTaskCreate;
    try {
      await tasksService.createTask(userId, {
        boardId,
        columnId,
        title,
        description
      });
      await getTasks();
    } catch {
      throw new Error("Creating task failed!");
    }
  }
  const deleteTask = async (taskId: string) => {
    try {
      await tasksService.deleteTask(boardId, columnId, taskId);
      await getTasks();
    } catch(e) {
      throw new Error("Deleting task failed!");
    }
  };

  const deleteTaskClick = (taskId: string) => {
    console.log(taskId);
    deleteTask(taskId);
  };
  const modalHandler = () => {
    setDeleteTaskModal(false);
  };
  // const deleteTaskHandler = (taskId: string) => {
  //   deleteTask(taskId);
  //   // dispatchStore(deleteTask(boardId, id, taskId));
  //   // dispatchStore(removeTask(taskId));
  //   setDeleteTaskModal(false);
  // };

  const createTaskSubmit = (values) => {
    onCreateTask(columnId, values);
    setShowTaskModal(false);
  };
  const modalCloseHandler = () => {
    setShowTaskModal(false);
  };
  const addTaskModalHandler = () => {
    setShowTaskModal(true);
  };

  return (
    <>
      <div className="button-task">
        <Button type="dashed" onClick={addTaskModalHandler}>
          + Add Task
        </Button>
      </div>
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
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input title!' }]}
            >
              <Input
                style={{ margin: 10, marginRight: 10 }}
                placeholder="Enter task title"
                onChange={(e) => {
                  dispatchStore(getTitle(e.target.value));
                }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: ('Please input description!') }]}
            >
              <Input
                style={{ margin: 10, marginRight: 10 }}
                placeholder="Enter task description"
                onChange={(e) => {
                  dispatchStore(getDescription(e.target.value));
                }}
              />
            </Form.Item>

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
      {/*{deleteTaskModal && (*/}
      {/*  <Modal onConfirm={modalHandler}>*/}
      {/*    <header className="header">*/}
      {/*      <h2>Are You sure to delete task?</h2>*/}
      {/*    </header>*/}
      {/*    <footer className="actions">*/}
      {/*      <Button type="primary" onClick={() => {}}>*/}
      {/*        Delete*/}
      {/*      </Button>*/}
      {/*      <Button type="primary" onClick={modalHandler}>*/}
      {/*        Cancel*/}
      {/*      </Button>*/}
      {/*    </footer>*/}
      {/*  </Modal>*/}
      {/*)}*/}
      <div className="tasks">
      {tasks?.map(({id, title, description, order}) => (
          <Card
            key={id}
            size="small"
            type="inner"
            title={title}
            className="task-content"
            extra={
              <Button type="primary" onClick={() => {deleteTaskClick(id)}}>Delete task</Button>
            }
          >
            <div>{description}</div>
          </Card>
      ))}
      </div>
    </>
  );
};

export default BoardTasks;