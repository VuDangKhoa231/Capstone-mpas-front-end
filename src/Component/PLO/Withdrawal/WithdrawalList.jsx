import { Box, Button, Chip, CircularProgress, Divider, Popover, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SearchBar from '../../../Layout/SearchBar';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {DialogCustom, DialogWithdrawal} from '../../../Layout/DialogCustom';
import TableCustom from '../../../Layout/TableCustom';
import themes from '../../../theme/themes';
import { confirmWithdrawal, getWithdrawalList } from '../../../api/withdrawal';
import { useDispatch, useSelector } from 'react-redux';
import ToastMessage from '../../../Layout/ToastMessage';
// const data = [
//   {
//     id: 1, name: 'Khách sạn Romantic 1', owner: 'Mai Hoàng Tâm 1', requestedAmount: 1200000, balanceInTheAccount: 6000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/02/2023', approveDate: '12/20/2023', status: 'Chấp nhận', infor: [
//       {
//         id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
//       },
//       {
//         id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
//       }
//     ]
//   },
//   {
//     id: 2, name: 'Khách sạn Romantic 2', owner: 'Mai Hoàng Tâm 2', requestedAmount: 1500000, balanceInTheAccount: 5000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/12/2023', approveDate: '11/02/2023', status: 'từ chối', infor: [
//       {
//         id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
//       },
//       {
//         id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
//       }
//     ]
//   },
//   {
//     id: 3, name: 'Khách sạn Romantic 3', owner: 'Mai Hoàng Tâm 3', requestedAmount: 2000000, balanceInTheAccount: 6000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '13/22/2023', approveDate: '12/02/2023', status: 'Chấp nhận', infor: [
//       {
//         id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
//       },
//       {
//         id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
//       }
//     ]
//   },
//   {
//     id: 4, name: 'Khách sạn Romantic 3', owner: 'Mai Hoàng Tâm 3', requestedAmount: 2000000, balanceInTheAccount: 6000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/20/2023', approveDate: '12/02/2023', status: 'Chấp nhận', infor: [
//       {
//         id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
//       },
//       {
//         id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
//       }
//     ]
//   },
//   {
//     id: 5, name: 'Khách sạn Romantic 3', owner: 'Mai Hoàng Tâm 3', requestedAmount: 2000000, balanceInTheAccount: 6000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/05/2023', approveDate: '12/02/2023', status: 'Chấp nhận', infor: [
//       {
//         id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
//       },
//       {
//         id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
//       }
//     ]
//   },
// ]




function WithdrawalList({ dispatch, accessToken }) {
  //DropdownMenu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event, item) => {
    setSelectItem(item)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //Search
  const [searchValue, setSearchValue] = useState("");

  //Pagination
  const [page, setPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(5)

  //TitleOFTable
  const title = [
    { field: 'id', headerName: <Typography variant='h5' fontWeight={'bold'}>ID</Typography>, width: 60, hideable: false },
    {
      field: 'owner_location',
      headerName: (
        <div>
          <Typography variant='h5' fontWeight={'bold'}>
            Tên
          </Typography>
        </div>
      ),
      width: 300,
      hideable: false,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', textAlign: 'start' }}>
          <Typography variant='h6'>{params.row.parkingName}</Typography>
          <Typography variant='body1' color={themes.palette.grey.dark}>{params.row.address}</Typography>
        </div>
      ),
    },
    {
      field: 'name_phone',
      headerName: (
        <div>
          <Typography variant='h5' fontWeight={'bold'}>
            Chủ bãi
          </Typography>
        </div>
      ),
      width: 270,
      hideable: false,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', textAlign: 'start' }}>
          <Typography variant='h6'>{params.row.fullName}</Typography>
          <Typography variant='body1' color={themes.palette.grey.dark}>{params.row.phoneNumber}</Typography>
        </div>
      )
    },
    {
      field: 'depositAmount', headerName: <Typography variant='h5' fontWeight={'bold'} color={'red'}>Yêu cầu</Typography>, type: 'number', headerAlign: 'center', align: 'right', width: 170, valueFormatter: (params) => {
        const amount = params.value;
        return `${amount} VNĐ`;
      },
    },
    {
      field: 'balance', headerName: <Typography variant='h5' fontWeight={'bold'} color={'red'}>Số dư</Typography>, type: 'number', headerAlign: 'center', align: 'right', width: 170, valueFormatter: (params) => {
        const amount = params.value;
        return `${amount} VNĐ`;
      },
    },
    {
      field: 'transactionMethod',
      headerName: <Typography variant='h5' fontWeight={'bold'}>Thông tin</Typography>,
      headerAlign: 'center', align: 'start',
      width: 200,
      disableSort: true,
      renderCell: (params) => (
        <div>
          {params.value && params.value.map((item) => (
            <div key={item.id} style={{ marginBottom: '8px', textAlign: 'start' }}>
              <Typography variant='h6'>{item.bankNumber}</Typography>
              <Typography variant='h6' color={themes.palette.grey.dark} >{item.bankCode}</Typography>
            </div>
          ))}
        </div>
      ),
    },
    {
      field: 'transactionDate', headerName: <Typography variant='h5' fontWeight={'bold'}>Ngày gửi</Typography>, type: 'Date', headerAlign: 'center', align: 'center', width: 210,
    },
    {
      field: null, headerName: <Typography variant='h5' fontWeight={'bold'}>Trạng thái</Typography>, type: 'actions', width: 200, getActions: (params) => [
        <div>
          <Button
            variant="contained"
            aria-describedby={id}
            sx={{ p: '10px 25px', borderRadius: '10px', backgroundColor: themes.backgroundColor }}
            onClick={(event) => handleClick(event, params.row)}
          >
            Chờ phê duyệt
          </Button>
        </div>
      ],
    },
  ];

  //Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    console.log(selectedItem);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [selectedItem, setSelectItem] = useState(null);
  const [confirm, setConfirm] = useState(true)
  const withdrawalList = useSelector((state) => state.withdrawal.withdrawalList)

  const handleConfirm = () => {
    const data = {
      status: confirm ? 3 : 4,
      transactionID: selectedItem.transactionID,
    }
    confirmWithdrawal(data, dispatch, accessToken).then((res) => {
      const data1 = {
        pageNum: page,
        pageSize: rowPerPage,
        searchValue: searchValue, 
        status: 1
      }
      getWithdrawalList(data1, dispatch, accessToken)
    })
  }

  const [count, setCount] = useState(0)

  useEffect(() => {
    const data = {
      pageNum: page,
      pageSize: rowPerPage,
      searchValue: searchValue,
      status: 1
    }
    if (count !== 0) {
      getWithdrawalList(data, dispatch, accessToken)
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
      {withdrawalList?.isFetching ?
        (
          <Box sx={{ display: 'flex', width: '100%', height: '50vh', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        )
        :
        <TableCustom rows={withdrawalList?.list?.data?.content} columns={title} m={'0px 15px 0px 0px'} fontSize={'20px'} rowHeight={150} sizeOption={[3, 5, 10]} defaultPageSize={3} page={page} setPage={setPage} rowPerPage={rowPerPage} setRowPerPage={setRowPerPage} totalPage={withdrawalList?.list?.data?.totalPages} />
      }
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableAutoFocus={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack direction={'column'} sx={{ backgroundColor: themes.backgroundColor }}>
          <Button onClick={() => { handleClickOpen(); setConfirm(true); handleClose(); }} >
            <Chip sx={{ width: '155px', justifyContent: 'start' }} color='success' icon={<CheckCircleIcon />} label='Chấp nhận' variant="filled" />
          </Button>
          <Divider color={themes.palette.grey.light} />
          <Button onClick={() => { handleClickOpen(); setConfirm(false); handleClose(); }}>
            <Chip color='error' sx={{ width: '155px', justifyContent: 'start' }} icon={<CancelIcon />} label="Từ chối" variant="filled" />
          </Button>
        </Stack>
      </Popover>
      <DialogWithdrawal  open={openDialog} handleClose={handleCloseDialog} confirm={confirm} data={selectedItem} handleConfirm={handleConfirm} />
    </Stack>
  )
}

export default WithdrawalList;



