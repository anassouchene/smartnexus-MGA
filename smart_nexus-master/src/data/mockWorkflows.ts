export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Draft' | 'Archived';
  lastModified: string;
  steps: number;
}

export const mockWorkflows: WorkflowTemplate[] = [
  {
    id: '1',
    name: 'Devis Propriété Commerciale',
    description: 'Processus de souscription standard pour les risques de propriété commerciale inférieurs à 5M$.',
    status: 'Active',
    lastModified: '2023-12-10',
    steps: 5,
  },
  {
    id: '2',
    name: 'Renouvellement Flotte Auto',
    description: 'Flux de renouvellement automatisé pour les flottes de < 10 véhicules et faible taux de sinistralité.',
    status: 'Active',
    lastModified: '2023-12-15',
    steps: 3,
  },
  {
    id: '3',
    name: 'Propriétaires Haute Valeur',
    description: 'Processus d\'examen manuel pour les soumissions de propriété individuelle à haute valeur nette.',
    status: 'Draft',
    lastModified: '2023-12-18',
    steps: 8,
  },
  {
    id: '4',
    name: 'Devis Rapide Responsabilité Civile',
    description: 'Génération de devis instantanée pour les classes RC à faible risque.',
    status: 'Archived',
    lastModified: '2023-11-20',
    steps: 4,
  },
];
