import React, { useState} from 'react';

import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import { useTheme } from '@mui/material/styles';

import SignIn from './components/SignIn';
import SnackBar from '../../components/SnackBar';
// import SwitchTheme from '../../components/SwitchTheme';
import MonkeyLogo from '../../assets/logo-monkey.png';
import Sphere from '../../components/Sphere';

export default function Login() {
  const theme = useTheme();
  const [snackBar, setSnackBar] = useState({
    open: false,
    text: '',
    alertType: 'error',
  });

  return (
    <Box
      
      sx={{
        minHeight: '100vh',
        display: { sm: 'flex' },
        flexDirection: { sm: 'row-reverse' },
      }}
    >
      <Stack
        sx={{
          width: { sm: '50%' },
          height: { sm: '100vh' },
          position:'relative',
          backgroundColor: {
            sm: `${theme.palette.mode === 'dark' ? '#1C1917' : '#F3F4F8'}`,
          },
        }}
        alignItems="center"
      >
        {/* <Stack direction={'row'} justifyContent={'flex-start'} alignSelf="flex-start" pl={4} pt={4}>
          <SwitchTheme />
        </Stack> */}

        <Sphere/>
          
          <img className='center-absolute' src={MonkeyLogo} alt="Background Image for Login" width={250}  />
        
      </Stack>
      <Box
        sx={{
          width: { sm: '50%' },
          height: { sm: '100vh' },
          backgroundColor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SignIn snackBar={snackBar} setSnackBar={setSnackBar} />
      </Box>
      <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
    </Box>
  );
}