import { Box, Breadcrumbs, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DialogBrowse, DialogCustom } from '../../../Layout/DialogCustom'
import { confirmBrowse, confirmBrowseAccept, confirmBrowseDeny, getDetailBrowse } from '../../../api/browse'
import themes from '../../../theme/themes'


export default function DetailBrowse() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const browseDetail = useSelector((state) => state.browse.detailBrowse)


  //Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState();
  const navigate = useNavigate()
  const [contractLink, setContractLink] = useState('');
  const [contractDuration, setContractDuration] = useState(3);
  const [accept, setAccept] = useState(true);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };



  useEffect(() => {
    getDetailBrowse(id, dispatch, user?.login.accessToken)
  }, [])




  const handleClickConfirm = () => {
    if(accept){
      const data = {
        contractDuration: contractDuration,
        contractLink: contractLink,
        newStatus: 3,
        ploId: id,
      }
      if (contractLink && isURLValid(contractLink)) {
        confirmBrowseAccept(data, dispatch, user?.login.accessToken).then((res) => {
          navigate('/Browse')
        })
      }
    }else {
      confirmBrowseDeny(id, dispatch, user?.login.accessToken).then((res) => {
        navigate('/Browse')
      })
    }
  }

  const isURLValid = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(url);
  };


  return (
    <>
      {browseDetail?.isFetching ?
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
            <Link underline="hover" key="1" color="inherit" to="/Browse" style={{ textDecoration: 'none', color: themes.palette.primary, fontWeight: 'bold' }}>
              Danh sách kiểm duyệt
            </Link>,
            <Typography key="3" color="text.primary" fontWeight={'bold'}>
              {browseDetail?.browse?.data?.fullName}
            </Typography>
          </Breadcrumbs>


          {/* Content */}
          <Grid container px={'20px'} spacing={1}>
            <Grid item xs={5}>
              <Stack direction={'column'} spacing={1.5}>
                <Typography variant='h4' fontWeight={'bold'}> Chi tiết chủ bãi xe</Typography>
                <Typography variant='h5' fontWeight={'bold'}>Tên: {browseDetail?.browse?.data?.fullName}</Typography>
                <Typography variant='h6'>Số điện thoại: {browseDetail?.browse?.data?.phoneNumber}</Typography>
                <Typography variant='h6'>Thời gian đăng ký : {browseDetail?.browse?.data?.registerContract}</Typography>

              </Stack>
            </Grid>
            {/* Parking Area */}
            <Grid item xs={0.5} />
            <Grid item xs={6}>
              <Stack direction={'column'} spacing={1}>
                <Typography variant='h4' fontWeight={'bold'}> Thông tin bãi xe </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant='h5' mr='10px' fontWeight={'bold'}>Tên bãi: {browseDetail?.browse?.data?.parkingName}</Typography>

                </Box>
                <Typography variant='h6'>Địa chỉ: {browseDetail?.browse?.data?.address}</Typography>


                <Box>
                  <Box display={'flex'} justifyContent={'space-around'} mt={'30px '}>

                    <Paper elevation={3} square={false} sx={{ p: '20px', textAlign: 'center', backgroundColor: themes.palette.grey.medium, width: '22%', height: '100px' }}>
                      <Typography variant='h5'>Chiều dài (m)</Typography>
                      <Typography variant='h4' fontWeight={'bold'} mt={'20px'}>{browseDetail?.browse?.data?.width}</Typography>
                    </Paper>


                    <Paper elevation={3} square={false} sx={{ p: '20px', textAlign: 'center', backgroundColor: themes.palette.grey.medium, width: '22%', height: '100px' }}>
                      <Typography variant='h5'>Chiều rộng (m)</Typography>
                      <Typography variant='h4' fontWeight={'bold'} mt={'20px'}>{browseDetail?.browse?.data?.length}</Typography>
                    </Paper>

                    <Paper elevation={3} square={false} sx={{ p: '20px', textAlign: 'center', backgroundColor: themes.palette.grey.medium, width: '22%', height: '100px' }}>
                      <Typography variant='h5'>Số chỗ</Typography>
                      <Typography variant='h4' fontWeight={'bold'} mt={'20px'}>{browseDetail?.browse?.data?.slot}</Typography>
                    </Paper>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Box px={'20px'} maxWidth={'1540px'} mt={''} >
            <Typography variant='h4' fontWeight={'bold'}> Hình ảnh bãi xe </Typography>

            {browseDetail?.browse?.data?.images.length > 0 ? (
              browseDetail?.browse?.data?.images.map((image, index) => (
                <img key={index} src={`${image.imageLink}`} width={'400px'} height={'300px'} style={{ margin: '10px 30px 10px 0px' }} />
              ))
            ) : (
              <Typography variant='h6'>Không có hình ảnh</Typography>
            )}


          </Box>
          <Box px={'20px'}>
            <Typography variant='h4' mt={'40px'} fontWeight={'bold'}> Mô tả</Typography>
            <Box sx={{ backgroundColor: themes.palette.grey.light, borderRadius: '10px', p: '20px', mt: '20px' }} >
              <Typography variant='h6'>{browseDetail?.browse?.data?.description}</Typography>
            </Box>
          </Box>

          <Box display={'flex'} justifyContent={'center'}>
            <Box mt={'30px'} p={'30px'} textAlign={'center'}>
              <Typography variant='h4' mb={'40px'} fontWeight={'bold'}>Phê duyệt hoạt động?</Typography>
              <Box>
                <Button variant='contained' sx={{ p: '15px', m: 3, width: '300px', border: '1px solid transparent', backgroundColor: themes.palette.green.light, ":hover": { color: themes.palette.green.light, backgroundColor: 'white', border: `1px solid ${themes.palette.green.light}` } }} onClick={() => {setOpenDialog(true); setAccept(true)}}>
                  <Typography variant='h6'>
                    Chấp nhận
                  </Typography>
                </Button>

                <Button variant='contained' sx={{ p: '15px', m: 3, width: '300px', border: '1px solid transparent', backgroundColor: themes.palette.red.light, ":hover": { color: themes.palette.red.light, backgroundColor: 'white', border: `1px solid ${themes.palette.red.light}` } }} onClick={() => {setOpenDialog(true); setAccept(false)}}>
                  <Typography variant='h6'>
                    Hủy yêu cầu
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
          <DialogBrowse accept={accept} data={browseDetail?.browse?.data} handleClose={handleCloseDialog} open={openDialog} handleConfirm={handleClickConfirm} url={contractLink} setUrl={setContractLink} setContractLink={setContractLink} selectedValue={contractDuration} setSelectedValue={setContractDuration} />
        </Stack>
      }
    </>
  )
}
