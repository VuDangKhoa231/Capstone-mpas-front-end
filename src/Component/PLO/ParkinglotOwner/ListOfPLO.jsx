import { Box, Button, CircularProgress, Dialog, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../../Layout/SearchBar'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ChipCustom from '../../../Layout/ChipCustom'
import TableCustom from '../../../Layout/TableCustom'
import { getPLOlist } from '../../../api/plo'
import themes from '../../../theme/themes'
import { DialogCustom2 } from '../../../Layout/DialogCustom'


export default function ListOfPLO() {
  const [page, setPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(5);
  const [selectTab, setSelectTab] = useState(1);
  const user = useSelector((state) => state.auth)
  const plo = useSelector((state) => state.plo.aplo)

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  //Dialog 
  const [open, setOpen] = useState(false);


  const title = [
    { field: 'id', headerName: <Typography variant='h5' fontWeight={'bold'}>ID</Typography>, width: 50, hideable: false },
    { field: 'fullName', headerName: (<div> <Typography variant='h5' fontWeight={'bold'}> Tên  </Typography> </div>), width: 300, hideable: false, },
    { field: 'phoneNumber', headerName: <Typography variant='h5' fontWeight={'bold'}>Số điện thoại</Typography>, width: 210, headerAlign: 'center', align: 'center' },
    {
      field: 'parkingName', headerName: (<div> <Typography variant='h5' fontWeight={'bold'}>Tên bãi đỗ</Typography> </div>), width: 300, renderCell: (params) => (
        <div
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            textAlign: 'center',
            justifyContent: 'center',
            width: '95%',
            maxHeight: '4em', // Giới hạn chiều cao của ô là 3 dòng
            overflow: 'hidden', // Ẩn nội dung vượt quá chiều cao giới hạn
            textOverflow: 'ellipsis', // Hiển thị dấu ba chấm khi nội dung quá dài
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'statusName', headerName: <Typography variant='h5' fontWeight={'bold'} >Trạng thái</Typography>, headerAlign: 'center', align: 'center', width: 180, renderCell: (params) => {
        const status = params.row.statusName;

        let label, variant, backgroundColor;
        if (status === "Successfully Registered") {
          label = 'Mới đăng ký';
          variant = 'filled';
          backgroundColor = '#3498db';
        } else if (status === "Opening") {
          label = "Đang hoạt động";
          variant = 'filled';
          backgroundColor = '#00cc66';
        } else if (status === "Closed") {
          label = "Tạm dừnng hoạt động";
          variant = 'filled';
          backgroundColor = '#e74c3c';
        } else {
          label = "Hết hạn hợp đồng";
          variant = 'filled';
          backgroundColor = '#f39c12';
        }
        return (
          <Box width={'100%'} display={'flex'} justifyContent={'center'}>
            <ChipCustom label={label} variant={variant} backgroundColor={backgroundColor} />
          </Box>
        );
      },
    },
    {
      field: 'address', headerName: <Typography variant='h5' fontWeight={'bold'}>Địa chỉ bãi xe</Typography>, headerAlign: 'center', align: 'center', width: 340, renderCell: (params) => (
        <div
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            textAlign: 'center',
            justifyContent: 'center',
            width: '95%',
            maxHeight: '4em', // Giới hạn chiều cao của ô là 3 dòng
            overflow: 'hidden', // Ẩn nội dung vượt quá chiều cao giới hạn
            textOverflow: 'ellipsis', // Hiển thị dấu ba chấm khi nội dung quá dài
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {params.value}
        </div>
      ),
    },

    {
      headerName: <Typography variant='h5' fontWeight={'bold'}>Trạng thái</Typography>, type: 'actions', width: 190, getActions: (params) => [
        <Link to={`/PLO/${params.row.ploID}`} style={{textDecoration: 'none'}}>
          <Typography sx={{ p: '10px 25px', borderRadius: '10px', backgroundColor: 'green', color: 'white' }}  >
            Xem
          </Typography>
        </Link>
      ],
    },
  ];

  const handleSelectTab = (e) => {
    setSelectTab(e)
    setPage(1)
    setRowPerPage(5)
  }

  const [count, setCount] = useState(0)


  useEffect(() => {
    const data = {
      pageNum: page,
      pageSize: rowPerPage,
      status: selectTab,
      searchValue: searchValue,
    }
    if (count !== 0) {
      getPLOlist(data, dispatch, user?.login?.accessToken)
    }

  }, [page, count, selectTab, searchValue])


  useEffect(() => {
    if (page !== 1) {
      setPage(1)
    }
    setCount(count + 1)
  }, [rowPerPage]);

  return (
    <Stack direction='column' p='10px' spacing={2}>
      <Typography variant='h2'>Danh sách Chủ bãi xe</Typography>
      <Box width={'35%'}>
        <SearchBar setDebounceSearchValue={setSearchValue} />
      </Box>
      <Grid container>
        <Grid item xs={9.86}>
          <Box justifyContent={'stretch'} width={'100%'} display={'flex'}>
            <Button sx={{ mr: '30px', px: '50px', backgroundColor: selectTab === 1 ? themes.backgroundColor : themes.palette.grey.light, color: selectTab === 1 ? 'white' : 'black', border: '1px solid transparent', ':hover': { borderColor: themes.backgroundColor, color: themes.backgroundColor } }} onClick={() => handleSelectTab(1)}>
              <Typography variant='body1' textTransform={'none'}> Còn hợp đồng </Typography>
            </Button>
            <Button sx={{ mr: '30px', px: '50px', backgroundColor: selectTab === 2 ? themes.backgroundColor : themes.palette.grey.light, color: selectTab === 2 ? 'white' : 'black', border: '1px solid transparent', ':hover': { borderColor: themes.backgroundColor, color: themes.backgroundColor } }} onClick={() => handleSelectTab(2)}>
              <Typography variant='body1' textTransform={'none'}> Hết hạn hợp đồng </Typography>
            </Button>
            <Button sx={{ mr: '30px', px: '50px', backgroundColor: selectTab === 0 ? themes.backgroundColor : themes.palette.grey.light, color: selectTab === 0 ? 'white' : 'black', border: '1px solid transparent', ':hover': { borderColor: themes.backgroundColor, color: themes.backgroundColor } }} onClick={() => handleSelectTab(0)}>
              <Typography variant='body1' textTransform={'none'}> Tất cả </Typography>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={2.14}>
          <Button sx={{ mr: '30px', px: '50px', backgroundColor: themes.backgroundColor, color: 'white', border: '1px solid transparent', ':hover': { borderColor: themes.backgroundColor, color: themes.backgroundColor } }} onClick={() => setOpen(true)}>
            <Typography variant='body1' textTransform={'none'}>Tra cứu theo biển số </Typography>
          </Button>
        </Grid>
      </Grid>

      {plo?.isFetching ?
        (
          <Box sx={{ display: 'flex', width: '100%', height: '50vh', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        )
        :
        (
          <TableCustom rows={plo?.allPlo?.data?.content} columns={title} m={'0px 15px 0px 0px'} fontSize={'20px'} rowHeight={110} sizeOption={[3, 5, 10]} defaultPageSize={3} height={'400px'} page={page} rowPerPage={rowPerPage} setPage={setPage} setRowPerPage={setRowPerPage} totalPage={plo?.allPlo?.data?.totalPages} />
        )
      }
      <DialogCustom2 open={open} setOpen={setOpen} accessToken={user?.login?.accessToken} />
    </Stack>

  )
}
