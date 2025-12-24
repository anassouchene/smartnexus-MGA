import {
  Warning as AlertIcon,
  ArrowForward as ArrowIcon,
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
  Schedule as ClockIcon,
  FilterList as FilterIcon,
  Public as GlobeIcon,
  Info as InfoIcon,
  AttachMoney as MoneyIcon,
  MoreVert as MoreIcon,
  AssignmentLate as NoClaimsIcon,
  LayersClear as NoDataIcon,
  PublicOff as NoGlobeIcon,
  People as PeopleIcon,
  Description as PolicyIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Tooltip as MuiTooltip,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import EmptyState from '../components/common/EmptyState';

// Mock Data
const STATS = [
  { 
    label: 'Produits de Souscription', 
    value: '12', 
    change: '+2', 
    trend: 'up', 
    icon: PolicyIcon, 
    color: '#2563eb', 
    bgcolor: '#eff6ff' 
  },
  { 
    label: 'Territoires Agréés', 
    value: '8', 
    change: 'Actif', 
    trend: 'neutral', 
    icon: GlobeIcon, 
    color: '#16a34a', 
    bgcolor: '#f0fdf4' 
  },
  { 
    label: 'Porteurs de Risques', 
    value: '5', 
    change: 'Activé', 
    trend: 'neutral', 
    icon: BusinessIcon, 
    color: '#7c3aed', 
    bgcolor: '#f5f3ff' 
  },
  { 
    label: 'Primes Brutes Émises', 
    value: '€450k', 
    change: '+12.5%', 
    trend: 'up', 
    icon: MoneyIcon, 
    color: '#0891b2', 
    bgcolor: '#ecfeff' 
  },
  { 
    label: 'Ratio de Sinistralité (S/P)', 
    value: '42.8%', 
    change: '-2.1%', 
    trend: 'down', 
    icon: AlertIcon, 
    color: '#ea580c', 
    bgcolor: '#fff7ed' 
  }
];

// Chart Data
const SALES_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Fév', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Avr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Juin', value: 2390 },
  { name: 'Juil', value: 3490 },
];

const CHANNEL_EVOLUTION_DATA = [
  { month: 'Jan', B2C: 40, B2B: 24, B2B2C: 24 },
  { month: 'Fév', B2C: 30, B2B: 13, B2B2C: 22 },
  { month: 'Mar', B2C: 20, B2B: 58, B2B2C: 22 },
  { month: 'Avr', B2C: 27, B2B: 39, B2B2C: 20 },
  { month: 'Mai', B2C: 18, B2B: 48, B2B2C: 21 },
  { month: 'Juin', B2C: 23, B2B: 38, B2B2C: 25 },
];

const CHANNEL_DATA = [
  { name: 'B2C', value: 45, color: '#2563eb' },
  { name: 'B2B', value: 35, color: '#7c3aed' },
  { name: 'B2B2C', value: 20, color: '#0891b2' },
];

const COMPLIANCE_DATA = [
  { name: 'Conforme', value: 75, color: '#16a34a' },
  { name: 'Non Conforme', value: 25, color: '#e2e8f0' },
];

const CLAIMS_EVOLUTION_DATA = [
  { day: '1', claims: 12 },
  { day: '5', claims: 19 },
  { day: '10', claims: 3 },
  { day: '15', claims: 25 },
  { day: '20', claims: 15 },
  { day: '25', claims: 8 },
  { day: '30', claims: 10 },
];

const CLAIMS_BY_PRODUCT_DATA = [
  { name: 'Flotte Auto', value: 142, fill: '#ef4444' },
  { name: 'Risque Cyber', value: 48, fill: '#f97316' },
  { name: 'Construction', value: 12, fill: '#eab308' },
];

const FUNNEL_DATA = [
  { value: 12, name: 'Brouillon', fill: '#94a3b8' },
  { value: 8, name: 'Juridique', fill: '#3b82f6' },
  { value: 5, name: 'Publié', fill: '#22c55e' },
];

