import ArticleIcon from '@mui/icons-material/Article';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Alert,
    Box,
    Button,
    Card,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

// Mock Data
const jurisdictions = [
  // Europe
  { id: 'fr-axa', country: 'France', zone: 'Europe', insurer: 'AXA XL', currency: 'EUR', flag: '🇫🇷', regulation: 'Code des Assurances', status: 'active' },
  { id: 'be-allianz', country: 'Belgium', zone: 'Europe', insurer: 'Allianz Benelux', currency: 'EUR', flag: '🇧🇪', regulation: 'Assurwet', status: 'active' },
  { id: 'es-mapfre', country: 'Spain', zone: 'Europe', insurer: 'Mapfre', currency: 'EUR', flag: '🇪🇸', regulation: 'Ley de Contrato de Seguro', status: 'active' },
  { id: 'it-generali', country: 'Italy', zone: 'Europe', insurer: 'Generali', currency: 'EUR', flag: '🇮🇹', regulation: 'Codice delle Assicurazioni', status: 'active' },
  { id: 'pt-fidelidade', country: 'Portugal', zone: 'Europe', insurer: 'Fidelidade', currency: 'EUR', flag: '🇵🇹', regulation: 'Lei do Contrato de Seguro', status: 'active' },

  // Maghreb
  { id: 'ma-atlanta', country: 'Morocco', zone: 'Maghreb', insurer: 'AtlantaSanad', currency: 'MAD', flag: '🇲🇦', regulation: 'Code des Assurances (Maroc)', status: 'active' },
  { id: 'tn-star', country: 'Tunisia', zone: 'Maghreb', insurer: 'STAR Assurances', currency: 'TND', flag: '🇹🇳', regulation: 'Code des Assurances (Tunisie)', status: 'active' },
  { id: 'dz-saa', country: 'Algeria', zone: 'Maghreb', insurer: 'SAA', currency: 'DZD', flag: '🇩🇿', regulation: 'Ordonnance 95-07', status: 'active' },

  // CIMA
  { id: 'ci-sanlam', country: 'Ivory Coast', zone: 'CIMA', insurer: 'Sanlam', currency: 'XOF', flag: '🇨🇮', regulation: 'Code CIMA', status: 'active' },
  { id: 'sn-axa', country: 'Senegal', zone: 'CIMA', insurer: 'AXA Sénégal', currency: 'XOF', flag: '🇸🇳', regulation: 'Code CIMA', status: 'active' },
  { id: 'cm-axa', country: 'Cameroon', zone: 'CIMA', insurer: 'AXA Cameroun', currency: 'XAF', flag: '🇨🇲', regulation: 'Code CIMA', status: 'active' },
  { id: 'bf-sonar', country: 'Burkina Faso', zone: 'CIMA', insurer: 'SONAR', currency: 'XOF', flag: '🇧🇫', regulation: 'Code CIMA', status: 'active' },
  { id: 'bj-nsia', country: 'Benin', zone: 'CIMA', insurer: 'NSIA', currency: 'XOF', flag: '🇧🇯', regulation: 'Code CIMA', status: 'active' },
  { id: 'ml-cnar', country: 'Mali', zone: 'CIMA', insurer: 'CNAR', currency: 'XOF', flag: '🇲🇱', regulation: 'Code CIMA', status: 'active' },
  { id: 'tg-gta', country: 'Togo', zone: 'CIMA', insurer: 'GTA Assurances', currency: 'XOF', flag: '🇹🇬', regulation: 'Code CIMA', status: 'active' },
  { id: 'ne-ugtan', country: 'Niger', zone: 'CIMA', insurer: 'UGTAN', currency: 'XOF', flag: '🇳🇪', regulation: 'Code CIMA', status: 'active' },
  { id: 'ga-ogar', country: 'Gabon', zone: 'CIMA', insurer: 'OGAR', currency: 'XAF', flag: '🇬🇦', regulation: 'Code CIMA', status: 'active' },
  { id: 'cg-arc', country: 'Congo', zone: 'CIMA', insurer: 'ARC', currency: 'XAF', flag: '🇨🇬', regulation: 'Code CIMA', status: 'active' },
];

