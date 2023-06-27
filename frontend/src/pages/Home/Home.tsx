import React from 'react';
import Button from '../../components/Button';

interface HomeProps {
  authToken: string | null;
}

const Home: React.FC<HomeProps> = ({ authToken }) => {
  return (
    <div>
      <h3>Homepage of Oudioo</h3>
      <p>A detailed about of what the Oudioo platform is would readily appear here for users to read about.</p>
      
      {/* Show auth token if available */}
      {authToken && <p>Current auth token: {authToken}</p>}
    </div>
  );
};

export default Home;

