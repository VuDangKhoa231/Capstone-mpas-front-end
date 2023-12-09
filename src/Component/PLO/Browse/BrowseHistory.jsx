import { Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import themes from '../../../theme/themes';
import SearchBar from '../../../Layout/SearchBar';
import TableCustom from '../../../Layout/TableCustom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrowseHistory, getDetailBrowse } from '../../../api/browse';
// const data = [
//     {
//         id: 1, parkingName: 'Khách sạn Romantic', fullName: 'Mai Hoàng Tâm', phoneNumber: '0357280619', address: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/02/2023', approveDate: '12/02/2023'
//     },
//     {
//         id: 2, parkingName: 'Khách sạn Romantic', fullName: 'Mai Hoàng Tâm 2', phoneNumber: '0357280619', address: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/02/2023', approveDate: '12/02/2023'
//     },
//     {
//         id: 3, parkingName: 'Khách sạn Romantic', fullName: 'Mai Hoàng Tâm 3', phoneNumber: '0357280619', address: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/02/2023', approveDate: '12/02/2023'
//     },
//     {
//         id: 4, parkingName: 'Khách sạn Romantic', fullName: 'Mai Hoàng Tâm 3', phoneNumber: '0357280619', address: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/02/2023', approveDate: '12/02/2023'
//     },
//     {
//         id: 5, parkingName: 'Khách sạn Romantic', fullName: 'Mai Hoàng Tâm 3', phoneNumber: '0357280619', address: '681A Đ. Nguyễn Huệ, Bến Nghé, Quận 1, TP HCM', registrationDate: '12/02/2023', approveDate: '12/02/2023'
//     }
// ]


const title = [
    { field: 'id', headerName: <Typography variant='h5' fontWeight={'bold'}>ID</Typography>, width: 60, hideable: false },
    {
        field: 'parkingName', headerName: (<Typography variant='h5' fontWeight={'bold'}>Tên</Typography>), width: 290, hideable: false, renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'start' }}>
                {params.value}
            </div>
        ),
    },
    { field: 'fullName', headerName: (<Typography variant='h5' fontWeight={'bold'}>Chủ bãi</Typography>), width: 290, hideable: false, },
    {
        field: 'registerContract', headerName: <Typography variant='h5' fontWeight={'bold'}>Ngày gửi</Typography>, type: 'Date', headerAlign: 'center', align: 'center', width: 180, valueFormatter: (params) => {
            const date = new Date(params.value);

        }
    },
    { field: 'phoneNumber', headerName: <Typography variant='h5' fontWeight={'bold'}>Số điện thoại</Typography>, width: 230, headerAlign: 'center', align: 'center' },
    {
        field: 'address', headerName: <Typography variant='h5' fontWeight={'bold'}>Địa chỉ bãi xe</Typography>, headerAlign: 'center', width: 290, renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'start' }}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'browseContract', headerName: <Typography variant='h5' fontWeight={'bold'}>Ngày phê duyệt</Typography>, type: 'Date', headerAlign: 'center', align: 'center', width: 230, valueFormatter: (params) => {
            const date = new Date(params.value);
        }
    },
];


export default function BrowseHistory() {
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(5)
    const browseList = useSelector((state) => state.browse.browseHistory)
    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)
    useEffect(() => {

        const data = {
            pageNum: page,
            pageSize: rowPerPage,
            searchValue: searchValue
        }
        if (count !== 0) {
            getBrowseHistory(data, dispatch, user?.login.accessToken)
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
                <Button sx={{ ml: '26px', px: '50px', backgroundColor: themes.palette.grey.light, color: 'black' }} onClick={() => setSearchValue("")}> <Typography variant='body1' textTransform={'none'}> Tất cả</Typography></Button>
            </Box>
            {browseList?.isFetching ? (
                <Box sx={{ display: 'flex', width: '100%', height: '50vh', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box mt={5}>
                    <TableCustom rows={browseList?.browse?.data?.content} columns={title} m={'0px 15px 0px 0px'} page={page} setPage={setPage} rowPerPage={rowPerPage} setRowPerPage={setRowPerPage} totalPage={browseList?.browse?.data?.totalPages} fontSize={'20px'} rowHeight={110} sizeOption={[5, 10, 15]} defaultPageSize={5} />
                </Box>
            )}
        </Stack>
    )

}
