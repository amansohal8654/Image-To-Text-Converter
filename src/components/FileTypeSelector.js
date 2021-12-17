import * as React from 'react';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function FileTypeSelector({handleFileType}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          File Type
        </InputLabel>
        <NativeSelect
          onChange={(e) => handleFileType(e)}
          defaultValue={"PDF"}
          inputProps={{
            name: 'FIle Type',
            id: 'uncontrolled-native',
          }}
        >
          <option value={"PDF"}>PDF</option>
          <option value={"EXCEL"}>EXCEL</option>
          <option value={"DOCX"}>DOCX</option>
          <option value={"COL-EXCEL"}>COL-EXCEL</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}