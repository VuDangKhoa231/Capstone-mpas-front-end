import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';

function SnackbarCutom() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      // Mở Snackbar và bắt đầu đếm thời gian 3 giây
      setOpen(true);
      const timer = setTimeout(() => {
        // Đóng Snackbar sau 3 giây
        setOpen(false);
      }, 30000);

      return () => {
        // Hủy bỏ timer nếu component bị unmounted trước khi Snackbar đóng
        clearTimeout(timer);
      };
    }
  }, [loading]);

  return (
    <div>
      <button onClick={() => setLoading(true)}>Bắt đầu</button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000} // Để đảm bảo Snackbar tự động đóng sau 3 giây
        onClose={() => setOpen(false)}
        message="Xử lý hoàn tất"
      >
        <LinearProgress color="secondary" />
      </Snackbar>
    </div>
  );
}

export default SnackbarCutom;