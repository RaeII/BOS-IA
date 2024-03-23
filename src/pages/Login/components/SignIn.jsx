import React, { useEffect, useState,useContext } from 'react';

import {
  Button,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import EmailInput from '../../../components/EmailInput';
import PasswordInput from '../../../components/PasswordInput';
import { AuthContext } from '../../../contexts/auth';


//import { login } from '../../../api/login_api';

// import { login } from '../../../Api/login_api';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Desenvolvido por © '}
      <Link color="inherit" href="https://monkeybranch.com">
        Monkey Branch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn({ snackBar, setSnackBar }) {
  const {login} = useContext(AuthContext);
  const [form, setForm] = useState({
    email: {
      value: '',
      error: false,
      label: 'Email',
      disabled: false,
      required: true,
      helperText: 'Verifique seus dados.',
    },
    password: {
      show: false,
      error: false,
      value: '',
      label: 'Senha',
      disabled: false,
      required: true,
      helperText: 'Verifique seus dados',
    },
    submitBtn: {
      disabled: true,
      text: 'Entrar',
      loading: false,
    },
  });
  const [isOpenBackDrop, setIsOpenBackDrop] = useState(false);

  const handleChangeEmail = (e) => {
    setForm({
      ...form,
      email: {
        ...form.email,
        value: e.target.value,
      },
    });
  };

  const handleChangePassword = (e) => {
    setForm({
      ...form,
      password: {
        ...form.password,
        value: e.target.value,
      },
    });
  };

  const handleViewPassword = () => {
    setForm({
      ...form,
      password: {
        ...form.password,
        show: !form.password.show,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      if (form.email.value && form.password.value) {
        setIsOpenBackDrop(true);
        
        await login(
          form.email.value,
          form.password.value
        );
        
        setSnackBar({
          ...snackBar,
          open: true,
          text: 'Login efetuado com sucesso',
          alertType: 'success',
        });

      } else {
        setForm({
          ...form,
          password: {
            ...form.password,
            error: true,
          },
          email: {
            ...form.email,
            error: true,
          },
        });
      }
    } catch (error) {
   
      setSnackBar({
        ...snackBar,
        open: true,
        text: 'Verifique seus dados',
        alertType: 'error',
      });
    } finally {
      setIsOpenBackDrop(false);
    }
  };

  useEffect(() => {
    if (form.email.value && form.password.value) {
      setForm({
        ...form,
        submitBtn: {
          ...form.submitBtn,
          disabled: false,
        },
      });
    } else {
      setForm({
        ...form,
        submitBtn: {
          ...form.submitBtn,
          disabled: true,
        },
      });
    }
  }, [form.email, form.password]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: { sm: 'flex' },
            flexDirection: { sm: 'column' },
            justifyContent: { sm: 'flex-start' },
          }}
        >
          <Typography component="h1" variant="h4" fontWeight={700}>
            Bem vindo
          </Typography>
          <Typography component="h2" variant="subtitle1">
            Preencha seus dados nos campos abaixo:
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <EmailInput
            email={form.email}
            handleChangeEmail={handleChangeEmail}
          />
          <PasswordInput
            password={form.password}
            handleChangePassword={handleChangePassword}
            handleViewPassword={handleViewPassword}
          />
          {form.submitBtn.loading ? (
            <LoadingButton
              loading
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </LoadingButton>
          ) : (
            <Button
              disabled={form.submitBtn.disabled}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {form.submitBtn.text}
            </Button>
          )}

          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {'Não possui uma conta? Registre-se'}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
