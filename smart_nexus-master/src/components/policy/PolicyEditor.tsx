import {
    ArrowBack as ArrowBackIcon,
    PlayArrow as RunIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    IconButton,
    Paper,
    Typography
} from '@mui/material';
import React from 'react';
import PolicyDecisionTable from './PolicyDecisionTable';

interface PolicyEditorProps {
  onBack: () => void;
  onSimulate?: () => void;
}

const PolicyEditor: React.FC<PolicyEditorProps> = ({ onBack, onSimulate }) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#f8f9fa' }}>
      {/* Top Bar */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          borderBottom: '1px solid #e0e0e0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a237e' }}>
                Auto Claims - Standard Liability
              </Typography>
              <Chip label="Actif" size="small" color="success" sx={{ height: 20, fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Version 2.4 • Dernière modification par Sarah Jenkins
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            startIcon={<RunIcon />}
            onClick={onSimulate}
            sx={{ textTransform: 'none' }}
          >
            Valider les directives
          </Button>
          <Button 
            variant="contained" 
            startIcon={<SaveIcon />}
            sx={{ bgcolor: '#1a237e', textTransform: 'none' }}
          >
            Approuver & Publier
          </Button>
        </Box>
      </Paper>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        <PolicyDecisionTable />
      </Box>
    </Box>
  );
};

export default PolicyEditor;
