import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PublishIcon from '@mui/icons-material/Publish';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    MenuItem,
    Paper,
    Select,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import type { BlockType, BusinessBlock } from '../../data/businessBlocks';
import { businessBlocks } from '../../data/businessBlocks';
import WorkflowSimulator from './WorkflowSimulator';

interface WorkflowStep {
  id: string;
  blockType: BlockType;
  name: string;
  isEnabled: boolean;
  config: Record<string, any>;
}

// Mock initial steps for demonstration
const initialSteps: WorkflowStep[] = [
  {
    id: 's1',
    blockType: 'Document Check',
    name: 'Examen Initial des Documents',
    isEnabled: true,
    config: { requiredDocs: ['ID', 'Policy Schedule'], allowUpload: true }
  },
  {
    id: 's2',
    blockType: 'Fraud Check',
    name: 'Scan de Fraude IA',
    isEnabled: true,
    config: { sensitivity: 'High', autoRejectScore: 90 }
  },
  {
    id: 's3',
    blockType: 'Policy Decision',
    name: 'Vérification de Couverture',
    isEnabled: true,
    config: { policyVersion: 'v2.1', threshold: 10000 }
  }
];

const WorkflowBuilder: React.FC = () => {
  const [steps, setSteps] = useState<WorkflowStep[]>(initialSteps);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  
  // Versioning State
  const [version, setVersion] = useState('v1.0');
  const [status, setStatus] = useState<'Draft' | 'Active'>('Draft');
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [changeSummary, setChangeSummary] = useState('');

  // Role State (Mock for Demo)
  const [userRole, setUserRole] = useState<'MGA' | 'Broker' | 'Delegate' | 'Expert'>('MGA');
  const isReadOnly = userRole !== 'MGA';
  const isLocked = status === 'Active' || isReadOnly;

  const handleAddStep = (block: BusinessBlock) => {
    if (isLocked) return;
    const newStep: WorkflowStep = {
      id: `s${Date.now()}`,
      blockType: block.type,
      name: block.type,
      isEnabled: true,
      config: { ...block.defaultConfig }
    };
    setSteps([...steps, newStep]);
    setSelectedStepId(newStep.id);
  };

  const handleDeleteStep = (id: string) => {
    if (isLocked) return;
    setSteps(steps.filter(s => s.id !== id));
    if (selectedStepId === id) setSelectedStepId(null);
  };

  const handleToggleStep = (id: string) => {
    if (isLocked) return;
    setSteps(steps.map(s => s.id === id ? { ...s, isEnabled: !s.isEnabled } : s));
  };

  const handlePublishClick = () => {
    setIsPublishDialogOpen(true);
  };

  const confirmPublish = () => {
    // Mock version increment logic
    const majorVersion = parseInt(version.split('.')[0].replace('v', ''));
    const minorVersion = parseInt(version.split('.')[1]);
    const newVersion = `v${majorVersion}.${minorVersion + 1}`;
    
    setVersion(newVersion);
    setStatus('Active');
    setIsPublishDialogOpen(false);
    setChangeSummary('');
  };

  const handleStepClick = (id: string) => {
    setSelectedStepId(id);
  };

  const renderConfigForm = (step: WorkflowStep) => {
    // Mock configuration form generation based on config keys
    return (
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {Object.entries(step.config).map(([key, value]) => (
          <Grid item xs={12} key={key}>
            {typeof value === 'boolean' ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Typography>
                <Switch checked={value} size="small" disabled={isLocked} />
              </Box>
            ) : Array.isArray(value) ? (
               <TextField
                fullWidth
                label={key.replace(/([A-Z])/g, ' $1').trim()}
                defaultValue={value.join(', ')}
                size="small"
                helperText="Comma separated values"
                disabled={isLocked}
              />
            ) : (
              <TextField
                fullWidth
                label={key.replace(/([A-Z])/g, ' $1').trim()}
                defaultValue={value}
                size="small"
                disabled={isLocked}
              />
            )}
          </Grid>
        ))}
      </Grid>
    );
  };

  const selectedStep = steps.find(s => s.id === selectedStepId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header / Toolbar */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'background.paper',
          zIndex: 10
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
           <IconButton onClick={() => setIsLibraryOpen(!isLibraryOpen)} size="small" sx={{ mr: 1 }}>
             {isLibraryOpen ? <MenuOpenIcon /> : <MenuIcon />}
           </IconButton>
           {/* Role Selector (Demo Only) */}
           <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Voir en tant que</InputLabel>
            <Select
              value={userRole}
              label="Voir en tant que"
              onChange={(e) => setUserRole(e.target.value as any)}
            >
              <MenuItem value="MGA">MGA (Admin)</MenuItem>
              <MenuItem value="Broker">Courtier</MenuItem>
              <MenuItem value="Delegate">Délégué</MenuItem>
              <MenuItem value="Expert">Expert</MenuItem>
            </Select>
          </FormControl>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">Devis Propriété Commerciale</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={version} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
              <Chip 
                label={status} 
                size="small" 
                color={status === 'Active' ? 'success' : 'warning'} 
                icon={status === 'Active' ? <LockIcon fontSize="small" /> : undefined}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isReadOnly && (
            <Button 
              variant="outlined" 
              color="secondary" 
              startIcon={<PlayArrowIcon />}
              onClick={() => setIsSimulatorOpen(true)}
              size="small"
            >
              Tester
            </Button>
          )}
          
          {isReadOnly ? (
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<PlayArrowIcon />}
              onClick={() => alert('Starting workflow execution...')}
              size="small"
            >
              Lancer l'Exécution
            </Button>
          ) : status === 'Draft' ? (
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PublishIcon />}
              onClick={handlePublishClick}
              size="small"
            >
              Publier
            </Button>
          ) : (
            <Button 
              variant="outlined" 
              onClick={() => setStatus('Draft')}
              size="small"
            >
              Éditer Nouveau Brouillon
            </Button>
          )}
        </Box>
      </Paper>

      {/* Main Content: 3-Column Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        
        {/* Left Panel: Step Library */}
        <Collapse in={isLibraryOpen} orientation="horizontal" timeout={300}>
          <Paper 
            elevation={0}
            sx={{ 
              width: 260, 
              height: '100%',
              display: 'flex', 
              flexDirection: 'column', 
              borderRight: 1, 
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                BIBLIOTHÈQUE D'ÉTAPES
              </Typography>
            </Box>
            <List sx={{ overflow: 'auto', flexGrow: 1, p: 2 }}>
              {businessBlocks.map((block) => (
                <ListItem key={block.type} disablePadding sx={{ mb: 1.5 }}>
                  <ListItemButton 
                    onClick={() => handleAddStep(block)}
                    disabled={isLocked}
                    sx={{ 
                      border: 1, 
                      borderColor: 'divider', 
                      borderRadius: 2,
                      p: 1.5,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 1,
                      transition: 'all 0.2s',
                      '&:hover': { 
                        borderColor: 'primary.main', 
                        bgcolor: 'action.hover',
                        transform: 'translateY(-2px)',
                        boxShadow: 1
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                      <Box sx={{ color: 'primary.main', display: 'flex' }}>{block.icon}</Box>
                      <Typography variant="body2" fontWeight="600">{block.type}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                      {block.description}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Collapse>

        {/* Center Panel: Canvas */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            bgcolor: 'background.default', 
            overflow: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            p: 4,
            position: 'relative',
            '& > *': { flexShrink: 0 }
          }}
        >
          {/* Start Node */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Chip label="START" color="success" size="small" sx={{ fontWeight: 'bold', px: 1 }} />
            <Box sx={{ height: 30, width: 2, bgcolor: 'divider' }} />
          </Box>

          {/* Steps Flow */}
          {steps.length === 0 ? (
            <Box 
              sx={{ 
                p: 4, 
                border: '2px dashed', 
                borderColor: 'divider', 
                borderRadius: 2, 
                color: 'text.secondary',
                bgcolor: 'background.paper',
                textAlign: 'center',
                maxWidth: 400
              }}
            >
              <Typography variant="subtitle1" gutterBottom>Le flux de travail est vide</Typography>
              <Typography variant="body2">Sélectionnez des blocs dans la bibliothèque pour commencer à construire votre processus.</Typography>
            </Box>
          ) : (
            steps.map((step, index) => {
              const blockDef = businessBlocks.find(b => b.type === step.blockType);
              const isSelected = selectedStepId === step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <Card 
                    onClick={() => handleStepClick(step.id)}
                    sx={{ 
                      width: 320,
                      cursor: isLocked ? 'default' : 'pointer',
                      borderColor: isSelected ? 'primary.main' : 'divider',
                      borderWidth: isSelected ? 2 : 1,
                      boxShadow: isSelected ? 4 : 1,
                      opacity: step.isEnabled ? 1 : 0.6,
                      position: 'relative',
                      transition: 'all 0.2s',
                      '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)' }
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box 
                            sx={{ 
                              bgcolor: isSelected ? 'primary.main' : 'action.selected', 
                              color: isSelected ? 'white' : 'text.secondary',
                              p: 0.5, 
                              borderRadius: 1,
                              display: 'flex'
                            }}
                          >
                            {blockDef?.icon}
                          </Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {step.name}
                          </Typography>
                        </Box>
                        {!isLocked && (
                          <Box onClick={(e) => e.stopPropagation()}>
                            <Switch 
                              size="small" 
                              checked={step.isEnabled} 
                              onChange={() => handleToggleStep(step.id)} 
                            />
                          </Box>
                        )}
                      </Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {step.blockType}
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  {/* Connector Line */}
                  <Box sx={{ height: 30, width: 2, bgcolor: 'divider', my: 0.5 }} />
                  
                  {/* Add Button Placeholder (Visual only for now) */}
                  {!isLocked && (
                    <Box sx={{ position: 'relative', mb: 0.5 }}>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          bgcolor: 'background.paper', 
                          border: '1px solid', 
                          borderColor: 'divider',
                          width: 24,
                          height: 24,
                          '&:hover': { bgcolor: 'primary.main', color: 'white', borderColor: 'primary.main' }
                        }}
                      >
                        <AddCircleOutlineIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  )}
                  {!isLocked && <Box sx={{ height: 30, width: 2, bgcolor: 'divider', mt: 0.5 }} />}
                </React.Fragment>
              );
            })
          )}

          {/* End Node */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Chip label="END" color="default" size="small" sx={{ fontWeight: 'bold', px: 1 }} />
          </Box>
        </Box>

        {/* Right Panel: Configuration */}
        <Paper 
          elevation={0}
          sx={{ 
            width: 320, 
            display: 'flex', 
            flexDirection: 'column', 
            borderLeft: 1, 
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
              CONFIGURATION
            </Typography>
          </Box>
          
          <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
            {selectedStep ? (
              <Box sx={{ animation: 'fadeIn 0.3s' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box sx={{ p: 1, bgcolor: 'primary.light', color: 'white', borderRadius: 1, display: 'flex' }}>
                    {businessBlocks.find(b => b.type === selectedStep.blockType)?.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{selectedStep.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{selectedStep.blockType}</Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                  PARAMÈTRES
                </Typography>
                
                {renderConfigForm(selectedStep)}

                {!isLocked && (
                  <Box sx={{ mt: 4 }}>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      fullWidth 
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteStep(selectedStep.id)}
                    >
                      Supprimer l'Étape
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary', textAlign: 'center' }}>
                <SettingsIcon sx={{ fontSize: 48, mb: 2, opacity: 0.2 }} />
                <Typography variant="body2">Sélectionnez une étape sur le canevas pour configurer ses propriétés.</Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Dialogs & Drawers */}
      <Dialog open={isPublishDialogOpen} onClose={() => setIsPublishDialogOpen(false)}>
        <DialogTitle>Publier la Version du Flux</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            La publication créera une nouvelle version immuable ({version.split('.')[0]}.{parseInt(version.split('.')[1]) + 1}). 
            Une fois publiée, cette version ne peut plus être modifiée.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Résumé des Changements"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={changeSummary}
            onChange={(e) => setChangeSummary(e.target.value)}
            placeholder="ex: Seuil de fraude mis à jour à 85"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPublishDialogOpen(false)}>Annuler</Button>
          <Button onClick={confirmPublish} variant="contained" color="primary">
            Publier & Verrouiller
          </Button>
        </DialogActions>
      </Dialog>

      <WorkflowSimulator 
        open={isSimulatorOpen} 
        onClose={() => setIsSimulatorOpen(false)} 
        steps={steps} 
      />
    </Box>
  );
};

export default WorkflowBuilder;

