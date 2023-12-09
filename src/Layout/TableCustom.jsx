import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PaginationCustom from "./PaginationCustom";




function FooterCustom({ page, rowPerPage, setPage, setRowPerPage, totalPage }) {
  return (
    <Box width={'100%'}  >
      <PaginationCustom page={page} setPage={setPage} rowPerPage={rowPerPage} setRowPerPage={setRowPerPage} totalPage={totalPage} />
    </Box>
  );
}

function TableCustom({ rows, columns, m, fontSize, rowHeight, sizeOption, page, totalPage, rowPerPage, setPage, setRowPerPage }) {

  const data = rows || [];
  let dataWithId = [];
  if (data && data.length > 0) {
    dataWithId = data.map((record, index) => ({
      ...record,
      id: (page - 1) * rowPerPage + index + 1, 
    }));
  }
 
  return (
    <Box sx={{ width: '100%' }} textAlign={'center'} justifyContent={'center'}>
      <DataGrid
        rows={dataWithId}
        columns={columns}
        sx={{
          fontSize, m, '.MuiDataGrid-overlayWrapper': {
            height: '400px', 
          },
        }}
        pageSizeOptions={sizeOption}
        disableRowSelectionOnClick
        rowHeight={rowHeight}
        localeText={{ noRowsLabel: 'Không có thông tin' }}
        experimentalFeatures={{ columnGrouping: true }}
        components={{
          Footer: (props) => <FooterCustom {...props} page={page} rowPerPage={rowPerPage} setPage={setPage} setRowPerPage={setRowPerPage} totalPage={totalPage || 0} />
        }}
      />
    </Box>
  );
}

export default TableCustom;