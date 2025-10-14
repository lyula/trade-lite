import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SSOCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/register');
  }, [navigate]);

  return null;
};

export default SSOCallback;