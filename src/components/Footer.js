import React from 'react';
import { Box, Container, Link, Typography } from '@material-ui/core';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Box className="flex-box" justifyContent="space-around">
          <Box id="mui-box" width="25%">
            Home icon made by{' '}
            <Link
              color="inherit"
              href="https://www.flaticon.com/authors/smalllikeart"
              title="smalllikeart"
            >
              smalllikeart
            </Link>{' '}
            from{' '}
            <Link
              color="inherit"
              href="https://www.flaticon.com/"
              title="Flaticon"
            >
              www.flaticon.com
            </Link>
          </Box>
          <Box>
            <Typography>
              Created by the{' '}
              <Link
                color="inherit"
                href="https://github.com/the-collab-lab/tcl-17-smart-shopping-list"
              >
                TCL-17 team
              </Link>
            </Typography>
            <Typography>© 2021</Typography>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
