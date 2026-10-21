import React from 'react';
import logo from './logo.svg';
import '../css/app.css';
import Container from '@mui/material/Container';
import { Box, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { RippleBadge } from './MaterialTheme/styled';
function App() {
  return  <Container sx={{ backgroundColor: 'orange' }}>
    <Stack direction="column">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component={"h4"}>
          Create React App on TypeScript with REDUX
        </Typography>
      </Box>
      <Box>
        <RippleBadge badgeContent={100}>
      <Button variant="contained">Contained</Button>
        </RippleBadge>
      </Box>
    </Stack>
  </Container>;
}

export default App;



// For test purposes!
// Test 2