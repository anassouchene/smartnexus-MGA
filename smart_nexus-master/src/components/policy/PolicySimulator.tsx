import {
    CheckCircle as AcceptIcon,
    ArrowBack as ArrowBackIcon,
    Warning as ManualIcon,
    Cancel as RefuseIcon,
    RestartAlt as ResetIcon,
    PlayArrow as RunIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

interface SimulationInput {
  claimType: string;
  formula: string;
  vehicleValue: number;
  claimAmount: number;
  fraudScore: number;
  prevClaims: number;
}

interface SimulationResult {
  decision: 'ACCEPT' | 'REFUSE' | 'MANUAL_REVIEW';
  ruleId: string;
  reason: string;
  timestamp: string;
}

const INITIAL_INPUTS: SimulationInput = {
  claimType: 'Accident',
  formula: 'Essentiel',
  vehicleValue: 80000,
  claimAmount: 4500,
  fraudScore: 10,
  prevClaims: 0
};

interface PolicySimulatorProps {
  onBack: () => void;
}

const PolicySimulator: React.FC<PolicySimulatorProps> = ({ onBack }) => {
  const [inputs, setInputs] = useState<SimulationInput>(INITIAL_INPUTS);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof SimulationInput, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResult(null); // Reset result on input change
  };

  const runSimulation = () => {
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const simResult = evaluateRules(inputs);
      setResult(simResult);
      setLoading(false);
    }, 600);
  };

  // Mock Rule Engine Logic (Matching the Decision Table)
  const evaluateRules = (data: SimulationInput): SimulationResult => {
    const timestamp = new Date().toLocaleTimeString();

    // Rule 4: High Fraud Risk
    if (data.fraudScore > 70) {
      return {
        decision: 'MANUAL_REVIEW',
        ruleId: 'Rule #4',
        reason: 'Risque de fraude élevé détecté (Score > 70) - Renvoi SIU requis.',
        timestamp
      };
    }

    // Rule 1: Bris de glace
    if (data.claimType === 'Bris de glace') {
      if (data.claimAmount < 5000) {
        return {
          decision: 'ACCEPT',
          ruleId: 'Rule #1',
          reason: 'Approbation auto couverture bris de glace standard (Sinistre < 5 000 DH).',
          timestamp
        };
      }
    }

    // Rule 2: Vol + Essentiel
    if (data.claimType === 'Vol' && data.formula === 'Essentiel') {
      if (data.claimAmount > 20000) {
        return {
          decision: 'REFUSE',
          ruleId: 'Rule #2',
          reason: 'Limite couverture vol (20 000 DH) dépassée pour formule Essentiel.',
          timestamp
        };
      }
    }

    // Rule 5: Incendie
    if (data.claimType === 'Incendie') {
      return {
        decision: 'MANUAL_REVIEW',
        ruleId: 'Rule #5',
        reason: 'Les sinistres incendie nécessitent une expertise obligatoire.',
        timestamp
      };
    }

    // Rule 7: Vol + Avancé + Multiple Claims
    if (data.claimType === 'Vol' && data.formula === 'Avancé' && data.prevClaims > 2) {
      return {
        decision: 'REFUSE',
        ruleId: 'Rule #7',
        reason: 'Multiples sinistres antérieurs (>2) - Exclusion vol s\'applique.',
        timestamp
      };
    }

    // Rule 6: High Value Accident
    if (data.claimType === 'Accident' && data.vehicleValue > 100000 && data.claimAmount > 15000) {
      return {
        decision: 'MANUAL_REVIEW',
        ruleId: 'Rule #6',
        reason: 'Évaluation dommages véhicule haute valeur requise.',
        timestamp
      };
    }

    // Rule 3: Accident + Premium (Fast Track)
    if (data.claimType === 'Accident' && data.formula === 'Premium') {
      if (data.claimAmount < 50000 && data.fraudScore < 50 && data.prevClaims < 2) {
        return {
          decision: 'ACCEPT',
          ruleId: 'Rule #3',
          reason: 'Approbation rapide pour clients Premium à faible risque.',
          timestamp
        };
      }
    }

    // Default Fallback
    return {
      decision: 'MANUAL_REVIEW',
      ruleId: 'Default',
      reason: 'Aucune règle d\'approbation auto spécifique remplie. Revue manuelle requise.',
      timestamp
    };
  };

  const getDecisionStyles = (decision: string) => {
    switch (decision) {
      case 'ACCEPT':
        return { color: '#2e7d32', bg: '#e8f5e9', icon: <AcceptIcon sx={{ fontSize: 40 }} />, label: 'Approuvé' };
      case 'REFUSE':
        return { color: '#c62828', bg: '#ffebee', icon: <RefuseIcon sx={{ fontSize: 40 }} />, label: 'Refusé' };
      case 'MANUAL_REVIEW':
        return { color: '#ef6c00', bg: '#fff3e0', icon: <ManualIcon sx={{ fontSize: 40 }} />, label: 'Revue manuelle' };
      default:
        return { color: '#757575', bg: '#f5f5f5', icon: null, label: 'Inconnu' };
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
            Simulation d'évaluation de sinistre
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Validez les décisions de couverture par rapport aux scénarios de sinistre.
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
          
          {/* Left Column: Inputs */}
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0', height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Détails du sinistre
                </Typography>
                <Button 
                  startIcon={<ResetIcon />} 
                  size="small" 
                  onClick={() => { setInputs(INITIAL_INPUTS); setResult(null); }}
                  sx={{ textTransform: 'none' }}
                >
                  Réinitialiser
                </Button>
              </Box>

              <Stack spacing={3}>
                <TextField
                  select
                  label="Type de sinistre"
                  value={inputs.claimType}
                  onChange={(e) => handleInputChange('claimType', e.target.value)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="Accident">Accident</MenuItem>
                  <MenuItem value="Vol">Vol</MenuItem>
                  <MenuItem value="Incendie">Incendie</MenuItem>
                  <MenuItem value="Bris de glace">Bris de glace</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Formule"
                  value={inputs.formula}
                  onChange={(e) => handleInputChange('formula', e.target.value)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="Essentiel">Essentiel</MenuItem>
                  <MenuItem value="Avancé">Avancé</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                </TextField>

                <TextField
                  label="Valeur du véhicule (DH)"
                  type="number"
                  value={inputs.vehicleValue}
                  onChange={(e) => handleInputChange('vehicleValue', Number(e.target.value))}
                  fullWidth
                  size="small"
                />

                <TextField
                  label="Montant du sinistre (DH)"
                  type="number"
                  value={inputs.claimAmount}
                  onChange={(e) => handleInputChange('claimAmount', Number(e.target.value))}
                  fullWidth
                  size="small"
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Score de fraude (0-100)"
                      type="number"
                      value={inputs.fraudScore}
                      onChange={(e) => handleInputChange('fraudScore', Number(e.target.value))}
                      fullWidth
                      size="small"
                      error={inputs.fraudScore > 70}
                      helperText={inputs.fraudScore > 70 ? "Risque élevé" : ""}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Sinistres précédents"
                      type="number"
                      value={inputs.prevClaims}
                      onChange={(e) => handleInputChange('prevClaims', Number(e.target.value))}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RunIcon />}
                  onClick={runSimulation}
                  disabled={loading}
                  sx={{ 
                    mt: 2, 
                    bgcolor: '#1a237e', 
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  {loading ? 'Évaluation...' : 'Évaluer le sinistre'}
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column: Results */}
          <Grid item xs={12} md={7}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {!result ? (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2, 
                    border: '1px dashed #e0e0e0', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: '#fafafa'
                  }}
                >
                  <Stack alignItems="center" spacing={1}>
                    <RunIcon sx={{ fontSize: 48, color: '#bdbdbd' }} />
                    <Typography color="text.secondary">
                      Saisissez les détails du sinistre et cliquez sur 'Évaluer le sinistre' pour voir le résultat.
                    </Typography>
                  </Stack>
                </Paper>
              ) : (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 0, 
                    borderRadius: 2, 
                    border: '1px solid #e0e0e0', 
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Result Header */}
                  <Box sx={{ 
                    p: 4, 
                    bgcolor: getDecisionStyles(result.decision).bg, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    borderBottom: '1px solid #e0e0e0'
                  }}>
                    <Box sx={{ 
                      color: getDecisionStyles(result.decision).color, 
                      mb: 2,
                      p: 2,
                      bgcolor: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                      {getDecisionStyles(result.decision).icon}
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: getDecisionStyles(result.decision).color, mb: 1 }}>
                      {getDecisionStyles(result.decision).label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Traité à {result.timestamp}
                    </Typography>
                  </Box>

                  {/* Result Details */}
                  <Box sx={{ p: 4, flex: 1 }}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Directive appliquée
                        </Typography>
                        <Chip 
                          label={result.ruleId} 
                          sx={{ fontWeight: 700, borderRadius: 1 }} 
                        />
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Justification de la décision
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                          {result.reason}
                        </Typography>
                      </Box>

                      <Divider />

                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Résumé du sinistre
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="caption" display="block" color="text.secondary">Type de sinistre</Typography>
                            <Typography variant="body2" fontWeight={600}>{inputs.claimType}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" display="block" color="text.secondary">Montant</Typography>
                            <Typography variant="body2" fontWeight={600}>{inputs.claimAmount} DH</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" display="block" color="text.secondary">Score de fraude</Typography>
                            <Typography variant="body2" fontWeight={600} color={inputs.fraudScore > 70 ? 'error.main' : 'text.primary'}>
                              {inputs.fraudScore}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PolicySimulator;
