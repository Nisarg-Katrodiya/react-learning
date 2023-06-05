import React from 'react';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
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
  bulkAction: (val: string) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  searchText: string;
  handleSearchText: (val: string) => void;
  handleSearchFrom: (val: keyof IUser) => void;
}

export interface UserTableProps {
  userList: IUser[];
  setUpdateData: (value: IUser) => void;
  handleDeleteUser: (value: any) => void;
  handleBulkAction: (value: string, selectedUsers: readonly string[]) => void;
  handleSearch: (value: string) => void;
  handleSearchColumn: (value: keyof IUser) => void;
  selected: readonly string[];
  setSelected: (ids: readonly string[]) => void
}