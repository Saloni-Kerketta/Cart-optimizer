import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = ({ cartItemCount }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo / Brand Name */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          🛍️ SmartCart Engine
        </Typography>

        {/* Navigation Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          
          {/* Cart Icon Button with Red Notification Badge */}
          <IconButton component={Link} to="/cart" color="inherit" aria-label="cart">
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;