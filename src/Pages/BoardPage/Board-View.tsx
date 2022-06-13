import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer';
import { Card, Button, Form, Input, Layout } from 'antd';
import Modal from '../../components/Modal/Modal';
import { getEnteredTitle } from '../../store/slices/board-slice';
import { dispatchStore } from '../../types/types';
import ColumnCard from './BoardComponents/ColumnCard';

const BoardView = ({
  titleValue,
  description,
  createColumnHandler,
  showColumnModal,
  modalHandler,
  createColumnSubmit,
  boardId,
  t,
}) => {
  return (
    <>
      {showColumnModal && (
        <Modal onConfirm={modalHandler}>
          <header className="header">
            <h2>{t('addColn')}</h2>
          </header>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            onFinish={createColumnSubmit}
            autoComplete="off"
          >
            <Form.Item
              label={t('title')}
              name="title"
              rules={[{ required: true, message: t('requiredTitle') }]}
            >
              <Input
                style={{ margin: 10, marginRight: 10 }}
                placeholder={t('enterColumn')}
                onChange={(e) => {
                  dispatchStore(getEnteredTitle(e.target.value));
                }}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <footer className="actions">
                <Button type="primary" htmlType="submit">
                  {t('addCon')}
                </Button>
                <Button type="primary" onClick={modalHandler}>
                  {t('cancel')}
                </Button>
              </footer>
            </Form.Item>
          </Form>
        </Modal>
      )}
      <Layout>
        <Header />
        <div className="site-card-border-less-wrapper">
          <Card
            title={`Board: ${titleValue}`}
            bordered={false}
            style={{ margin: 10, opacity: 0.7 }}
          >
            <p>
              {t('description')}: {description}
            </p>
          </Card>
        </div>
        <main className="column-wrapper">
          <div className="flex-cards">
            <ColumnCard />
            <Button
              type="primary"
              style={{ width: 200, height: 50, margin: 10, marginTop: 30 }}
              onClick={createColumnHandler}
            >
              + {t('addColn')}
            </Button>
          </div>
        </main>
        <Footer />
      </Layout>
    </>
  );
};

export default BoardView;
