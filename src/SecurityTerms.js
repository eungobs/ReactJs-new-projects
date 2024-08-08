import React from 'react';
import { Container, Typography, Link, Box, Button } from '@mui/material';

const SecurityTerms = ({ onClose }) => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Security and Privacy Policy
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Introduction
        </Typography>
        <Typography paragraph>
          Welcome to <strong>Fast-Track Weather</strong>! Your privacy and security are of utmost importance to us. This Security and Privacy Policy explains how we collect, use, and protect your personal information when you use our weather application. By using our app, you agree to the practices described in this policy.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Information We Collect
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Typography paragraph>
          We do not collect personal information such as your name, email address, or phone number directly. However, to provide you with accurate weather information, we may collect:
        </Typography>
        <Typography paragraph>
          - <strong>Location Data:</strong> When you allow location access, we collect your geolocation data to provide localized weather updates. This data is used solely for this purpose and is not stored or shared.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Usage Data
        </Typography>
        <Typography paragraph>
          We collect information about how you interact with our app, including:
        </Typography>
        <Typography paragraph>
          - <strong>App Usage:</strong> Information about your search queries, preferences, and other interactions with the app.
          - <strong>Technical Data:</strong> Information about your device, operating system, browser type, and IP address.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          How We Use Your Information
        </Typography>
        <Typography paragraph>
          We use the collected information to:
        </Typography>
        <Typography paragraph>
          - Provide accurate weather forecasts and updates based on your location.
          - Improve the functionality and performance of our app.
          - Analyze usage patterns to enhance user experience.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Data Security
        </Typography>
        <Typography paragraph>
          We take the security of your data seriously and implement appropriate technical and organizational measures to protect it. These measures include:
        </Typography>
        <Typography paragraph>
          - <strong>Encryption:</strong> Data transmitted between your device and our servers is encrypted using industry-standard protocols.
          - <strong>Access Control:</strong> Access to your data is restricted to authorized personnel only.
          - <strong>Regular Audits:</strong> We conduct regular security audits to ensure our systems remain secure.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Third-Party Services
        </Typography>
        <Typography paragraph>
          Our app may contain links to third-party websites or services. We do not control these third-party services and are not responsible for their privacy practices. We encourage you to review their privacy policies before providing any personal information.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Your Rights
        </Typography>
        <Typography paragraph>
          You have the right to:
        </Typography>
        <Typography paragraph>
          - <strong>Access:</strong> Request a copy of the information we hold about you.
          - <strong>Rectify:</strong> Request corrections to any inaccurate or incomplete information.
          - <strong>Delete:</strong> Request the deletion of your data, though this may affect the functionality of the app.
          - <strong>Object:</strong> Object to the processing of your data for certain purposes.
        </Typography>
        <Typography paragraph>
          To exercise your rights or if you have any questions about our data practices, please contact us at <Link href="mailto:eungobs@gmail.com">eungobs@gmail.com</Link>.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Changes to This Policy
        </Typography>
        <Typography paragraph>
          We may update this Security and Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page with an updated effective date.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions or concerns about this policy, please contact us at:
        </Typography>
        <Typography paragraph>
          - <strong>Email:</strong> <Link href="mailto:eungobs@gmail.com">eungobs@gmail.com</Link>
        </Typography>
        
        <Typography variant="body2" color="textSecondary">
          Effective Date: [date]
        </Typography>

        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={onClose}>
            I Understand
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SecurityTerms;
