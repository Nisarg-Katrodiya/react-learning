import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import {Box, TextField, Stack, Typography, Autocomplete, OutlinedInput} from '@mui/material';
import {EnhancedTableToolbarProps, HeadCell} from '../../interface/user.interface';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import {headCells} from '../../constant/tableCols';

function TableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, searchText, handleSearchText, handleSearchFrom } = props;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchText(event.target.value);
  }
  const handleSearchFor = (_event: React.SyntheticEvent<Element, Event>, value: HeadCell) => {
    handleSearchFrom(value.id);
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Box>
 
          <Stack direction="row" spacing={2}>
            <Autocomplete
              sx={{width: '180px'}}
              options={headCells}
              defaultValue={headCells[0]}
              id="clearable"
              disableClearable
              onChange={handleSearchFor}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
            <OutlinedInput
              id="searchUser"
              sx={{width: '280px'}}
              placeholder='Search here..'
              value={searchText}
              onChange={handleSearch}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
          
        </Box>
      )}
    </Toolbar>
  );
}

export default TableToolbar