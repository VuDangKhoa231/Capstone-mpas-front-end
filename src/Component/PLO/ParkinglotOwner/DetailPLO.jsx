import { Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import themes from '../../../theme/themes';
import Rating from '../../../Layout/Rating';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PaginationCustom from '../../../Layout/PaginationCustom';
import { getDetailPLO, getDetailRatingPLO } from '../../../api/plo';
import { useDispatch, useSelector } from 'react-redux';



export default function DetailPLO() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth)
    const plo = useSelector((state) => state.plo.detailPLO)
    const rating = useSelector((state) => state.plo.rating)
    useEffect(() => {
        getDetailPLO(id, dispatch, user?.login?.accessToken)
    }, []);

    console.log(rating);
    //Feedback pagination
    const [page, setPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(5);
    const [count, setCount] = useState(0)
    useEffect(() => {
        const data = {
            pageNum:   page,
            pageSize: rowPerPage,
            ploID: id
        }
        if (count !== 0) {
            getDetailRatingPLO(data, dispatch, user?.login.accessToken)
        }
    }, [page, rowPerPage, count])


    useEffect(() => {
        if (page !== 1) {
            setPage(1)
        }
        setCount(count + 1)
    }, [rowPerPage]);

    const openGoogleMaps = () => {
        if (plo?.plo?.data?.latitude && plo?.plo?.data?.longtitude) {
            // Tạo URL Google Maps với kinh độ và vĩ độ từ  plo?.plo.data.locationMap
            const googleMapsUrl = `https://www.google.com/maps?q=${plo?.plo?.data?.latitude},${plo?.plo?.data?.longtitude}`;

            // Mở Google Maps trong một tab mới
            window.open(googleMapsUrl, '_blank');
        }
    };

    const contractLink = () => {
        if (plo?.plo?.data?.contractLink) {
            window.open(plo?.plo?.data?.contractLink, '_blank');
        }
    };




    return (
        <>
            {plo?.isFetching ?
                <Box sx={{ display: 'flex', width: '100%', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
                :
                <Stack direction='column' p='10px' spacing={2}>
                    {/* Header */}
                    <Typography variant='h2'>Thông tin chi tiết</Typography>

                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="medium" />}
                        aria-label="breadcrumb"
                    >
                        <Link underline="hover" key="1" color="inherit" to="/PLO" style={{ textDecoration: 'none', color: themes.palette.primary, fontWeight: 'bold' }}>
                            Danh sách chủ bãi xe
                        </Link>,
                        <Typography key="3" color="text.primary" fontWeight={'bold'}>
                            {plo?.plo?.data?.fullName}
                        </Typography>
                    </Breadcrumbs>

                    {/* detail PLO */}
                    <Grid container px={'20px'} spacing={1}>
                        <Grid item xs={6}>
                            <Stack direction={'column'} spacing={1.5}>
                                <Typography variant='h4' fontWeight={'bold'}> Chi tiết chủ bãi xe</Typography>
                                <Typography variant='h5' fontWeight={'bold'}>Tên: {plo?.plo?.data?.fullName}</Typography>
                                <Typography variant='h6'>Số điện thoại: {plo?.plo?.data?.phoneNumber}</Typography>
                                {plo?.plo?.data?.email ?
                                    <Typography variant='h6'>Email: {plo?.plo?.data?.email}</Typography>
                                    : <></>}
                                {/* <Typography variant='h6'>Thời hạn hợp đồng : { plo?.plo.data.contractTerm}</Typography> */}
                                <Typography variant='h6'>Thời gian kết thúc: {plo?.plo?.data?.contractDuration}</Typography>
                                <Box pt={'20px'}>
                                    <Button variant='contained' sx={{ p: '15px', width: '300px', backgroundColor: themes.backgroundColor }} onClick={contractLink}>
                                        Xem hợp đồng
                                    </Button>
                                </Box>
                                {/* realtime */}
                                <Box>
                                    <Box display={'flex'} justifyContent={'space-around'} mt={'100px'}>

                                        <Paper elevation={3} square={false} sx={{ p: '20px', textAlign: 'center', backgroundColor: themes.palette.grey.medium, width: '22%', height: '100px' }}>
                                            <Typography variant='h5'>Chiều dài (m)</Typography>
                                            <Typography variant='h4' fontWeight={'bold'} mt={'20px'}>{plo?.plo?.data?.width}</Typography>
                                        </Paper>


                                        <Paper elevation={3} square={false} sx={{ p: '20px', textAlign: 'center', backgroundColor: themes.palette.grey.medium, width: '22%', height: '100px' }}>
                                            <Typography variant='h5'>Chiều rộng (m)</Typography>
                                            <Typography variant='h4' fontWeight={'bold'} mt={'20px'}>{plo?.plo?.data?.length}</Typography>
                                        </Paper>

                                        <Paper elevation={3} square={false} sx={{ p: '20px', textAlign: 'center', backgroundColor: themes.palette.grey.medium, width: '22%', height: '100px' }}>
                                            <Typography variant='h5'>Số chỗ</Typography>
                                            <Typography variant='h4' fontWeight={'bold'} mt={'20px'}>{plo?.plo?.data?.slot}</Typography>
                                        </Paper>
                                    </Box>
                                </Box>
                            </Stack>
                        </Grid>
                        {/* Parking Area */}
                        <Grid item xs={1} />
                        <Grid item xs={5}>
                            <Stack direction={'column'} spacing={1.5}>
                                <Typography variant='h4' fontWeight={'bold'}> Thông tin bãi xe </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography variant='h5' mr='10px' fontWeight={'bold'}>{plo?.plo?.data?.parkingName}</Typography>
                                    <Rating props={plo?.plo?.data?.star} />
                                </Box>
                                <Typography variant='h6'>Địa chỉ: {plo?.plo?.data?.address}</Typography>
                                <Box display={'flex'}>
                                    <PersonPinCircleIcon fontSize='large' />
                                    <Button variant="text" color="primary" onClick={openGoogleMaps}>
                                        <Typography variant='h6'>
                                            {plo?.plo?.data?.latitude}, {plo?.plo?.data?.longtitude}
                                        </Typography>
                                    </Button>
                                </Box>
                                <Box display={'flex'} alignItems={'center'}>
                                    <Typography variant='h6' marginRight={'10px'}>Trạng thái bãi xe:</Typography>

                                    {plo?.plo?.data?.parkingStatusID === 3 ? <Chip label={"Mới đăng ký"} color='primary' variant="filled" /> : (plo?.plo?.data?.parkingStatusID === 4 ? <Chip label={"Đang hoạt động"} color='success' variant="filled" /> : <Chip label={"Dừng hoạt động"} color='error' variant="filled" />)}
                                </Box>

                                {/* Fee Information  */}

                                <Typography variant='h4' paddingTop={'50px'} fontWeight={'bold'}> Thông tin phí và phương thức đỗ xe  </Typography>
                                {
                                    plo?.plo?.data?.morningFee != 0 &&
                                    <Box>
                                        <Typography variant='h5' > Ban ngày</Typography>
                                        <Box display={'flex'} justifyContent={'space-between'} paddingRight={'200px'} mt={'25px'}>
                                            <Typography> Mức phí</Typography>
                                            <Typography> {plo?.plo?.data?.morningFee} VNĐ</Typography>
                                        </Box>
                                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} paddingRight={'200px'}>
                                            <Typography> Thời gian hoạt động</Typography>
                                            <Typography>6 AM </Typography>
                                            <ArrowRightAltIcon fontSize='large' />
                                            <Typography>18 PM </Typography>
                                        </Box>
                                    </Box>
                                }
                                {
                                    plo?.plo?.data?.eveningFee != 0 &&
                                    <Box>
                                        <Typography variant='h5' > Ban đêm</Typography>
                                        <Box display={'flex'} justifyContent={'space-between'} paddingRight={'200px'} mt={'25px'}>
                                            <Typography> Mức phí</Typography>
                                            <Typography> {plo?.plo?.data?.eveningFee}</Typography>
                                        </Box>
                                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} paddingRight={'200px'}>
                                            <Typography> Thời gian hoạt động</Typography>
                                            <Typography>18 PM </Typography>
                                            <ArrowRightAltIcon fontSize='large' />
                                            <Typography>6 AM </Typography>
                                        </Box>
                                    </Box>
                                }
                                {
                                    plo?.plo?.data?.overNightFee != 0 &&
                                    <Box>
                                        <Typography variant='h5' > Qua đêm</Typography>
                                        <Box display={'flex'} justifyContent={'space-between'} paddingRight={'200px'} mt={'25px'}>
                                            <Typography> Mức phí</Typography>
                                            <Typography> {plo?.plo?.data?.overNightFee}</Typography>
                                        </Box>
                                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} paddingRight={'200px'}>
                                            <Typography> Thời gian hoạt động</Typography>
                                            <Typography>24h </Typography>
                                        </Box>
                                    </Box>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box px={'20px'} maxWidth={'1540px'}>
                        <Typography variant='h4' fontWeight={'bold'}> Hình ảnh bãi xe </Typography>
                        <Box display={'flex'} flexDirection={'row'} sx={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                            {plo?.plo?.data?.images && plo?.plo?.data?.images.length > 0 ? (
                                plo?.plo?.data?.images.map((image, index) => (
                                    <img key={index} src={`${image.imageLink}`} width={'400px'} height={'300px'} style={{ margin: '10px 30px 10px 0px' }} />
                                ))
                            ) : (
                                <Typography variant='h6'>Không có hình ảnh</Typography>
                            )}
                        </Box>
                    </Box>
                    <Box px={'20px'}>
                        <Typography variant='h4' fontWeight={'bold'}> Phản hồi và đánh giá</Typography>
                        {rating?.isFetching ? (
                            <Box sx={{ display: 'flex', width: '100%', height: '10vh', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) :
                            (<>
                                {rating?.data?.data?.content?.length > 0 ?
                                    <>
                                        {rating?.data?.data?.content?.map((item, index) => {
                                            const dateObject = new Date(item.feedbackDate);

                                            // Lấy giờ, phút và giây
                                            const hours = dateObject.getUTCHours();
                                            const minutes = dateObject.getUTCMinutes();
                                            const seconds = dateObject.getUTCSeconds();

                                            // Lấy ngày, tháng và năm
                                            const day = dateObject.getUTCDate();
                                            const month = dateObject.getUTCMonth() + 1; // Tháng bắt đầu từ 0
                                            const year = dateObject.getUTCFullYear();
                                            const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
                                            return (
                                                <Box key={index} sx={{ backgroundColor: themes.palette.grey.light, borderRadius: '10px', p: '20px', mt: '20px' }} >
                                                    <Grid container>
                                                        <Grid item xs={7} display={'flex'} flexDirection={'row'}>
                                                            <Typography variant='h6' mr={'10px'} fontWeight={'bold'}>{item.fullName} </Typography>
                                                            <Rating props={item.star} />
                                                        </Grid>
                                                        <Grid item xs={5} textAlign={'end'}>
                                                            <Typography variant='h6'>{formattedDate}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                
                                                    <Box display={'flex'} flexDirection={'row'}>
                                                        <Typography variant='h6' mr={'10px'}>Nội dung:</Typography>
                                                        <Typography variant='h6' color={themes.palette.grey.dark}>{item.content}</Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                        <PaginationCustom page={page} setPage={setPage} rowPerPage={rowPerPage} setRowPerPage={setRowPerPage} totalPage={rating?.data?.data?.totalPages} />
                                    </>
                                    : (
                                        <Box>
                                            <Typography variant='h6'>Không có bình luận</Typography>
                                        </Box>
                                    )}
                            </>)}
                    </Box>
                </Stack>
            }
        </>

    )
}
