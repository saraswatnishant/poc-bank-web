import React, { useContext } from 'react';
import { AuthContext } from './index';
import { useNavigate } from 'react-router-dom';

interface WithPermissionGateProps {
  // Add any additional props that your wrapped component might need
}

const withPermissionGate = <P extends WithPermissionGateProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // Check if authenticated, otherwise navigate to home
    if (!isAuthenticated) {
      navigate('/');
      return null; // Return null to prevent rendering the component
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withPermissionGate;
