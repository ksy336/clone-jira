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
  userData?: {};
  error?: null | string;
  isLoading: boolean;
  id: string;
}
export interface BoardState {
  title: string;
  description: string;
  id: string
  error: null | string;
  boardItems: any[];
  boardData: {
    title: string,
    description: string,
    id: string,
    columns: any[],
  };
  titleColumn: string;
  columnId: string;

}
export interface ColumnState {
  columnsList: any[];
}