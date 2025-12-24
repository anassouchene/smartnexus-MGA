import {
    Add as AddIcon,
    Apartment as ApartmentIcon,
    TwoWheeler as BikeIcon,
    DirectionsCar as CarIcon,
    Close as CloseIcon,
    ContentCopy as ContentCopyIcon,
    Delete as DeleteIcon,
    Devices as DevicesIcon,
    Edit as EditIcon,
    ExpandMore as ExpandMoreIcon,
    FilterList as FilterIcon,
    Flight as FlightIcon,
    GridView as GridViewIcon,
    HealthAndSafety as HealthIcon,
    History as HistoryIcon,
    Home as HomeIcon,
    Inbox as InboxIcon,
    AccountBalance as IncomeIcon,
    Link as LinkIcon,
    MoreVert as MoreVertIcon,
    Smartphone as PhoneIcon,
    PostAdd as PostAddIcon,
    Search as SearchIcon,
    SearchOff as SearchOffIcon,
    Security as SecurityIcon,
    ViewList as ViewListIcon,
    Visibility as VisibilityIcon,
    AccountTree as WorkflowIcon
} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Paper,
    Popover,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

// Mock Data aligned with requirements
const PRODUCTS = [
  // 1. TRIK BEKHIR – Mobility
  // Category: Mobilité individuelle motorisée
  {
    id: 101,
    name: 'Assurance Auto – Particulier',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité individuelle motorisée',
    carrier: 'AXA XL',
    version: '3.1',
    status: 'Publié',
    linkedPolicy: 'Auto Private Policy v3',
    linkedWorkflow: 'Standard Claims Flow',
    lastModified: 'Il y a 2 jours',
    icon: <CarIcon />
  },
  {
    id: 102,
    name: 'Assurance Deux-Roues (Moto / Scooter)',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité individuelle motorisée',
    carrier: 'Allianz',
    version: '1.0',
    status: 'Brouillon',
    linkedPolicy: 'Moto Comprehensive',
    linkedWorkflow: 'Moto Assessment',
    lastModified: 'À l\'instant',
    icon: <BikeIcon />
  },
  {
    id: 113,
    name: 'Infinity Meka',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité individuelle motorisée',
    carrier: 'AXA XL',
    version: '0.9',
    status: 'Brouillon',
    linkedPolicy: 'Infinity Meka Policy',
    linkedWorkflow: 'Infinity Meka Flow',
    lastModified: 'À l\'instant',
    icon: <CarIcon />
  },
  // Category: Mobilité douce & micro-mobilité
  {
    id: 103,
    name: 'Assurance Vélo & Vélo Électrique',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité douce & micro-mobilité',
    carrier: 'Wakam',
    version: '2.0',
    status: 'Publié',
    linkedPolicy: 'E-Bike Theft & Damage',
    linkedWorkflow: 'Simple Claim Flow',
    lastModified: 'Il y a 5 jours',
    icon: <BikeIcon />
  },
  {
    id: 104,
    name: 'Assurance Trottinettes & EDPM',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité douce & micro-mobilité',
    carrier: 'Wakam',
    version: '1.1',
    status: 'Publié',
    linkedPolicy: 'Micro-mobility Liability',
    linkedWorkflow: 'Fast Track',
    lastModified: 'Il y a 1 semaine',
    icon: <BikeIcon />
  },
  {
    id: 114,
    name: 'Infinity Mobility',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité douce & micro-mobilité',
    carrier: 'Wakam',
    version: '0.9',
    status: 'Brouillon',
    linkedPolicy: 'Infinity Mobility Policy',
    linkedWorkflow: 'Infinity Mobility Flow',
    lastModified: 'À l\'instant',
    icon: <BikeIcon />
  },
  // Category: Mobilité locative & occasionnelle
  {
    id: 105,
    name: 'Assurance Location de Véhicule – Courte Durée',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité locative & occasionnelle',
    carrier: 'Allianz',
    version: '4.0',
    status: 'Publié',
    linkedPolicy: 'Rental Daily Cover',
    linkedWorkflow: 'Rental Damage Flow',
    lastModified: 'Il y a 3 jours',
    icon: <CarIcon />
  },
  {
    id: 106,
    name: 'Assurance Autopartage & Mobilité Partagée',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité locative & occasionnelle',
    carrier: 'AXA XL',
    version: '1.2',
    status: 'Brouillon',
    linkedPolicy: 'Car Sharing Liability',
    linkedWorkflow: 'Peer-to-Peer Claims',
    lastModified: 'Hier',
    icon: <CarIcon />
  },
  // Category: Mobilité de loisirs & saisonnière
  {
    id: 107,
    name: 'Assurance Loisirs Motorisés',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité de loisirs & saisonnière',
    carrier: 'Generali',
    version: '1.0',
    status: 'Archivé',
    linkedPolicy: 'Quad & Buggy Cover',
    linkedWorkflow: 'Specialty Claims',
    lastModified: 'Il y a 1 mois',
    icon: <CarIcon />
  },
  // Category: Mobilité professionnelle
  {
    id: 108,
    name: 'Assurance Flottes de Véhicules Professionnels',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité professionnelle',
    carrier: 'AXA XL',
    version: '5.2',
    status: 'Publié',
    linkedPolicy: 'Fleet Commercial',
    linkedWorkflow: 'Fleet Manager Portal',
    lastModified: 'Il y a 4 heures',
    icon: <CarIcon />
  },
  {
    id: 109,
    name: 'Assurance Location de Véhicule – Usage Professionnel',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité professionnelle',
    carrier: 'Allianz',
    version: '2.1',
    status: 'Publié',
    linkedPolicy: 'Pro Rental Cover',
    linkedWorkflow: 'B2B Claims Flow',
    lastModified: 'Il y a 2 semaines',
    icon: <CarIcon />
  },
  // Category: Mobilité internationale
  {
    id: 110,
    name: 'Assurance Voyage',
    environment: 'TRIK BEKHIR',
    category: 'Mobilité internationale',
    carrier: 'Chubb',
    version: '3.0',
    status: 'Publié',
    linkedPolicy: 'Travel Medical & Cancellation',
    linkedWorkflow: 'Global Assistance',
    lastModified: 'Il y a 1 jour',
    icon: <FlightIcon />
  },
  // Category: Produits transverses mobilité
  {
    id: 111,
    name: 'Rachat de Franchise Mobilité',
    environment: 'TRIK BEKHIR',
    category: 'Produits transverses mobilité',
    carrier: 'Wakam',
    version: '1.5',
    status: 'Publié',
    linkedPolicy: 'Excess Waiver',
    linkedWorkflow: 'Automated Refund',
    lastModified: 'Il y a 3 jours',
    icon: <SecurityIcon />
  },
  {
    id: 112,
    name: 'Assurance Assistance Mobilité',
    environment: 'TRIK BEKHIR',
    category: 'Produits transverses mobilité',
    carrier: 'Europ Assistance',
    version: '2.2',
    status: 'Publié',
    linkedPolicy: 'Roadside Assistance',
    linkedWorkflow: 'Dispatch Integration',
    lastModified: 'Il y a 1 semaine',
    icon: <CarIcon />
  },

  // 2. HOMA – Real Estate
  // Category: HOME – HOMA
  {
    id: 201,
    name: 'Habitation',
    environment: 'HOMA',
    category: 'HOME – HOMA',
    carrier: 'Allianz',
    version: '2.0',
    status: 'Publié',
    linkedPolicy: 'Home Comprehensive',
    linkedWorkflow: 'Home Claims Flow',
    lastModified: 'Il y a 2 jours',
    icon: <HomeIcon />
  },
  {
    id: 202,
    name: 'Locataire',
    environment: 'HOMA',
    category: 'HOME – HOMA',
    carrier: 'AXA XL',
    version: '1.5',
    status: 'Publié',
    linkedPolicy: 'Tenant Liability',
    linkedWorkflow: 'Tenant Claims',
    lastModified: 'Il y a 1 semaine',
    icon: <ApartmentIcon />
  },
  {
    id: 203,
    name: 'Logement étudiant',
    environment: 'HOMA',
    category: 'HOME – HOMA',
    carrier: 'Wakam',
    version: '1.0',
    status: 'Publié',
    linkedPolicy: 'Student Housing',
    linkedWorkflow: 'Simple Claims',
    lastModified: 'Hier',
    icon: <ApartmentIcon />
  },
  {
    id: 204,
    name: 'PNO (Propriétaire Non Occupant)',
    environment: 'HOMA',
    category: 'HOME – HOMA',
    carrier: 'Allianz',
    version: '3.1',
    status: 'Publié',
    linkedPolicy: 'Landlord PNO',
    linkedWorkflow: 'PNO Claims',
    lastModified: 'Il y a 3 jours',
    icon: <HomeIcon />
  },
  {
    id: 205,
    name: 'Caution Loyer',
    environment: 'HOMA',
    category: 'HOME – HOMA',
    carrier: 'Wakam',
    version: '1.2',
    status: 'Brouillon',
    linkedPolicy: 'Rent Deposit',
    linkedWorkflow: 'Deposit Refund',
    lastModified: 'Il y a 4 heures',
    icon: <SecurityIcon />
  },
  {
    id: 206,
    name: 'Loyers Impayés (GLI)',
    environment: 'HOMA',
    category: 'HOME – HOMA',
    carrier: 'AXA XL',
    version: '2.2',
    status: 'Publié',
    linkedPolicy: 'Unpaid Rent Guarantee',
    linkedWorkflow: 'Rent Recovery',
    lastModified: 'Il y a 2 semaines',
    icon: <IncomeIcon />
  },
  {
    id: 207,
    name: 'Emprunteur Immobilier',
    environment: 'HOMA',
    category: 'HOME – HOMA',
    carrier: 'CNIA Saada',
    version: '4.0',
    status: 'Publié',
    linkedPolicy: 'Mortgage Protection',
    linkedWorkflow: 'Loan Insurance Flow',
    lastModified: 'Il y a 5 jours',
    icon: <HomeIcon />
  },
  {
    id: 208,
    name: 'Protection Juridique Immobilière',
    environment: 'HOMA',
    category: 'HOME – HOMA',
    carrier: 'Allianz',
    version: '1.1',
    status: 'Brouillon',
    linkedPolicy: 'Real Estate Legal Protection',
    linkedWorkflow: 'Legal Assistance',
    lastModified: 'À l\'instant',
    icon: <SecurityIcon />
  },

  // 3. SAFE – Everyday Protection
  {
    id: 301,
    name: 'SAFE · ALL THINGS',
    environment: 'SAFE',
    category: 'Everyday Protection',
    subtitle: 'Protection complète des objets nomades',
    carrier: 'Wakam',
    version: '1.0',
    status: 'Publié',
    linkedPolicy: 'Nomad All Risk',
    linkedWorkflow: 'Fast Track Claims',
    lastModified: 'Il y a 2 jours',
    icon: <DevicesIcon />
  },
  {
    id: 302,
    name: 'SAFE · DRIVE',
    environment: 'SAFE',
    category: 'Everyday Protection',
    subtitle: 'Protection conducteur et passagers',
    carrier: 'AXA XL',
    version: '2.1',
    status: 'Publié',
    linkedPolicy: 'Driver Protection',
    linkedWorkflow: 'Bodily Injury Flow',
    lastModified: 'Il y a 1 semaine',
    icon: <CarIcon />
  },
  {
    id: 303,
    name: 'SAFE · MOVE',
    environment: 'SAFE',
    category: 'Everyday Protection',
    subtitle: 'Assurance déplacements quotidiens',
    carrier: 'Allianz',
    version: '1.2',
    status: 'Brouillon',
    linkedPolicy: 'Commute Cover',
    linkedWorkflow: 'Travel Incident Flow',
    lastModified: 'Hier',
    icon: <BikeIcon />
  },
  {
    id: 304,
    name: 'SAFE · ID',
    environment: 'SAFE',
    category: 'Everyday Protection',
    subtitle: 'Protection identité et vie numérique',
    carrier: 'Chubb',
    version: '3.0',
    status: 'Publié',
    linkedPolicy: 'Cyber Identity Shield',
    linkedWorkflow: 'Cyber Response Team',
    lastModified: 'Il y a 3 jours',
    icon: <SecurityIcon />
  },
  {
    id: 305,
    name: 'Goodz',
    environment: 'SAFE',
    category: 'Everyday Protection',
    subtitle: 'Pour tous vos biens',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <DevicesIcon />
  },

  // 4. kooralink - Assurances sportives
  {
    id: 601,
    name: 'Assurance Homme clé',
    environment: 'kooralink',
    category: 'Protection des clubs',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <IncomeIcon />
  },
  {
    id: 602,
    name: 'Assurance Mandataire Social',
    environment: 'kooralink',
    category: 'Protection des clubs',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <SecurityIcon />
  },
  {
    id: 603,
    name: 'Assurance Prévoyance Collective',
    environment: 'kooralink',
    category: 'Protection des clubs',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <HealthIcon />
  },
  {
    id: 604,
    name: 'Responsabilité Civile (RC)',
    environment: 'kooralink',
    category: 'Protection des clubs',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <SecurityIcon />
  },
  {
    id: 605,
    name: 'Annulation et Dommages',
    environment: 'kooralink',
    category: 'Protection des clubs',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <PostAddIcon />
  },
  {
    id: 606,
    name: 'Garantie Perte de Licence',
    environment: 'kooralink',
    category: 'Garanties joueurs professionnels',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <HealthIcon />
  },
  {
    id: 607,
    name: 'Garantie Décès',
    environment: 'kooralink',
    category: 'Garanties joueurs professionnels',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <HealthIcon />
  },
  {
    id: 608,
    name: 'Garantie Incapacité Temporaire',
    environment: 'kooralink',
    category: 'Garanties joueurs professionnels',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <HealthIcon />
  },
  {
    id: 609,
    name: 'Garantie Responsabilité Civile Agent',
    environment: 'kooralink',
    category: 'Garanties agents',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <SecurityIcon />
  },
  {
    id: 610,
    name: 'Garantie Frais de Santé',
    environment: 'kooralink',
    category: 'Garanties joueurs professionnels',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <HealthIcon />
  },
  {
    id: 611,
    name: 'Garantie Perte de Licence (Amateur)',
    environment: 'kooralink',
    category: 'Garanties joueurs amateurs',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <HealthIcon />
  },
  {
    id: 612,
    name: 'Garantie Décès (Amateur)',
    environment: 'kooralink',
    category: 'Garanties joueurs amateurs',
    carrier: 'À compléter',
    version: 'À compléter',
    status: 'Brouillon',
    linkedPolicy: 'À compléter',
    linkedWorkflow: 'À compléter',
    lastModified: 'À compléter',
    icon: <HealthIcon />
  },

  {
    id: 613,
    name: 'amo',
    environment: 'kooralink',
    category: 'Protection des clubs',
    carrier: 'A completer',
    version: 'A completer',
    status: 'Brouillon',
    linkedPolicy: 'A completer',
    linkedWorkflow: 'A completer',
    lastModified: 'A completer',
    icon: <HealthIcon />
  },
  {
    id: 615,
    name: 'mutuel',
    environment: 'kooralink',
    category: 'Protection des clubs',
    carrier: 'A completer',
    version: 'A completer',
    status: 'Brouillon',
    linkedPolicy: 'A completer',
    linkedWorkflow: 'A completer',
    lastModified: 'A completer',
    icon: <HealthIcon />
  },
  // 5. MGA DEVICES – Device & Electronics
  {
    id: 401,
    name: 'Protection Essentielle Device',
    environment: 'MGA DEVICES',
    category: 'Device Protection',
    tags: ['High Volume'],
    carrier: 'CNIA Saada',
    version: '4.2',
    status: 'Publié',
    linkedPolicy: 'Mobile Device All Risk',
    linkedWorkflow: 'Instant Replacement Flow',
    lastModified: 'Il y a 4 heures',
    icon: <PhoneIcon />
  },
  {
    id: 402,
    name: 'Extension de Garantie Intelligente',
    environment: 'MGA DEVICES',
    category: 'Device Protection',
    tags: ['Premium'],
    carrier: 'AXA XL',
    version: '2.1',
    status: 'Publié',
    linkedPolicy: 'Electronics Extended Warranty',
    linkedWorkflow: 'Repair Center Dispatch',
    lastModified: 'Il y a 2 semaines',
    icon: <DevicesIcon />
  },
  {
    id: 403,
    name: 'Échange & Continuité d’Usage',
    environment: 'MGA DEVICES',
    category: 'Device Protection',
    tags: ['Premium'],
    carrier: 'Wakam',
    version: '1.0',
    status: 'Publié',
    linkedPolicy: 'Device Swap Service',
    linkedWorkflow: 'Logistics Dispatch',
    lastModified: 'Hier',
    icon: <DevicesIcon />
  },
  {
    id: 404,
    name: 'Protection Reconditionné Sécurisé',
    environment: 'MGA DEVICES',
    category: 'Device Protection',
    tags: ['High Volume'],
    carrier: 'Allianz',
    version: '1.5',
    status: 'Publié',
    linkedPolicy: 'Refurbished Device Cover',
    linkedWorkflow: 'Standard Claims',
    lastModified: 'Il y a 3 jours',
    icon: <PhoneIcon />
  },
  {
    id: 405,
    name: 'Multi-Équipements Famille / Foyer',
    environment: 'MGA DEVICES',
    category: 'Device Protection',
    tags: ['High Volume'],
    carrier: 'CNIA Saada',
    version: '3.0',
    status: 'Brouillon',
    linkedPolicy: 'Household Gadget Cover',
    linkedWorkflow: 'Multi-Device Claim',
    lastModified: 'Il y a 5 jours',
    icon: <DevicesIcon />
  },
  {
    id: 406,
    name: 'Offre Pro & TPE Équipements',
    environment: 'MGA DEVICES',
    category: 'Device Protection',
    tags: ['B2B'],
    carrier: 'AXA XL',
    version: '2.0',
    status: 'Publié',
    linkedPolicy: 'Business Equipment All Risk',
    linkedWorkflow: 'B2B Priority Flow',
    lastModified: 'Il y a 1 semaine',
    icon: <DevicesIcon />
  },

  // 6. Prévention & Sécurité
  {
    id: 501,
    name: 'Assurance Sécurité',
    environment: 'Prévention & Sécurité',
    category: 'Protection Quotidienne',
    subtitle: 'Protection contre les incidents du quotidien',
    tags: ['Standalone', 'Monthly'],
    carrier: 'AXA XL',
    version: '1.0',
    status: 'Publié',
    linkedPolicy: 'Daily Incident Cover',
    linkedWorkflow: 'Incident Report Flow',
    lastModified: 'Il y a 2 jours',
    icon: <SecurityIcon />
  },
  {
    id: 502,
    name: 'Protection Pouvoir d’Achat',
    environment: 'Prévention & Sécurité',
    category: 'Protection Quotidienne',
    subtitle: 'Protection des revenus à court terme',
    tags: ['Standalone', 'Monthly'],
    carrier: 'Allianz',
    version: '2.0',
    status: 'Publié',
    linkedPolicy: 'Income Shield',
    linkedWorkflow: 'Benefit Claim Flow',
    lastModified: 'Il y a 1 semaine',
    icon: <IncomeIcon />
  }
];