const RECENT_POLICIES = [
  { id: 'POL-2024-001', client: 'Tech Solutions Inc.', product: 'Risque Cyber', premium: '€12,500', status: 'Actif', date: "Aujourd'hui" },
  { id: 'POL-2024-002', client: 'Green Logistics', product: 'Flotte Auto', premium: '€45,200', status: 'En Attente', date: 'Hier' },
  { id: 'POL-2024-003', client: 'Dr. Sarah Smith', product: 'Resp. Civile Pro', premium: '€3,800', status: 'Actif', date: '20 Déc' },
  { id: 'POL-2024-004', client: 'BuildRight Construction', product: 'Construction TR', premium: '€28,000', status: 'Révision', date: '19 Déc' },
];

const TASKS = [
  { id: 1, title: 'Approuver Devis #Q-4592', type: 'Souscription', priority: 'Haute', due: '2h' },
  { id: 2, title: 'Examiner Sinistre #CLM-8821', type: 'Sinistres', priority: 'Moyenne', due: '4h' },
  { id: 3, title: 'Intégration Courtier: AXA Partners', type: 'Conformité', priority: 'Basse', due: '1j' },
];

const PRODUCT_PERFORMANCE = [
  { name: 'Flotte Auto', value: 75, color: 'primary' },
  { name: 'Risque Cyber', value: 45, color: 'secondary' },
  { name: 'Resp. Civile Pro', value: 60, color: 'success' },
  { name: 'Construction', value: 30, color: 'warning' },
];

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  
  // Filter State
  const [filters, setFilters] = React.useState({
    product: 'all',
    country: 'all',
    insurer: 'all',
    reinsurer: 'all',
    timeRange: '30d'
  });

  // Load filters from localStorage
  React.useEffect(() => {
    const savedFilters = localStorage.getItem('dashboardFilters');
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      setFilters({
        product: parsedFilters.product ?? 'all',
        country: parsedFilters.country ?? 'all',
        insurer: parsedFilters.insurer ?? 'all',
        reinsurer: parsedFilters.reinsurer ?? 'all',
        timeRange: parsedFilters.timeRange ?? '30d'
      });
    }
  }, []);

  // Save filters to localStorage
  React.useEffect(() => {
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, pb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} color="#1e293b" gutterBottom>
              Tour de Contrôle
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Supervision en temps réel de la souscription, des sinistres et de la conformité.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              sx={{ bgcolor: '#0f172a', textTransform: 'none', '&:hover': { bgcolor: '#334155' } }}
              onClick={() => console.log('Generating Report...')}
            >
              Exporter la Synthèse
            </Button>
          </Stack>
        </Box>

        {/* Global Filters */}
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: 'white' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b', mr: 1 }}>
              <FilterIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle2" fontWeight={600}>Filtres :</Typography>
            </Box>
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Produit</InputLabel>
              <Select
                value={filters.product}
                label="Produit"
                onChange={(e) => handleFilterChange('product', e.target.value)}
              >
                <MenuItem value="all">Tous Produits</MenuItem>
                <MenuItem value="auto">Auto</MenuItem>
                <MenuItem value="mobilite">Mobilité</MenuItem>
                <MenuItem value="habitation">Habitation</MenuItem>
                <MenuItem value="cyber">Cyber</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Pays</InputLabel>
              <Select
                value={filters.country}
                label="Pays"
                onChange={(e) => handleFilterChange('country', e.target.value)}
              >
                <MenuItem value="all">Tous Pays</MenuItem>
                <MenuItem value="fr">France</MenuItem>
                <MenuItem value="es">Espagne</MenuItem>
                <MenuItem value="ma">Maroc</MenuItem>
                <MenuItem value="cima">Zone CIMA</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Assureur</InputLabel>
              <Select
                value={filters.insurer}
                label="Assureur"
                onChange={(e) => handleFilterChange('insurer', e.target.value)}
              >
                <MenuItem value="all">Tous Assureurs</MenuItem>
                <MenuItem value="axa">AXA</MenuItem>
                <MenuItem value="allianz">Allianz</MenuItem>
                <MenuItem value="generali">Generali</MenuItem>
                <MenuItem value="wakam">Wakam</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Reassureur</InputLabel>
              <Select
                value={filters.reinsurer}
                label="Reassureur"
                onChange={(e) => handleFilterChange('reinsurer', e.target.value)}
              >
                <MenuItem value="all">Tous Reassureurs</MenuItem>
                <MenuItem value="scor">SCOR</MenuItem>
                <MenuItem value="swissre">Swiss Re</MenuItem>
                <MenuItem value="munichre">Munich Re</MenuItem>
                <MenuItem value="hannoverre">Hannover Re</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Période</InputLabel>
              <Select
                value={filters.timeRange}
                label="Période"
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
              >
                <MenuItem value="7d">7 Derniers Jours</MenuItem>
                <MenuItem value="30d">30 Derniers Jours</MenuItem>
                <MenuItem value="90d">Dernier Trimestre</MenuItem>
                <MenuItem value="ytd">Depuis le Début de l'Année</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }} columns={{ xs: 12, sm: 12, md: 10 }}>
        {STATS.map((stat, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <MuiTooltip title={`Cliquez pour voir le rapport détaillé ${stat.label}`} arrow>
              <Card 
                elevation={0} 
                onClick={() => {
                  if (stat.label === 'Active Products') navigate('/products');
                  else if (stat.label === 'Active Jurisdictions') navigate('/settings');
                  else if (stat.label === 'Claims Ratio') navigate('/claims');
                  else if (stat.label === 'Monthly Premium') navigate('/policy');
                }}
                sx={{ 
                  border: '1px solid #e2e8f0', 
                  borderRadius: 2,
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1, 
                        borderRadius: 1.5, 
                        bgcolor: stat.bgcolor, 
                        color: stat.color,
                        display: 'flex'
                      }}
                    >
                      <stat.icon fontSize="small" />
                    </Box>
                    {stat.trend === 'neutral' ? (
                      <Chip 
                        label={stat.change} 
                        size="small" 
                        color="default" 
                        variant="outlined"
                        sx={{ bgcolor: '#f8fafc', borderColor: 'transparent', color: '#64748b', fontWeight: 600 }}
                      />
                    ) : stat.trend === 'up' ? (
                      <Chip 
                        icon={<TrendingUpIcon sx={{ fontSize: '1rem !important' }} />} 
                        label={stat.change} 
                        size="small" 
                        color={stat.label === 'Claims Ratio' ? 'error' : 'success'} 
                        variant="outlined"
                        sx={{ 
                          bgcolor: stat.label === 'Claims Ratio' ? '#fef2f2' : '#f0fdf4', 
                          borderColor: 'transparent', 
                          color: stat.label === 'Claims Ratio' ? '#ef4444' : '#16a34a', 
                          fontWeight: 600 
                        }}
                      />
                    ) : (
                      <Chip 
                        icon={<TrendingDownIcon sx={{ fontSize: '1rem !important' }} />} 
                        label={stat.change} 
                        size="small" 
                        color={stat.label === 'Claims Ratio' ? 'success' : 'error'} 
                        variant="outlined"
                        sx={{ 
                          bgcolor: stat.label === 'Claims Ratio' ? '#f0fdf4' : '#fef2f2', 
                          borderColor: 'transparent', 
                          color: stat.label === 'Claims Ratio' ? '#16a34a' : '#ef4444', 
                          fontWeight: 600 
                        }}
                      />
                    )}
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h4" fontWeight={700} color="#0f172a" sx={{ mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <InfoIcon sx={{ fontSize: 16, color: '#cbd5e1' }} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </MuiTooltip>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Sales Overview Chart Placeholder */}
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600} color="#0f172a">
                  Analyse de la Production de Primes
                </Typography>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Box>
              <Box sx={{ height: 300, width: '100%' }}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
                ) : SALES_DATA.length === 0 ? (
                  <EmptyState 
                    icon={NoDataIcon}
                    title="Aucune Donnée de Production"
                    description="Configurez les produits pour commencer le suivi des primes."
                    actionLabel="Configurer Produits"
                    onAction={() => navigate('/products')}
                  />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                      data={SALES_DATA} 
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      onClick={() => navigate('/policy')}
                      style={{ cursor: 'pointer' }}
                    >
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                        cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Recent Policies Table */}
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                <Typography variant="h6" fontWeight={600} color="#0f172a">
                  Polices Récentes
                </Typography>
                <Button 
                  endIcon={<ArrowIcon />} 
                  size="small" 
                  sx={{ textTransform: 'none' }}
                  onClick={() => navigate('/policy')}
                >
                  Voir Tout
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: '#f8fafc' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>ID Police</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Client</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Produit</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Prime</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Statut</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {RECENT_POLICIES.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ fontWeight: 500, color: '#2563eb' }}>{row.id}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#334155' }}>{row.client}</TableCell>
                        <TableCell>{row.product}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{row.premium}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status} 
                            size="small" 
                            sx={{ 
                              height: 24,
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              bgcolor: row.status === 'Actif' ? '#f0fdf4' : row.status === 'En Attente' ? '#fff7ed' : '#fef2f2',
                              color: row.status === 'Actif' ? '#16a34a' : row.status === 'En Attente' ? '#ea580c' : '#ef4444'
                            }} 
                          />
                        </TableCell>
                        <TableCell color="text.secondary">{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Pending Tasks */}
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600} color="#0f172a">
                  Tâches en Attente
                </Typography>
                <Chip label="3 Nouveau" size="small" color="error" sx={{ height: 20, fontSize: '0.7rem' }} />
              </Box>
              <Stack spacing={2}>
                {TASKS.map((task) => (
                  <Paper 
                    key={task.id} 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      bgcolor: '#f8fafc', 
                      border: '1px solid #e2e8f0',
                      borderRadius: 1.5,
                      '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f1f5f9', cursor: 'pointer' }
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                      <Chip 
                        label={task.type} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.65rem', 
                          bgcolor: 'white', 
                          border: '1px solid #e2e8f0',
                          fontWeight: 600
                        }} 
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ClockIcon sx={{ fontSize: 14 }} /> {task.due}
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle2" fontWeight={600} color="#334155" gutterBottom>
                      {task.title}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar sx={{ width: 20, height: 20, fontSize: '0.6rem', bgcolor: '#cbd5e1' }}>JD</Avatar>
                      <Typography variant="caption" color="text.secondary">Assigné à Anas Khatim</Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
              <Button 
                fullWidth 
                sx={{ mt: 2, textTransform: 'none', color: '#64748b' }}
                onClick={() => navigate('/workflow')}
              >
                Voir Toutes les Tâches
              </Button>
            </CardContent>
          </Card>

          {/* Product Performance */}
          <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} color="#0f172a" gutterBottom>
                Performance Produit
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Répartition des ventes par ligne de produit
              </Typography>
              
              <Stack spacing={3}>
                {PRODUCT_PERFORMANCE.map((item) => (
                  <Box key={item.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight={500} color="#334155">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="#0f172a">
                        {item.value}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={item.value} 
                      color={item.color as any}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: '#f1f5f9',
                        '& .MuiLinearProgress-bar': { borderRadius: 4 }
                      }} 
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Distribution Channels Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={600} color="#0f172a" sx={{ mb: 2 }}>
          Canaux de Distribution
        </Typography>
        <Grid container spacing={3}>
          {/* KPIs */}
          <Grid item xs={12} md={3}>
            <Stack spacing={3}>
              <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                    Meilleure Performance
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                    <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: '#eff6ff', color: '#2563eb', display: 'flex' }}>
                      <PeopleIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700}>B2C</Typography>
                      <Typography variant="body2" color="text.secondary">45% du volume</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                    Croissance Rapide
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                    <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: '#ecfeff', color: '#0891b2', display: 'flex' }}>
                      <TrendingUpIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700}>B2B2C</Typography>
                      <Typography variant="body2" color="text.secondary">+18% M/M</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Stacked Bar Chart */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Volume de Primes par Canal</Typography>
                <Box sx={{ height: 200, mt: 2 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
                  ) : CHANNEL_DATA.length === 0 ? (
                    <EmptyState 
                      icon={NoDataIcon}
                      title="Aucune Donnée de Canal"
                      description="Aucune donnée de distribution disponible."
                    />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>
                        <Pie
                          data={CHANNEL_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {CHANNEL_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </Box>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  {CHANNEL_DATA.map((channel) => (
                    <Stack key={channel.name} direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: channel.color }} />
                        <Typography variant="body2">{channel.name}</Typography>
                      </Stack>
                      <Typography variant="body2" fontWeight={600}>{channel.value}%</Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Line Chart */}
          <Grid item xs={12} md={5}>
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Évolution de la Performance</Typography>
                <Box sx={{ height: 250, mt: 2 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
                  ) : CHANNEL_EVOLUTION_DATA.length === 0 ? (
                    <EmptyState 
                      icon={TrendingUpIcon}
                      title="Aucune Donnée d'Évolution"
                      description="Pas assez de données pour afficher les tendances."
                    />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={CHANNEL_EVOLUTION_DATA}
                        onClick={() => navigate('/products')}
                        style={{ cursor: 'pointer' }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                          itemStyle={{ fontSize: '12px' }}
                        />
                        <Line type="monotone" dataKey="B2C" stroke="#2563eb" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="B2B" stroke="#7c3aed" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="B2B2C" stroke="#0891b2" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Legal & Compliance Status Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={600} color="#0f172a" sx={{ mb: 2 }}>
          Statut Juridique & Conformité
        </Typography>
        
        {/* Alert Banner */}
        <Card elevation={0} sx={{ mb: 3, bgcolor: '#fef2f2', border: '1px solid #fecaca' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ p: 1, bgcolor: '#fee2e2', borderRadius: '50%', color: '#ef4444' }}>
              <AlertIcon />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} color="#991b1b">
                Problèmes Bloquants Détectés
              </Typography>
              <Typography variant="body2" color="#b91c1c">
                Le lancement du produit est bloqué dans 2 juridictions (Maroc, Zone CIMA) en raison de documents juridiques manquants.
              </Typography>
            </Box>
            <Button 
              variant="outlined" 
              color="error" 
              size="small" 
              sx={{ ml: 'auto', bgcolor: 'white' }}
              onClick={() => navigate('/settings')}
            >
              Résoudre les Problèmes
            </Button>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Compliance Donut Chart */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Aperçu de la Conformité</Typography>
                <Box sx={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {loading ? (
                    <Skeleton variant="circular" width={160} height={160} />
                  ) : COMPLIANCE_DATA.length === 0 ? (
                    <EmptyState 
                      icon={NoGlobeIcon}
                      title="Aucune Juridiction Active"
                      description="Configurez les juridictions pour suivre la conformité."
                      actionLabel="Configurer"
                      onAction={() => navigate('/settings')}
                    />
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}>
                          <Pie
                            data={COMPLIANCE_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {COMPLIANCE_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight={700} color="#0f172a">75%</Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                  des juridictions sont entièrement conformes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Jurisdiction Status List */}
          <Grid item xs={12} md={8}>
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: '#f8fafc' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Juridiction</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Base Légale (CG)</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Conditions Particulières (CP)</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Statut</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { country: 'France', cg: 'Valide', cp: 'Configuré', status: 'Actif' },
                      { country: 'Espagne', cg: 'Valide', cp: 'Configuré', status: 'Actif' },
                      { country: 'Maroc', cg: 'Valide', cp: 'Manquant', status: 'Bloqué' },
                      { country: 'Zone CIMA', cg: 'Manquant', cp: 'Manquant', status: 'Bloqué' },
                    ].map((row) => (
                      <TableRow key={row.country} hover>
                        <TableCell sx={{ fontWeight: 600, color: '#0f172a' }}>{row.country}</TableCell>
                        <TableCell>
                          {row.cg === 'Valide' ? (
                            <Chip icon={<CheckIcon sx={{ fontSize: '1rem !important' }} />} label="Valide" size="small" color="success" variant="outlined" sx={{ bgcolor: '#f0fdf4', borderColor: 'transparent' }} />
                          ) : (
                            <Chip icon={<AlertIcon sx={{ fontSize: '1rem !important' }} />} label="Manquant" size="small" color="error" variant="outlined" sx={{ bgcolor: '#fef2f2', borderColor: 'transparent' }} />
                          )}
                        </TableCell>
                        <TableCell>
                          {row.cp === 'Configuré' ? (
                            <Chip icon={<CheckIcon sx={{ fontSize: '1rem !important' }} />} label="Configuré" size="small" color="success" variant="outlined" sx={{ bgcolor: '#f0fdf4', borderColor: 'transparent' }} />
                          ) : (
                            <Chip icon={<AlertIcon sx={{ fontSize: '1rem !important' }} />} label="Manquant" size="small" color="error" variant="outlined" sx={{ bgcolor: '#fef2f2', borderColor: 'transparent' }} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status} 
                            size="small" 
                            sx={{ 
                              fontWeight: 600,
                              bgcolor: row.status === 'Actif' ? '#f0fdf4' : '#fef2f2',
                              color: row.status === 'Actif' ? '#16a34a' : '#ef4444'
                            }} 
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <ArrowIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Risk & Claims Overview Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={600} color="#0f172a" sx={{ mb: 2 }}>
          Exposition aux Risques & Gestion des Sinistres
        </Typography>

        <Grid container spacing={3}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              {[
                { label: 'Coût Moyen Sinistre', value: '€1,250', status: 'Normal', color: 'success', icon: MoneyIcon },
                { label: 'Taux d\'Approbation', value: '92%', status: 'Normal', color: 'success', icon: CheckIcon },
                { label: 'Délai Moyen Résolution', value: '14 Jours', status: 'À Surveiller', color: 'warning', icon: ClockIcon },
              ].map((kpi, index) => (
                <Card 
                  key={index} 
                  elevation={0} 
                  sx={{ 
                    border: '1px solid #e2e8f0', 
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
                  }}
                  onClick={() => navigate('/claims')}
                >
                  <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ p: 1, borderRadius: 1, bgcolor: kpi.color === 'success' ? '#f0fdf4' : '#fff7ed', color: kpi.color === 'success' ? '#16a34a' : '#ea580c' }}>
                          <kpi.icon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">{kpi.label}</Typography>
                          <Typography variant="h6" fontWeight={700} color="#0f172a">{kpi.value}</Typography>
                        </Box>
                      </Stack>
                      <Chip 
                        label={kpi.status} 
                        size="small" 
                        color={kpi.color as any} 
                        variant="outlined" 
                        sx={{ 
                          bgcolor: kpi.color === 'success' ? '#f0fdf4' : '#fff7ed', 
                          borderColor: 'transparent',
                          fontWeight: 600
                        }} 
                      />
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Claims Evolution (Line Chart) */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Volume des Sinistres (30 Jours)</Typography>
                <Box sx={{ height: 200, mt: 2 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
                  ) : CLAIMS_EVOLUTION_DATA.length === 0 ? (
                    <EmptyState 
                      icon={NoClaimsIcon}
                      title="Aucune Activité Sinistre"
                      description="Aucun sinistre enregistré sur la période sélectionnée."
                      actionLabel="Voir Registre Sinistres"
                      onAction={() => navigate('/claims')}
                    />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart 
                        data={CLAIMS_EVOLUTION_DATA}
                        onClick={() => navigate('/claims')}
                        style={{ cursor: 'pointer' }}
                      >
                        <defs>
                          <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                          itemStyle={{ fontSize: '12px' }}
                        />
                        <Area type="monotone" dataKey="claims" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorClaims)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  Pic de volume détecté le 15 Déc
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Claims by Product (Bar Chart) */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Sinistres par Produit</Typography>
                <Box sx={{ height: 200, mt: 2 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        layout="vertical" 
                        data={CLAIMS_BY_PRODUCT_DATA} 
                        margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                        onClick={() => navigate('/claims')}
                        style={{ cursor: 'pointer' }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                          {CLAIMS_BY_PRODUCT_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </Box>
                <Box sx={{ mt: 2, p: 2, bgcolor: '#fef2f2', borderRadius: 2, display: 'flex', gap: 1.5 }}>
                  <AlertIcon color="error" fontSize="small" sx={{ mt: 0.2 }} />
                  <Box>
                    <Typography variant="caption" fontWeight={700} color="#991b1b" display="block">
                      Alerte Critique
                    </Typography>
                    <Typography variant="caption" color="#b91c1c">
                      La fréquence des sinistres Flotte Auto dépasse le seuil (+15%)
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Operational Efficiency Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={600} color="#0f172a" sx={{ mb: 2 }}>
          Indicateurs de Performance Opérationnelle
        </Typography>
        <Grid container spacing={3}>
          {/* Efficiency KPIs */}
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              {[
                { label: 'Délai de Lancement Produit', value: '45 Jours', subtext: 'Cible : 30 Jours', status: 'En Retard', color: 'error', icon: PolicyIcon },
                { label: 'Validation Juridiction', value: '12 Jours', subtext: 'Cible : 14 Jours', status: 'Dans les Temps', color: 'success', icon: GlobeIcon },
                { label: 'Traitement Sinistre', value: '5 Jours', subtext: 'Cible : 7 Jours', status: 'Excellent', color: 'success', icon: ClockIcon },
              ].map((kpi, index) => (
                <Card 
                  key={index} 
                  elevation={0} 
                  sx={{ 
                    border: '1px solid #e2e8f0', 
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
                  }}
                  onClick={() => navigate('/products')}
                >
                  <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: kpi.color === 'success' ? '#f0fdf4' : '#fef2f2', color: kpi.color === 'success' ? '#16a34a' : '#ef4444' }}>
                          <kpi.icon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">{kpi.label}</Typography>
                          <Typography variant="h6" fontWeight={700} color="#0f172a">{kpi.value}</Typography>
                          <Typography variant="caption" color="text.secondary">{kpi.subtext}</Typography>
                        </Box>
                      </Stack>
                      {kpi.status === 'En Retard' && (
                         <Chip label="Goulot d'étranglement" size="small" color="error" variant="filled" sx={{ fontWeight: 600 }} />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Product Lifecycle Funnel */}
          <Grid item xs={12} md={7}>
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Entonnoir du Cycle de Vie Produit</Typography>
                <Box sx={{ height: 300, mt: 2 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
                  ) : FUNNEL_DATA.length === 0 ? (
                    <EmptyState 
                      icon={NoDataIcon}
                      title="Aucune Donnée de Cycle de Vie"
                      description="Initialisez la configuration produit pour voir les analyses du cycle de vie."
                      actionLabel="Configurer Produits"
                      onAction={() => navigate('/products')}
                    />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <FunnelChart 
                        onClick={() => navigate('/products')}
                        style={{ cursor: 'pointer' }}
                      >
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                          itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                        />
                        <Funnel
                          dataKey="value"
                          data={FUNNEL_DATA}
                          isAnimationActive
                        >
                          <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                          {FUNNEL_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Funnel>
                      </FunnelChart>
                    </ResponsiveContainer>
                  )}
                </Box>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                   <Typography variant="caption" color="text.secondary">
                     Taux de Conversion : <Box component="span" fontWeight={700} color="#0f172a">41.6%</Box> de Brouillon à Publié
                   </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
