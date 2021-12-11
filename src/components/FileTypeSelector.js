import * as React from 'react';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function FileTypeSelector() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          File Type
        </InputLabel>
        <NativeSelect
          defaultValue={"PDF"}
          inputProps={{
            name: 'FIle Type',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>PDF</option>
          <option value={20}>EXCEL</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}