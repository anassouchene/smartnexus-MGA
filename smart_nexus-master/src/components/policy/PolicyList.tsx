import {
    Add as AddIcon,
    DirectionsCar as CarIcon,
    Edit as EditIcon,
    FilterList as FilterIcon,
    History as HistoryIcon,
    Home as HomeIcon,
    MoreVert as MoreVertIcon,
    Search as SearchIcon,
    PlayArrow as SimulateIcon,
    Layers as VersionsIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    Paper,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

// Mock Data for Policy Sets (Auto Vehicle Focused)
const POLICY_SETS = [
  {
    id: 1,
    name: 'Auto Claims - Standard Liability',
    product: 'Auto - Vehicle',
    version: '2.4',
    status: 'Active',
    lastModified: 'il y a 2 heures',
    author: 'Sarah Jenkins',
    rulesCount: 14,
    icon: <CarIcon />
  },
  {
    id: 2,
    name: 'Auto Claims - Comprehensive',
    product: 'Auto - Vehicle',
    version: '1.2',
    status: 'Draft',
    lastModified: 'il y a 10 min',
    author: 'Mike Ross',
    rulesCount: 8,
    icon: <CarIcon />
  },
  {
    id: 3,
    name: 'Commercial Fleet - Underwriting',
    product: 'Auto - Commercial',
    version: '3.0',
    status: 'Active',
    lastModified: 'il y a 1 jour',
    author: 'David Chen',
    rulesCount: 22,
    icon: <CarIcon />
  },
  {
    id: 4,
    name: 'Home Theft & Burglary',
    product: 'Home Insurance',
    version: '1.0',
    status: 'Archived',
    lastModified: 'il y a 1 mois',
    author: 'Sarah Jenkins',
    rulesCount: 5,
    icon: <HomeIcon />
  },
  {
    id: 5,
    name: 'Glass Damage - Fast Track',
    product: 'Auto - Vehicle',
    version: '1.5',
    status: 'Active',
    lastModified: 'il y a 3 jours',
    author: 'Mike Ross',
    rulesCount: 3,
    icon: <CarIcon />
  }
];

interface PolicyListProps {
  onSelectPolicy: (policyId: number) => void;
  onSimulate?: () => void;
  onViewVersions?: () => void;
}

const PolicyList: React.FC<PolicyListProps> = ({ onSelectPolicy, onSimulate, onViewVersions }) => {
  const theme = useTheme();
  const [productFilter, setProductFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuPolicyId, setMenuPolicyId] = useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, policyId: number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuPolicyId(policyId);
  };

  const handleMenuClose = (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
    setMenuPolicyId(null);
  };

  const filteredPolicies = POLICY_SETS.filter(policy => {
    const matchProduct = productFilter === 'All' || policy.product === productFilter;
    const matchStatus = statusFilter === 'All' || policy.status === statusFilter;
    return matchProduct && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return { bg: '#e8f5e9', color: '#2e7d32' };
      case 'Draft': return { bg: '#e3f2fd', color: '#1565c0' };
      case 'Archived': return { bg: '#f5f5f5', color: '#616161' };
      case 'Review': return { bg: '#fff3e0', color: '#ef6c00' };
      default: return { bg: '#f5f5f5', color: '#616161' };
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
            Directives de souscription
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gérez les directives de souscription et les versions des produits.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#1a237e',
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(26, 35, 126, 0.2)'
          }}
        >
          Nouvelle directive
        </Button>
      </Box>

      {/* Filters & Search */}
      <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 2, border: '1px solid #e0e0e0', display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          placeholder="Rechercher des directives..."
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, minWidth: '200px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Gamme de produits</InputLabel>
          <Select
            value={productFilter}
            label="Gamme de produits"
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <MenuItem value="All">Tous les produits</MenuItem>
            <MenuItem value="Auto - Vehicle">Auto - Véhicule</MenuItem>
            <MenuItem value="Auto - Commercial">Auto - Commercial</MenuItem>
            <MenuItem value="Home Insurance">Assurance habitation</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Statut</InputLabel>
          <Select
            value={statusFilter}
            label="Statut"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">Tous les statuts</MenuItem>
            <MenuItem value="Active">Actif</MenuItem>
            <MenuItem value="Draft">Brouillon</MenuItem>
            <MenuItem value="Archived">Archivé</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Grid of Policy Sets */}
      <Grid container spacing={3}>
        {filteredPolicies.map((policy) => {
          const statusStyle = getStatusColor(policy.status);
          return (
            <Grid item xs={12} md={6} lg={4} key={policy.id}>
              <Paper
                onClick={() => onSelectPolicy(policy.id)}
                elevation={0}
                sx={{
                  p: 3,
                  border: '1px solid #e0e0e0',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  '&:hover': {
                    borderColor: '#1a237e',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {/* Card Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: statusStyle.bg,
                        color: statusStyle.color,
                        width: 48,
                        height: 48
                      }}
                    >
                      {policy.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {policy.product}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                        {policy.name}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuOpen(e, policy.id)}
                    sx={{ height: 32, width: 32 }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                {/* Status & Version */}
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  <Chip 
                    label={policy.status} 
                    size="small" 
                    sx={{ 
                      bgcolor: statusStyle.bg,
                      color: statusStyle.color,
                      fontWeight: 600,
                      borderRadius: 1
                    }} 
                  />
                  <Chip 
                    label={`v${policy.version}`} 
                    size="small" 
                    variant="outlined"
                    sx={{ borderRadius: 1, borderColor: '#e0e0e0' }}
                  />
                  <Chip 
                    label={`${policy.rulesCount} Conditions`} 
                    size="small" 
                    variant="outlined"
                    sx={{ borderRadius: 1, borderColor: '#e0e0e0' }}
                  />
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Footer Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <HistoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      Mis à jour {policy.lastModified}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Couverture de test">
                      <IconButton 
                        size="small" 
                        onClick={(e) => { e.stopPropagation(); onSimulate?.(); }}
                        sx={{ color: '#1a237e', bgcolor: '#e8eaf6', '&:hover': { bgcolor: '#c5cae9' } }}
                      >
                        <SimulateIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Modifier les directives">
                      <IconButton 
                        size="small" 
                        onClick={(e) => { e.stopPropagation(); onSelectPolicy(policy.id); }}
                        sx={{ color: '#1a237e', bgcolor: '#e8eaf6', '&:hover': { bgcolor: '#c5cae9' } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose()}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 180, borderRadius: 2 }
        }}
      >
        <MenuItem onClick={() => handleMenuClose()}>
          <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Modifier les directives
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); onSimulate?.(); }}>
          <SimulateIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Couverture de test
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); onViewVersions?.(); }}>
          <VersionsIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Historique d'audit
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleMenuClose()} sx={{ color: 'error.main' }}>
          <FilterIcon fontSize="small" sx={{ mr: 1.5 }} />
          Archiver
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PolicyList;
