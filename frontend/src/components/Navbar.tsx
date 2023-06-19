import React from 'react';
import Button from './Button';

const Navbar: React.FC = () => (
  <nav>
    <div>
      <Button text="Sign In" onClick={() => console.log('Sign In Clicked')} />
      <Button text="Sign Up" onClick={() => console.log('Sign Up Clicked')} />
    </div>
  </nav>
);

export default Navbar;
