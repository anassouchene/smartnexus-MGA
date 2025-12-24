import {
    AddCircle as AddCircleIcon,
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    AttachFile as AttachFileIcon,
    Block as BlockIcon,
    Business as BusinessIcon,
    CheckCircle as CheckCircleIcon,
    Code as CodeIcon,
    VerifiedUser as CoverageIcon,
    Delete as DeleteIcon,
    DragIndicator as DragIcon,
    Edit as EditIcon,
    Description as FileIcon,
    Public as GlobeIcon,
    History as HistoryIcon,
    Info as InfoIcon,
    Gavel as LegalIcon,
    Hub as ModulesIcon,
    EuroSymbol as PriceIcon,
    Publish as PublishIcon,
    Assignment as RiskIcon,
    Save as SaveIcon,
    Tune as TuneIcon,
    Visibility as ViewIcon,
    Warning as WarningIcon
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  COUNTRIES_BY_REGION as INSURANCE_COUNTRIES_BY_REGION,
  INSURANCE_COUNTRIES,
  REGIONS as INSURANCE_REGIONS
} from '../../data/insuranceCompanies';

interface ProductStudioProps {
  onBack: () => void;
  productId?: number | null;
}

interface RiskField {
  id: string;
  label: string;
  description: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  category: string;
  linkedDocument?: string;
}

interface Carrier {
  id: string;
  region?: string;
  country: string;
  insurer: string;
  hasReinsurer?: boolean;
  reinsurer?: string;
  currency: string;
  regulation: string;
  status: 'active' | 'inactive';
}

const REGIONS = [...INSURANCE_REGIONS];

const COUNTRIES_BY_REGION = INSURANCE_COUNTRIES_BY_REGION;

const BASE_COUNTRY_METADATA: Record<string, { currency: string; regulation: string }> = {
  'Maroc': {
    currency: 'MAD',
    regulation: 'Code des assurances marocain'
  },
  'France': {
    currency: 'EUR',
    regulation: 'Code des assurances'
  },
  'Espagne': {
    currency: 'EUR',
    regulation: 'Ley de Contrato de Seguro'
  },
  'Tunisie': {
    currency: 'TND',
    regulation: 'Code des Assurances (Tunisie)'
  },
  'Sénégal': {
    currency: 'XOF',
    regulation: 'Code CIMA'
  },
  "Côte d'Ivoire": {
    currency: 'XOF',
    regulation: 'Code CIMA'
  }
};

const COUNTRY_METADATA: Record<string, { currency: string; regulation: string; insurers: string[] }> =
  INSURANCE_COUNTRIES.reduce((acc, entry) => {
    const base = BASE_COUNTRY_METADATA[entry.country] || {
      currency: 'À compléter',
      regulation: 'À compléter'
    };
    acc[entry.country] = { ...base, insurers: entry.insurers };
    return acc;
  }, {} as Record<string, { currency: string; regulation: string; insurers: string[] }>);

const REINSURERS_BY_REGION: Record<string, string[]> = {
  Europe: ['SCOR', 'Swiss Re', 'Munich Re', 'Hannover Re', 'PartnerRe', 'CCR Re'],
  Maghreb: ['Morocco Re', 'Tunis Re', 'Algerian Re', 'Libya Re', 'Africa Re'],
  CIMA: ['Africa Re', 'CICA Re', 'WAICA Re', 'ZEP-RE']
};

const REINSURERS_BY_COUNTRY: Record<string, string[]> = {
  France: ['SCOR', 'CCR Re', 'PartnerRe'],
  Allemagne: ['Munich Re', 'Hannover Re'],
  Suisse: ['Swiss Re', 'PartnerRe'],
  Maroc: ['Morocco Re', 'Africa Re'],
  Tunisie: ['Tunis Re', 'Africa Re'],
  "Côte d'Ivoire": ['Africa Re', 'CICA Re'],
  Sénégal: ['Africa Re', 'CICA Re'],
  Algérie: ['Algerian Re', 'Africa Re']
};

interface CGTemplate {
  id: string;
  name: string;
  version: string;
  date: string;
  insurer: string;
  productLine: string;
  status?: 'active' | 'draft' | 'archived';
}

interface CPTemplate {
  id: string;
  name: string;
  variables: string[];
  productLine?: string;
  channels?: string[];
}

const DOCUMENT_TEMPLATES: Record<string, { cg: CGTemplate[], cp: CPTemplate[], ipid: string[] }> = {
  'France': {
    cg: [
      { id: 'cg-fr-std-2025', name: 'CG Auto France Standard', version: 'v2025.1', date: '01/01/2025', insurer: 'AXA France', productLine: 'Auto', status: 'active' },
      { id: 'cg-fr-prest-2024', name: 'CG Auto Prestige France', version: 'v2024.4', date: '15/11/2024', insurer: 'Allianz France', productLine: 'Auto', status: 'active' }
    ],
    cp: [
      { id: 'cp-fr-auto', name: 'CP Auto France (Loi Hamon)', variables: ['client_name', 'vehicle_registration', 'start_date', 'premium_amount'], productLine: 'Auto', channels: ['b2c'] },
      { id: 'cp-fr-fleet', name: 'CP Flotte France', variables: ['company_name', 'fleet_size', 'siret', 'start_date'], productLine: 'Auto', channels: ['b2b'] }
    ],
    ipid: ['IPID Auto France Standard']
  },
  'Maroc': {
    cg: [
      { id: 'cg-ma-std-cima', name: 'CG Auto Maroc Standard (CIMA)', version: 'v2.0', date: '10/03/2024', insurer: 'Wafa Assurance', productLine: 'Auto', status: 'active' },
      { id: 'cg-ma-prest', name: 'CG Auto Prestige Maroc', version: 'v1.2', date: '22/06/2024', insurer: 'AtlantaSanad', productLine: 'Auto', status: 'active' }
    ],
    cp: [
      { id: 'cp-ma-std', name: 'CP Auto Maroc Standard', variables: ['nom_client', 'matricule', 'date_effet', 'prime_ttc'], productLine: 'Auto', channels: ['b2c', 'b2b2c'] },
      { id: 'cp-ma-fleet', name: 'CP Flotte Maroc', variables: ['raison_sociale', 'taille_parc', 'ice', 'date_effet'], productLine: 'Auto', channels: ['b2b'] }
    ],
    ipid: ['IPID Auto Maroc']
  },
  'default': {
    cg: [
      { id: 'cg-intl-std', name: 'CG Standard International', version: 'v1.0', date: '01/01/2024', insurer: 'Global Insurer', productLine: 'Auto', status: 'active' }
    ],
    cp: [
      { id: 'cp-intl-std', name: 'CP Standard International', variables: ['client_name', 'policy_id', 'effective_date'], productLine: 'Auto', channels: ['b2c', 'b2b'] }
    ],
    ipid: ['IPID Standard']
  }
};

interface Guarantee {
  id: string;
  name: string;
  desc: string;
  capital: string;
  franchise: string;
  formulas: [boolean, boolean, boolean];
  channels: Record<string, 'mandatory' | 'optional' | 'unavailable'>;
}

const PRODUCT_IDS = {
  infinityMeka: 113,
  infinityMobility: 114,
  goodz: 305
} as const;

