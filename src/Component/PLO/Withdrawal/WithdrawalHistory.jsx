import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useGridApiRef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import ChipCustom from '../../../Layout/ChipCustom';
import SearchBar from '../../../Layout/SearchBar';
import TableCustom from '../../../Layout/TableCustom';
import { getWithdrawalHistory, getWithdrawalList } from '../../../api/withdrawal';
import themes from '../../../theme/themes';
const data = [
    {
        id: 1, name: 'Khách sạn Romantic 1', owner: 'Mai Hoàng Tâm 1', requestedAmount: 1200000, balanceInTheAccount: 6000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/02/2023', approveDate: '12/20/2023', status: 'Chấp nhận', infor: [
            {
                id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
            },
            {
                id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
            }
        ]
    },
    {
        id: 2, name: 'Khách sạn Romantic 2', owner: 'Mai Hoàng Tâm 2', requestedAmount: 1500000, balanceInTheAccount: 5000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/12/2023', approveDate: '11/02/2023', status: 'từ chối', infor: [
            {
                id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
            },
            {
                id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
            }
        ]
    },
    {
        id: 3, name: 'Khách sạn Romantic 3', owner: 'Mai Hoàng Tâm 3', requestedAmount: 2000000, balanceInTheAccount: 6000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '13/22/2023', approveDate: '12/02/2023', status: 'Chấp nhận', infor: [
            {
                id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
            },
            {
                id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
            }
        ]
    },
    {
        id: 4, name: 'Khách sạn Romantic 3', owner: 'Mai Hoàng Tâm 3', requestedAmount: 2000000, balanceInTheAccount: 6000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/20/2023', approveDate: '12/02/2023', status: 'Chấp nhận', infor: [
            {
                id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
            },
            {
                id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
            }
        ]
    },
    {
        id: 5, name: 'Khách sạn Romantic 3', owner: 'Mai Hoàng Tâm 3', requestedAmount: 2000000, balanceInTheAccount: 6000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/05/2023', approveDate: '12/02/2023', status: 'Chấp nhận', infor: [
            {
                id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
            },
            {
                id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
            }
        ]
    },
    {
        id: 6, name: 'Khách sạn Romantic 3', owner: 'Mai Hoàng Tâm 3', requestedAmount: 2000000, balanceInTheAccount: 6000000, phone: '0357280619', location: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/22/2023', approveDate: '12/02/2023', status: 'Chấp nhận', infor: [
            {
                id: 1.1, bankName: 'BIV', bankNumber: '093023323233'
            },
            {
                id: 1.2, bankName: 'Momo', bankNumber: '093023323233'
            }
        ]
    }
]


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
        width: 335,
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
        width: 335,
        hideable: false,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', textAlign: 'start' }}>
                <Typography variant='h6'>{params.row.fullName}</Typography>
                <Typography variant='body1' color={themes.palette.grey.dark}>{params.row.phoneNumber}</Typography>
            </div>
        ),
    },
    {
        field: 'transactionMethod',
        headerName: <Typography variant='h5' fontWeight={'bold'}>Thông tin</Typography>,
        width: 190,
        headerAlign: 'center',
        disableSort: true,
        renderCell: (params) => (
            <div>
                {params.value && params.value.map((item, index) => (
                    <div key={index} style={{ marginBottom: '8px', textAlign: 'start' }}>
                        <Typography variant='h6'>{item.bankNumber}</Typography>
                        <Typography variant='h6' color={themes.palette.grey.dark} >{item.bankName}</Typography>
                    </div>
                ))}
            </div>
        ),
    },
    {
        field: 'transactionResultDate', headerName: <Typography variant='h5' fontWeight={'bold'}>Ngày duyệt</Typography>, type: 'Date', headerAlign: 'center', align: 'center', width: 220,
    },
    {
        field: 'transactionDate', headerName: <Typography variant='h5' fontWeight={'bold'}>Ngày đăng ký</Typography>, type: 'Date', headerAlign: 'center', align: 'center', width: 230,
    },
    {
        field: 'statusName', headerName: <Typography variant='h5' fontWeight={'bold'} >Trạng thái</Typography>, type: '', width: 200, headerAlign: 'center', align: 'center', renderCell: (params) => {
            const status = params.row.statusName;
            let label, variant, color, icon;
            if (status === 'Chấp nhận') {
                label = status;
                icon = <CheckCircleIcon color='success' />;
                variant = 'outlined';
                color = 'success';
            } else {
                label = status;
                icon = <CancelIcon color='error' />;
                variant = 'outlined';
                color = 'error';
            }

            return (
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                    <ChipCustom label={label} variant={variant} width={'120px'} color={color} icon={icon} />
                </Box>
            );
        },
    },
];

export default function WithdrawalHistory({ dispatch, accessToken }) {

    const apiRef = useGridApiRef();

    const [page, setPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(5);

    const [searchValue, setSearchValue] = useState("");

    const withdrawalList = useSelector((state) => state.withdrawal.withdrawalList)
    const [count, setCount] = useState(0)

    useEffect(() => {

        const data = {
            pageNum: page,
            pageSize: rowPerPage,
            searchValue: searchValue,
            status: 2
        }

        if (count !== 0) {
            getWithdrawalList(data, dispatch, accessToken);
        }
    }, [page, searchValue, count])


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
                <Button sx={{ ml: '26px', px: '50px', backgroundColor: themes.palette.grey.light, color: 'black' }} onClick={() => setSearchValue('')}> <Typography variant='body1' textTransform={'none'}> Tất cả</Typography></Button>
            </Box>
            {withdrawalList?.isFetching ?
                <Box sx={{ display: 'flex', width: '100%', height: '50vh', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
                :
                <TableCustom rows={withdrawalList?.list?.data?.content} totalPage={withdrawalList?.list?.data?.totalPages} columns={title} m={'0px 15px 0px 0px'} height={'30px'} fontSize={'20px'} rowHeight={150} sizeOption={[5, 10, 15]} defaultPageSize={5} page={page} setPage={setPage} rowPerPage={rowPerPage} setRowPerPage={setRowPerPage} />
            }
        </Stack>
    )
}


