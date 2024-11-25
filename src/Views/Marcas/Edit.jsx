import React from 'react';
import { useParams } from 'react-router-dom';
import FormMarc from '../../Components/FormMarc';

const EditMarcas = () => {
  const { id } = useParams(); // Captura el ID de la URL
  return ( <FormMarc id={id} title="Editar Marca" />);
};

export default EditMarcas;
