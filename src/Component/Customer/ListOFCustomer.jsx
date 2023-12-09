import { Box, Button, CircularProgress, Snackbar, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ChipCustom from '../../Layout/ChipCustom'
import SearchBar from '../../Layout/SearchBar'
import TableCustom from '../../Layout/TableCustom'
import { getCusList } from '../../api/customer'
import themes from '../../theme/themes'


const CustomColumnTitle = ({ title }) => {
  return (
    <Typography variant="h5" fontWeight="bold">
      {title}
    </Typography>
  );
};




const title = [
  { field: 'id', headerName: <CustomColumnTitle title={"ID"} />, width: 100, hideable: false },
  { field: 'fullName', headerName: <Typography variant='h5' fontWeight={'bold'}>Tên</Typography>, width: 415, hideable: false },
  { field: 'phoneNumber', headerName: <Typography variant='h5' fontWeight={'bold'}>Số điện thoại</Typography>, width: 310, headerAlign: 'center', align: 'center' },
  {
    field: 'registrationDate', headerName: <Typography variant='h5' fontWeight={'bold'}>Ngày đăng ký</Typography>, type: 'Date', width: 310, headerAlign: 'center', align: 'center',
  },
  { field: 'totalNumber', headerName: <Typography variant='h5' fontWeight={'bold'}>Số xe</Typography>, type: 'number', width: 240, headerAlign: 'center', align: 'center' },
  {
    field: 'status', headerName: <Typography variant='h5' fontWeight={'bold'} >Trạng thái</Typography>, type: '', width: 190, headerAlign: 'center', align: 'center', renderCell: (params) => {
      const status = params.row.status;
      let label, variant, backgroundColor, color;
      if (status === 'Online') {
        label = status;
        variant = 'filled';
        backgroundColor = '#00cc66';
      } else {
        label = status;
        variant = 'filled';
        backgroundColor = '#e74c3c';
      }

      return (
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          <ChipCustom label={label} variant={variant} backgroundColor={backgroundColor} />
        </Box>
      );
    },
  },
];


export default function ListOFCustomer() {
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');

  const user = useSelector((state) => state.auth)
  const customer = useSelector((state) => state.customer)
  const dispatch = useDispatch();
  const [count, setCount] = useState(1)


  useEffect(() => {
    const data = {
      pageNum: page,
      pageSize: rowPerPage,
      searchValue: searchValue
    }
    if (count !== 0) {
      getCusList(data, dispatch, user?.login?.accessToken);
    }
  }, [page, rowPerPage, searchValue])

  useEffect(() => {
    if (page !== 1) {
      setPage(1)
    }
    setCount(count + 1)
  }, [rowPerPage]);

  return (
    <>
      <Stack direction='column' p='10px' spacing={5}>
        {/* Header */}
        <Typography variant='h2'>Danh sách khách hàng</Typography>

        <Box display={'flex'}>
          <SearchBar setDebounceSearchValue={setSearchValue} />
          <Button sx={{ ml: '26px', px: '50px', backgroundColor: themes.palette.grey.light, color: 'black' }} onClick={() => setSearchValue("")}> <Typography variant='body1' textTransform={'none'}> Tất cả</Typography></Button>
        </Box>
        {/* Content */}
        {customer?.customerList?.isFetching ? (
          <Box sx={{ display: 'flex', width: '100%', height: '60vh', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <TableCustom columns={title} rows={customer?.customerList?.customers?.data?.content} m={'0px 15px 0px 0px'} fontSize={'25px'} height={'1000px'} rowHeight={80} sizeOption={[5, 10, 15]} defaultPageSize={5} page={page} setPage={setPage} rowPerPage={rowPerPage} setRowPerPage={setRowPerPage} totalPage={customer?.customerList?.customers?.data?.totalPages} />
          </Box>
        )}
      </Stack >
      <Snackbar />
    </>

  )
}

