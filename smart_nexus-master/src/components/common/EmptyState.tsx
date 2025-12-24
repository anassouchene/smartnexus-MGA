import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%', 
        p: 3,
        textAlign: 'center',
        bgcolor: '#f8fafc',
        borderRadius: 2,
        border: '1px dashed #cbd5e1'
      }}
    >
      {Icon && (
        <Box sx={{ mb: 2, color: 'text.secondary', opacity: 0.5 }}>
          <Icon sx={{ fontSize: 48 }} />
        </Box>
      )}
      <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mb: 3 }}>
        {description}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="contained" size="small" onClick={onAction} sx={{ textTransform: 'none' }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
