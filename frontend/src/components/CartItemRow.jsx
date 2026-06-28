import React from 'react';
import { Box, Typography, IconButton, Avatar, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItemRow = ({ item, onRemove }) => {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        mb: 2, 
        justifyContent: 'space-between',
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        gap: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Avatar 
          src={item.imageUrl || 'https://via.placeholder.com/50'} 
          alt={item.name} 
          variant="rounded"
          sx={{ width: 60, height: 60 }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Qty: {item.quantity} | ${item.price.toFixed(2)} each
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', minWidth: 80, textAlign: 'right' }}>
          ${(item.price * item.quantity).toFixed(2)}
        </Typography>
        
        <IconButton 
          color="error" 
          onClick={() => onRemove(item._id)}
          aria-label="delete item"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default CartItemRow;