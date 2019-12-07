import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

export default function Header() {
  return (

    <div className="header-content">
      <Link to="/">
        <h1>Simulação Real Valor</h1>
      </Link>
    </div>
  );
}
