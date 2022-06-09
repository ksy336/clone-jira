import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import Modal from '../Modal/Modal';
import { dispatchStore, RootState } from '../../types/types';
import { clearUserData } from '../../store/slices/logout-slice';
import getNewBoard from '../../store/actions/newBoard-actions';
import { createNewBoardTitle, createNewBoardDescription } from '../../store/slices/board-slice';
const { Header: HeaderComponent } = Layout;
import useSticky from '../../hooks/useSticky';
import { getAuth } from '../../store/slices/signin-slice';
import SwitchLanguage from '../Switch/Switch';

import './Header.scss';

const HeaderMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const { t } = useTranslation();
  const { sticky, headerRef } = useSticky();
  const { title, description } = useSelector((state: RootState) => state.board);
  const onChange = () => {};
  const signOutClick = () => {
    setShowModal(true);
  };
  const createBoardClick = () => {
    setShowNewBoardModal(true);
  };

  const logoutHandler = () => {
    dispatchStore(clearUserData());
    dispatch(getAuth(false));
    navigate('/');
  };
  const modalHandler = () => {
    setShowModal(false);
    setShowNewBoardModal(false);
  };
  const createBoardSubmit = () => {
    const boardData = {
      title,
      description,
    };
    dispatchStore(getNewBoard(boardData));
    setShowNewBoardModal(false);
  };
  const menuItems: ItemType[] = [
    {
      key: 'edit',
      icon: <Link to="/edit">{t('editProfile')}</Link>,
    },
    {
      key: 'out',
      icon: (
        <Button onClick={signOutClick} className="button-sign-out" type="link">
          {t('signOut')}
        </Button>
      ),
    },
    {
      key: 'board',
      icon: (
        <Button onClick={createBoardClick} className="button-create" type="link">
          {t('createBoard')}
        </Button>
      ),
    },
    {
      key: 'switch',
      icon: <SwitchLanguage />,
    },
  ];

  return (
    <>
      {showModal && (
        <Modal onConfirm={modalHandler}>
          <header className="header">
            <h2>{t('modalSignOut')}</h2>
          </header>
          <footer className="actions">
            <Button type="primary" onClick={logoutHandler}>
              {t('signOut')}
            </Button>
            <Button type="primary" onClick={modalHandler}>
              {t('cancel')}
            </Button>
          </footer>
        </Modal>
      )}
      {showNewBoardModal && (
        <Modal onConfirm={modalHandler}>
          <header className="header">
            <h2>{t('createBoard')}</h2>
          </header>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            onFinish={createBoardSubmit}
            autoComplete="off"
          >
            <Form.Item
              label={t('title')}
              name="title"
              rules={[{ required: true, message: t('requiredTitle') }]}
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(createNewBoardTitle(e.target.value));
                }}
              />
            </Form.Item>

            <Form.Item
              label={t('description')}
              name="description"
              rules={[{ required: true, message: t('requiredDescription') }]}
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(createNewBoardDescription(e.target.value));
                }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <footer className="actions">
                <Button type="primary" htmlType="submit">
                  {t('create')}
                </Button>
              </footer>
            </Form.Item>
          </Form>
        </Modal>
      )}

      <HeaderComponent className={`layout-header ${sticky ? 'is-sticky' : ''}`} ref={headerRef}>
        <div style={{ zIndex: 1, width: '100%', margin: '0 auto' }}>
          <Menu
            style={{ background: 'transparent', display: 'flex', justifyContent: 'flex-end' }}
            items={menuItems}
          />
        </div>
      </HeaderComponent>
    </>
  );
};
export default HeaderMenu;
