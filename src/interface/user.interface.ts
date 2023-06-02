import React from 'react';

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  action?: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof IUser;
  label: string;
  numeric: boolean;
  sort: boolean;
}

export type Order = 'asc' | 'desc';


export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IUser) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  title: string;
  numSelected: number;
}

export interface UserTableProps {
  userList: IUser[];
  setUpdateData: (val: IUser) => void;
  handleDeleteUser: (id: IUser) => void;
}