const cgLibrary = [
  { id: 'cg-fr-2024', jurisdictionId: 'fr-axa', name: 'CG AXA France Standard 2024', version: 'v2.4', date: '2024-01-15' },
  { id: 'cg-fr-2023', jurisdictionId: 'fr-axa', name: 'CG AXA France Legacy 2023', version: 'v1.9', date: '2023-06-20' },
  { id: 'cg-ma-2024', jurisdictionId: 'ma-atlanta', name: 'CG AtlantaSanad Auto 2024', version: 'v1.0', date: '2024-03-01' },
  { id: 'cg-es-2024', jurisdictionId: 'es-mapfre', name: 'CG Mapfre España Auto 2024', version: 'v1.2', date: '2024-02-15' },
  { id: 'cg-ci-2024', jurisdictionId: 'ci-sanlam', name: 'CG Sanlam CI Auto 2024', version: 'v1.0', date: '2024-01-10' },
  { id: 'cg-sn-2024', jurisdictionId: 'sn-axa', name: 'CG AXA Sénégal Auto 2024', version: 'v1.1', date: '2024-03-05' },
];

const cpTemplates = [
  { id: 'cp-fr-auto', jurisdictionId: 'fr-axa', name: 'CP Auto Particulier (SmartDoc)', variables: ['client.name', 'vehicle.plate', 'policy.start_date', 'premium.total'] },
  { id: 'cp-fr-habitation', jurisdictionId: 'fr-axa', name: 'CP Habitation (SmartDoc)', variables: ['client.name', 'property.address', 'policy.start_date', 'premium.total'] },
  { id: 'cp-ma-auto', jurisdictionId: 'ma-atlanta', name: 'CP Auto Maroc (SmartDoc)', variables: ['client.name', 'vehicle.plate', 'policy.start_date', 'premium.total_mad'] },
  { id: 'cp-es-auto', jurisdictionId: 'es-mapfre', name: 'CP Auto España (SmartDoc)', variables: ['client.name', 'vehicle.plate', 'policy.start_date', 'premium.total_eur'] },
  { id: 'cp-ci-auto', jurisdictionId: 'ci-sanlam', name: 'CP Auto Côte d\'Ivoire (SmartDoc)', variables: ['client.name', 'vehicle.plate', 'policy.start_date', 'premium.total_xof'] },
];

