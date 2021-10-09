import React from 'react';
import { Paper,} from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginBottom: theme.spacing(2)
//   }
// }))

export default function Post({ image, title, body, variant = 'filled', ...props }) {
  // const classes = useStyles();

  return (
    <Paper>
      <h4>{title}</h4>
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
        srcSet={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
        alt={title}
        loading="lazy"
        height={320}
        width={320}
      />
      <p>{body}</p>
    </Paper>
  );
}