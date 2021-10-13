import React from 'react';
import { useIntl } from 'react-intl';

import { TextField } from '@mui/material';

export default function TextInput({ name, label, onChange, value, ...props }) {
  const { formatMessage } = useIntl();

  return (
    <TextField
      sx={{ marginY: 2 }}
      fullWidth
      name={name}
      label={formatMessage({
        id: label,
        defaultMessage: label
      })}
      value={value}
      onChange={e => onChange(e.target.value)}
      {...props}
    />
  );
}