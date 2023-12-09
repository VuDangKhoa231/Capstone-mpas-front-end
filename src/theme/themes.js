import { createTheme } from '@mui/material';
import React from 'react'

const themes = createTheme({
   backgroundColor: '#6EC2F7',
   palette: {
      grey: {
         light: '#E6E6E6',
         dark: '#b7b7b7',
         medium: '#f5f5f5',
      },
      green: {
         light: '#6AFF67'
      },
      red: {
         light: '#FF0000'
      }
   }
})

export default themes;