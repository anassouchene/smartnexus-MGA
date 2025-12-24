import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GavelIcon from '@mui/icons-material/Gavel';
import PaymentsIcon from '@mui/icons-material/Payments';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import React from 'react';

export type BlockType = 
  | 'Document Check' 
  | 'Policy Decision' 
  | 'Fraud Check' 
  | 'Expert Assessment' 
  | 'Delegated Repair' 
  | 'Human Validation' 
  | 'Payment' 
  | 'Closure';

export interface BusinessBlock {
  type: BlockType;
  icon: React.ReactNode;
  description: string;
  defaultConfig: Record<string, any>;
}

export const businessBlocks: BusinessBlock[] = [
  {
    type: 'Document Check',
    icon: <FactCheckIcon />,
    description: 'Vérifier la présence des documents requis.',
    defaultConfig: { requiredDocs: ['ID', 'Proof of Address'], allowUpload: true }
  },
  {
    type: 'Policy Decision',
    icon: <GavelIcon />,
    description: 'Vérification automatisée de la couverture.',
    defaultConfig: { policyVersion: 'v2.1', threshold: 5000 }
  },
  {
    type: 'Fraud Check',
    icon: <SecurityIcon />,
    description: 'Score de détection de fraude basé sur l\'IA.',
    defaultConfig: { sensitivity: 'Medium', autoRejectScore: 80 }
  },
  {
    type: 'Expert Assessment',
    icon: <EngineeringIcon />,
    description: 'Assigner à un expert externe pour examen.',
    defaultConfig: { expertType: 'General', slaHours: 48 }
  },
  {
    type: 'Delegated Repair',
    icon: <BuildIcon />,
    description: 'Diriger vers le réseau de réparation préféré.',
    defaultConfig: { network: 'Premium', autoApprove: false }
  },
  {
    type: 'Human Validation',
    icon: <VerifiedUserIcon />,
    description: 'Examen manuel par le gestionnaire de sinistres.',
    defaultConfig: { role: 'Senior Adjuster', checklist: [] }
  },
  {
    type: 'Payment',
    icon: <PaymentsIcon />,
    description: 'Traiter le paiement du règlement.',
    defaultConfig: { method: 'Bank Transfer', currency: 'USD' }
  },
  {
    type: 'Closure',
    icon: <CheckCircleIcon />,
    description: 'Finaliser et clôturer le dossier.',
    defaultConfig: { sendSummary: true, archiveDays: 30 }
  },
];
