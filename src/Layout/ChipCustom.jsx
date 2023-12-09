import React from 'react';
import Chip from '@mui/material/Chip';

function ChipCustom({ label, variant, backgroundColor,color, width , icon}) {
  return (
    <Chip
      label={label}
      variant={variant}
      icon={icon}
      size='small'
      sx={{ width, padding: 'auto' , backgroundColor: backgroundColor, color: color ? color : 'white'}}
    />
  );
}

export default ChipCustom;