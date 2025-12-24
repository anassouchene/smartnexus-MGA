import { Box } from '@mui/material';
import React, { useState } from 'react';
import PolicyEditor from '../components/policy/PolicyEditor';
import PolicyList from '../components/policy/PolicyList';
import PolicySimulator from '../components/policy/PolicySimulator';
import PolicyVersions from '../components/policy/PolicyVersions';

const Policy: React.FC = () => {
  const [view, setView] = useState<'list' | 'editor' | 'simulator' | 'versions'>('list');
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(null);

  const handleSelectPolicy = (id: number) => {
    setSelectedPolicyId(id);
    setView('editor');
  };

  const handleSimulate = () => {
    setView('simulator');
  };

  const handleVersions = () => {
    setView('versions');
  };

  const handleBack = () => {
    setView('list');
    setSelectedPolicyId(null);
  };

  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      {view === 'list' && (
        <PolicyList 
          onSelectPolicy={handleSelectPolicy} 
          onSimulate={handleSimulate}
          onViewVersions={handleVersions}
        />
      )}
      {view === 'editor' && (
        <PolicyEditor 
          onBack={handleBack} 
          onSimulate={handleSimulate}
        />
      )}
      {view === 'simulator' && (
        <PolicySimulator onBack={handleBack} />
      )}
      {view === 'versions' && (
        <PolicyVersions onBack={handleBack} />
      )}
    </Box>
  );
};

export default Policy;
