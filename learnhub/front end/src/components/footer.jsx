import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider
} from '@mui/material';
import { Home, Email, Phone, Print } from '@mui/icons-material';

const Footer=()=> {
  return (
    <Box sx={{ width: '100%', marginTop: 4, backgroundColor: '#f8f9fa', color: '#212529' }}>
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              PP Code
            </Typography>
            <Typography>
              Discover a world of programming with our comprehensive courses designed for all levels, from beginners to professionals.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Products
            </Typography>
            <Typography><Link href="#" color="inherit" underline="hover">JavaScript</Link></Typography>
            <Typography><Link href="#" color="inherit" underline="hover">PHP</Link></Typography>
            <Typography><Link href="#" color="inherit" underline="hover">Node.js</Link></Typography>
            <Typography><Link href="#" color="inherit" underline="hover">React</Link></Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Info
            </Typography>
            <Typography><Link href="mailto:jamallbarhoum@gmail.com" color="inherit" underline="hover">jamallbarhoum@gmail.com</Link></Typography>
            <Typography><Link href="#" color="inherit" underline="hover">Ahmad Wael</Link></Typography>
            <Typography><Link href="#" color="inherit" underline="hover">PP</Link></Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Typography display="flex" alignItems="center"><Home sx={{ mr: 1 }} /> Jordan</Typography>
            <Typography display="flex" alignItems="center"><Email sx={{ mr: 1 }} /> jamallbarhoum@gmail.com</Typography>
            <Typography display="flex" alignItems="center"><Phone sx={{ mr: 1 }} /> 0795956217</Typography>
            <Typography display="flex" alignItems="center"><Print sx={{ mr: 1 }} /> 0795956217</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box textAlign="center">
          <Typography variant="body2">
            © 2020 Copyright: <Link href="https://jamallbarhoum.netlify.app/#home" color="inherit" underline="hover">jamallbarhoum</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
