import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import EnhancedTableHead from '../../components/Table/TableHeader';
import TableToolbar from '../../components/Table/TableToolbar';
interface Data {
  id: number;
  name?: any;
  author: string;
  quantity: number;
  userName: string;
  assignDate: string;
  returnDate?: string;
  status?: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Book Name',
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Author',
  },
  {
    id: 'quantity',
    numeric: false,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'userName',
    numeric: false,
    disablePadding: false,
    label: 'User Name',
  },
  {
    id: 'assignDate',
    numeric: false,
    disablePadding: false,
    label: 'Assign Date',
  },
  {
    id: 'returnDate',
    numeric: false,
    disablePadding: false,
    label: 'Return Date',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];



export default function EnhancedTable({assignList, setUpdateData, handleDeleteAssign}: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty assignList.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - assignList.length) : 0;

  const handleEditData = (data: Data) => {
    setUpdateData(data)
  }
  const handleDeleteData = (data: number) => {
    handleDeleteAssign(data)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar title={"Book assign to"} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {assignList.map((row: Data, index: number) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    tabIndex={-1}
                    key={row.name + index}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding={'normal'}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.author}</TableCell>
                    <TableCell align="left">{row.quantity}</TableCell>
                    <TableCell align="left">{row.userName}</TableCell>
                    <TableCell align="left">{row.assignDate}</TableCell>
                    <TableCell align="left">{row.returnDate}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                      <IconButton onClick={() => handleEditData(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteData(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={assignList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
