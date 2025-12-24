import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import WorkflowBuilder from '../components/workflow/WorkflowBuilder';
import type { WorkflowTemplate } from '../data/mockWorkflows';
import { mockWorkflows } from '../data/mockWorkflows';
import type { WorkflowTemplateDefinition } from '../data/workflowTemplates';
import { workflowTemplates } from '../data/workflowTemplates';

const Workflow: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>(mockWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTemplate | null>(mockWorkflows[0]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleNewClick = () => {
    setSelectedWorkflow(null);
    setShowTemplates(true);
    setIsBuilderMode(false);
  };

  const handleWorkflowSelect = (workflow: WorkflowTemplate) => {
    setSelectedWorkflow(workflow);
    setShowTemplates(false);
    setIsBuilderMode(false);
  };

  const handleUseTemplate = (template: WorkflowTemplateDefinition) => {
    const newWorkflow: WorkflowTemplate = {
      id: `w${Date.now()}`,
      name: template.name,
      description: template.description,
      status: 'Draft',
      lastModified: new Date().toISOString().split('T')[0],
      steps: template.steps.length,
    };

    setWorkflows([newWorkflow, ...workflows]);
    setSelectedWorkflow(newWorkflow);
    setShowTemplates(false);
    setIsBuilderMode(true);
  };

  const handleOpenBuilder = () => {
    setIsBuilderMode(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Draft': return 'warning';
      case 'Archived': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      {/* Page Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Gestion des flux de travail
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Concevez et gérez les cycles de vie de vos produits d'assurance.
          </Typography>
        </Box>
        <Chip 
          label="Rôle : MGA" 
          color="primary" 
          variant="outlined" 
          sx={{ fontWeight: 'bold' }} 
        />
      </Box>

      <Grid container spacing={3} sx={{ flexGrow: 1, overflow: 'hidden' }}>
        {/* Zone 1: Workflow Library (My Workflows) */}
        {isSidebarOpen && (
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Mes flux de travail</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    startIcon={<AddIcon />} 
                    size="small" 
                    variant="contained"
                    onClick={handleNewClick}
                  >
                    Nouveau
                  </Button>
                  <IconButton size="small" onClick={() => setIsSidebarOpen(false)}>
                    <MenuOpenIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                <List>
                  {workflows.map((workflow) => (
                    <React.Fragment key={workflow.id}>
                      <ListItemButton
                        selected={!showTemplates && selectedWorkflow?.id === workflow.id}
                        onClick={() => handleWorkflowSelect(workflow)}
                        sx={{ 
                          borderLeft: (!showTemplates && selectedWorkflow?.id === workflow.id) ? 4 : 0,
                          borderColor: 'primary.main'
                        }}
                      >
                        <ListItemText
                          primary={workflow.name}
                          secondaryTypographyProps={{ component: 'div' }}
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <Chip 
                                label={workflow.status} 
                                size="small" 
                                color={getStatusColor(workflow.status) as any} 
                                variant="outlined"
                                sx={{ height: 20, fontSize: '0.7rem' }}
                              />
                              <Typography variant="caption" component="span">
                                {workflow.steps} Étapes
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItemButton>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Zone 2: Main Content Area (Builder or Template Gallery) */}
        <Grid size={{ xs: 12, md: isSidebarOpen ? 8 : 12 }} sx={{ height: '100%', overflow: 'hidden' }}>
          {showTemplates ? (
            // Template Gallery View
            <Box sx={{ height: '100%', overflow: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {!isSidebarOpen && (
                    <IconButton onClick={() => setIsSidebarOpen(true)}>
                      <MenuIcon />
                    </IconButton>
                  )}
                  <Typography variant="h5">Sélectionner un modèle</Typography>
                </Box>
                <IconButton onClick={() => {
                  setShowTemplates(false);
                  setSelectedWorkflow(workflows[0]);
                }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Commencez avec un flux de travail préconfiguré conçu pour les scénarios d'assurance courants.
              </Typography>
              
              <Grid container spacing={3}>
                {workflowTemplates.map((template) => (
                  <Grid size={{ xs: 12, lg: 6 }} key={template.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6, borderColor: 'primary.main' }, border: 1, borderColor: 'divider' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Chip label={template.category} size="small" color="secondary" variant="outlined" />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {template.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {template.description}
                        </Typography>
                        
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'text.secondary' }}>
                            Aperçu du processus
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                            {template.steps.slice(0, 3).map((step, index) => (
                              <React.Fragment key={index}>
                                <Chip label={step} size="small" sx={{ bgcolor: 'action.hover' }} />
                                {index < 2 && <ArrowForwardIcon fontSize="small" color="disabled" sx={{ fontSize: 16 }} />}
                              </React.Fragment>
                            ))}
                            {template.steps.length > 3 && (
                              <Chip label={`+${template.steps.length - 3}`} size="small" variant="outlined" />
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1.5 }}>
                        <Button size="small">Voir les détails</Button>
                        <Button 
                          variant="contained" 
                          size="small" 
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => handleUseTemplate(template)}
                        >
                          Utiliser le modèle
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : isBuilderMode ? (
            // Visual Builder View
            <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {!isSidebarOpen && (
                    <IconButton onClick={() => setIsSidebarOpen(true)}>
                      <MenuIcon />
                    </IconButton>
                  )}
                  <Box>
                    <Typography variant="h6">{selectedWorkflow?.name} - Constructeur</Typography>
                    <Typography variant="caption" color="text.secondary">Faites glisser les blocs pour configurer la séquence</Typography>
                  </Box>
                </Box>
                <Button variant="outlined" size="small" onClick={() => setIsBuilderMode(false)}>
                  Quitter le constructeur
                </Button>
              </Box>
              <Box sx={{ flexGrow: 1, overflow: 'hidden', p: 2 }}>
                <WorkflowBuilder />
              </Box>
            </Paper>
          ) : selectedWorkflow ? (
            // Existing Workflow Details View
            <Paper sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column' }}>
              {/* Builder Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {!isSidebarOpen && (
                    <IconButton onClick={() => setIsSidebarOpen(true)} sx={{ mt: 0.5 }}>
                      <MenuIcon />
                    </IconButton>
                  )}
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {selectedWorkflow.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {selectedWorkflow.description}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={`Dernière modification: ${selectedWorkflow.lastModified}`} size="small" />
                      <Chip label={`${selectedWorkflow.steps} Étapes configurées`} size="small" />
                    </Stack>
                  </Box>
                </Box>
                <Box>
                  <Button startIcon={<EditIcon />} variant="outlined" sx={{ mr: 1 }}>
                    Modifier la configuration
                  </Button>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Visual Builder Placeholder */}
              <Box 
                sx={{ 
                  flexGrow: 1, 
                  bgcolor: 'background.default', 
                  borderRadius: 1, 
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed',
                  borderColor: 'text.secondary'
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Visualisation du flux de travail
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 4, opacity: 0.7 }}>
                  <Card sx={{ width: 150, p: 2, textAlign: 'center' }}>Soumission</Card>
                  <PlayArrowIcon color="action" />
                  <Card sx={{ width: 150, p: 2, textAlign: 'center' }}>Souscription</Card>
                  <PlayArrowIcon color="action" />
                  <Card sx={{ width: 150, p: 2, textAlign: 'center' }}>Devis</Card>
                  <PlayArrowIcon color="action" />
                  <CircleIcon color="disabled" />
                </Box>
                <Button variant="contained" color="primary" onClick={handleOpenBuilder}>
                  Ouvrir le constructeur visuel
                </Button>
              </Box>
            </Paper>
          ) : (
            <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {!isSidebarOpen && (
                <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                  <IconButton onClick={() => setIsSidebarOpen(true)}>
                    <MenuIcon />
                  </IconButton>
                </Box>
              )}
              <Typography variant="h6" color="text.secondary">
                Sélectionnez un flux de travail dans la bibliothèque pour voir les détails
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Workflow;
