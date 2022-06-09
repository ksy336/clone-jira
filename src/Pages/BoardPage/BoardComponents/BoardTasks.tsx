import React, { useEffect, useState } from 'react';
import tasksService from '../../../api/tasks/tasks-service';
import Modal from '../../../components/Modal/Modal';
import { Button, Card, Form, Input } from 'antd';
import { BoardColumnsTaskCreate } from './types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/types';

const BoardTasks = ({ boardId, columnId }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const userId = useSelector((state: RootState) => state.signUp.id);
  const {t} = useTranslation();
  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await tasksService.getAllTasks(boardId, columnId);
        setTasks(tasks);
      } catch (e) {
        throw new Error('Getting tasks data failed!');
      }
    };
    getTasks();
  }, [boardId, columnId]);

  const getTasks = async () => {
    try {
      const tasks = await tasksService.getAllTasks(boardId, columnId);
      setTasks(tasks);
    } catch (e) {
      throw new Error('Getting tasks data failed!');
    }
  };
  const onCreateTask = async (columnId: string, values: unknown) => {
    const { title, description } = values as BoardColumnsTaskCreate;
    try {
      await tasksService.createTask(userId, {
        boardId,
        columnId,
        title,
        description,
      });
      await getTasks();
    } catch {
      throw new Error('Creating task failed!');
    }
  };
  const deleteTask = async (taskId: string) => {
    try {
      await tasksService.deleteTask(boardId, columnId, taskId);
      await getTasks();
    } catch (e) {
      throw new Error('Deleting task failed!');
    }
  };

  const deleteTaskClick = (taskId: string) => {
    console.log(taskId);
    deleteTask(taskId);
  };

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
          + {t("addTask")}
        </Button>
      </div>
      {showTaskModal && (
        <Modal onConfirm={modalCloseHandler}>
          <header className="header">
            <h2>{t('addNewTask')}</h2>
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
              label={t('title')}
              name="title"
              rules={[{ required: true, message: t('requiredTitle') }]}
            >
              <Input style={{ margin: 10, marginRight: 10 }} placeholder={t('enterTaskT')} />
            </Form.Item>
            <Form.Item
              label={t('description')}
              name="description"
              rules={[{ required: true, message: t("requiredDescription") }]}
            >
              <Input style={{ margin: 10, marginRight: 10 }} placeholder={t('enterDescript')} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <footer className="actions">
                <Button type="primary" htmlType="submit">
                  {t('create')}
                </Button>
                <Button type="primary" onClick={modalCloseHandler}>
                  {t('cancel')}
                </Button>
              </footer>
            </Form.Item>
          </Form>
        </Modal>
      )}
      <div className="tasks">
        {tasks?.map(({ id, title, description }) => (
          <Card
            key={id}
            size="small"
            type="inner"
            title={title}
            className="task-content"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  deleteTaskClick(id);
                }}
              >
                {t('deleteTask')}
              </Button>
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
