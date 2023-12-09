import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Grid, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { useSelector } from 'react-redux';
import { getChartPLO, getDashboardPLOParking, getDashboardPLOTop5ParkingRevenue } from '../../api/dashboard';
import themes from '../../theme/themes';


export default function DashboardPLO({ dispatch, accessToken }) {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const minDate = dayjs('2023-08-01');
    const maxDate = dayjs();
    const dashboardPLOParking = useSelector((state) => state.dashboard.ploParking)
    const dashboardPLOParkingRevenue = useSelector((state) => state.dashboard.ploParkingRevenue)
    const dashboardChart = useSelector((state) => state.dashboard.ploChart)

    //chart

    const dataChart = dashboardChart?.data?.map(item => [item.weekName, item.total]);
    let options = null;
    if (dataChart) {
        dataChart && dataChart.unshift([
            { type: 'string', label: 'Tháng' },
            { type: 'number', label: 'Tổng lượt đăng ký' },
        ]);


        const dataMax = Math.max(...dataChart.slice(1).map(row => row[1]));
        const vAxisMax = dataMax + 5;

        options = {
            title: ` Sơ đồ lượng đăng ký bãi đỗ  tháng ${selectedDate.format('MM/YYYY')}`,
            titleTextStyle: {
                fontSize: 30,
            },
            hAxis: { title: `Các tuần tháng ${selectedDate.format('MM/YYYY')}`, titleTextStyle: { fontSize: 20 } },
            vAxis: { title: "Số lượng người đăng ký", format: '0', viewWindow: { min: 0, max: vAxisMax }, titleTextStyle: { fontSize: 20 } },
            bar: { groupWidth: '20%' },
            legend: 'none'
        };
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    useEffect(() => {
        const data = {
            month: selectedDate.get('month') + 1,
            year: selectedDate.get('year')
        }
        getDashboardPLOParking(data, dispatch, accessToken)
        getDashboardPLOTop5ParkingRevenue(data, dispatch, accessToken)
        getChartPLO(data, dispatch, accessToken)
    }, [selectedDate])

    return (
        <>
            <Typography variant='h4' sx={{ fontWeight: 'bold', m: '50px 0px' }}>Chủ bãi đỗ</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                    label="Tháng"
                    views={['month', 'year']}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={handleDateChange}
                    value={selectedDate}
                />
            </LocalizationProvider>

            <Chart
                width='100%'
                height={'800px'}
                chartType="ColumnChart"
                data={dataChart}
                options={options}
                loader={<div>Loading Chart...</div>}
            />



            <Grid container spacing={3} mt={'3px'} mb={'10px'} >
                <Grid item xs={6}>
                    <Paper elevation={6} sx={{ borderRadius: '10px', p: '20px' ,minHeight: '280px'  }} >
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}> Top 5 bãi đỗ có lượng đặt cao nhất {selectedDate.format('MM/YYYY')}</Typography>
                        {dashboardPLOParking?.data?.map((item, index) => (
                            <Grid container key={index} sx={{ backgroundColor: themes.palette.grey.light, p: '5px 10px', borderRadius: '10px', mt: '10px', ':hover': { backgroundColor: themes.backgroundColor, color: 'white' } }}>
                                <Grid item xs={6} display={'flex'}>
                                    <Typography variant='h6' mr={'15px'}>{index + 1}</Typography>
                                    <Tooltip title={`${item.parkingName}`} placement="top">
                                    <Typography variant='h6'  sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.parkingName}</Typography>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={4.8} display={'flex'} alignItems={'center'} >
                                    <AccountCircleIcon fontSize='medium' />
                                    <Tooltip title={`${item.fullName}`} placement="top">
                                    <Typography variant='h6' ml={'5px'} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {item.fullName}</Typography>
                                    </Tooltip>
                                </Grid>
                                <Grid xs={0.2}/>
                                <Grid item xs={1} display={'flex'} alignItems={'center'} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} justifyContent={'space-between'}> 
                                    <WorkspacePremiumIcon fontSize='medium' />
                                    <Typography variant='h6' ml={'5px'}> {item.total}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                        {dashboardPLOParking?.data?.length === 0 &&
                            <Stack justifyContent={'center'} p={'20px'} alignItems={'center'}>
                                <img src='../image/no-results.png' style={{ width: '27%' }} />
                                <Typography variant='h5'>NOT FOUND DATA!</Typography>
                            </Stack>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={6} sx={{ borderRadius: '10px', p: '20px', minHeight: '280px' }}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}> Top 5 bãi đỗ có doanh thu cao nhất {selectedDate.format('MM/YYYY')}</Typography>
                        {dashboardPLOParkingRevenue?.data?.map((item, index) => (
                            <Grid container key={index} display={'flex'} justifyContent={'space-between'} sx={{ backgroundColor: themes.palette.grey.light, p: '5px 10px', borderRadius: '10px', mt: '10px', ':hover': { backgroundColor: themes.backgroundColor, color: 'white' } }}>
                                <Grid item xs={5} display={'flex'}>
                                    <Typography variant='h6' mr={'15px'}>{index + 1}</Typography>
                                    <Tooltip title={`${item.parkingName}`} placement="top">
                                    <Typography variant='h6' sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.parkingName}</Typography>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={4} display={'flex'} alignItems={'center'}>
                                    <AccountCircleIcon fontSize='medium' />
                                    <Tooltip title={`${item.fullName}`} placement="top">
                                    <Typography variant='h6' ml={'5px'} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {item.fullName}</Typography>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={0.2}/>
                                <Grid item xs={2.8} display={'flex'} alignItems={'center'} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} justifyContent={'space-between'}>
                                    <LocalAtmIcon fontSize='medium' />
                                    <Typography variant='h6' ml={'5px'}> {item.revenue}VNĐ</Typography>
                                </Grid>
                            </Grid>
                        ))}
                        {dashboardPLOParkingRevenue?.data?.length === 0 &&
                            <Stack justifyContent={'center'} p={'20px'} alignItems={'center'}>
                                <img src='../image/no-results.png' style={{ width: '27%' }} />
                                <Typography variant='h5'>NOT FOUND DATA!</Typography>
                            </Stack>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
