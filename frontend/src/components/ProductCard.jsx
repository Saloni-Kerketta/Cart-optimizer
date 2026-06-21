import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="150"
        image={product.imageUrl || 'https://via.placeholder.com/150'}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap sx={{ fontSize: '1.1rem' }}>
          {product.name}
        </Typography>
        <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifySelf: 'flex-end', p: 2, pt: 0 }}>
        <Button 
          component={Link} 
          to={`/product/${product._id}`} 
          variant="contained" 
          size="small" 
          fullWidth
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;