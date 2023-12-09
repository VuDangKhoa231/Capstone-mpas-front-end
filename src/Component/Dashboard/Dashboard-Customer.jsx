import PhoneIcon from '@mui/icons-material/Phone';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Grid, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import themes from '../../theme/themes';
import { useSelector } from 'react-redux';
import { getChartCustomer, getDashboardCus } from '../../api/dashboard';






export default function DashboardCustomer({ dispatch, accessToken }) {
    dayjs.locale('vi');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const minDate = dayjs('2023-08-01');
    const maxDate = dayjs();
    const dashboardCustom = useSelector((state) => state.dashboard.customer)
    const dashboardChart = useSelector((state) => state.dashboard.customerChart)



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
            title: ` Sơ đồ lượng khách hàng đăng ký tháng ${selectedDate.format('MM/YYYY')}`,
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
        getChartCustomer(data, dispatch, accessToken);
        getDashboardCus(data, dispatch, accessToken);
    }, [selectedDate])

    return (
        <>
            <Typography variant='h4' sx={{ fontWeight: 'bold', m: '50px 0px 20px 0px' }}>Khách hàng</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                    label="Tháng"
                    views={['month', 'year']}
                    maxDate={maxDate}
                    minDate={minDate}
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



            <Box m={'50px'} display={'flex'} justifyContent={'center'}>
                <Paper elevation={6} sx={{ borderRadius: '10px', p: '20px', width: '70%', minHeight: '280px'  }}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}> Top 5 khách hàng có nhiều lượt đặt chỗ nhiều nhất {selectedDate.format('MM/YYYY')}</Typography>
                    </Box>
                    {dashboardCustom?.data?.data.map((item, index) => (
                        <Grid container key={index} sx={{ backgroundColor: themes.palette.grey.light, p: '5px 10px', borderRadius: '10px', mt: '10px', ':hover': { backgroundColor: themes.backgroundColor, color: 'white' } }}>
                            <Grid item xs={6} display={'flex'} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} alignItems={'center'}>
                                <Typography variant='h5' mr={'20px'}>{index + 1}</Typography>
                                <Tooltip title={`${item.fullName}`} placement="top">
                                <Typography variant='h5'>{item.fullName}</Typography>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={5} display={'flex'} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} alignItems={'center'}>
                                <PhoneIcon fontSize='medium' />
                                <Typography variant='h5' ml={'5px'}> {item.phoneNumber}</Typography>
                            </Grid>
                            <Grid item xs={1} display={'flex'} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} justifyContent={'space-between'} alignItems={'center'}> 
                                <WorkspacePremiumIcon fontSize='medium' />
                                <Typography variant='h5' ml={'5px'}> {item.total}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                    {dashboardCustom?.data?.data.length === 0 &&
                        <Stack p={'20px'} alignItems={'center'}>
                            <img src='../image/no-results.png' style={{ width: '27%' }} />
                            <Typography variant='h5'>NOT FOUND DATA!</Typography>
                        </Stack>
                    }
                </Paper>
            </Box>
        </>
    )
}
