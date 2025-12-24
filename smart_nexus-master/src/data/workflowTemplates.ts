export interface WorkflowTemplateDefinition {
  id: string;
  category: 'Auto' | 'Home' | 'Pet' | 'Commercial';
  name: string;
  description: string;
  steps: string[];
}

export const workflowTemplates: WorkflowTemplateDefinition[] = [
  {
    id: 't1',
    category: 'Auto',
    name: 'Auto – Sinistre Standard',
    description: 'Processus de sinistre standard de bout en bout pour les accidents de véhicules mineurs impliquant une ou plusieurs parties.',
    steps: ['Prise en charge FNOL', 'Vérification de Couverture', 'Évaluation de Responsabilité', 'Expertise des Dommages', 'Offre de Règlement', 'Paiement'],
  },
  {
    id: 't2',
    category: 'Auto',
    name: 'Auto – Assistance Routière',
    description: 'Flux accéléré pour les demandes d\'assistance routière d\'urgence.',
    steps: ['Demande de Service', 'Vérification de Localisation', 'Envoi du Prestataire', 'Achèvement du Service', 'Retour Client'],
  },
  {
    id: 't3',
    category: 'Home',
    name: 'Habitation – Fuite d\'Eau (Zen House)',
    description: 'Flux activé par IoT déclenché automatiquement par des capteurs d\'eau domestiques intelligents.',
    steps: ['Signal d\'Alerte IoT', 'Notification Client', 'Envoi Plombier Urgence', 'Examen d\'Atténuation', 'Création de Sinistre'],
  },
  {
    id: 't4',
    category: 'Pet',
    name: 'Animal – Sinistre Vétérinaire',
    description: 'Processus de remboursement simplifié pour les frais vétérinaires.',
    steps: ['Téléchargement Facture', 'Examen Traitement', 'Vérification Limite Police', 'Calcul Franchise', 'Remboursement'],
  },
];
