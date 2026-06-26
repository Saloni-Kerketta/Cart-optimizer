import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Box, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { api } from '../api';

export default function ProductMainPage({ navigateToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch catalog from backend api messenger on mount
  useEffect(() => {
    api.getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load store products. Please check your backend connection.");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await api.addToCart(productId);
      alert("Product added to cart safely!");
    } catch (err) {
      alert("Error adding item to cart.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" fontWeight="800" color="primary.main">
          Smart Optimizer Store
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          startIcon={<ShoppingCartIcon />} 
          onClick={navigateToCart}
          sx={{ borderRadius: 2, fontWeight: 'bold' }}
        >
          View My Cart
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      {/* Grid Display System */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.ProductID} xs={12} sm={6} md={4}>
            
            {/* Note: When your teammate finishes their custom card, you can swap this frame out! */}
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold">
                  {product.Category || "Electronics"}
                </Typography>
                <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 0.5 }}>
                  {product.ProductName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Brand: {product.Brand || "Generic"}
                </Typography>
              </CardContent>
              
              <Box px={2} pb={1} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="900" color="text.primary">
                  ${product.Price}
                </Typography>
              </Box>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="primary" 
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => handleAddToCart(product.ProductID)}
                  sx={{ borderRadius: 2, fontWeight: 'bold' }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>

          </Grid>
        ))}
      </Grid>
    </Container>
  );
}