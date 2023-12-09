import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import React from 'react'
import themes from '../theme/themes';

export default function   PaginationCustom({ totalPage, page, setPage, rowPerPage, setRowPerPage }) {

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  const handleChange = (event) => {
    setRowPerPage(event.target.value);
  };

  return (
    <Stack direction={'row'} spacing={3} p={'10px'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Typography variant='h6'>Số records mỗi hàng</Typography>
      <FormControl variant="standard">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rowPerPage}
          label="Age"
          onChange={handleChange}
          defaultValue={rowPerPage}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
      <Pagination size='large' color='primary' count={totalPage || 0} page={page} onChange={handleChangePagination} showFirstButton  showLastButton/>
    </Stack>

  )
}
