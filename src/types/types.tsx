import store from '../store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatchStore = store.dispatch;

export interface InitialSignInState {
  login: string;
  password: string;
  getLoginData: {
    login: string;
    password: string;
  };
  token: string | null;
  isAuth: boolean;
  error?: null | string;
  isLoading: boolean;
}

export interface InitialSignUpState {
  name?: string;
  login: string;
  password: string;
  confirmPassword?: string;
  userData?: object;
  error?: null | string;
  isLoading: boolean;
  id: string;
}
export interface BoardState {
  title: string;
  description: string;
  id: string;
  error: null | string;
  boardItems: any[];
  boardData: {
    title: string;
    description: string;
    id: string;
    columns: Array<object>;
  };
  titleColumn: string;
  columnId: string;
}
export interface ColumnState {
  columnsList: any[];
}

export interface ICreateTask {
  boardId: string;
  columnId: string;
  title: string;
  description: string;
}
export interface ITask {
  id: string;
  title: string;
  description: string;
  userId: string;
  order?: number;
  files?: Array<string>;
}
