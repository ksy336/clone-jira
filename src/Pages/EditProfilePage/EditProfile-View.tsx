import * as React from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { editUserName, editUserLogin, editUserPassword } from '../../store/slices/edit-slice';
import Modal from '../../components/Modal/Modal';
import './Edit.scss';

const EditProfileView = ({
  dispatch,
  onFinish,
  deleteClickHandler,
  modalHandler,
  showModal,
  deleteUserModalHandler,
  t,
}) => {
  return (
    <>
      <Layout>
        {showModal && (
          <Modal onConfirm={modalHandler}>
            <header className="header">
              <h2>{t('deleteAnAccount')}</h2>
            </header>
            <footer className="actions">
              <Button type="primary" onClick={deleteUserModalHandler}>
                {t('delete')}
              </Button>
              <Button type="primary" onClick={modalHandler}>
                {t('cancel')}
              </Button>
            </footer>
          </Modal>
        )}
        <div className="edit-profile">
          <h3>{t('editProfile')}</h3>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label={t('newName')}
              name="new-name"
              rules={[{ required: true, message: t('placeholderName') }]}
            >
              <Input
                onChange={(e) => {
                  dispatch(editUserName(e.target.value));
                }}
              />
            </Form.Item>

            <Form.Item
              label={t('newLogin')}
              name="new-login"
              rules={[{ required: true, message: t('newLoginRequired') }]}
            >
              <Input
                onChange={(e) => {
                  dispatch(editUserLogin(e.target.value));
                }}
              />
            </Form.Item>

            <Form.Item
              label={t('newPassword')}
              name="new-password"
              rules={[{ required: true, message: t('minimum8Symbols') }]}
            >
              <Input
                onChange={(e) => {
                  dispatch(editUserPassword(e.target.value));
                }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="button" onClick={deleteClickHandler}>
                {t('deleteAccount')}
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {t('save')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default EditProfileView;
