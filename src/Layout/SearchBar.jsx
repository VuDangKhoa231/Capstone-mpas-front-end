import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import React, { useRef, useState } from 'react';
export default function SearchBar({ setDebounceSearchValue, isClear }) {
    const [searchValue, setSearchValue] = useState("");
    const typingTimeoutRef = useRef();
    const handleChange = (e) => {
        setSearchValue(e.target.value)
        
        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current)
        };
        typingTimeoutRef.current = setTimeout(() => {
            setDebounceSearchValue(e.target.value)
        }, 2000)
    };



    return (
        <div style={{ width: '500px', display: 'flex', alignItems: 'center' }}>
            <TextField
                sx={{ width: '100%' }}
                label="Tìm kiếm"
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={handleChange}/>
        </div>
    );
}