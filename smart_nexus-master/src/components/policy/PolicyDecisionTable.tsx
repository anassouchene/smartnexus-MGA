import {
    Add as AddIcon,
    DeleteOutline as DeleteIcon,
    InfoOutlined as InfoIcon,
    WarningAmber as WarningIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

// --- Types ---
type DecisionType = 'ACCEPT' | 'MANUAL_REVIEW' | 'REFUSE';

interface DecisionRule {
  id: string;
  claimType: string;
  formula: string;
  vehicleValue: string;
  claimAmount: string;
  fraudScore: string;
  prevClaims: string;
  decision: DecisionType;
  reason: string;
}

// --- Mock Data ---
const INITIAL_RULES: DecisionRule[] = [
  {
    id: '1',
    claimType: 'Bris de glace',
    formula: 'Any',
    vehicleValue: 'Any',
    claimAmount: '< 5000',
    fraudScore: 'Any',
    prevClaims: 'Any',
    decision: 'ACCEPT',
    reason: 'Approbation auto couverture bris de glace standard'
  },
  {
    id: '2',
    claimType: 'Vol',
    formula: 'Essentiel',
    vehicleValue: 'Any',
    claimAmount: '> 20000',
    fraudScore: 'Any',
    prevClaims: 'Any',
    decision: 'REFUSE',
    reason: 'Limite couverture vol dépassée pour formule Essentiel'
  },
  {
    id: '3',
    claimType: 'Accident',
    formula: 'Premium',
    vehicleValue: 'Any',
    claimAmount: '< 50000',
    fraudScore: '< 50',
    prevClaims: '< 2',
    decision: 'ACCEPT',
    reason: 'Fast-track pour clients Premium à faible risque'
  },
  {
    id: '4',
    claimType: 'Any',
    formula: 'Any',
    vehicleValue: 'Any',
    claimAmount: 'Any',
    fraudScore: '> 70',
    prevClaims: 'Any',
    decision: 'MANUAL_REVIEW',
    reason: 'Risque fraude élevé détecté - Renvoi SIU'
  },
  {
    id: '5',
    claimType: 'Incendie',
    formula: 'Any',
    vehicleValue: 'Any',
    claimAmount: 'Any',
    fraudScore: 'Any',
    prevClaims: 'Any',
    decision: 'MANUAL_REVIEW',
    reason: 'Sinistres incendie nécessitent expertise obligatoire'
  },
  {
    id: '6',
    claimType: 'Accident',
    formula: 'Any',
    vehicleValue: '> 100000',
    claimAmount: '> 15000',
    fraudScore: 'Any',
    prevClaims: 'Any',
    decision: 'MANUAL_REVIEW',
    reason: 'Évaluation dommages véhicule haute valeur'
  },
  {
    id: '7',
    claimType: 'Vol',
    formula: 'Avancé',
    vehicleValue: 'Any',
    claimAmount: 'Any',
    fraudScore: 'Any',
    prevClaims: '> 2',
    decision: 'REFUSE',
    reason: "Multiples sinistres antérieurs - Exclusion vol s'applique"
  }
];

const PolicyDecisionTable: React.FC = () => {
  const [rules, setRules] = useState<DecisionRule[]>(INITIAL_RULES);

  const handleAddRule = () => {
    const newRule: DecisionRule = {
      id: Date.now().toString(),
      claimType: 'Any',
      formula: 'Any',
      vehicleValue: 'Any',
      claimAmount: 'Any',
      fraudScore: 'Any',
      prevClaims: 'Any',
      decision: 'MANUAL_REVIEW',
      reason: ''
    };
    setRules([...rules, newRule]);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRule = (id: string, field: keyof DecisionRule, value: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const getDecisionColor = (decision: DecisionType) => {
    switch (decision) {
      case 'ACCEPT': return { bg: '#e8f5e9', color: '#2e7d32', border: '#c8e6c9' };
      case 'REFUSE': return { bg: '#ffebee', color: '#c62828', border: '#ffcdd2' };
      case 'MANUAL_REVIEW': return { bg: '#fff3e0', color: '#ef6c00', border: '#ffe0b2' };
    }
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1a237e' }}>
            Matrice de souscription : Sinistres Auto
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Les conditions sont évaluées par ordre de priorité. Le premier scénario correspondant détermine la décision de souscription.
          </Typography>
        </Box>
        <Button 
          startIcon={<AddIcon />} 
          variant="outlined" 
          size="small" 
          onClick={handleAddRule}
          sx={{ textTransform: 'none' }}
        >
          Ajouter une condition de couverture
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, maxHeight: 'calc(100vh - 250px)' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ bgcolor: '#e3f2fd', borderBottom: '1px solid #bbdefb', py: 1 }}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <InfoIcon fontSize="small" color="primary" />
                  <Typography variant="subtitle2" color="primary.main" fontWeight={700}>FACTEURS DE RISQUE</Typography>
                </Stack>
              </TableCell>
              <TableCell colSpan={3} sx={{ bgcolor: '#f1f8e9', borderBottom: '1px solid #c8e6c9', py: 1 }}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <WarningIcon fontSize="small" color="success" />
                  <Typography variant="subtitle2" color="success.main" fontWeight={700}>DÉCISION DE SOUSCRIPTION</Typography>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, bgcolor: '#f8f9fa', minWidth: 130 }}>Type de sinistre</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: '#f8f9fa', minWidth: 120 }}>Formule</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: '#f8f9fa', minWidth: 100 }}>Valeur du véhicule</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: '#f8f9fa', minWidth: 100 }}>Montant sinistre</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: '#f8f9fa', minWidth: 90 }}>Score fraude</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: '#f8f9fa', minWidth: 90 }}>Sinistres préc.</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: '#f8f9fa', minWidth: 160, borderLeft: '2px solid #e0e0e0' }}>Décision</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: '#f8f9fa', minWidth: 200 }}>Code raison</TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: '#f8f9fa', width: 50 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.map((rule) => {
              const decisionStyle = getDecisionColor(rule.decision);
              return (
                <TableRow key={rule.id} hover>
                  {/* Inputs */}
                  <TableCell>
                    <Select
                      value={rule.claimType}
                      onChange={(e) => updateRule(rule.id, 'claimType', e.target.value)}
                      variant="standard"
                      disableUnderline
                      fullWidth
                      sx={{ fontSize: '0.875rem' }}
                    >
                      <MenuItem value="Any"><Typography color="text.secondary" variant="body2">Tout</Typography></MenuItem>
                      <MenuItem value="Accident">Accident</MenuItem>
                      <MenuItem value="Vol">Vol</MenuItem>
                      <MenuItem value="Incendie">Incendie</MenuItem>
                      <MenuItem value="Bris de glace">Bris de glace</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={rule.formula}
                      onChange={(e) => updateRule(rule.id, 'formula', e.target.value)}
                      variant="standard"
                      disableUnderline
                      fullWidth
                      sx={{ fontSize: '0.875rem' }}
                    >
                      <MenuItem value="Any"><Typography color="text.secondary" variant="body2">Tout</Typography></MenuItem>
                      <MenuItem value="Essentiel">Essentiel</MenuItem>
                      <MenuItem value="Avancé">Avancé</MenuItem>
                      <MenuItem value="Premium">Premium</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={rule.vehicleValue}
                      onChange={(e) => updateRule(rule.id, 'vehicleValue', e.target.value)}
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      size="small"
                      sx={{ '& input': { fontSize: '0.875rem' } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={rule.claimAmount}
                      onChange={(e) => updateRule(rule.id, 'claimAmount', e.target.value)}
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      size="small"
                      sx={{ '& input': { fontSize: '0.875rem' } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={rule.fraudScore}
                      onChange={(e) => updateRule(rule.id, 'fraudScore', e.target.value)}
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      size="small"
                      sx={{ '& input': { fontSize: '0.875rem' } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={rule.prevClaims}
                      onChange={(e) => updateRule(rule.id, 'prevClaims', e.target.value)}
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      size="small"
                      sx={{ '& input': { fontSize: '0.875rem' } }}
                    />
                  </TableCell>

                  {/* Outputs */}
                  <TableCell sx={{ borderLeft: '2px solid #f5f5f5', bgcolor: '#fafafa' }}>
                    <Select
                      value={rule.decision}
                      onChange={(e) => updateRule(rule.id, 'decision', e.target.value as DecisionType)}
                      variant="standard"
                      disableUnderline
                      fullWidth
                      renderValue={(selected) => (
                        <Chip 
                          label={selected.replace('_', ' ')} 
                          size="small" 
                          sx={{ 
                            bgcolor: decisionStyle.bg, 
                            color: decisionStyle.color,
                            border: `1px solid ${decisionStyle.border}`,
                            fontWeight: 600,
                            height: 24,
                            fontSize: '0.7rem'
                          }} 
                        />
                      )}
                    >
                      <MenuItem value="ACCEPT">ACCEPT</MenuItem>
                      <MenuItem value="MANUAL_REVIEW">MANUAL REVIEW</MenuItem>
                      <MenuItem value="REFUSE">REFUSE</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell sx={{ bgcolor: '#fafafa' }}>
                    <TextField
                      value={rule.reason}
                      onChange={(e) => updateRule(rule.id, 'reason', e.target.value)}
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      placeholder="Saisir la raison..."
                      size="small"
                      sx={{ '& input': { fontSize: '0.875rem' } }}
                    />
                  </TableCell>
                  <TableCell sx={{ bgcolor: '#fafafa' }}>
                    <IconButton size="small" onClick={() => handleDeleteRule(rule.id)} color="default">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PolicyDecisionTable;