const DEFAULT_GUARANTEES: Guarantee[] = [
  { 
    id: '1', 
    name: 'Responsabilité Civile', 
    desc: 'Responsabilité obligatoire', 
    capital: 'Illimité', 
    franchise: 'Aucune', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: '2', 
    name: 'Vol', 
    desc: 'Couverture vol véhicule', 
    capital: 'Valeur Vénale', 
    franchise: '10% (Min 200€)', 
    formulas: [false, true, true],
    channels: { b2c: 'optional', b2b2c: 'optional', b2b: 'mandatory' }
  },
  { 
    id: '3', 
    name: 'Incendie', 
    desc: 'Incendie & Explosion', 
    capital: 'Valeur Vénale', 
    franchise: '10% (Min 200€)', 
    formulas: [false, true, true],
    channels: { b2c: 'optional', b2b2c: 'optional', b2b: 'mandatory' }
  },
  { 
    id: '4', 
    name: 'Bris de Glace', 
    desc: 'Vitres & Pare-brise', 
    capital: 'Coût de Remplacement', 
    franchise: '50€', 
    formulas: [false, true, true],
    channels: { b2c: 'optional', b2b2c: 'optional', b2b: 'mandatory' }
  },
  { 
    id: '5', 
    name: 'Dommages Tous Accidents', 
    desc: 'Tous Risques', 
    capital: 'Valeur Vénale', 
    franchise: 'Variable', 
    formulas: [false, false, true],
    channels: { b2c: 'unavailable', b2b2c: 'optional', b2b: 'optional' }
  },
  { 
    id: '6', 
    name: 'Assistance 0km', 
    desc: 'Remorquage depuis domicile', 
    capital: 'Service', 
    franchise: 'None', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
];

const INFINITY_MEKA_GUARANTEES: Guarantee[] = [
  { 
    id: 'meka-1', 
    name: 'Mécaniques', 
    desc: '', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'meka-2', 
    name: 'Panne', 
    desc: 'Hydrauliques', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'meka-3', 
    name: 'Oxydation', 
    desc: 'Électroniques', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'meka-4', 
    name: 'Vol Caractérisé', 
    desc: 'Électriques', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'meka-5', 
    name: 'Perte Accidentelle', 
    desc: 'Multimédia', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'meka-6', 
    name: 'Perte Accidentelle', 
    desc: 'Pneus', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  }
];

const GOODZ_GUARANTEES: Guarantee[] = [
  { 
    id: 'goodz-1', 
    name: 'Casse', 
    desc: 'Toutes causes', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'goodz-2', 
    name: 'Panne', 
    desc: 'Toutes causes', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'goodz-3', 
    name: 'Oxydation', 
    desc: 'Toutes causes', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'goodz-4', 
    name: 'Vol Caractérisé', 
    desc: 'Vol caractérisé*', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'goodz-5', 
    name: 'Perte Accidentelle', 
    desc: 'Perte accidentelle*', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  }
];

const INFINITY_MOBILITY_GUARANTEES: Guarantee[] = [
  { 
    id: 'mob-1', 
    name: 'Casse', 
    desc: 'Toutes causes', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'mob-2', 
    name: 'Panne', 
    desc: 'Toutes causes', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'mob-3', 
    name: 'Oxydation', 
    desc: 'Toutes causes', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'mob-4', 
    name: 'Crevaison', 
    desc: '(pneus)', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'mob-5', 
    name: 'Vol Caractérisé', 
    desc: 'Vol caractérisé', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  },
  { 
    id: 'mob-6', 
    name: 'Perte Accidentelle', 
    desc: 'Perte accidentelle', 
    capital: 'À compléter', 
    franchise: 'À compléter', 
    formulas: [true, true, true],
    channels: { b2c: 'mandatory', b2b2c: 'mandatory', b2b: 'mandatory' }
  }
];

const cloneGuarantees = (items: Guarantee[]) =>
  items.map(item => ({
    ...item,
    formulas: [...item.formulas] as [boolean, boolean, boolean],
    channels: { ...item.channels }
  }));

const getGuaranteesForProduct = (productId?: number | null) => {
  switch (productId) {
    case PRODUCT_IDS.infinityMeka:
      return cloneGuarantees(INFINITY_MEKA_GUARANTEES);
    case PRODUCT_IDS.infinityMobility:
      return cloneGuarantees(INFINITY_MOBILITY_GUARANTEES);
    case PRODUCT_IDS.goodz:
      return cloneGuarantees(GOODZ_GUARANTEES);
    default:
      return cloneGuarantees(DEFAULT_GUARANTEES);
  }
};

const ProductStudio: React.FC<ProductStudioProps> = ({ onBack, productId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [carriers, setCarriers] = useState<Carrier[]>([
    { id: '1', country: 'France', insurer: 'AXA France', currency: 'EUR', regulation: 'Code des assurances', status: 'active' },
    { id: '2', country: 'Maroc', insurer: 'AtlantaSanad Assurance', currency: 'MAD', regulation: 'Code des assurances marocain', status: 'active' }
  ]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['b2c']);
  const [riskActiveTab, setRiskActiveTab] = useState('core');
  const [pricingMode, setPricingMode] = useState<'basic' | 'expert'>('basic');
  const [openFieldDialog, setOpenFieldDialog] = useState(false);
  
  // Carrier State
  const [openCarrierDialog, setOpenCarrierDialog] = useState(false);
  const [editingCarrier, setEditingCarrier] = useState<Carrier | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Documents State
  const [selectedJurisdictionId, setSelectedJurisdictionId] = useState<string>('');
  const [carrierDocs, setCarrierDocs] = useState<Record<string, { cg: string; cp: string }>>({});

  const getReinsurersForSelection = (region?: string, country?: string) => {
    if (country && REINSURERS_BY_COUNTRY[country]) {
      return REINSURERS_BY_COUNTRY[country];
    }
    if (region && REINSURERS_BY_REGION[region]) {
      return REINSURERS_BY_REGION[region];
    }
    return ['SCOR', 'Swiss Re', 'Munich Re', 'Hannover Re'];
  };

  const getRegionForCountry = (country: string) => {
    for (const [region, countries] of Object.entries(COUNTRIES_BY_REGION)) {
      if (countries.includes(country)) return region;
    }
    return '';
  };

  const handleOpenCarrierDialog = (carrier?: Carrier) => {
    if (carrier) {
      setEditingCarrier({
        ...carrier,
        region: carrier.region || getRegionForCountry(carrier.country),
        hasReinsurer: carrier.hasReinsurer ?? false,
        reinsurer: carrier.reinsurer || ''
      });
    } else {
      setEditingCarrier({
        id: '',
        region: '',
        country: '',
        insurer: '',
        hasReinsurer: false,
        reinsurer: '',
        currency: '',
        regulation: '',
        status: 'active'
      });
    }
    setOpenCarrierDialog(true);
  };

  const handleCloseCarrierDialog = () => {
    setOpenCarrierDialog(false);
    setEditingCarrier(null);
  };

  const handleRegionChange = (region: string) => {
    if (!editingCarrier) return;
    setEditingCarrier({ 
      ...editingCarrier, 
      region, 
      country: '', 
      insurer: '', 
      hasReinsurer: false,
      reinsurer: '',
      currency: '', 
      regulation: '' 
    });
  };

  const handleCountryChange = (country: string) => {
    if (!editingCarrier) return;
    
    const metadata = COUNTRY_METADATA[country] || { currency: 'À compléter', regulation: 'À compléter', insurers: [] };
    
    setEditingCarrier({ 
      ...editingCarrier, 
      country, 
      currency: metadata.currency, 
      regulation: metadata.regulation,
      insurer: '', // Reset insurer when country changes
      reinsurer: '' // Reset reinsurer when country changes
    });
  };

  const handleSaveCarrier = () => {
    if (!editingCarrier || !editingCarrier.country || !editingCarrier.insurer) return;

    const normalizedCarrier = {
      ...editingCarrier,
      hasReinsurer: !!editingCarrier.hasReinsurer,
      reinsurer: editingCarrier.hasReinsurer ? editingCarrier.reinsurer : ''
    };

    // Duplicate check
    const isDuplicate = carriers.some(c => 
      c.country === normalizedCarrier.country && 
      c.insurer === normalizedCarrier.insurer && 
      c.id !== normalizedCarrier.id
    );

    if (isDuplicate) {
      alert("Cette combinaison Pays + Assureur existe déjà.");
      return;
    }

    if (editingCarrier.id) {
      setCarriers(prev => prev.map(c => c.id === normalizedCarrier.id ? normalizedCarrier : c));
    } else {
      setCarriers(prev => [...prev, { ...normalizedCarrier, id: Date.now().toString() }]);
    }

    setOpenCarrierDialog(false);
    setSnackbarMessage("Juridiction activée. Les bibliothèques juridiques correspondantes sont maintenant disponibles.");
    setSnackbarOpen(true);
  };

  const handleDeleteCarrier = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette juridiction ?")) {
      setCarriers(prev => prev.filter(c => c.id !== id));
    }
  };
  const [editingField, setEditingField] = useState<RiskField | null>(null);

  const [coreFields, setCoreFields] = useState<RiskField[]>([
    // A. Informations Véhicule
    { id: '1', label: 'Type de véhicule', description: 'Ex: Véhicule de tourisme', type: 'select', required: true, category: 'Véhicule', linkedDocument: 'Carte Grise' },
    { id: '2', label: 'Usage du véhicule', description: 'Privé, Professionnel, Mixte', type: 'select', required: true, category: 'Véhicule', linkedDocument: 'Carte Grise' },
    { id: '3', label: 'Type d’immatriculation', description: 'Série normale, WW, etc.', type: 'select', required: true, category: 'Véhicule', linkedDocument: 'Carte Grise' },
    { id: '4', label: 'Numéro d’immatriculation', description: 'Plaque minéralogique', type: 'text', required: true, category: 'Véhicule', linkedDocument: 'Carte Grise' },
    { id: '5', label: 'Date de première mise en circulation (MEC)', description: 'Date figurant sur la carte grise', type: 'date', required: true, category: 'Véhicule', linkedDocument: 'Carte Grise' },
    { id: '6', label: 'Énergie', description: 'Essence, Diesel, Hybride, Électrique', type: 'select', required: true, category: 'Véhicule', linkedDocument: 'Carte Grise' },
    { id: '7', label: 'Puissance fiscale', description: 'Chevaux fiscaux (CV)', type: 'number', required: true, category: 'Véhicule', linkedDocument: 'Carte Grise' },
    { id: '8', label: 'Valeur à neuf', description: 'Prix d\'achat catalogue', type: 'number', required: true, category: 'Véhicule' },
    { id: '9', label: 'Valeur vénale', description: 'Valeur actuelle sur le marché', type: 'number', required: true, category: 'Véhicule' },
    { id: '10', label: 'Valeur des glaces', description: 'Plafond bris de glace', type: 'number', required: true, category: 'Véhicule' },

    // B. Informations Conducteur
    { id: '11', label: 'Sexe', description: 'Genre du conducteur principal', type: 'select', required: true, category: 'Conducteur', linkedDocument: 'CIN' },
    { id: '12', label: 'Date de naissance', description: 'Pour le calcul de l\'âge', type: 'date', required: true, category: 'Conducteur', linkedDocument: 'CIN' },
    { id: '13', label: 'Date de délivrance du permis', description: 'Pour l\'ancienneté de permis', type: 'date', required: true, category: 'Conducteur', linkedDocument: 'Permis de conduire' },

    // C. Informations Contractuelles
    { id: '14', label: 'Produit', description: 'Produit d\'assurance sélectionné', type: 'text', required: true, category: 'Contrat' },
    { id: '15', label: 'Proposant / Courtier', description: 'Intermédiaire ou apporteur', type: 'text', required: true, category: 'Contrat' },
    { id: '16', label: 'Date d’effet du contrat', description: 'Début de la couverture', type: 'date', required: true, category: 'Contrat' },
  ]);

  const [b2bFields, setB2bFields] = useState<RiskField[]>([
    { id: '5', label: 'Numéro d\'immatriculation (SIRET/RC)', description: 'Pour vérifier l\'existence légale', type: 'text', required: true, category: 'Entreprise' },
    { id: '6', label: 'Nombre de véhicules à assurer', description: 'Taille du parc', type: 'number', required: true, category: 'Flotte' },
  ]);

  const [guarantees, setGuarantees] = useState<Guarantee[]>(() => getGuaranteesForProduct(productId));

  useEffect(() => {
    setGuarantees(getGuaranteesForProduct(productId));
  }, [productId]);

  const handleChannelStatusChange = (guaranteeId: string, channelId: string) => {
    setGuarantees(prev => prev.map(g => {
      if (g.id !== guaranteeId) return g;
      const currentStatus = g.channels[channelId] || 'unavailable';
      const nextStatus = currentStatus === 'mandatory' ? 'optional' : currentStatus === 'optional' ? 'unavailable' : 'mandatory';
      return { ...g, channels: { ...g.channels, [channelId]: nextStatus } };
    }));
  };

  const handleAddField = () => {
    setEditingField({ id: Date.now().toString(), label: '', description: '', type: 'text', required: true, category: 'General' });
    setOpenFieldDialog(true);
  };

  const handleEditField = (field: RiskField) => {
    setEditingField({ ...field });
    setOpenFieldDialog(true);
  };

  const handleSaveField = () => {
    if (!editingField) return;
    
    const updateList = (list: RiskField[]) => {
      const index = list.findIndex(f => f.id === editingField.id);
      if (index >= 0) {
        const newList = [...list];
        newList[index] = editingField;
        return newList;
      }
      return [...list, editingField];
    };

    if (riskActiveTab === 'core') {
      setCoreFields(updateList(coreFields));
    } else if (riskActiveTab === 'b2b') {
      setB2bFields(updateList(b2bFields));
    }
    setOpenFieldDialog(false);
  };

  const distributionChannels = [
    {
      id: 'b2c',
      label: 'Vente Directe (B2C)',
      description: 'Vente directe aux particuliers via site web ou application.',
      target: 'Cible : Particuliers'
    },
    {
      id: 'b2b2c',
      label: 'Courtage (B2B2C)',
      description: 'Distribution via un réseau de courtiers ou partenaires.',
      target: 'Cible : Intermédiaires'
    },
    {
      id: 'b2b',
      label: 'Entreprise (B2B)',
      description: 'Offres pour flottes, groupes ou professionnels.',
      target: 'Cible : Professionnels'
    },
    {
      id: 'affinity',
      label: 'Embarque',
      description: 'Distribution via des partenaires non-assureurs (Banques, Concessionnaires).',
      target: 'Cible : Partenaires'
    },
    {
      id: 'wholesale',
      label: 'Grossistes',
      description: 'Distribution via des courtiers grossistes.',
      target: 'Cible : Courtiers'
    }
  ];

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
      {/* Top Bar - Clean & Minimal */}
      <Box 
        sx={{ 
          px: 4,
          py: 2,
          borderBottom: '1px solid #f0f0f0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <IconButton onClick={onBack} size="small" sx={{ border: '1px solid #eee' }}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
                Auto Prestige 2025
              </Typography>
              <Chip 
                label="v3.1 • Draft" 
                size="small" 
                sx={{ 
                  height: 24, 
                  fontSize: '0.75rem', 
                  bgcolor: '#f3f4f6', 
                  color: '#4b5563',
                  fontWeight: 500
                }} 
              />
            </Box>
          </Box>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="text" 
            color="inherit" 
            startIcon={<ViewIcon />}
            sx={{ textTransform: 'none', color: '#6b7280' }}
          >
            Aperçu
          </Button>
          <Button 
            variant="contained" 
            disableElevation
            startIcon={<SaveIcon />}
            sx={{ 
              bgcolor: '#000000', 
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { bgcolor: '#333' }
            }}
          >
            Enregistrer
          </Button>
        </Stack>
      </Box>

      {/* Main Workspace */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Vertical Tabs - Modern Sidebar */}
        <Box sx={{ width: 260, borderRight: '1px solid #f0f0f0', pt: 2 }}>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
            sx={{ 
              '& .MuiTabs-indicator': { left: 0, width: 3, bgcolor: '#000' },
              '& .MuiTab-root': { 
                alignItems: 'center', 
                justifyContent: 'flex-start',
                textAlign: 'left', 
                textTransform: 'none', 
                minHeight: 48, 
                pl: 3,
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#6b7280',
                '&.Mui-selected': { color: '#111827', fontWeight: 600, bgcolor: '#f9fafb' }
              }
            }}
          >
            <Tab icon={<InfoIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Définition du Produit" />
            <Tab icon={<GlobeIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Juridictions & Porteurs" />
            <Tab icon={<RiskIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Gestion des informations nécessaires" />
            <Tab icon={<CoverageIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Offre & Garanties" />
            <Tab icon={<PriceIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Stratégie Tarifaire" />
            <Tab icon={<LegalIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Documents & Contrats" />
            <Tab icon={<ModulesIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Règles de Gestion" />
            <Tab icon={<HistoryIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Historique" />
          </Tabs>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, p: 4, overflow: 'auto' }}>
          
          {/* Tab 1: Identity */}
          {activeTab === 0 && (
            <Box maxWidth="lg">
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600} color="#111827">Définition du Produit</Typography>
                <Typography variant="body2" color="text.secondary">
                  L'identité de votre produit : son nom, sa cible et ses canaux de vente.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {/* Left: Identity */}
                <Grid item xs={12} md={8}>
                  <Card variant="outlined" sx={{ p: 0, overflow: 'visible' }}>
                    <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
                      <Typography variant="h6" fontWeight={600}>Identité & Marché</Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                          <TextField 
                            label="Nom Commercial du Produit" 
                            fullWidth 
                            defaultValue="Auto Prestige 2025" 
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField 
                            select 
                            label="Branche d'Activité" 
                            fullWidth 
                            defaultValue="IARD"
                          >
                            <MenuItem value="IARD">IARD</MenuItem>
                            <MenuItem value="Santé vie">Santé vie</MenuItem>
                            <MenuItem value="Financier">Financier</MenuItem>
                          </TextField>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <TextField 
                            label="Description Courte" 
                            multiline 
                            rows={2} 
                            fullWidth 
                            defaultValue="Assurance auto complète pour véhicules de haute valeur, incluant assistance panne et protection juridique." 
                            placeholder="Ex : Produit conçu pour les jeunes conducteurs..."
                          />
                        </Grid>


                      </Grid>
                    </CardContent>
                  </Card>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>Canaux de Distribution</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Sélectionnez les canaux autorisés pour la vente de ce produit.
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {distributionChannels.map((channel) => {
                        const isSelected = selectedChannels.includes(channel.id);
                        return (
                          <Grid item xs={12} md={4} key={channel.id}>
                            <Card 
                              variant="outlined" 
                              sx={{ 
                                height: '100%',
                                borderColor: isSelected ? 'black' : 'divider',
                                bgcolor: isSelected ? '#fafafa' : 'white',
                                transition: 'all 0.2s',
                                borderWidth: isSelected ? 2 : 1
                              }}
                            >
                              <CardActionArea 
                                onClick={() => handleChannelToggle(channel.id)}
                                sx={{ height: '100%', p: 2, alignItems: 'flex-start' }}
                              >
                                <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ width: '100%' }}>
                                  <Checkbox 
                                    checked={isSelected} 
                                    size="small"
                                    sx={{ p: 0, mt: 0.5, color: isSelected ? 'black' : 'action.disabled' }} 
                                  />
                                  <Box>
                                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                                      {channel.label}
                                    </Typography>
                                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.4 }}>
                                      {channel.description}
                                    </Typography>
                                    <Chip 
                                      label={channel.target} 
                                      size="small" 
                                      sx={{ 
                                        height: 20, 
                                        fontSize: '0.65rem', 
                                        bgcolor: isSelected ? 'black' : '#f3f4f6',
                                        color: isSelected ? 'white' : 'text.secondary'
                                      }} 
                                    />
                                  </Box>
                                </Stack>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Grid>

                {/* Right: Context/Help */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ bgcolor: '#f9fafb', p: 3, borderRadius: 2, border: '1px solid #f0f0f0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <InfoIcon fontSize="small" color="action" />
                      <Typography variant="subtitle2" fontWeight={600}>Philosophie du Produit</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Ce n'est pas un contrat statique.</strong> Vous configurez ici la portée d'un moteur produit.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Les choix faits ici (Branche d'Activité, Canaux) détermineront quelles <strong>briques juridiques et techniques</strong> seront disponibles pour l'assemblage.
                    </Typography>
                    <Alert severity="info" sx={{ mt: 2, bgcolor: 'white', border: '1px solid #e5e7eb' }}>
                      Un produit est une configuration versionnée de composants réutilisables.
                    </Alert>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Tab 1: Risk Carriers */}
          {activeTab === 1 && (
            <Box maxWidth="lg">
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom color="#111827">Porteurs de Risques & Juridictions</Typography>
                <Typography variant="body2" color="text.secondary">
                  Configurez les combinaisons Pays / Assureur / Devise pour ce produit.
                </Typography>
              </Box>

              <Card variant="outlined" sx={{ mb: 4 }}>
                <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>Juridictions Actives</Typography>
                    <Typography variant="body2" color="text.secondary">Liste des pays où le produit est distribué</Typography>
                  </Box>
                  <Button 
                    startIcon={<AddIcon />} 
                    variant="contained" 
                    sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                    onClick={() => handleOpenCarrierDialog()}
                  >
                    Ajouter une Juridiction
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Pays</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Assureur (Porteur de Risque)</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Devise</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Réglementation</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {carriers.map((carrier) => (
                        <TableRow key={carrier.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <GlobeIcon fontSize="small" color="action" />
                              <Typography variant="body2" fontWeight={500}>{carrier.country}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <BusinessIcon fontSize="small" color="action" />
                              <Typography variant="body2">{carrier.insurer}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={carrier.currency} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">{carrier.regulation}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label="Actif" 
                              size="small" 
                              color="success"
                              variant="filled"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" onClick={() => handleOpenCarrierDialog(carrier)}><EditIcon fontSize="small" /></IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDeleteCarrier(carrier.id)}><DeleteIcon fontSize="small" /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>

              <Alert severity="info" icon={<InfoIcon />}>
                <strong>Configuration du Moteur :</strong> En activant une juridiction, vous débloquez l'accès aux bibliothèques juridiques et fiscales correspondantes. Le moteur appliquera automatiquement les règles de conformité locales.
              </Alert>

              {/* Carrier Dialog */}
              <Dialog open={openCarrierDialog} onClose={handleCloseCarrierDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 600 }}>
                  {editingCarrier?.id ? 'Modifier la Juridiction' : 'Ajouter une Juridiction'}
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                    <Alert severity="info" icon={<InfoIcon />}>
                      Une juridiction définit où et avec quel assureur le risque est légalement porté.
                    </Alert>

                    <TextField
                      select
                      label="Région"
                      fullWidth
                      value={editingCarrier?.region || ''}
                      onChange={(e) => handleRegionChange(e.target.value)}
                    >
                      {REGIONS.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                    </TextField>

                    <TextField
                      select
                      label="Pays"
                      fullWidth
                      value={editingCarrier?.country || ''}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      disabled={!editingCarrier?.region}
                    >
                      {(editingCarrier?.region ? COUNTRIES_BY_REGION[editingCarrier.region] : []).map(c => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                      ))}
                    </TextField>

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editingCarrier?.hasReinsurer || false}
                          onChange={(e) => setEditingCarrier(prev => prev ? { 
                            ...prev, 
                            hasReinsurer: e.target.checked, 
                            reinsurer: e.target.checked ? prev.reinsurer : '' 
                          } : null)}
                          disabled={!editingCarrier?.country}
                        />
                      }
                      label="Une reassurance existe pour cette juridiction"
                    />

                    {editingCarrier?.hasReinsurer && (
                      <TextField
                        select
                        label="Reassureur"
                        fullWidth
                        value={editingCarrier?.reinsurer || ''}
                        onChange={(e) => setEditingCarrier(prev => prev ? { ...prev, reinsurer: e.target.value } : null)}
                        disabled={!editingCarrier?.country}
                      >
                        {getReinsurersForSelection(editingCarrier?.region, editingCarrier?.country).map(r => (
                          <MenuItem key={r} value={r}>{r}</MenuItem>
                        ))}
                      </TextField>
                    )}

                    <TextField
                      select
                      label="Assureur (Porteur de Risque)"
                      fullWidth
                      value={editingCarrier?.insurer || ''}
                      onChange={(e) => setEditingCarrier(prev => prev ? { ...prev, insurer: e.target.value } : null)}
                      disabled={!editingCarrier?.country}
                    >
                      {(COUNTRY_METADATA[editingCarrier?.country || '']?.insurers || ['Other']).map(i => (
                        <MenuItem key={i} value={i}>{i}</MenuItem>
                      ))}
                    </TextField>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        label="Devise"
                        fullWidth
                        value={editingCarrier?.currency || ''}
                        disabled
                        helperText="Déterminée par le pays"
                      />
                      <TextField
                        label="Réglementation"
                        fullWidth
                        value={editingCarrier?.regulation || ''}
                        disabled
                        helperText="Cadre juridique applicable"
                      />
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                  <Button onClick={handleCloseCarrierDialog} color="inherit">Annuler</Button>
                  <Button 
                    onClick={handleSaveCarrier} 
                    variant="contained" 
                    sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                    disabled={
                      !editingCarrier?.country ||
                      !editingCarrier?.insurer ||
                      (editingCarrier?.hasReinsurer && !editingCarrier?.reinsurer)
                    }
                  >
                    Enregistrer
                  </Button>
                </DialogActions>
              </Dialog>

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
              />
            </Box>
          )}

          {/* Tab 2: Risk Profile */}
          {activeTab === 2 && (
            <Box maxWidth="lg">
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom color="#111827">Gestion des informations nécessaires</Typography>
                <Typography variant="body2" color="text.secondary">
                  Définissez les questions à poser pour évaluer le risque.
                </Typography>
              </Box>

              <Card variant="outlined" sx={{ overflow: 'hidden' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f9fafb' }}>
                  <Tabs 
                    value={riskActiveTab} 
                    onChange={(e, v) => setRiskActiveTab(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ 
                      '& .MuiTab-root': { minHeight: 48, textTransform: 'none', fontWeight: 500 },
                      '& .Mui-selected': { fontWeight: 600, color: 'black' },
                      '& .MuiTabs-indicator': { bgcolor: 'black' }
                    }}
                  >
                    <Tab label={`Profil Socle (${coreFields.length})`} value="core" icon={<ModulesIcon fontSize="small" />} iconPosition="start" />
                    {selectedChannels.includes('b2c') && <Tab label="Extension B2C (0)" value="b2c" />}
                    {selectedChannels.includes('b2b2c') && <Tab label="Extension Courtage (0)" value="b2b2c" />}
                    {selectedChannels.includes('b2b') && <Tab label="Extension Entreprise (2)" value="b2b" />}
                  </Tabs>
                </Box>

                <Box sx={{ p: 3 }}>
                  <Grid container spacing={4}>
                    {/* Left: Configuration */}
                    <Grid item xs={12} md={7}>
                      {riskActiveTab === 'core' ? (
                        <>
                          <Alert severity="info" sx={{ mb: 3, bgcolor: '#eff6ff', color: '#1e3a8a', border: '1px solid #dbeafe' }} icon={<InfoIcon sx={{ color: '#2563eb' }} />}>
                            Ces questions seront posées à <strong>tous</strong> les clients, quel que soit le canal.
                          </Alert>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight={600}>Questions du Parcours (Profil Socle)</Typography>
                            <Button startIcon={<AddIcon />} size="small" variant="outlined" color="inherit" onClick={handleAddField}>Ajouter une Question</Button>
                          </Box>
                          <List sx={{ bgcolor: 'white', border: '1px solid #f0f0f0', borderRadius: 2 }}>
                            {coreFields.map((field) => (
                              <ListItem key={field.id} divider secondaryAction={
                                <IconButton size="small" onClick={() => handleEditField(field)}><TuneIcon fontSize="small" /></IconButton>
                              }>
                                <ListItemIcon><DragIcon color="action" fontSize="small" /></ListItemIcon>
                                <ListItemText 
                                  primary={field.label} 
                                  secondary={
                                    <React.Fragment>
                                      <Typography component="span" variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {field.description}
                                      </Typography>
                                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                                        <Chip label={field.type} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                                        <Chip label={field.required ? 'Obligatoire' : 'Optionnel'} size="small" color={field.required ? 'default' : 'default'} variant="outlined" sx={{ height: 20, fontSize: '0.65rem', bgcolor: field.required ? '#f3f4f6' : 'transparent' }} />
                                        {field.linkedDocument && (
                                          <Chip 
                                            icon={<AttachFileIcon style={{ fontSize: '0.8rem' }} />} 
                                            label={`Doc: ${field.linkedDocument}`} 
                                            size="small" 
                                            color="primary" 
                                            variant="outlined" 
                                            sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#eff6ff', borderColor: '#bfdbfe', color: '#1e40af' }} 
                                          />
                                        )}
                                      </Stack>
                                    </React.Fragment>
                                  } 
                                />
                                <Chip label={field.category} size="small" sx={{ mr: 1, bgcolor: '#f9fafb', fontWeight: 500 }} />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      ) : (
                        <>
                          <Box sx={{ p: 2, mb: 3, bgcolor: '#f9fafb', borderRadius: 2, border: '1px dashed #e5e7eb', display: 'flex', alignItems: 'center', gap: 2 }}>
                            <ModulesIcon color="disabled" />
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">Héritage du Profil Socle</Typography>
                              <Typography variant="caption" color="text.secondary">Ce canal inclut automatiquement les {coreFields.length} questions du profil socle.</Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              Questions Spécifiques {riskActiveTab === 'b2c' ? 'B2C' : riskActiveTab === 'b2b' ? 'Entreprise' : 'Courtage'}
                            </Typography>
                            <Button startIcon={<AddIcon />} size="small" variant="outlined" color="inherit" onClick={handleAddField}>Ajouter une Question</Button>
                          </Box>

                          {riskActiveTab === 'b2b' ? (
                            <List sx={{ bgcolor: 'white', border: '1px solid #f0f0f0', borderRadius: 2 }}>
                              {b2bFields.map((field) => (
                                <ListItem key={field.id} divider secondaryAction={
                                  <IconButton size="small" onClick={() => handleEditField(field)}><TuneIcon fontSize="small" /></IconButton>
                                }>
                                  <ListItemIcon><DragIcon color="action" fontSize="small" /></ListItemIcon>
                                  <ListItemText 
                                    primary={field.label} 
                                    secondary={
                                      <React.Fragment>
                                        <Typography component="span" variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                                          {field.description}
                                        </Typography>
                                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                                          <Chip label={field.type} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                                          <Chip label={field.required ? 'Obligatoire' : 'Optionnel'} size="small" color={field.required ? 'default' : 'default'} variant="outlined" sx={{ height: 20, fontSize: '0.65rem', bgcolor: field.required ? '#f3f4f6' : 'transparent' }} />
                                        </Stack>
                                      </React.Fragment>
                                    } 
                                  />
                                  <Chip label={field.category} size="small" sx={{ mr: 1, bgcolor: '#f9fafb', fontWeight: 500 }} />
                                </ListItem>
                              ))}
                            </List>
                          ) : (
                            <Box sx={{ py: 8, textAlign: 'center', color: 'text.secondary', bgcolor: '#f9fafb', borderRadius: 2, border: '1px dashed #e5e7eb' }}>
                              <Typography variant="body2" gutterBottom>Aucune question spécifique pour ce canal.</Typography>
                              <Button startIcon={<AddIcon />} size="small" onClick={handleAddField}>Ajouter la Première Question</Button>
                            </Box>
                          )}
                        </>
                      )}
                    </Grid>

                    {/* Right: Preview */}
                    <Grid item xs={12} md={5}>
                      <Box sx={{ bgcolor: '#f9fafb', p: 3, borderRadius: 2, height: '100%', border: '1px solid #f0f0f0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                          <ViewIcon color="action" fontSize="small" />
                          <Typography variant="subtitle1" fontWeight={600}>Aperçu Client</Typography>
                        </Box>
                        <Card variant="outlined" sx={{ bgcolor: 'white' }}>
                          <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight={700}>Votre devis en 3 min</Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              Répondez à ces quelques questions pour obtenir votre tarif.
                            </Typography>
                            
                            <Stack spacing={3} sx={{ mt: 3 }}>
                              {(riskActiveTab === 'core' ? coreFields : [...coreFields, ...(riskActiveTab === 'b2b' ? b2bFields : [])]).map((field) => (
                                <Box key={field.id}>
                                  <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.9rem' }}>
                                    {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                                  </Typography>
                                  {field.type === 'select' ? (
                                    <TextField select fullWidth size="small" defaultValue="">
                                      <MenuItem value="">Sélectionner...</MenuItem>
                                      <MenuItem value="option1">Option 1</MenuItem>
                                    </TextField>
                                  ) : field.type === 'date' ? (
                                    <TextField type="date" fullWidth size="small" InputLabelProps={{ shrink: true }} />
                                  ) : (
                                    <TextField 
                                      fullWidth 
                                      size="small" 
                                      type={field.type === 'number' ? 'number' : 'text'} 
                                      placeholder={field.description}
                                    />
                                  )}
                                </Box>
                              ))}
                              <Button variant="contained" fullWidth disableElevation sx={{ mt: 2, bgcolor: 'black', textTransform: 'none' }}>
                                Voir mon tarif
                              </Button>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Box>
          )}

          {/* Field Editor Dialog */}
          <Dialog open={openFieldDialog} onClose={() => setOpenFieldDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Configurer la Question</DialogTitle>
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 1 }}>
                <TextField
                  label="Question (Libellé)"
                  fullWidth
                  value={editingField?.label || ''}
                  onChange={(e) => setEditingField(prev => prev ? { ...prev, label: e.target.value } : null)}
                  helperText="La question telle qu'elle apparaîtra au client"
                />
                <TextField
                  label="Description / Aide"
                  fullWidth
                  value={editingField?.description || ''}
                  onChange={(e) => setEditingField(prev => prev ? { ...prev, description: e.target.value } : null)}
                  helperText="Texte d'aide affiché sous le champ"
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Type de Réponse</InputLabel>
                      <Select
                        value={editingField?.type || 'text'}
                        label="Type de Réponse"
                        onChange={(e) => setEditingField(prev => prev ? { ...prev, type: e.target.value as any } : null)}
                      >
                        <MenuItem value="text">Texte Libre</MenuItem>
                        <MenuItem value="number">Nombre</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="select">Liste Déroulante</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Catégorie"
                      fullWidth
                      value={editingField?.category || ''}
                      onChange={(e) => setEditingField(prev => prev ? { ...prev, category: e.target.value } : null)}
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editingField?.required || false}
                      onChange={(e) => setEditingField(prev => prev ? { ...prev, required: e.target.checked } : null)}
                    />
                  }
                  label="Réponse Obligatoire"
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenFieldDialog(false)}>Annuler</Button>
              <Button variant="contained" onClick={handleSaveField}>Enregistrer</Button>
            </DialogActions>
          </Dialog>

          {/* Tab 3: Coverage */}
          {activeTab === 3 && (
            <Box maxWidth="lg">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom color="#111827">Offre & Garanties</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Définissez la matrice de garanties pour chaque formule commerciale.
                  </Typography>
                </Box>
                <Button startIcon={<AddIcon />} variant="outlined" color="inherit" sx={{ borderColor: '#e5e7eb' }}>Ajouter une Garantie</Button>
              </Box>

              <Card variant="outlined" sx={{ overflow: 'hidden' }}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="guarantees table">
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, width: '25%', color: '#4b5563' }}>Garantie</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: '15%', color: '#4b5563' }}>Plafond</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: '10%', color: '#4b5563' }}>Franchise</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#1e40af', bgcolor: '#eff6ff', borderLeft: '1px solid #e5e7eb' }}>Essentiel</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#166534', bgcolor: '#f0fdf4' }}>Avancé</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#9a3412', bgcolor: '#fff7ed' }}>Premium</TableCell>
                        {selectedChannels.length > 0 && (
                          <TableCell align="center" sx={{ fontWeight: 600, bgcolor: '#f9fafb', borderLeft: '2px solid #e5e7eb', width: '20%', color: '#4b5563' }}>
                            Disponibilité par Canal
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {guarantees.map((row) => (
                        <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            <Box>
                              <Typography variant="body2" fontWeight={600} color="#111827">{row.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{row.desc}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <TextField 
                              variant="standard" 
                              defaultValue={row.capital} 
                              InputProps={{ disableUnderline: true, style: { fontSize: '0.875rem' } }} 
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField 
                              variant="standard" 
                              defaultValue={row.franchise} 
                              InputProps={{ disableUnderline: true, style: { fontSize: '0.875rem' } }} 
                              fullWidth
                            />
                          </TableCell>
                          <TableCell align="center" sx={{ bgcolor: '#f9fafb', borderLeft: '1px solid #f0f0f0' }}>
                            <Checkbox defaultChecked={row.formulas[0]} color="primary" size="small" />
                          </TableCell>
                          <TableCell align="center" sx={{ bgcolor: '#f9fafb' }}>
                            <Checkbox defaultChecked={row.formulas[1]} color="success" size="small" />
                          </TableCell>
                          <TableCell align="center" sx={{ bgcolor: '#f9fafb' }}>
                            <Checkbox defaultChecked={row.formulas[2]} color="warning" size="small" />
                          </TableCell>
                          {selectedChannels.length > 0 && (
                            <TableCell align="center" sx={{ bgcolor: '#fffbeb', borderLeft: '2px solid #e5e7eb' }}>
                              <Stack direction="row" spacing={0.5} justifyContent="center" flexWrap="wrap" gap={0.5}>
                                {selectedChannels.map(channelId => {
                                  const status = row.channels[channelId] || 'unavailable';
                                  const channelLabel = channelId === 'b2c' ? 'B2C' : channelId === 'b2b' ? 'Entreprise' : 'Courtage';
                                  return (
                                    <Chip
                                      key={channelId}
                                      label={channelLabel}
                                      size="small"
                                      onClick={() => handleChannelStatusChange(row.id, channelId)}
                                      icon={
                                        status === 'mandatory' ? <CheckCircleIcon sx={{ fontSize: '1rem !important' }} /> :
                                        status === 'optional' ? <AddCircleIcon sx={{ fontSize: '1rem !important' }} /> :
                                        <BlockIcon sx={{ fontSize: '1rem !important' }} />
                                      }
                                      color={
                                        status === 'mandatory' ? 'success' :
                                        status === 'optional' ? 'primary' :
                                        'default'
                                      }
                                      variant={status === 'unavailable' ? 'outlined' : 'filled'}
                                      sx={{ 
                                        cursor: 'pointer', 
                                        opacity: status === 'unavailable' ? 0.5 : 1,
                                        height: 24,
                                        fontSize: '0.7rem',
                                        '& .MuiChip-label': { px: 1 }
                                      }}
                                    />
                                  );
                                })}
                              </Stack>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>

              <Box sx={{ mt: 3, display: 'flex', gap: 4, justifyContent: 'center' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircleIcon color="success" fontSize="small" />
                  <Typography variant="caption" color="text.secondary">Included (Mandatory)</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AddCircleIcon color="primary" fontSize="small" />
                  <Typography variant="caption" color="text.secondary">Optional</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BlockIcon color="action" fontSize="small" />
                  <Typography variant="caption" color="text.secondary">Not Available</Typography>
                </Stack>
              </Box>
              
              <Alert severity="info" sx={{ mt: 3, bgcolor: '#eff6ff', color: '#1e3a8a', border: '1px solid #dbeafe' }} icon={<InfoIcon sx={{ color: '#2563eb' }} />}>
                <strong>Guarantee Assembly:</strong> You are selecting pre-approved coverage blocks here. The exact wording will be dynamically injected from the central legal library during contract generation.
              </Alert>
            </Box>
          )}

          {/* Tab 4: Pricing Strategy */}
          {activeTab === 4 && (
            <Box maxWidth="lg">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom color="#111827">Stratégie Tarifaire</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Configurez les règles de calcul de prime et les ajustements commerciaux.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ bgcolor: '#f3f4f6', p: 0.5, borderRadius: 2, display: 'flex' }}>
                    <Button 
                      size="small" 
                      variant={pricingMode === 'basic' ? 'contained' : 'text'} 
                      onClick={() => setPricingMode('basic')}
                      sx={{ 
                        bgcolor: pricingMode === 'basic' ? 'white' : 'transparent', 
                        color: pricingMode === 'basic' ? 'black' : 'text.secondary',
                        boxShadow: pricingMode === 'basic' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                        '&:hover': { bgcolor: pricingMode === 'basic' ? 'white' : '#e5e7eb' }
                      }}
                    >
                      Mode Simplifié
                    </Button>
                    <Button 
                      size="small" 
                      variant={pricingMode === 'expert' ? 'contained' : 'text'} 
                      onClick={() => setPricingMode('expert')}
                      sx={{ 
                        bgcolor: pricingMode === 'expert' ? 'white' : 'transparent', 
                        color: pricingMode === 'expert' ? 'black' : 'text.secondary',
                        boxShadow: pricingMode === 'expert' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                        '&:hover': { bgcolor: pricingMode === 'expert' ? 'white' : '#e5e7eb' }
                      }}
                    >
                      Mode Expert
                    </Button>
                  </Box>
                  {pricingMode === 'expert' && (
                    <Button variant="outlined" startIcon={<CodeIcon />} color="inherit" sx={{ borderColor: '#e5e7eb' }}>
                      JSON
                    </Button>
                  )}
                  <Button variant="contained" startIcon={<SaveIcon />} sx={{ bgcolor: '#111827', '&:hover': { bgcolor: '#374151' } }}>
                    Enregistrer
                  </Button>
                </Stack>
              </Box>

              {pricingMode === 'basic' ? (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {/* Visual Flow */}
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4 }}>
                      {/* Step 1 */}
                      <Box sx={{ textAlign: 'center', position: 'relative' }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#eff6ff', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1, border: '2px solid #bfdbfe' }}>
                          <Typography variant="h6" fontWeight={700}>1</Typography>
                        </Box>
                        <Typography variant="subtitle2" fontWeight={600}>Prix de Base</Typography>
                      </Box>
                      <Box sx={{ flex: 1, height: 2, bgcolor: '#e5e7eb', mx: 2 }} />
                      
                      {/* Step 2 */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#f0fdf4', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1, border: '2px solid #bbf7d0' }}>
                          <Typography variant="h6" fontWeight={700}>2</Typography>
                        </Box>
                        <Typography variant="subtitle2" fontWeight={600}>Multiplicateurs</Typography>
                      </Box>
                      <Box sx={{ flex: 1, height: 2, bgcolor: '#e5e7eb', mx: 2 }} />

                      {/* Step 3 */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#fff7ed', color: '#9a3412', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1, border: '2px solid #fed7aa' }}>
                          <Typography variant="h6" fontWeight={700}>3</Typography>
                        </Box>
                        <Typography variant="subtitle2" fontWeight={600}>Ajustements</Typography>
                      </Box>
                      <Box sx={{ flex: 1, height: 2, bgcolor: '#e5e7eb', mx: 2 }} />

                      {/* Step 4 */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#111827', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1 }}>
                          <PriceIcon />
                        </Box>
                        <Typography variant="subtitle2" fontWeight={600}>Prix Final</Typography>
                      </Box>
                    </Box>

                    {/* Rules Cards */}
                    <Stack spacing={2}>
                      <Card variant="outlined" sx={{ borderLeft: '4px solid #3b82f6' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                          <Box sx={{ bgcolor: '#eff6ff', p: 1, borderRadius: 1 }}>
                            <Typography variant="h6" fontWeight={700} color="#1e40af">150€</Typography>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>Prime de Base (RC)</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Le point de départ du calcul pour toutes les polices.
                            </Typography>
                          </Box>
                          <Chip label="Étape 1 : Base" size="small" />
                        </CardContent>
                      </Card>

                      <Card variant="outlined" sx={{ borderLeft: '4px solid #22c55e' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                          <Box sx={{ bgcolor: '#f0fdf4', p: 1, borderRadius: 1 }}>
                            <Typography variant="h6" fontWeight={700} color="#166534">x 0.02%</Typography>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>Coefficient Chiffre d'Affaires</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Cette règle ajuste le prix final en fonction du volume d'affaires déclaré.
                            </Typography>
                          </Box>
                          <Chip label="Étape 2 : Multiplicateur" size="small" />
                        </CardContent>
                      </Card>

                      <Card variant="outlined" sx={{ borderLeft: '4px solid #f97316' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                          <Box sx={{ bgcolor: '#fff7ed', p: 1, borderRadius: 1 }}>
                            <Typography variant="h6" fontWeight={700} color="#9a3412">+15%</Typography>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>Majoration Sinistralité</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Cette règle augmente le prix de <strong>+15%</strong> si le client a eu plus de 2 sinistres.
                            </Typography>
                          </Box>
                          <Chip label="Étape 3 : Ajustement" size="small" />
                        </CardContent>
                      </Card>

                      <Card variant="outlined" sx={{ borderLeft: '4px solid #a855f7' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                          <Box sx={{ bgcolor: '#f3e8ff', p: 1, borderRadius: 1 }}>
                            <Typography variant="h6" fontWeight={700} color="#7e22ce">-10%</Typography>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>Remise Créateur</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Cette règle réduit le prix de <strong>-10%</strong> pour les entreprises de moins de 2 ans.
                            </Typography>
                          </Box>
                          <Chip label="Étape 4 : Commercial" size="small" />
                        </CardContent>
                      </Card>
                    </Stack>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  {/* Left Column: Pricing Rules */}
                  <Grid item xs={12} md={8}>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                      <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={600}>Règles de Calcul</Typography>
                        <Button size="small" startIcon={<AddIcon />}>Nouvelle Règle</Button>
                      </Box>
                      <TableContainer>
                        <Table>
                          <TableHead sx={{ bgcolor: '#f9fafb' }}>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Nom de la Règle</TableCell>
                              <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Type</TableCell>
                              <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Impact</TableCell>
                              <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Canaux</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600, color: '#4b5563' }}>Priorité</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600, color: '#4b5563' }}>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {[
                              { name: 'Prime de Base (RC)', type: 'Base', impact: '150€', priority: 1, channels: ['b2c', 'b2b', 'b2b2c'] },
                              { name: 'Coefficient Chiffre d\'Affaires', type: 'Multiplicateur', impact: 'x 0.02%', priority: 2, channels: ['b2b'] },
                              { name: 'Majoration Sinistralité', type: 'Ajustement', impact: '+15%', priority: 3, channels: ['b2c', 'b2b', 'b2b2c'] },
                              { name: 'Remise Créateur', type: 'Commercial', impact: '-10%', priority: 4, channels: ['b2c'] },
                              { name: 'Commission Courtier', type: 'Distribution', impact: '+15%', priority: 5, channels: ['b2b2c'] },
                            ].map((rule, index) => (
                              <TableRow key={index} hover>
                                <TableCell sx={{ fontWeight: 500 }}>{rule.name}</TableCell>
                                <TableCell>
                                  <Chip label={rule.type} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{rule.impact}</TableCell>
                                <TableCell>
                                  <Stack direction="row" spacing={0.5}>
                                    {rule.channels.map(ch => (
                                      <Chip 
                                        key={ch} 
                                        label={ch === 'b2c' ? 'B2C' : ch === 'b2b' ? 'Entreprise' : 'Courtage'} 
                                        size="small" 
                                        sx={{ 
                                          height: 20, 
                                          fontSize: '0.65rem',
                                          bgcolor: ch === 'b2c' ? '#eff6ff' : ch === 'b2b' ? '#f0fdf4' : '#fff7ed',
                                          color: ch === 'b2c' ? '#1e40af' : ch === 'b2b' ? '#166534' : '#9a3412',
                                          border: '1px solid',
                                          borderColor: ch === 'b2c' ? '#bfdbfe' : ch === 'b2b' ? '#bbf7d0' : '#fed7aa'
                                        }} 
                                      />
                                    ))}
                                  </Stack>
                                </TableCell>
                                <TableCell align="right">{rule.priority}</TableCell>
                                <TableCell align="right">
                                  <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Card>

                    <Card variant="outlined">
                      <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
                        <Typography variant="subtitle1" fontWeight={600}>Simulation Rapide</Typography>
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Chiffre d'Affaires</Typography>
                            <TextField fullWidth size="small" defaultValue="250000" InputProps={{ endAdornment: <Typography variant="caption">€</Typography> }} />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Année de Création</Typography>
                            <TextField fullWidth size="small" defaultValue="2023" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ p: 2, bgcolor: '#f9fafb', borderRadius: 1, textAlign: 'center', border: '1px solid #e5e7eb' }}>
                              <Typography variant="caption" color="text.secondary">Prime Estimée</Typography>
                              <Typography variant="h6" fontWeight={700} color="#059669">485.00 €</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Grid>

                  {/* Right Column: Business Intent & Config */}
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                      <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', bgcolor: '#f9fafb' }}>
                        <Typography variant="subtitle2" fontWeight={600}>Configuration Globale</Typography>
                      </Box>
                      <Box sx={{ p: 2 }}>
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="caption" color="text.secondary">Devise</Typography>
                            <Select fullWidth size="small" defaultValue="EUR" sx={{ mt: 0.5 }}>
                              <MenuItem value="EUR">Euro (€)</MenuItem>
                              <MenuItem value="USD">Dollar ($)</MenuItem>
                              <MenuItem value="GBP">Livre (£)</MenuItem>
                            </Select>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">Fréquence de Paiement</Typography>
                            <Select fullWidth size="small" defaultValue="monthly" sx={{ mt: 0.5 }}>
                              <MenuItem value="monthly">Mensuel</MenuItem>
                              <MenuItem value="annual">Annuel</MenuItem>
                              <MenuItem value="both">Choix du Client</MenuItem>
                            </Select>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">Taxe Applicable</Typography>
                            <TextField fullWidth size="small" defaultValue="9.00" InputProps={{ endAdornment: '%' }} sx={{ mt: 0.5 }} />
                          </Box>
                        </Stack>
                      </Box>
                    </Card>

                    <Alert severity="info" variant="outlined" sx={{ bgcolor: '#eff6ff', borderColor: '#dbeafe' }}>
                      <Typography variant="subtitle2" gutterBottom fontWeight={600}>Note Stratégique</Typography>
                      <Typography variant="body2">
                        Ce produit cible les petites entreprises de moins de 2 ans. La remise créateur est un levier d'acquisition clé.
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>
              )}
            </Box>
          )}

          {/* Tab 5: Docs */}
          {activeTab === 5 && (
            <Box maxWidth="lg">
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600} color="#111827">Documents & Contrats</Typography>
                <Typography variant="body2" color="text.secondary">
                  Assemblez votre produit à partir de blocs juridiques approuvés pour chaque juridiction.
                </Typography>
              </Box>

              {carriers.length === 0 ? (
                <Alert severity="warning">
                  Aucune juridiction configurée. Veuillez d'abord ajouter des porteurs de risques dans l'onglet "Juridictions & Porteurs".
                </Alert>
              ) : (
                <>
                  <Card variant="outlined" sx={{ mb: 4, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                    <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Box sx={{ p: 2, bgcolor: 'white', borderRadius: '50%', border: '1px solid #e2e8f0' }}>
                        <GlobeIcon sx={{ fontSize: 40, color: '#111827' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom color="#111827">Juridiction Active</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                          Sélectionnez le pays pour configurer ses documents juridiques spécifiques.
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          {carriers.map(c => (
                            <Chip 
                              key={c.id} 
                              label={c.country} 
                              size="small" 
                              color={selectedJurisdictionId === c.id ? 'primary' : 'default'} 
                              variant={selectedJurisdictionId === c.id ? 'filled' : 'outlined'}
                              sx={{ fontWeight: 500 }}
                            />
                          ))}
                        </Stack>
                      </Box>
                      <FormControl sx={{ minWidth: 320 }}>
                        <InputLabel id="jurisdiction-select-label" sx={{ fontWeight: 600 }}>Sélectionner la Juridiction</InputLabel>
                        <Select
                          labelId="jurisdiction-select-label"
                          value={selectedJurisdictionId || (carriers[0]?.id || '')}
                          label="Sélectionner la Juridiction"
                          onChange={(e) => setSelectedJurisdictionId(e.target.value)}
                          sx={{ bgcolor: 'white', fontWeight: 600 }}
                        >
                          {carriers.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                <Typography fontWeight={600}>{c.country}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>{c.insurer}</Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Card>

                  {(() => {
                    const activeCarrier = carriers.find(c => c.id === (selectedJurisdictionId || carriers[0]?.id));
                    if (!activeCarrier) return null;

                    const currentDocs = carrierDocs[activeCarrier.id] || { cg: '', cp: '' };
                    const isConfigured = currentDocs.cg && currentDocs.cp;
                    
                    // Helper to find selected CG details
                    const availableCGs = (DOCUMENT_TEMPLATES[activeCarrier.country]?.cg || DOCUMENT_TEMPLATES['default'].cg)
                      .filter(cg => cg.insurer === activeCarrier.insurer && cg.status === 'active');
                    const selectedCG = availableCGs.find(cg => cg.id === currentDocs.cg);

                    // Helper to find selected CP details
                    const availableCPs = (DOCUMENT_TEMPLATES[activeCarrier.country]?.cp || DOCUMENT_TEMPLATES['default'].cp)
                      .filter(cp => {
                        // Filter by channel: at least one selected channel must be supported by the template
                        const channelMatch = !cp.channels || cp.channels.some(c => selectedChannels.includes(c));
                        // Filter by product line: match the CG's product line if selected
                        const productLineMatch = !cp.productLine || (selectedCG && selectedCG.productLine === cp.productLine) || true;
                        return channelMatch && productLineMatch;
                      });
                    const selectedCP = availableCPs.find(cp => cp.id === currentDocs.cp);

                    return (
                      <Grid container spacing={4}>
                        {/* Left: Configuration */}
                        <Grid item xs={12} md={8}>
                          
                          {/* Section 1: CG */}

                          
                          {/* Section 1: CG */}
                          <Card variant="outlined" sx={{ mb: 3, borderColor: currentDocs.cg ? 'inherit' : '#fca5a5', position: 'relative', overflow: 'visible' }}>
                            <Box sx={{ position: 'absolute', top: -12, right: 24, bgcolor: 'white', px: 1 }}>
                              <Chip 
                                label={`S'applique à : ${activeCarrier.country} – ${activeCarrier.insurer}`} 
                                size="small" 
                                variant="outlined" 
                                sx={{ bgcolor: '#f8fafc', fontWeight: 600, color: '#475569', borderColor: '#e2e8f0' }} 
                              />
                            </Box>
                            <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', bgcolor: '#f9fafb', display: 'flex', justifyContent: 'space-between', pt: 3 }}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <LegalIcon fontSize="small" color="action" />
                                <Typography variant="subtitle1" fontWeight={600}>1. Base Légale (Conditions Générales)</Typography>
                                <Tooltip title="Les termes juridiques standard qui s'appliquent à toutes les polices dans cette juridiction. Ils sont gérés par le département juridique pour assurer la conformité.">
                                  <InfoIcon fontSize="small" color="action" sx={{ cursor: 'help' }} />
                                </Tooltip>
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                {currentDocs.cg ? (
                                  <Chip label="Valide" size="small" color="success" variant="filled" icon={<CheckCircleIcon />} />
                                ) : (
                                  <Chip label="Manquant" size="small" color="error" variant="filled" icon={<WarningIcon />} />
                                )}
                              </Stack>
                            </Box>
                            <Box sx={{ p: 3 }}>
                              <Alert severity="warning" sx={{ mb: 3, bgcolor: '#fff7ed', color: '#9a3412', border: '1px solid #fed7aa' }}>
                                Ce document est géré par le département juridique et ne peut pas être modifié ici pour assurer la conformité.
                              </Alert>
                              
                              <Typography variant="body2" color="text.secondary" paragraph>
                                Fondation juridique pour <strong>{activeCarrier.country}</strong> ({activeCarrier.regulation}).
                              </Typography>
                              
                              <Grid container spacing={2} alignItems="flex-start">
                                <Grid item xs={12} md={8}>
                                  <FormControl fullWidth size="small" error={!currentDocs.cg}>
                                    <InputLabel>Sélectionner la base légale</InputLabel>
                                    <Select 
                                      value={currentDocs.cg} 
                                      label="Sélectionner la base légale"
                                      onChange={(e) => setCarrierDocs({
                                        ...carrierDocs,
                                        [activeCarrier.id]: { ...currentDocs, cg: e.target.value }
                                      })}
                                    >
                                      {availableCGs.map(t => (
                                        <MenuItem key={t.id} value={t.id}>
                                          {t.name} – {t.insurer} – {t.version}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Button 
                                    variant="outlined" 
                                    fullWidth 
                                    startIcon={<ViewIcon />}
                                    disabled={!currentDocs.cg}
                                    sx={{ height: 40 }}
                                  >
                                    Voir le PDF source
                                  </Button>
                                </Grid>
                              </Grid>

                              {selectedCG && (
                                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px solid #e2e8f0' }}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={6} md={3}>
                                      <Typography variant="caption" color="text.secondary" display="block">Version</Typography>
                                      <Typography variant="body2" fontWeight={500}>{selectedCG.version}</Typography>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                      <Typography variant="caption" color="text.secondary" display="block">Date de Validation</Typography>
                                      <Typography variant="body2" fontWeight={500}>{selectedCG.date}</Typography>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                      <Typography variant="caption" color="text.secondary" display="block">Assureur</Typography>
                                      <Typography variant="body2" fontWeight={500}>{selectedCG.insurer}</Typography>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                      <Typography variant="caption" color="text.secondary" display="block">Ligne de Produit</Typography>
                                      <Typography variant="body2" fontWeight={500}>{selectedCG.productLine}</Typography>
                                    </Grid>
                                  </Grid>
                                </Box>
                              )}
                            </Box>
                          </Card>

                          {/* Section 2: CP */}
                          <Card variant="outlined" sx={{ borderColor: currentDocs.cp ? 'inherit' : '#fca5a5', position: 'relative', overflow: 'visible' }}>
                            <Box sx={{ position: 'absolute', top: -12, right: 24, bgcolor: 'white', px: 1 }}>
                              <Chip 
                                label={`S'applique à : ${activeCarrier.country} – ${activeCarrier.insurer}`} 
                                size="small" 
                                variant="outlined" 
                                sx={{ bgcolor: '#f8fafc', fontWeight: 600, color: '#475569', borderColor: '#e2e8f0' }} 
                              />
                            </Box>
                            <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', bgcolor: '#f9fafb', display: 'flex', justifyContent: 'space-between', pt: 3 }}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <FileIcon fontSize="small" color="action" />
                                <Typography variant="subtitle1" fontWeight={600}>2. Conditions Particulières</Typography>
                                <Tooltip title="Les détails spécifiques pour chaque client (ex: nom, prime, dates). Ce modèle définit comment les données sont mappées dans le document final.">
                                  <InfoIcon fontSize="small" color="action" sx={{ cursor: 'help' }} />
                                </Tooltip>
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                {currentDocs.cp ? (
                                  <Chip label="Valide" size="small" color="success" variant="filled" icon={<CheckCircleIcon />} />
                                ) : (
                                  <Chip label="Manquant" size="small" color="error" variant="filled" icon={<WarningIcon />} />
                                )}
                              </Stack>
                            </Box>
                            <Box sx={{ p: 3 }}>
                              <Alert severity="info" sx={{ mb: 3, bgcolor: '#eff6ff', color: '#1e3a8a', border: '1px solid #dbeafe' }} icon={<InfoIcon sx={{ color: '#2563eb' }} />}>
                                Ce document sera généré dynamiquement pour chaque client lors de l'émission de la police.
                              </Alert>

                              <Grid container spacing={2}>
                                <Grid item xs={12} md={8}>
                                  <FormControl fullWidth size="small" error={!currentDocs.cp}>
                                    <InputLabel>Modèle de Conditions Particulières (SmartDoc)</InputLabel>
                                    <Select 
                                      value={currentDocs.cp} 
                                      label="Modèle de Conditions Particulières (SmartDoc)"
                                      onChange={(e) => setCarrierDocs({
                                        ...carrierDocs,
                                        [activeCarrier.id]: { ...currentDocs, cp: e.target.value }
                                      })}
                                    >
                                      {availableCPs.map(t => (
                                        <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Button variant="outlined" fullWidth startIcon={<TuneIcon />} disabled={!currentDocs.cp}>Modifier le mapping</Button>
                                </Grid>
                              </Grid>

                              {selectedCP && (
                                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px solid #e2e8f0' }}>
                                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                    {selectedCP.productLine && (
                                      <Chip label={selectedCP.productLine} size="small" color="primary" variant="outlined" />
                                    )}
                                    {selectedCP.channels && selectedCP.channels.map(c => (
                                      <Chip key={c} label={c.toUpperCase()} size="small" color="default" variant="outlined" />
                                    ))}
                                  </Stack>
                                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>Variables Détectées :</Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {selectedCP.variables.map(v => (
                                      <Chip key={v} label={`{{${v}}}`} size="small" sx={{ fontFamily: 'monospace', bgcolor: '#e2e8f0' }} />
                                    ))}
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Card>
                        </Grid>
                        
                        {/* Right: Status & Preview */}
                        <Grid item xs={12} md={4}>
                          <Card variant="outlined" sx={{ mb: 3, bgcolor: '#f8fafc' }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
                              <Typography variant="subtitle2" fontWeight={600}>Statut de Configuration</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                              {Object.entries(COUNTRIES_BY_REGION).map(([region, countries]) => {
                                const regionCarriers = carriers.filter(c => countries.includes(c.country));
                                if (regionCarriers.length === 0) return null;

                                return (
                                  <Box key={region} sx={{ mb: 2 }}>
                                    <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', mb: 1, display: 'block' }}>
                                      {region}
                                    </Typography>
                                    <Stack spacing={1}>
                                      {regionCarriers.map(c => {
                                        const cDocs = carrierDocs[c.id] || { cg: '', cp: '' };
                                        const isComplete = cDocs.cg && cDocs.cp;
                                        const isActive = activeCarrier.id === c.id;

                                        return (
                                          <Box 
                                            key={c.id} 
                                            onClick={() => setSelectedJurisdictionId(c.id)}
                                            sx={{ 
                                              display: 'flex', 
                                              alignItems: 'center', 
                                              justifyContent: 'space-between',
                                              p: 1,
                                              borderRadius: 1,
                                              bgcolor: isActive ? 'white' : 'transparent',
                                              border: isActive ? '1px solid #e2e8f0' : '1px solid transparent',
                                              boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                                              cursor: 'pointer',
                                              '&:hover': { bgcolor: isActive ? 'white' : '#f1f5f9' }
                                            }}
                                          >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                              <Typography variant="body2" fontWeight={isActive ? 600 : 400} color={isActive ? 'primary' : 'text.primary'}>
                                                {c.country}
                                              </Typography>
                                            </Box>
                                            {isComplete ? (
                                              <Chip label="Complete" size="small" color="success" sx={{ height: 20, fontSize: '0.65rem' }} />
                                            ) : (
                                              <Chip label="Pending" size="small" color="warning" sx={{ height: 20, fontSize: '0.65rem' }} />
                                            )}
                                          </Box>
                                        );
                                      })}
                                    </Stack>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Card>

                          <Card variant="outlined" sx={{ mb: 3 }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
                              <Typography variant="subtitle2" fontWeight={600}>Document Pack: {activeCarrier.country}</Typography>
                            </Box>
                            <List dense>
                              <ListItem>
                                <ListItemIcon><FileIcon color="primary" /></ListItemIcon>
                                <ListItemText primary="IPID" secondary={(DOCUMENT_TEMPLATES[activeCarrier.country]?.ipid || DOCUMENT_TEMPLATES['default'].ipid)[0]} />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon><FileIcon color={currentDocs.cg ? "success" : "error"} /></ListItemIcon>
                                <ListItemText 
                                  primary="Legal Base" 
                                  secondary={selectedCG ? selectedCG.name : "Not configured"} 
                                  secondaryTypographyProps={{ color: currentDocs.cg ? 'text.secondary' : 'error' }}
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon><FileIcon color={currentDocs.cp ? "success" : "error"} /></ListItemIcon>
                                <ListItemText 
                                  primary="Policy Schedule" 
                                  secondary={selectedCP ? selectedCP.name : "Not configured"} 
                                  secondaryTypographyProps={{ color: currentDocs.cp ? 'text.secondary' : 'error' }}
                                />
                              </ListItem>
                            </List>
                            <Box sx={{ p: 2, borderTop: '1px solid #f0f0f0' }}>
                              <Tooltip title={!isConfigured ? "You must configure both the Legal Base and Policy Schedule before previewing." : ""}>
                                <span>
                                  <Button 
                                    fullWidth 
                                    variant="contained" 
                                    disabled={!isConfigured}
                                    sx={{ bgcolor: 'black', textTransform: 'none', '&:disabled': { bgcolor: '#e5e7eb' } }}
                                  >
                                    Preview Pack ({activeCarrier.country})
                                  </Button>
                                </span>
                              </Tooltip>
                            </Box>
                          </Card>

                          {!isConfigured ? (
                            <Alert severity="error" variant="filled" sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" fontWeight={600}>Product cannot be published.</Typography>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                Missing legal configuration for:
                              </Typography>
                              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                                {carriers.map(c => {
                                  const docs = carrierDocs[c.id] || { cg: '', cp: '' };
                                  const missing = [];
                                  if (!docs.cg) missing.push('CG manquantes');
                                  if (!docs.cp) missing.push('CP manquantes');
                                  
                                  if (missing.length === 0) return null;
                                  
                                  return (
                                    <li key={c.id} style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setSelectedJurisdictionId(c.id)}>
                                      {c.country} ({missing.join(', ')})
                                    </li>
                                  );
                                })}
                              </ul>
                              <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                                Cliquez sur un pays pour compléter la configuration.
                              </Typography>
                            </Alert>
                          ) : (
                            <Alert severity="success" variant="outlined" sx={{ mb: 2, bgcolor: '#f0fdf4', borderColor: '#bbf7d0' }}>
                              <Typography variant="subtitle2" fontWeight={600}>Juridiction Prête</Typography>
                              <Typography variant="body2">
                                Tous les documents requis pour {activeCarrier.country} sont configurés.
                              </Typography>
                            </Alert>
                          )}

                          <Alert severity="info" variant="outlined" sx={{ bgcolor: '#eff6ff', borderColor: '#dbeafe' }}>
                            <Typography variant="subtitle2" gutterBottom fontWeight={600}>Architecture Documentaire</Typography>
                            <Typography variant="body2">
                              <strong>Principe de Réutilisation :</strong> Les documents ne sont pas rédigés ici. Vous assemblez des blocs juridiques versionnés (CG, CP) validés par le Département Juridique.
                            </Typography>
                          </Alert>
                        </Grid>
                      </Grid>
                    );
                  })()}
                </>
              )}
            </Box>
          )}

          {/* Tab 6: Policy & Contract & Workflow */}
          {activeTab === 6 && (
            <Box maxWidth="lg">
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>Police, Contrat & Flux de travail</Typography>
                <Typography variant="body2" color="text.secondary">
                  Configurez le "cerveau" (règles), la "preuve" (documents) et le "moteur" (processus) de votre produit.
                </Typography>
              </Box>

              {/* Visual Explanation Panel */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600} color="#111827">Règles de Gestion</Typography>
                <Typography variant="body2" color="text.secondary">
                  Définissez le cycle de vie des contrats et les règles d'acceptation.
                </Typography>
              </Box>
              <Grid container spacing={4}>
                {/* Left: Workflow Visualizer */}
                <Grid item xs={12} md={8}>
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight={600}>Cycle de Vie Standard</Typography>
                      <Button size="small" startIcon={<TuneIcon />}>Configurer</Button>
                    </Box>
                    <Box sx={{ p: 4, overflowX: 'auto' }}>
                      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                        {/* Step 1 */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ 
                            width: 120, height: 80, 
                            bgcolor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 2,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            mb: 1
                          }}>
                            <Typography variant="subtitle2" fontWeight={600}>Devis</Typography>
                            <Typography variant="caption" color="text.secondary">30 jours</Typography>
                          </Box>
                          <Chip label="Création" size="small" sx={{ bgcolor: '#f3f4f6' }} />
                        </Box>

                        <ArrowForwardIcon color="action" />

                        {/* Step 2 */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ 
                            width: 120, height: 80, 
                            bgcolor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 2,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            mb: 1
                          }}>
                            <Typography variant="subtitle2" fontWeight={600} color="#1e40af">Souscription</Typography>
                            <Typography variant="caption" color="#60a5fa">Paiement CB</Typography>
                          </Box>
                          <Chip label="Validation" size="small" color="primary" variant="outlined" />
                        </Box>

                        <ArrowForwardIcon color="action" />

                        {/* Step 3 */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ 
                            width: 120, height: 80, 
                            bgcolor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 2,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            mb: 1
                          }}>
                            <Typography variant="subtitle2" fontWeight={600} color="#166534">Actif</Typography>
                            <Typography variant="caption" color="#4ade80">12 mois</Typography>
                          </Box>
                          <Chip label="En cours" size="small" color="success" variant="outlined" />
                        </Box>

                        <ArrowForwardIcon color="action" />

                        {/* Step 4 */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ 
                            width: 120, height: 80, 
                            bgcolor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 2,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            mb: 1
                          }}>
                            <Typography variant="subtitle2" fontWeight={600} color="#9a3412">Renouvellement</Typography>
                            <Typography variant="caption" color="#fb923c">Tacite</Typography>
                          </Box>
                          <Chip label="J-60" size="small" color="warning" variant="outlined" />
                        </Box>
                      </Stack>
                    </Box>
                  </Card>

                  <Card variant="outlined">
                    <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
                      <Typography variant="subtitle1" fontWeight={600}>Règles d'Acceptation (Underwriting)</Typography>
                    </Box>
                    <List>
                      <ListItem divider>
                        <ListItemIcon><BlockIcon color="error" /></ListItemIcon>
                        <ListItemText 
                          primary="Refus Automatique" 
                          secondary="Si Sinistralité > 2 sur les 36 derniers mois" 
                        />
                        <Switch defaultChecked />
                      </ListItem>
                      <ListItem divider>
                        <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                        <ListItemText 
                          primary="Renvoi vers un Gestionnaire (Referral)" 
                          secondary="Si Capital > 1.000.000 €" 
                        />
                        <Switch defaultChecked />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                        <ListItemText 
                          primary="Acceptation Immédiate" 
                          secondary="Tous les autres cas standards" 
                        />
                        <Switch defaultChecked disabled />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>

                {/* Right: Settings */}
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', bgcolor: '#f9fafb' }}>
                      <Typography variant="subtitle2" fontWeight={600}>Paramètres de Gestion</Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Stack spacing={2}>
                        <FormControlLabel 
                          control={<Switch defaultChecked />} 
                          label={<Typography variant="body2">Renouvellement Tacite</Typography>} 
                        />
                        <FormControlLabel 
                          control={<Switch defaultChecked />} 
                          label={<Typography variant="body2">Fractionnement accepté</Typography>} 
                        />
                        <FormControlLabel 
                          control={<Switch />} 
                          label={<Typography variant="body2">Signature électronique obligatoire</Typography>} 
                        />
                        <Divider />
                        <Box>
                          <Typography variant="caption" color="text.secondary">Délai de renonciation</Typography>
                          <TextField fullWidth size="small" defaultValue="14" InputProps={{ endAdornment: 'Jours' }} sx={{ mt: 0.5 }} />
                        </Box>
                      </Stack>
                    </Box>
                  </Card>

                  <Alert severity="info" variant="outlined" sx={{ bgcolor: '#eff6ff', borderColor: '#dbeafe' }}>
                    <Typography variant="subtitle2" gutterBottom fontWeight={600}>Orchestration des Processus</Typography>
                    <Typography variant="body2">
                      Vous configurez ici le comportement du moteur de gestion (Workflow Engine). Ces règles déterminent comment le système réagit aux événements du cycle de vie (souscription, sinistre, renouvellement).
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Tab 7: Versions */}
          {activeTab === 7 && (
            <Box maxWidth="lg">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} color="#111827">Historique & Versions</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Suivez l'évolution de votre produit et gérez les mises en production.
                  </Typography>
                </Box>
                <Button startIcon={<AddIcon />} variant="contained" sx={{ bgcolor: 'black', color: 'white', textTransform: 'none' }}>
                  Nouvelle Version
                </Button>
              </Box>

              <Card variant="outlined">
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Version</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Statut</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Modifications</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#4b5563' }}>Auteur</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: '#4b5563' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { 
                          v: '3.1', 
                          status: 'Brouillon', 
                          summary: 'Ajustement tarifaire 2025', 
                          date: 'Aujourd\'hui', 
                          author: 'Vous',
                          actions: ['Edit', 'Publish']
                        },
                        { 
                          v: '3.0', 
                          status: 'Publié', 
                          summary: 'Lancement offre "Jeunes Conducteurs"', 
                          date: '15 Déc 2024', 
                          author: 'A. Smith',
                          actions: ['View', 'Clone']
                        },
                        { 
                          v: '2.4', 
                          status: 'Archivé', 
                          summary: 'Correction mineure franchise', 
                          date: '01 Juin 2024', 
                          author: 'M. Brown',
                          actions: ['View']
                        }
                      ].map((row) => (
                        <TableRow key={row.v} hover>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={700}>v{row.v}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={row.status} 
                              size="small" 
                              sx={{ 
                                bgcolor: row.status === 'Publié' ? '#dcfce7' : row.status === 'Brouillon' ? '#f3f4f6' : '#f9fafb',
                                color: row.status === 'Publié' ? '#166534' : row.status === 'Brouillon' ? '#1f2937' : '#9ca3af',
                                fontWeight: 500,
                                border: '1px solid transparent',
                                borderColor: row.status === 'Brouillon' ? '#e5e7eb' : 'transparent'
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ maxWidth: 300 }}>
                            <Typography variant="body2" color="text.primary">{row.summary}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">{row.date}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">{row.author}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              {row.actions.includes('Publish') && (
                                <Button size="small" startIcon={<PublishIcon />} color="success" variant="contained" disableElevation sx={{ textTransform: 'none' }}>
                                  Publier
                                </Button>
                              )}
                              {row.actions.includes('Edit') && (
                                <IconButton size="small" sx={{ color: 'black' }}><TuneIcon fontSize="small" /></IconButton>
                              )}
                              {row.actions.includes('View') && (
                                <IconButton size="small"><ViewIcon fontSize="small" /></IconButton>
                              )}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Box>
          )}

        </Box>
      </Box>
    </Box>
  );
};

export default ProductStudio;
