import React from 'react';
import { useIntl } from 'react-intl';
import TextField from '@mui/material/TextField';


export default function TextInput({ name, label, onChange, variant, value, ...props }) {
  const { formatMessage } = useIntl();

  return (
    <TextField
      sx={{ marginY: 2 }}
      variant={variant}
      fullWidth
      name={name}
      value={value}
      label={formatMessage({
        id: label,
        defaultMessage: label
      })}
      onChange={e => onChange(e.target.value)}
      {...props}
    />
  );
}