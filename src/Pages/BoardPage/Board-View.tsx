import React, { ChangeEvent } from 'react';
import Header from "../../components/Header/index";
import Footer from '../../components/Footer';
import { Card, Button, Form, Input } from 'antd';
import Modal from "../../components/Modal/Modal";
import { getEnteredTitle } from '../../store/slices/board-slice';
import { dispatchStore } from '../../types/types';
import ColumnCard from './BoardComponents/ColumnCard';

const BoardView = ({titleValue, description, createColumnHandler, showColumnModal, modalHandler, createColumnSubmit, boardId}) => {
  return (
    <>
      {showColumnModal && (
        <Modal onConfirm={modalHandler}>
        <header className="header">
          <h2>Add Column</h2>
        </header>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            onFinish={createColumnSubmit}
            autoComplete="off"
          >
              <Input
                style={{margin: 10,
                  marginRight: 10.
                }}
                placeholder="Enter column title"
                onChange={(e) => {dispatchStore(getEnteredTitle(e.target.value))}}
              />
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <footer className="actions">
                <Button type="primary" htmlType="submit">
                  Add Column
                </Button>
                <Button type="primary" onClick={modalHandler}>
                 Cancel
                </Button>
              </footer>
            </Form.Item>
          </Form>
      </Modal>
      )}
      <Header/>
      <div className="site-card-border-less-wrapper">
        <Card
          title={`Board: ${titleValue}`}
          bordered={false}
          style={{margin: 10, opacity: 0.7}}
        >
          <p>Description: {description}</p>
        </Card>
      </div>
      <main className="column-wrapper">
        <div className="flex-cards">
          <ColumnCard boardId={boardId} />
          <Button
            type="primary"
            style={{width: 200,
              height: 50,
              margin: 10,
              marginTop: 30, }}
            onClick={createColumnHandler}
          >
            + Add column
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BoardView;
