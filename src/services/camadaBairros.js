// CamadaBairros.js
import React from 'react';
import { GeoJSON } from 'react-leaflet';
// Importe seu arquivo GeoJSON aqui
import dadosBairros from '../data/regioes'; 

// 1. Função de estilo dinâmico
const estiloBairro = (feature) => {
  const carbono = feature.properties.compensacaoCarbono || 0; 
    
  // Classificação da cor (Você pode ajustar esses thresholds)
  let cor;
  if (carbono > 80) {
    cor = '#006400'; // Verde Escuro (Alta Comp.)
  } else if (carbono > 50) {
    cor = '#ADFF2F'; // Verde Claro (Média Comp.)
  } else {
    cor = '#FF4500'; // Laranja/Vermelho (Baixa Comp.)
  }

  return {
    fillColor: cor,
    weight: 1, 
    opacity: 1,
    color: 'white', 
    fillOpacity: 0.7, 
  };
};

function CamadaBairros() {

  return (
          
  );
}

export default CamadaBairros;