import {
    CheckCircle as ActiveIcon,
    Archive as ArchivedIcon,
    ArrowBack as ArrowBackIcon,
    Edit as DraftIcon,
    Description as FileIcon,
    Lock as LockIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    IconButton,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import React from 'react';

// Mock Data
const VERSIONS = [
  {
    id: 'v2.5',
    version: '2.5',
    status: 'Draft',
    author: 'Sarah Jenkins',
    date: 'À l\'instant',
    changes: 'Ajustement proposé des coefficients de risque incendie basé sur les données du T3.',
    isImmutable: false
  },
  {
    id: 'v2.4',
    version: '2.4',
    status: 'Active',
    author: 'Sarah Jenkins',
    date: '24 Oct 2023 à 14:30',
    changes: 'Limites de couverture vol mises à jour pour la formule Essentiel. Seuils de prime ajustés.',
    isImmutable: true
  },
  {
    id: 'v2.3',
    version: '2.3',
    status: 'Archived',
    author: 'Mike Ross',
    date: '12 Sep 2023 à 09:15',
    changes: 'Ajout des règles de bris de glace. Correction d\'une coquille dans la liste des exclusions.',
    isImmutable: true
  },
  {
    id: 'v2.2',
    version: '2.2',
    status: 'Archived',
    author: 'David Chen',
    date: '01 Aoû 2023 à 11:00',
    changes: 'Configuration initiale de la police pour Sinistres Auto.',
    isImmutable: true
  }
];

interface PolicyVersionsProps {
  onBack: () => void;
}

const PolicyVersions: React.FC<PolicyVersionsProps> = ({ onBack }) => {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Draft': return 'warning';
      case 'Archived': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <ActiveIcon fontSize="small" />;
      case 'Draft': return <DraftIcon fontSize="small" />;
      case 'Archived': return <ArchivedIcon fontSize="small" />;
      default: return null;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          borderBottom: '1px solid #e0e0e0', 
          display: 'flex', 
          alignItems: 'center',
          gap: 2,
          bgcolor: 'white'
        }}
      >
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a237e' }}>
            Piste d'audit des directives
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Sinistres Auto - Responsabilité Standard • ID : POL-2023-001
          </Typography>
        </Box>
      </Paper>

      <Container maxWidth="md" sx={{ py: 4, flex: 1, overflow: 'auto' }}>
        
        {/* Compliance Warning */}
        <Alert 
          severity="info" 
          icon={<LockIcon fontSize="inherit" />}
          sx={{ mb: 4, border: '1px solid #90caf9', bgcolor: '#e3f2fd' }}
        >
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>
            Avis de verrouillage de conformité
          </Typography>
          <Typography variant="body2">
            Les directives approuvées sont des enregistrements immuables à des fins de conformité et d'audit. 
            Toute modification d'une directive active doit faire l'objet d'une nouvelle version. 
            Une seule version peut être active à la fois.
          </Typography>
        </Alert>

        <Stack spacing={3}>
          {VERSIONS.map((ver, index) => (
            <Paper 
              key={ver.id} 
              elevation={0} 
              sx={{ 
                p: 0, 
                border: '1px solid #e0e0e0', 
                borderRadius: 2,
                overflow: 'hidden',
                opacity: ver.status === 'Archived' ? 0.8 : 1
              }}
            >
              <Box sx={{ 
                p: 2, 
                bgcolor: ver.status === 'Active' ? '#f1f8e9' : 'white',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip 
                    label={`v${ver.version}`} 
                    sx={{ fontWeight: 700, borderRadius: 1 }} 
                  />
                  <Chip 
                    icon={getStatusIcon(ver.status)}
                    label={ver.status === 'Active' ? 'Actif' : ver.status === 'Draft' ? 'Brouillon' : 'Archivé'} 
                    color={getStatusColor(ver.status) as any}
                    size="small"
                    variant={ver.status === 'Active' ? 'filled' : 'outlined'}
                  />
                  {ver.isImmutable && (
                    <Chip 
                      icon={<LockIcon sx={{ fontSize: 14 }} />} 
                      label="Verrouillé" 
                      size="small" 
                      sx={{ bgcolor: 'transparent', color: 'text.secondary', border: 'none' }} 
                    />
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {ver.date}
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Résumé des modifications
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {ver.changes}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: 12, bgcolor: '#1a237e' }}>
                        {ver.author.charAt(0)}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        Modifié par <strong>{ver.author}</strong>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<FileIcon />}
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Voir les directives
                    </Button>
                    {ver.status === 'Draft' && (
                      <Button 
                        variant="contained" 
                        size="small"
                        sx={{ ml: 1, textTransform: 'none', bgcolor: '#1a237e' }}
                      >
                        Reprendre le brouillon
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          ))}
        </Stack>

      </Container>
    </Box>
  );
};

import { Avatar, Grid } from '@mui/material';

export default PolicyVersions;
