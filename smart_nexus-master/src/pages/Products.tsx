import { Box } from '@mui/material';
import React, { useState } from 'react';
import ProductCatalog from '../components/products/ProductCatalog';
import ProductStudio from '../components/products/ProductStudio';

const Products: React.FC = () => {
  const [view, setView] = useState<'catalog' | 'studio'>('catalog');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleSelectProduct = (id: number) => {
    setSelectedProductId(id);
    setView('studio');
  };

  const handleCreateProduct = () => {
    setSelectedProductId(null); // New product
    setView('studio');
  };

  const handleBack = () => {
    setView('catalog');
    setSelectedProductId(null);
  };

  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      {view === 'catalog' ? (
        <ProductCatalog 
          onSelectProduct={handleSelectProduct} 
          onCreateProduct={handleCreateProduct}
        />
      ) : (
        <ProductStudio onBack={handleBack} productId={selectedProductId} />
      )}
    </Box>
  );
};

export default Products;
