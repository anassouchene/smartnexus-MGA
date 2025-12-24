import ShieldIcon from '@mui/icons-material/Shield';
import {
  Alert,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?insurance,technology)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)', // Overlay color based on primary theme
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2, color: 'white', textAlign: 'center', p: 4 }}>
          <ShieldIcon sx={{ fontSize: 80, mb: 2, color: theme.palette.secondary.main }} />
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Smart Nexus
          </Typography>
          <Typography variant="h5">
            La plateforme d'assurance intelligente de nouvelle génération
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
             <ShieldIcon sx={{ color: theme.palette.primary.main, fontSize: 40 }} />
             <Typography variant="h4" component="div" color="primary" fontWeight="bold">
               Smart Nexus
             </Typography>
          </Box>
          
          <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'text.secondary' }}>
            Connexion à votre espace
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                textTransform: 'none'
              }}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item xs>
                <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
                  Mot de passe oublié ?
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  © 2025 Smart Nexus Inc.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
