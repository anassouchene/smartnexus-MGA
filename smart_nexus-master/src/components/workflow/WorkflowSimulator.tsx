import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import WarningIcon from '@mui/icons-material/Warning';
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Drawer,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Slider,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

// Define the shape of our simulation inputs
interface SimulationInputs {
  claimAmount: number;
  country: string;
  fraudScore: number;
  productType: string;
}

// Define the shape of a simulation log entry
interface SimulationLog {
  stepId: string;
  stepName: string;
  status: 'success' | 'failure' | 'warning' | 'skipped';
  message: string;
  timestamp: string;
}

interface WorkflowSimulatorProps {
  open: boolean;
  onClose: () => void;
  steps: any[]; // Using any[] for simplicity, ideally matches WorkflowStep interface
}

const WorkflowSimulator: React.FC<WorkflowSimulatorProps> = ({ open, onClose, steps }) => {
  const [inputs, setInputs] = useState<SimulationInputs>({
    claimAmount: 1500,
    country: 'US',
    fraudScore: 15,
    productType: 'Property'
  });

  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [finalOutcome, setFinalOutcome] = useState<'Approuvé' | 'Rejeté' | 'Examen Manuel' | null>(null);

  const handleInputChange = (field: keyof SimulationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const runSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setFinalOutcome(null);

    // Simulate processing delay
    setTimeout(() => {
      const newLogs: SimulationLog[] = [];
      let outcome: 'Approuvé' | 'Rejeté' | 'Examen Manuel' = 'Approuvé';
      let stopExecution = false;

      // Mock Execution Engine
      steps.forEach((step) => {
        if (stopExecution || !step.isEnabled) return;

        const logEntry: SimulationLog = {
          stepId: step.id,
          stepName: step.name,
          status: 'success',
          message: 'Étape terminée avec succès.',
          timestamp: new Date().toLocaleTimeString()
        };

        // Mock Logic based on Block Type
        if (step.blockType === 'Fraud Check') {
          if (inputs.fraudScore > 80) {
            logEntry.status = 'failure';
            logEntry.message = `Score de Fraude ${inputs.fraudScore} dépasse le seuil (80). Rejet automatique déclenché.`;
            outcome = 'Rejeté';
            stopExecution = true;
          } else if (inputs.fraudScore > 50) {
            logEntry.status = 'warning';
            logEntry.message = `Score de Fraude ${inputs.fraudScore} est élevé. Signalé pour examen.`;
            outcome = 'Examen Manuel';
          } else {
            logEntry.message = `Score de Fraude ${inputs.fraudScore} est dans les limites acceptables.`;
          }
        } else if (step.blockType === 'Policy Decision') {
           // Mock logic: High claims in certain countries need review
           if (inputs.claimAmount > 10000) {
             logEntry.status = 'warning';
             logEntry.message = `Le montant de la réclamation ${inputs.claimAmount}$ dépasse la limite d'approbation automatique (10 000 $).`;
             if (outcome !== 'Rejeté') outcome = 'Examen Manuel';
           } else {
             logEntry.message = `Le montant de la réclamation ${inputs.claimAmount}$ est dans les limites d'approbation automatique.`;
           }
        } else if (step.blockType === 'Document Check') {
            // Always passes in this mock
            logEntry.message = "Tous les documents requis sont présents (Simulation).";
        }

        newLogs.push(logEntry);
      });

      setLogs(newLogs);
      setFinalOutcome(outcome as any);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', md: 500 }, p: 0 } }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PlayArrowIcon />
          <Typography variant="h6">Simulateur de Flux</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'inherit' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 3, overflow: 'auto', height: 'calc(100% - 64px)' }}>
        <Typography variant="body2" color="text.secondary" paragraph>
          Testez votre logique de flux avec des données fictives pour voir comment elle se comporte avant la publication.
        </Typography>

        {/* Input Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            border: 1, 
            borderColor: 'divider', 
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
            DONNÉES DE TEST
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Montant de la Réclamation ($)"
                type="number"
                size="small"
                value={inputs.claimAmount}
                onChange={(e) => handleInputChange('claimAmount', Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Pays</InputLabel>
                <Select
                  value={inputs.country}
                  label="Pays"
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  <MenuItem value="US">États-Unis</MenuItem>
                  <MenuItem value="UK">Royaume-Uni</MenuItem>
                  <MenuItem value="FR">France</MenuItem>
                  <MenuItem value="DE">Allemagne</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="caption">
                Score de Fraude (0-100)
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={inputs.fraudScore}
                  onChange={(_, val) => handleInputChange('fraudScore', val)}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={100}
                  sx={{ 
                    color: inputs.fraudScore > 80 ? 'error.main' : inputs.fraudScore > 50 ? 'warning.main' : 'success.main'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={isRunning ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
            onClick={runSimulation}
            disabled={isRunning}
            sx={{ mt: 2 }}
          >
            {isRunning ? 'Simulation en cours...' : 'Lancer la Simulation'}
          </Button>
        </Paper>

        {/* Results Section */}
        {finalOutcome && (
          <Box sx={{ animation: 'fadeIn 0.5s' }}>
            <Divider sx={{ mb: 3 }}>
              <Chip label="RÉSULTATS DE LA SIMULATION" size="small" />
            </Divider>

            {/* Outcome Card */}
            <Alert 
              severity={finalOutcome === 'Approuvé' ? 'success' : finalOutcome === 'Rejeté' ? 'error' : 'warning'}
              variant="filled"
              icon={finalOutcome === 'Approuvé' ? <CheckCircleIcon /> : finalOutcome === 'Rejeté' ? <ErrorIcon /> : <WarningIcon />}
              sx={{ mb: 3, alignItems: 'center' }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Décision: {finalOutcome.toUpperCase()}
              </Typography>
              <Typography variant="caption">
                Temps d'Exécution: ~120ms
              </Typography>
            </Alert>

            {/* Execution Log */}
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Chemin d'Exécution
            </Typography>
            <List dense sx={{ bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
              {logs.map((log, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                      {log.status === 'success' && <CheckCircleIcon color="success" fontSize="small" />}
                      {log.status === 'failure' && <ErrorIcon color="error" fontSize="small" />}
                      {log.status === 'warning' && <WarningIcon color="warning" fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" fontWeight="bold">{log.stepName}</Typography>
                          <Typography variant="caption" color="text.secondary">{log.timestamp}</Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color={log.status === 'failure' ? 'error' : 'text.secondary'}>
                          {log.message}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < logs.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default WorkflowSimulator;
