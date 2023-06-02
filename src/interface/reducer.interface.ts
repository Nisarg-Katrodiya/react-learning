import {IUser} from './user.interface';

export interface IInitialState {
  fetching: boolean;
  users: IUser[];
  error: any;
}