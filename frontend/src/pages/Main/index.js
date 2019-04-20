import React, { useState } from 'react';

import logo from '../../assets/logo.svg';

import { Container, SubmitButton } from './styles';

import api from '../../services/api';

const Main = props => {
  // Using React hooks
  const [newBox, setNewBox] = useState('');

  const handleSubmit = async e => {
    console.log('HandleSubmit');
    const response = await api.post('/boxes', { title: newBox });
    console.log('Response', response);
    props.history.push(`/box/${response.data._id}`);
  };

  const handleInputChange = e => {
    setNewBox(e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} action="">
        <img src={logo} alt="" />
        <input onChange={handleInputChange} placeholder="Criar um box" />
        <SubmitButton color="#111" type="submit" disabled={!newBox}>
          Criar
        </SubmitButton>
      </form>
    </Container>
  );
};

export default Main;
