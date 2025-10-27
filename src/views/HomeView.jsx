import React from 'react'
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip} from 'react-leaflet'
import {regioesData} from '../data/regioes'

const Joinville_COORDERNADAS = [-26.3045, -48.8876]

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

const HomeView = () => {

  const getCentroid = (coords) => {
    // Para MultiPolygon, precisaríamos de uma lógica mais complexa, mas para Polygon simples
    // o GeoJSON tem a ordem [Longitude, Latitude]
    
    // Mapeia as latitudes e longitudes
    let lat = coords[0].map(c => c[1]);
    let lng = coords[0].map(c => c[0]);
    
    // Retorna a média (centro) no formato [Latitude, Longitude] exigido pelo Leaflet
    return [
        (Math.max(...lat) + Math.min(...lat)) / 2,
        (Math.max(...lng) + Math.min(...lng)) / 2,
    ];
};


  return (
    <section className="p-4">
      <MapContainer
        center={Joinville_COORDERNADAS}
        zoom={12}
        scrollWheelZoom={false}
        style={{height: '600px', width: '100%'}}
      >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={regioesData} style={estiloBairro}/>  

      {regioesData.features.map((feature, index) => {
            const center = getCentroid(feature.geometry.coordinates);
            const carbono = feature.properties.compensacaoCarbono;

            return (
                <CircleMarker 
                    key={index}
                    center={center}
                    radius={18} 
                    pathOptions={carbono > 80 ? { 
                        color: '#333', 
                        fillColor: '#006400', 
                        weight: 0, 
                        fillOpacity: 0 
                    } : carbono > 50 ? { 
                        color: '#333', 
                        fillColor: '#ADFF2F', 
                        weight: 0, 
                        fillOpacity: 0
                    } : { 
                        color: '#333', 
                        fillColor: '#FF4500', 
                        weight: 0, 
                        fillOpacity: 0
                    } }
                >
                    <Tooltip 
                        permanent 
                        direction="center" 
                    >
                        {carbono}/100%
                        
                    </Tooltip>
                </CircleMarker>
            );
        })}

      </MapContainer>
    </section>
  )
}

export default HomeView
