import { Button, makeStyles, Box, Container, Paper } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { MainLayout } from '../layouts'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },

    title: {
      padding: theme.spacing(2),
      background: theme.palette.background.title
    },

    continer: {
      flexGrow: 1,
      display: 'flex',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
      background: '#fff'
    },
    content: {
      flexGrow: 1,
      borderBottom: 'none',
    }
  }
});

export default function Login() {
  const classes = useStyles();

  return (
    <MainLayout>
     
    </MainLayout>
  )
}