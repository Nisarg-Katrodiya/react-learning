import {HeadCell} from '../interface/user.interface';

export const headCells: HeadCell[] = [
  {
    id: 'firstName',
    numeric: false,
    disablePadding: true,
    label: 'First name',
    sort: true,
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last name',
    sort: true,
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
    sort: true,
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
    sort: true,
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    sort: true,
  },
];