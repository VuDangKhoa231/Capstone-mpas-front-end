import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../../../Layout/SearchBar';
import TableCustom from '../../../Layout/TableCustom';
import { getBrowselist } from '../../../api/browse';
import themes from '../../../theme/themes';


const title = [
  { field: 'id', headerName: <Typography variant='h5' fontWeight={'bold'}>ID</Typography>, width: 60, hideable: false },
  {
    field: 'parkingName',
    headerName: (
      <div>
        <Typography variant='h5' fontWeight={'bold'} >
          Tên bãi
        </Typography>
      </div>
    ),
    width: 400,
    hideable: false,
  },
  {
    field: 'fullName',
    headerName: (
      <div>
        <Typography variant='h5' fontWeight={'bold'}>
          Chủ bãi
        </Typography>
      </div>
    ),
    width: 380,
    hideable: false,
  },
  { field: 'phoneNumber', headerName: <Typography variant='h5' fontWeight={'bold'}>Số điện thoại</Typography>, width: 310,headerAlign: 'center', align: 'center' },
  {
    field: 'registerContract', headerName: <Typography variant='h5' fontWeight={'bold'}>Ngày gửi</Typography>, type: 'Date', width: 250, headerAlign: 'center', align: 'center'
    
  },
  {
    field: 'approval', type: 'actions', width: 170, getActions: (params) => [
      <Link to={`/Browse/${params.row.ploID}`} style={{textDecoration: 'none'}} >
        <Typography sx={{ p: '10px 25px', borderRadius: '10px', backgroundColor: 'green', color: 'white', textDecoration: 'none' }}  >
          Xem
        </Typography>
      </Link>
    ],
  },
];

export function BrowseList(props) {


  const [page, setPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(5)
  const [searchValue, setSearchValue] = useState("")
  const user = useSelector((state) => state.auth)
  const browseList = useSelector((state) => state.browse.browseList)
  const dispatch = useDispatch();
  const [count ,setCount] = useState(0)

  useEffect(() => {
    const data = {
      searchValue: searchValue,
      pageNum: page,
      pageSize: rowPerPage,
    }
    if(count !== 0){
      getBrowselist(data, dispatch, user?.login.accessToken)
    }
  
  }, [page, count, searchValue])

  useEffect(() => {
    if (page !== 1) {
        setPage(1)
    }
    setCount(count + 1)
}, [rowPerPage]);
 

  return (
    <Stack mt={5} direction={'column'} spacing={3}>
      <Box display={'flex'}>
        <SearchBar setDebounceSearchValue={setSearchValue} />
        <Button sx={{ ml: '26px', px: '50px', backgroundColor: themes.palette.grey.light, color: 'black' }} onClick={() => setSearchValue("")}> <Typography variant='body1' textTransform={'none'}> Tất cả</Typography></Button>
      </Box>
      {browseList?.isFetching ? (
        <Box sx={{ display: 'flex', width: '100%', height: '50vh', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={5}>
          <TableCustom rows={browseList?.list?.data?.content} columns={title} m={'0px 15px 0px 0px'} page={page} setPage={setPage} rowPerPage={rowPerPage} setRowPerPage={setRowPerPage} totalPage={browseList?.list?.data?.totalPages} fontSize={'20px'} rowHeight={110} sizeOption={[5, 10, 15]} defaultPageSize={5} />
        </Box>
      )}
    </Stack>

  )
}