interface ProductCatalogProps {
  onSelectProduct: (id: number) => void;
  onCreateProduct: () => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct, onCreateProduct }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    return (localStorage.getItem('productCatalogView') as 'grid' | 'list') || 'grid';
  });
  
  // Sorting & Filtering State
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  
  // Advanced Filters Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    environments: [] as string[],
    categories: [] as string[],
    carriers: [] as string[],
    countries: [] as string[],
    statuses: [] as string[],
    channels: [] as string[]
  });

  const handleAdvancedFilterChange = (type: keyof typeof advancedFilters, value: string) => {
    setAdvancedFilters(prev => {
      const current = prev[type];
      const newValues = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: newValues };
    });
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      environments: [],
      categories: [],
      carriers: [],
      countries: [],
      statuses: [],
      channels: []
    });
  };

  const handleClearAllFilters = () => {
    setSearchTerm('');
    setFilters({});
    clearAdvancedFilters();
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>, column: string) => {
    event.stopPropagation();
    setFilterAnchorEl(event.currentTarget);
    setActiveFilterColumn(column);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
    setActiveFilterColumn(null);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (activeFilterColumn) {
      setFilters({
        ...filters,
        [activeFilterColumn]: event.target.value
      });
    }
  };

  const filteredAndSortedProducts = PRODUCTS.filter((product) => {
    // Global search
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.environment.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Column filters
    const matchesColumnFilters = Object.keys(filters).every((key) => {
      const filterValue = filters[key].toLowerCase();
      if (!filterValue) return true;
      const productValue = String((product as any)[key] || '').toLowerCase();
      return productValue.includes(filterValue);
    });

    // Advanced Filters
    const matchesEnv = advancedFilters.environments.length === 0 || advancedFilters.environments.includes(product.environment);
    const matchesCat = advancedFilters.categories.length === 0 || advancedFilters.categories.includes((product as any).category || '');
    const matchesCarrier = advancedFilters.carriers.length === 0 || advancedFilters.carriers.includes(product.carrier);
    const matchesCountry = advancedFilters.countries.length === 0 || advancedFilters.countries.includes((product as any).country || 'Unknown');
    const matchesStatus = advancedFilters.statuses.length === 0 || advancedFilters.statuses.includes(product.status);
    const matchesChannel = advancedFilters.channels.length === 0 || advancedFilters.channels.includes((product as any).distributionChannel || 'Unknown');

    return matchesSearch && matchesColumnFilters && matchesEnv && matchesCat && matchesCarrier && matchesCountry && matchesStatus && matchesChannel;
  }).sort((a, b) => {
    const valueA = (a as any)[orderBy];
    const valueB = (b as any)[orderBy];

    if (valueA < valueB) {
      return order === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, nextView: 'grid' | 'list') => {
    if (nextView !== null) {
      setViewMode(nextView);
      localStorage.setItem('productCatalogView', nextView);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, productId: number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publié': return { bg: '#e8f5e9', color: '#2e7d32', border: '#c8e6c9' };
      case 'Brouillon': return { bg: '#e3f2fd', color: '#1565c0', border: '#bbdefb' };
      case 'Archivé': return { bg: '#f5f5f5', color: '#616161', border: '#e0e0e0' };
      default: return { bg: '#f5f5f5', color: '#616161', border: '#e0e0e0' };
    }
  };

  // Group products by environment
  const groupedProducts = filteredAndSortedProducts.reduce((acc, product) => {
    if (!acc[product.environment]) {
      acc[product.environment] = [];
    }
    acc[product.environment].push(product);
    return acc;
  }, {} as Record<string, typeof PRODUCTS>);

  const environments = Object.keys(groupedProducts);

  // Derived options for filters
  const allEnvironments = [...new Set(PRODUCTS.map(p => p.environment))];
  const allCategories = [...new Set(PRODUCTS.map(p => (p as any).category).filter(Boolean))];
  const allCarriers = [...new Set(PRODUCTS.map(p => p.carrier))];
  const allCountries = ['Morocco', 'France', 'International']; // Hardcoded for now as data is missing
  const allStatuses = ['Publié', 'Brouillon', 'Archivé'];
  const allChannels = ['B2C', 'B2B', 'B2B2C'];

  const hasActiveFilters = searchTerm || Object.keys(filters).length > 0 || 
    Object.values(advancedFilters).some(arr => arr.length > 0);

  const renderEmptyState = (type: 'global' | 'environment', envName?: string) => {
    if (type === 'global') {
      return (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          py: 8,
          px: 2,
          textAlign: 'center',
          bgcolor: 'white',
          borderRadius: 2,
          border: '1px dashed #e0e0e0'
        }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: '#f5f5f5', mb: 2 }}>
            <SearchOffIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
          </Avatar>
          <Typography variant="h6" gutterBottom color="text.primary">
            Aucun résultat trouvé
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
            Nous n'avons trouvé aucun produit correspondant à vos critères de recherche. Essayez de modifier vos filtres ou votre recherche.
          </Typography>
          <Button 
            variant="outlined" 
            onClick={handleClearAllFilters}
            startIcon={<CloseIcon />}
          >
            Effacer tous les filtres
          </Button>
        </Box>
      );
    }

    // Environment Empty State
    const isFiltered = hasActiveFilters;
    const isPublishedFilter = filters['status'] === 'Publié' || advancedFilters.statuses.includes('Publié');

    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        py: 4,
        textAlign: 'center',
        bgcolor: '#fafafa',
        borderRadius: 2
      }}>
        <InboxIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1.5 }} />
        <Typography variant="subtitle1" fontWeight={600} color="text.secondary" gutterBottom>
          {isFiltered 
            ? (isPublishedFilter ? "Aucun produit publié" : "Aucun résultat dans cet environnement")
            : "Aucun produit"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 300 }}>
          {isFiltered 
            ? "Modifiez vos filtres pour voir plus de résultats."
            : `Il n'y a pas encore de produits dans l'environnement ${envName}.`}
        </Typography>
        {isFiltered ? (
          <Button 
            size="small" 
            color="primary" 
            onClick={handleClearAllFilters}
          >
            Réinitialiser les filtres
          </Button>
        ) : (
          <Button 
            size="small" 
            variant="contained" 
            startIcon={<PostAddIcon />}
            onClick={onCreateProduct}
          >
            Créer un produit
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
            Bibliothèque de produits
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gérez les produits d'assurance, les polices liées et les définitions de flux de travail.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateProduct}
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
          Créer un produit
        </Button>
      </Box>

      {/* Filters */}
      <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 2, border: '1px solid #e0e0e0', display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Rechercher des produits, des polices ou des flux de travail..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>
          }}
        />
        <Button 
          startIcon={<FilterIcon />} 
          variant="outlined" 
          onClick={() => setIsSidebarOpen(true)}
          sx={{ 
            textTransform: 'none', 
            borderColor: isSidebarOpen ? 'primary.main' : '#e0e0e0', 
            color: isSidebarOpen ? 'primary.main' : 'text.secondary',
            bgcolor: isSidebarOpen ? 'primary.50' : 'transparent'
          }}
        >
          Filtres
        </Button>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <GridViewIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      {/* Product Groups */}
      {filteredAndSortedProducts.length === 0 ? (
        renderEmptyState('global')
      ) : viewMode === 'grid' ? (
      <Box>
        {allEnvironments.map((env) => {
          const envProducts = groupedProducts[env] || [];
          // Check if any product in this env has a category
          const hasCategories = envProducts.some((p: any) => p.category);
          
          const categories = hasCategories 
            ? [...new Set(envProducts.map((p: any) => p.category || 'Autres'))]
            : ['default'];

          return (
          <Accordion 
            key={env}
            defaultExpanded={false}
            disableGutters
            elevation={0}
            sx={{ 
              mb: 2, 
              border: '1px solid #e0e0e0', 
              borderRadius: 2,
              '&:before': { display: 'none' },
              overflow: 'hidden'
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', pr: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#424242', display: 'flex', alignItems: 'center', gap: 1 }}>
                  {env === 'TRIK BEKHIR' && <CarIcon color="primary" />}
                  {env === 'HOMA' && <HomeIcon color="primary" />}
                  {env === 'SAFE' && <SecurityIcon color="primary" />}
                  {env === 'kooralink' && <HealthIcon color="primary" />}
                  {env === 'MGA DEVICES' && <DevicesIcon color="primary" />}
                  {env === 'Prévention & Sécurité' && <HealthIcon color="primary" />}
                  {env}
                </Typography>
                <Chip label={envProducts.length} size="small" sx={{ ml: 'auto', fontWeight: 600, bgcolor: envProducts.length === 0 ? '#f5f5f5' : '#e0e0e0', color: envProducts.length === 0 ? 'text.disabled' : 'text.primary' }} />
              </Box>
            </AccordionSummary>
            
            <AccordionDetails sx={{ bgcolor: '#fafafa', p: 3 }}>
            {envProducts.length === 0 ? (
              renderEmptyState('environment', env)
            ) : (
              categories.map(cat => {
              const catProducts = envProducts.filter((p: any) => !hasCategories || (p.category || 'Autres') === cat);
              
              if (!hasCategories) {
                 return (
                    <Grid container spacing={3} key={cat}>
                      {catProducts.map((product) => {
                        const statusStyle = getStatusColor(product.status);
                        return (
                          <Grid item xs={12} md={6} lg={4} key={product.id}>
                            <Paper
                              onClick={() => onSelectProduct(product.id)}
                              elevation={0}
                              sx={{
                                p: 0,
                                border: '1px solid #e0e0e0',
                                borderRadius: 3,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden',
                                '&:hover': {
                                  borderColor: '#1a237e',
                                  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                                  transform: 'translateY(-2px)'
                                }
                              }}
                            >
                              {/* Card Header */}
                              <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                  <Avatar sx={{ bgcolor: '#e8eaf6', color: '#1a237e', width: 48, height: 48 }}>
                                    {product.icon}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                      {product.carrier}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                                      {product.name}
                                    </Typography>
                                    {(product as any).subtitle && (
                                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.75rem', lineHeight: 1.3 }}>
                                        {(product as any).subtitle}
                                      </Typography>
                                    )}
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                      <Chip 
                                        label={product.status} 
                                        size="small" 
                                        sx={{ 
                                          bgcolor: statusStyle.bg, 
                                          color: statusStyle.color, 
                                          border: `1px solid ${statusStyle.border}`,
                                          fontWeight: 600, 
                                          borderRadius: 1,
                                          height: 20,
                                          fontSize: '0.7rem'
                                        }} 
                                      />
                                      {(product as any).tags?.map((tag: string) => (
                                        <Chip
                                          key={tag}
                                          label={tag}
                                          size="small"
                                          sx={{
                                            bgcolor: tag === 'Premium' ? '#fff3e0' : tag === 'B2B' ? '#e3f2fd' : '#f3e5f5',
                                            color: tag === 'Premium' ? '#e65100' : tag === 'B2B' ? '#1565c0' : '#7b1fa2',
                                            border: '1px solid transparent',
                                            fontWeight: 600,
                                            borderRadius: 1,
                                            height: 20,
                                            fontSize: '0.7rem'
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                </Box>
                                <IconButton size="small" onClick={(e) => handleMenuOpen(e, product.id)}>
                                  <MoreVertIcon />
                                </IconButton>
                              </Box>

                              <Divider />

                              {/* Linked Modules */}
                              <Box sx={{ p: 2.5, bgcolor: '#fafafa' }}>
                                <Stack spacing={1.5}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <LinkIcon sx={{ fontSize: 16, color: 'text.secondary', transform: 'rotate(45deg)' }} />
                                    <Box sx={{ flex: 1 }}>
                                      <Typography variant="caption" display="block" color="text.secondary">Police liée</Typography>
                                      <Typography variant="body2" fontWeight={500} noWrap title={product.linkedPolicy}>
                                        {product.linkedPolicy}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <WorkflowIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Box sx={{ flex: 1 }}>
                                      <Typography variant="caption" display="block" color="text.secondary">Flux de travail lié</Typography>
                                      <Typography variant="body2" fontWeight={500} noWrap title={product.linkedWorkflow}>
                                        {product.linkedWorkflow}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Stack>
                              </Box>

                              <Divider />

                              {/* Footer */}
                              <Box sx={{ p: 1.5, px: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white' }}>
                                <Typography variant="caption" color="text.secondary">
                                  v{product.version} • {product.lastModified}
                                </Typography>
                                <Box>
                                  <Tooltip title="Aperçu">
                                    <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Modifier">
                                    <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
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
                 );
              }

              return (
                <Accordion 
                  key={cat} 
                  defaultExpanded={true}
                  elevation={0}
                  sx={{ 
                    mb: 2, 
                    bgcolor: 'transparent',
                    '&:before': { display: 'none' },
                    boxShadow: 'none'
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ px: 0, minHeight: 48, flexDirection: 'row-reverse', '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(90deg)' }, '& .MuiAccordionSummary-expandIconWrapper': { transform: 'rotate(0deg)', mr: 1 } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'text.secondary' }}>
                        {cat}
                      </Typography>
                      <Chip label={catProducts.length} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pt: 0 }}>
                    <Grid container spacing={3}>
                      {catProducts.map((product) => {
                        const statusStyle = getStatusColor(product.status);
                        return (
                          <Grid item xs={12} md={6} lg={4} key={product.id}>
                            <Paper
                              onClick={() => onSelectProduct(product.id)}
                              elevation={0}
                              sx={{
                                p: 0,
                                border: '1px solid #e0e0e0',
                                borderRadius: 3,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden',
                                '&:hover': {
                                  borderColor: '#1a237e',
                                  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                                  transform: 'translateY(-2px)'
                                }
                              }}
                            >
                              {/* Card Header */}
                              <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                  <Avatar sx={{ bgcolor: '#e8eaf6', color: '#1a237e', width: 48, height: 48 }}>
                                    {product.icon}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                      {product.carrier}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                                      {product.name}
                                    </Typography>
                                    {(product as any).subtitle && (
                                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.75rem', lineHeight: 1.3 }}>
                                        {(product as any).subtitle}
                                      </Typography>
                                    )}
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                      <Chip 
                                        label={product.status} 
                                        size="small" 
                                        sx={{ 
                                          bgcolor: statusStyle.bg, 
                                          color: statusStyle.color, 
                                          border: `1px solid ${statusStyle.border}`,
                                          fontWeight: 600, 
                                          borderRadius: 1,
                                          height: 20,
                                          fontSize: '0.7rem'
                                        }} 
                                      />
                                      {(product as any).tags?.map((tag: string) => (
                                        <Chip
                                          key={tag}
                                          label={tag}
                                          size="small"
                                          sx={{
                                            bgcolor: tag === 'Premium' ? '#fff3e0' : tag === 'B2B' ? '#e3f2fd' : '#f3e5f5',
                                            color: tag === 'Premium' ? '#e65100' : tag === 'B2B' ? '#1565c0' : '#7b1fa2',
                                            border: '1px solid transparent',
                                            fontWeight: 600,
                                            borderRadius: 1,
                                            height: 20,
                                            fontSize: '0.7rem'
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                </Box>
                                <IconButton size="small" onClick={(e) => handleMenuOpen(e, product.id)}>
                                  <MoreVertIcon />
                                </IconButton>
                              </Box>

                              <Divider />

                              {/* Linked Modules */}
                              <Box sx={{ p: 2.5, bgcolor: '#fafafa' }}>
                                <Stack spacing={1.5}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <LinkIcon sx={{ fontSize: 16, color: 'text.secondary', transform: 'rotate(45deg)' }} />
                                    <Box sx={{ flex: 1 }}>
                                      <Typography variant="caption" display="block" color="text.secondary">Police liée</Typography>
                                      <Typography variant="body2" fontWeight={500} noWrap title={product.linkedPolicy}>
                                        {product.linkedPolicy}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <WorkflowIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Box sx={{ flex: 1 }}>
                                      <Typography variant="caption" display="block" color="text.secondary">Flux de travail lié</Typography>
                                      <Typography variant="body2" fontWeight={500} noWrap title={product.linkedWorkflow}>
                                        {product.linkedWorkflow}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Stack>
                              </Box>

                              <Divider />

                              {/* Footer */}
                              <Box sx={{ p: 1.5, px: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white' }}>
                                <Typography variant="caption" color="text.secondary">
                                  v{product.version} • {product.lastModified}
                                </Typography>
                                <Box>
                                  <Tooltip title="Aperçu">
                                    <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Modifier">
                                    <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
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
                  </AccordionDetails>
                </Accordion>
              );
            })
            )}
            </AccordionDetails>
          </Accordion>
        );
        })}
      </Box>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                {[
                  { id: 'name', label: 'Nom du produit' },
                  { id: 'environment', label: 'Environnement' },
                  { id: 'category', label: 'Catégorie' },
                  { id: 'carrier', label: 'Porteur' },
                  { id: 'status', label: 'Statut' },
                  { id: 'version', label: 'Version' },
                  { id: 'linkedPolicy', label: 'Police liée' },
                  { id: 'linkedWorkflow', label: 'Flux lié' },
                  { id: 'lastModified', label: 'Dernière modif.' }
                ].map((col) => (
                  <TableCell key={col.id} sx={{ fontWeight: 600 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TableSortLabel
                        active={orderBy === col.id}
                        direction={orderBy === col.id ? order : 'asc'}
                        onClick={() => handleRequestSort(col.id)}
                      >
                        {col.label}
                      </TableSortLabel>
                      <IconButton size="small" onClick={(e) => handleFilterClick(e, col.id)}>
                        <FilterIcon fontSize="small" color={filters[col.id] ? 'primary' : 'action'} />
                      </IconButton>
                    </Box>
                  </TableCell>
                ))}
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedProducts.map((product) => {
                const statusStyle = getStatusColor(product.status);
                return (
                  <TableRow
                    key={product.id}
                    hover
                    onClick={() => onSelectProduct(product.id)}
                    sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#e8eaf6', color: '#1a237e', width: 32, height: 32 }}>
                          {product.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {product.name}
                          </Typography>
                          {(product as any).subtitle && (
                            <Typography variant="caption" color="text.secondary">
                              {(product as any).subtitle}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{product.environment}</TableCell>
                    <TableCell>{(product as any).category || '-'}</TableCell>
                    <TableCell>{product.carrier}</TableCell>
                    <TableCell>
                      <Chip 
                        label={product.status} 
                        size="small" 
                        sx={{ 
                          bgcolor: statusStyle.bg, 
                          color: statusStyle.color, 
                          border: `1px solid ${statusStyle.border}`,
                          fontWeight: 600, 
                          borderRadius: 1,
                          height: 20,
                          fontSize: '0.7rem'
                        }} 
                      />
                    </TableCell>
                    <TableCell>v{product.version}</TableCell>
                    <TableCell>{product.linkedPolicy}</TableCell>
                    <TableCell>{product.linkedWorkflow}</TableCell>
                    <TableCell>{product.lastModified}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleMenuOpen(e); }}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            autoFocus
            placeholder={`Filtrer...`}
            value={activeFilterColumn ? filters[activeFilterColumn] || '' : ''}
            onChange={handleFilterChange}
            size="small"
          />
        </Box>
      </Popover>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 180, borderRadius: 2 }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Modifier le produit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <HistoryIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Voir les versions
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ContentCopyIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Dupliquer
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1.5 }} />
          Archiver
        </MenuItem>
      </Menu>

      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        PaperProps={{ sx: { width: 320, p: 3 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>Filtres avancés</Typography>
          <IconButton onClick={() => setIsSidebarOpen(false)} size="small"><CloseIcon /></IconButton>
        </Box>
        
        <Stack spacing={3} sx={{ pb: 4 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1 }}>Environnement</FormLabel>
            <FormGroup>
              {allEnvironments.map(env => (
                <FormControlLabel
                  key={env}
                  control={
                    <Checkbox 
                      checked={advancedFilters.environments.includes(env)} 
                      onChange={() => handleAdvancedFilterChange('environments', env)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">{env}</Typography>}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Divider />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1 }}>Catégorie</FormLabel>
            <FormGroup>
              {allCategories.map((cat: any) => (
                <FormControlLabel
                  key={cat}
                  control={
                    <Checkbox 
                      checked={advancedFilters.categories.includes(cat)} 
                      onChange={() => handleAdvancedFilterChange('categories', cat)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">{cat}</Typography>}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Divider />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1 }}>Porteur (Assureur)</FormLabel>
            <FormGroup>
              {allCarriers.map(carrier => (
                <FormControlLabel
                  key={carrier}
                  control={
                    <Checkbox 
                      checked={advancedFilters.carriers.includes(carrier)} 
                      onChange={() => handleAdvancedFilterChange('carriers', carrier)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">{carrier}</Typography>}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Divider />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1 }}>Pays / Juridiction</FormLabel>
            <FormGroup>
              {allCountries.map((country: any) => (
                <FormControlLabel
                  key={country}
                  control={
                    <Checkbox 
                      checked={advancedFilters.countries.includes(country)} 
                      onChange={() => handleAdvancedFilterChange('countries', country)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">{country}</Typography>}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Divider />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1 }}>Statut</FormLabel>
            <FormGroup>
              {allStatuses.map(status => (
                <FormControlLabel
                  key={status}
                  control={
                    <Checkbox 
                      checked={advancedFilters.statuses.includes(status)} 
                      onChange={() => handleAdvancedFilterChange('statuses', status)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">{status}</Typography>}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Divider />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1 }}>Canal de distribution</FormLabel>
            <FormGroup>
              {allChannels.map((channel: any) => (
                <FormControlLabel
                  key={channel}
                  control={
                    <Checkbox 
                      checked={advancedFilters.channels.includes(channel)} 
                      onChange={() => handleAdvancedFilterChange('channels', channel)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">{channel}</Typography>}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Box sx={{ pt: 2 }}>
            <Button 
              fullWidth 
              variant="outlined" 
              color="error" 
              onClick={clearAdvancedFilters}
              startIcon={<DeleteIcon />}
            >
              Réinitialiser les filtres
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default ProductCatalog;
