import { useHistory } from 'react-router-dom';
import { Pagination, Box } from '@mui/material';


export default function Pages({count, page = 1, onChange, props}) {
  const history = useHistory();
  const changeHandler = (e, page) => {
    history.push(`/?p=${page}`);
  }

  return (
    <Box display="flex" justifyContent="center" p={3}>
      <Pagination
        count={count}
        variant="outlined"
        color="primary"
        page={page}
        onChange={onChange}
      />
    </Box>
  )
}