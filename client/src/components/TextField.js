import React from 'react';
import { useIntl } from 'react-intl';

import { TextField } from '@material-ui/core';
import { FormControl, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}))

export default function TextInput({ name, label, onChange, value, ...props }) {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  return (
    <FormControl fullWidth className={classes.root}>
      <TextField
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
    </FormControl>
  );
}