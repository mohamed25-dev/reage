import React from 'react';
import { useIntl } from 'react-intl';

import TextField from '@material-ui/core/TextField';
import { FormControl, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}))

export default function TextInput({ name, label, onChange, variant, value, ...props }) {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  return (
    <FormControl fullWidth className={classes.root}>
      <TextField
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
    </FormControl>
  );
}