import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TextInput = styled.input`
  background-color: transparent;
  color: white;
  border-radius: 0.3rem;
  border: 0.05rem solid white;
  padding: 0.3rem;
  :focus {
    outline: none;
  }
`;

const Label = styled.label`
  margin-top: 0.5rem;
`;

const Settings = ({ settings, setSettings }) => {
  const handleChange = ({ target: { name, value } }) => {
    const updatedSettings = { ...Object.assign(settings, { [name]: value }) };
    setSettings(updatedSettings);
  };

  return (
    <Form>
      <Label htmlFor="">Start</Label>
      <TextInput type="text" name="start" onChange={handleChange} />
      <Label htmlFor="">Duration</Label>
      <TextInput type="text" name="duration" onChange={handleChange} />
    </Form>
  );
};

export default Settings;
