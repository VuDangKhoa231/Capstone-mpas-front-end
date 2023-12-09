import { Rating } from '@mui/material';
import React from 'react'

function RatingCustom({ props }) {
    return (
        <Rating name="read-only" value={props} readOnly />
    )
}

export default RatingCustom;