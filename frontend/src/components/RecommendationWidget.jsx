import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ProductCard from './ProductCard';

const RecommendationWidget = ({ recommendations, aiPitch }) => {
  if (!recommendations || recommendations.length === 0) return null;

  const topThree = recommendations.slice(0, 3);

  return (
    <Paper variant="outlined" sx={{ mt: 5, p: 3, backgroundColor: '#fdfdfd', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Frequently Bought Together
      </Typography>
      
      {/* Saloni's AI Pitch Callout Box */}
      {aiPitch && (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            backgroundColor: 'info.light', 
            color: 'info.contrastText',
            p: 2, 
            borderRadius: 1, 
            mb: 3,
            fontStyle: 'italic'
          }}
        >
          <AutoAwesomeIcon fontSize="small" />
          <Typography variant="body2">
            <strong>AI Insight:</strong> {aiPitch}
          </Typography>
        </Box>
      )}

      {/* Grid container to map top recommendations */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
        {topThree.map(item => (
          <ProductCard key={item._id} product={item} />
        ))}
      </Box>
    </Paper>
  );
};

export default RecommendationWidget;