const Contracts: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('Europe');
  const [selectedJurisdictionId, setSelectedJurisdictionId] = useState<string>(jurisdictions[0].id);
  // Store configuration per jurisdiction
  const [jurisdictionConfigs, setJurisdictionConfigs] = useState<Record<string, { cgId: string, cpId: string }>>({});
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const activeJurisdiction = jurisdictions.find(j => j.id === selectedJurisdictionId) || jurisdictions[0];
  const isLocked = activeJurisdiction.status === 'locked';
  
  // Get current config or default
  const currentConfig = jurisdictionConfigs[selectedJurisdictionId] || { cgId: '', cpId: '' };

  const availableCgs = cgLibrary.filter(cg => cg.jurisdictionId === selectedJurisdictionId);
  const activeCg = cgLibrary.find(cg => cg.id === currentConfig.cgId);

  const availableCps = cpTemplates.filter(cp => cp.jurisdictionId === selectedJurisdictionId);
  const activeCp = cpTemplates.find(cp => cp.id === currentConfig.cpId);

  const handleCgChange = (cgId: string) => {
    setJurisdictionConfigs(prev => ({
      ...prev,
      [selectedJurisdictionId]: { ...(prev[selectedJurisdictionId] || { cgId: '', cpId: '' }), cgId }
    }));
  };

  const handleCpChange = (cpId: string) => {
    setJurisdictionConfigs(prev => ({
      ...prev,
      [selectedJurisdictionId]: { ...(prev[selectedJurisdictionId] || { cgId: '', cpId: '' }), cpId }
    }));
  };

  const getSourceFromVariable = (variable: string) => {
    if (variable.startsWith('client.') || variable.startsWith('company.')) return 'Données Client';
    if (variable.startsWith('vehicle.') || variable.startsWith('property.')) return 'Objet du Risque';
    if (variable.startsWith('policy.')) return 'Termes de la Police';
    if (variable.startsWith('premium.')) return 'Moteur de Tarification';
    return 'Système';
  };

  // Calculate Readiness
  const readinessIssues = jurisdictions.reduce((acc, j) => {
    const config = jurisdictionConfigs[j.id] || { cgId: '', cpId: '' };
    const missing = [];
    if (!config.cgId) missing.push('CG');
    if (!config.cpId) missing.push('CP');
    
    if (missing.length > 0) {
      acc.push({ country: j.country, missing });
    }
    return acc;
  }, [] as { country: string, missing: string[] }[]);

  const isReady = readinessIssues.length === 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 1. Page Title & Description */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="#111827">
          Documents & Contrats
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800 }}>
          Assemblez votre produit en utilisant des blocs juridiques approuvés. Configurez les Conditions Générales et les Conditions Particulières pour chaque pays actif.
        </Typography>
      </Box>

      {/* Readiness Alert */}
      {!isReady ? (
        <Alert 
          severity="error" 
          variant="filled" 
          sx={{ mb: 4, boxShadow: 2 }}
          action={
            <Button color="inherit" size="small" onClick={() => {
                // Optional: Navigate to the first problematic jurisdiction
                const firstIssue = readinessIssues[0];
                const jurisdiction = jurisdictions.find(j => j.country === firstIssue.country);
                if (jurisdiction) setSelectedJurisdictionId(jurisdiction.id);
            }}>
              Corriger {readinessIssues[0].country}
            </Button>
          }
        >
          <Typography variant="subtitle2" fontWeight={700}>
            Le produit ne peut pas être publié
          </Typography>
          <Typography variant="body2">
            Configuration juridique manquante pour : {readinessIssues.map(i => `${i.country} (${i.missing.join(', ')})`).join('; ')}.
          </Typography>
        </Alert>
      ) : (
        <Alert severity="success" variant="filled" sx={{ mb: 4, boxShadow: 2 }}>
          <Typography variant="subtitle2" fontWeight={700}>
            Prêt pour la publication
          </Typography>
          <Typography variant="body2">
            Toutes les juridictions actives sont entièrement configurées avec des documents juridiques valides.
          </Typography>
        </Alert>
      )}

      {/* 2. Prominent Jurisdiction Selector */}
      <Card 
        variant="outlined" 
        sx={{ 
          mb: 4, 
          bgcolor: '#f8fafc', 
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ p: 2, bgcolor: 'white', borderRadius: '50%', border: '1px solid #e2e8f0', display: { xs: 'none', sm: 'block' } }}>
            <PublicIcon sx={{ fontSize: 40, color: '#111827' }} />
          </Box>
          
          <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <Typography variant="h6" fontWeight={700} color="#111827">
                Zone Juridique
              </Typography>
              <Tooltip title="Les documents juridiques varient selon les zones et les pays.">
                <HelpOutlineIcon color="action" fontSize="small" sx={{ cursor: 'help' }} />
              </Tooltip>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Sélectionnez la zone juridique puis le pays à configurer.
            </Typography>
            
            <Tabs 
                value={selectedZone} 
                onChange={(_, v) => {
                    setSelectedZone(v);
                    const firstInZone = jurisdictions.find(j => j.zone === v);
                    if (firstInZone) setSelectedJurisdictionId(firstInZone.id);
                }}
                variant="standard"
                sx={{ 
                    '& .MuiTab-root': { fontWeight: 600, fontSize: '0.95rem' },
                    borderBottom: 1, borderColor: 'divider'
                }}
            >
                <Tab label="Europe" value="Europe" />
                <Tab label="Maghreb" value="Maghreb" />
                <Tab label="CIMA" value="CIMA" />
            </Tabs>
          </Box>

          <FormControl sx={{ minWidth: 400, bgcolor: 'white' }} variant="outlined">
            <InputLabel id="jurisdiction-select-label" sx={{ fontWeight: 600 }}>Pays & Assureur ({selectedZone})</InputLabel>
            <Select
              labelId="jurisdiction-select-label"
              value={selectedJurisdictionId}
              label={`Pays & Assureur (${selectedZone})`}
              onChange={(e) => setSelectedJurisdictionId(e.target.value)}
              sx={{ fontWeight: 600 }}
              renderValue={(selected) => {
                const j = jurisdictions.find(x => x.id === selected);
                return j ? `${j.flag} ${j.country} – ${j.insurer} (${j.currency})` : '';
              }}
            >
              {jurisdictions
                .filter(j => j.zone === selectedZone)
                .map((j) => {
                const config = jurisdictionConfigs[j.id] || { cgId: '', cpId: '' };
                const isComplete = config.cgId && config.cpId;
                const isLocked = j.status === 'locked';
                
                return (
                  <MenuItem key={j.id} value={j.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>{j.flag}</Typography>
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={600} color={isLocked ? 'text.secondary' : 'text.primary'}>
                          {j.country} – {j.insurer}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {j.regulation} • {j.currency}
                        </Typography>
                      </Box>
                      <Chip 
                        label={isLocked ? "Verrouillé" : isComplete ? "Complet" : "En attente"} 
                        size="small" 
                        color={isLocked ? "default" : isComplete ? "success" : "warning"}
                        variant={isComplete ? "filled" : "outlined"}
                        sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                      />
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* 3. Dynamic Content Area */}
      <Grid container spacing={4}>
        {/* Left Column: Context Info */}
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VerifiedUserIcon color="primary" />
              Détails du Contexte
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">Pays</Typography>
                <Typography variant="body1" fontWeight={500}>{activeJurisdiction.country} {activeJurisdiction.flag}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Assureur (Porteur de Risque)</Typography>
                <Typography variant="body1" fontWeight={500}>{activeJurisdiction.insurer}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Devise</Typography>
                <Typography variant="body1" fontWeight={500}>{activeJurisdiction.currency}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Réglementation</Typography>
                <Typography variant="body1" fontWeight={500}>
                  {activeJurisdiction.regulation}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Statut de Configuration
            </Typography>
            <Stack spacing={1.5}>
              {jurisdictions.map(j => {
                const config = jurisdictionConfigs[j.id] || { cgId: '', cpId: '' };
                const hasCg = !!config.cgId;
                const hasCp = !!config.cpId;
                const isLocked = j.status === 'locked';
                
                let statusLabel = "En attente";
                let statusColor: "default" | "success" | "warning" | "error" = "warning";
                
                if (isLocked) {
                  statusLabel = "Verrouillé";
                  statusColor = "default";
                } else if (hasCg && hasCp) {
                  statusLabel = "Complet";
                  statusColor = "success";
                } else if (!hasCg && !hasCp) {
                  statusLabel = "En attente";
                  statusColor = "warning";
                } else if (!hasCg) {
                  statusLabel = "CG Manquante";
                  statusColor = "warning";
                } else {
                  statusLabel = "CP Manquante";
                  statusColor = "warning";
                }

                return (
                  <Box key={j.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem', color: isLocked ? 'text.secondary' : 'text.primary' }}>
                      {j.flag} {j.country}
                    </Typography>
                    <Chip 
                      label={statusLabel} 
                      size="small" 
                      color={statusColor} 
                      variant={statusColor === 'success' ? 'filled' : 'outlined'} 
                      sx={{ height: 20, fontSize: '0.7rem' }} 
                    />
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Grid>

        {/* Right Column: Document Placeholders */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* CG Card */}
            <Card 
              elevation={0}
              sx={{ 
                p: 3, 
                border: '1px solid #e2e8f0',
                borderRadius: 2,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    bgcolor: '#eff6ff', 
                    borderRadius: '12px', 
                    height: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <SecurityIcon color="primary" sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                      <Chip 
                        label="Étape 1" 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.7rem', 
                          fontWeight: 700,
                          bgcolor: '#eff6ff',
                          color: '#1e40af'
                        }} 
                      />
                      <Typography variant="h6" fontWeight={700} color="#1e293b">
                        Conditions Générales
                      </Typography>
                      <Chip 
                        icon={<VerifiedUserIcon sx={{ fontSize: '1rem !important', color: '#1e40af !important' }} />} 
                        label="Juridique" 
                        size="small" 
                        sx={{ 
                          height: 24, 
                          fontSize: '0.7rem', 
                          fontWeight: 600,
                          bgcolor: '#eff6ff',
                          color: '#1e40af',
                          border: '1px solid #bfdbfe',
                        }} 
                      />
                      <Tooltip title="Ce sont les termes juridiques standard approuvés par l'assureur. Ils sont en lecture seule pour assurer la conformité.">
                        <HelpOutlineIcon color="action" fontSize="small" sx={{ cursor: 'help', opacity: 0.6 }} />
                      </Tooltip>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Cadre juridique obligatoire. Standardisé et en lecture seule.
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label={
                    !activeCg ? "Manquant" : 
                    activeCg.jurisdictionId !== selectedJurisdictionId ? "Incompatible" : 
                    "Validé"
                  } 
                  color={
                    !activeCg ? "error" : 
                    activeCg.jurisdictionId !== selectedJurisdictionId ? "warning" : 
                    "success"
                  } 
                  size="small" 
                  variant={!activeCg ? "outlined" : "filled"} 
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              {!activeCg && (
                <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
                  Chaque pays actif doit avoir un document de Conditions Générales validé.
                </Alert>
              )}
              
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth size="small" disabled={isLocked}>
                  <InputLabel>Sélectionner la base juridique</InputLabel>
                  <Select
                    value={currentConfig.cgId}
                    label="Sélectionner la base juridique"
                    onChange={(e) => handleCgChange(e.target.value)}
                  >
                    {availableCgs.map(cg => (
                      <MenuItem key={cg.id} value={cg.id}>{cg.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {activeCg && (
                <Box sx={{ bgcolor: '#f8fafc', p: 2.5, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                  <Grid container spacing={3} sx={{ mb: 2 }}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Version</Typography>
                      <Chip label={activeCg.version} size="small" sx={{ bgcolor: 'white', border: '1px solid #e2e8f0', fontWeight: 600 }} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Date de Validation</Typography>
                      <Typography variant="body2" fontWeight={600} color="#334155">{activeCg.date}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Pays</Typography>
                      <Chip 
                        label={activeJurisdiction.country} 
                        size="small" 
                        avatar={<span style={{ marginLeft: 4 }}>{activeJurisdiction.flag}</span>}
                        sx={{ bgcolor: 'white', border: '1px solid #e2e8f0', fontWeight: 600 }} 
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Assureur</Typography>
                      <Chip 
                        label={activeJurisdiction.insurer} 
                        size="small" 
                        sx={{ bgcolor: 'white', border: '1px solid #e2e8f0', fontWeight: 600 }} 
                      />
                    </Grid>
                  </Grid>
                  
                  <Button 
                    variant="outlined" 
                    startIcon={<PictureAsPdfIcon />} 
                    size="small"
                    sx={{ mb: 2, borderRadius: 1.5, textTransform: 'none', fontWeight: 600 }}
                  >
                    Voir le PDF source
                  </Button>

                  <Alert severity="info" sx={{ borderRadius: 1.5, '& .MuiAlert-message': { fontSize: '0.875rem' } }}>
                    Ce document est géré par le département juridique et ne peut pas être modifié ici.
                  </Alert>
                </Box>
              )}
            </Card>

            {/* CP Card */}
            <Card 
              elevation={0}
              sx={{ 
                p: 3, 
                border: '1px solid #e2e8f0',
                borderRadius: 2,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    bgcolor: '#f0fdf4', 
                    borderRadius: '12px', 
                    height: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ArticleIcon color="success" sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                      <Chip 
                        label="Étape 2" 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.7rem', 
                          fontWeight: 700,
                          bgcolor: '#f0fdf4',
                          color: '#15803d'
                        }} 
                      />
                      <Typography variant="h6" fontWeight={700} color="#1e293b">
                        Conditions Particulières
                      </Typography>
                      <Chip 
                        icon={<BusinessCenterIcon sx={{ fontSize: '1rem !important', color: '#15803d !important' }} />} 
                        label="Métier" 
                        size="small" 
                        sx={{ 
                          height: 24, 
                          fontSize: '0.7rem', 
                          fontWeight: 600,
                          bgcolor: '#f0fdf4',
                          color: '#15803d',
                          border: '1px solid #bbf7d0',
                        }} 
                      />
                      <Tooltip title="Ce document est généré dynamiquement pour chaque client en utilisant les variables définies ci-dessous.">
                        <HelpOutlineIcon color="action" fontSize="small" sx={{ cursor: 'help', opacity: 0.6 }} />
                      </Tooltip>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Modèle d'échéancier flexible. Variables configurables pour les spécificités du produit.
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label={activeCp ? "Configuré" : "Requis"} 
                  color={activeCp ? "success" : "error"} 
                  size="small" 
                  variant={activeCp ? "filled" : "outlined"} 
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth size="small" disabled={isLocked}>
                  <InputLabel>Sélectionner le modèle de contrat</InputLabel>
                  <Select
                    value={currentConfig.cpId}
                    label="Sélectionner le modèle de contrat"
                    onChange={(e) => handleCpChange(e.target.value)}
                  >
                    {availableCps.map(cp => (
                      <MenuItem key={cp.id} value={cp.id}>{cp.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {activeCp && (
                <Box sx={{ bgcolor: '#f8fafc', p: 2.5, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                  <Typography variant="subtitle2" fontWeight={700} color="#334155" gutterBottom>
                    Variables Détectées
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
                    {activeCp.variables.map(v => (
                      <Chip 
                        key={v} 
                        label={`{${v}}`} 
                        size="small" 
                        sx={{ 
                          fontFamily: 'monospace', 
                          bgcolor: 'white', 
                          border: '1px solid #e2e8f0',
                          color: '#475569',
                          fontWeight: 600
                        }} 
                      />
                    ))}
                  </Stack>

                  <Stack direction="row" spacing={2} mb={2}>
                    <Button 
                      variant="outlined" 
                      startIcon={<EditIcon />} 
                      size="small"
                      sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 600 }}
                      onClick={() => setIsMappingModalOpen(true)}
                    >
                      Voir le mappage des variables
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<VisibilityIcon />} 
                      size="small"
                      color="success"
                      sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 600, bgcolor: '#15803d' }}
                      onClick={() => setIsPreviewModalOpen(true)}
                    >
                      Aperçu de l'exemple
                    </Button>
                  </Stack>

                  <Alert severity="info" sx={{ borderRadius: 1.5, '& .MuiAlert-message': { fontSize: '0.875rem' } }}>
                    Ce document sera généré dynamiquement lors de l'émission de la police.
                  </Alert>
                </Box>
              )}
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Variable Mapping Modal */}
      <Dialog open={isMappingModalOpen} onClose={() => setIsMappingModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Configuration du Mappage des Variables</DialogTitle>
        <DialogContent dividers>
            <Typography variant="body2" color="text.secondary" paragraph>
                Les variables suivantes ont été détectées dans le modèle SmartDoc. Le système les a automatiquement mappées aux sources de données disponibles.
            </Typography>
            {activeCp && (
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell><strong>Nom de la Variable</strong></TableCell>
                                <TableCell><strong>Source de Données</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activeCp.variables.map((v) => (
                                <TableRow key={v}>
                                    <TableCell sx={{ fontFamily: 'monospace' }}>{`{${v}}`}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={getSourceFromVariable(v)} 
                                            size="small" 
                                            color="primary" 
                                            variant="outlined" 
                                            sx={{ fontSize: '0.75rem' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setIsMappingModalOpen(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VisibilityIcon color="success" />
          Aperçu : {activeCp?.name}
          <Chip label="Validation MGA Uniquement" size="small" color="warning" variant="outlined" sx={{ ml: 'auto' }} />
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ p: 3, bgcolor: '#fff', border: '1px solid #e2e8f0', borderRadius: 1, minHeight: '400px', fontFamily: 'serif' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>CONDITIONS PARTICULIÈRES</Typography>
              <Typography variant="subtitle1" color="text.secondary">{activeJurisdiction.insurer}</Typography>
            </Box>

            <Typography paragraph>
              <strong>Numéro de Police :</strong> POL-2024-001<br />
              <strong>Date d'Émission :</strong> {new Date().toLocaleDateString()}
            </Typography>

            <Typography paragraph>
              Cet échéancier fait partie de votre police d'assurance. Veuillez le lire attentivement.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>Détails de la Police</Typography>
            
            <Grid container spacing={2}>
              {activeCp?.variables.map(v => {
                let mockValue = "Valeur Exemple";
                if (v.includes('name')) mockValue = "Entreprise Jean Dupont";
                if (v.includes('plate')) mockValue = "AB-123-CD";
                if (v.includes('address')) mockValue = "123 Rue de l'Assurance, Paris";
                if (v.includes('date')) mockValue = "01/01/2025";
                if (v.includes('total')) mockValue = `1 250,00 ${activeJurisdiction.currency}`;
                if (v.includes('limit')) mockValue = `1 000 000,00 ${activeJurisdiction.currency}`;

                return (
                  <Grid item xs={12} sm={6} key={v}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {v.replace(/\./g, ' ').toUpperCase()}
                      </Typography>
                      <Box sx={{ 
                        bgcolor: '#f0fdf4', 
                        border: '1px dashed #16a34a', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1,
                        display: 'inline-block',
                        color: '#15803d',
                        fontWeight: 600
                      }}>
                        {mockValue}
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography paragraph sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
              Ceci est un aperçu généré pour valider le peuplement des variables. La mise en page finale du document peut varier en fonction du modèle d'impression.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPreviewModalOpen(false)}>Fermer l'Aperçu</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Contracts;
