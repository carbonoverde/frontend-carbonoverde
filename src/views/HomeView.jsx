import React from 'react'
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip, Popup} from 'react-leaflet'
import {regioesData} from '../data/regioes'
import '../styles/app.css'

const Joinville_COORDERNADAS = [-26.3045, -48.8876]

const estiloBairro = (feature) => {
  const carbono = feature.properties.compensacaoCarbono || 0; 
    
  // Classificação da cor (Você pode ajustar esses thresholds)
  let cor;
  if (carbono > 80) {
    cor = '#078f34'; // Verde Escuro (Alta Comp.)
  } else if (carbono > 50) {
    cor = '#b88a0c'; // Verde Claro (Média Comp.)
  } else {
    cor = '#921107'; // Laranja/Vermelho (Baixa Comp.)
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
        style={{height: '90vh', width: '100%'}}
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
                        fillColor: '#11c94e', 
                        weight: 0, 
                        fillOpacity: 0,
                        opacity: 0.0
                    } : carbono > 50 ? { 
                        color: '#333', 
                        fillColor: '#f3b610', 
                        weight: 0, 
                        fillOpacity: 0
                    } : { 
                        color: '#333', 
                        fillColor: '#ec1e0f', 
                        weight: 0, 
                        fillOpacity: 0
                    } }
                >
                    <Tooltip 
                        permanent 
                        direction="center" 
                        className='carbon-tooltip text-white font-black text-sm'
                    >
                        {carbono}/100%
                        
                    </Tooltip>
                    <Popup>
                    <div style={{ minWidth: '150px' }}>
                        <h4 className='text-sm text-emerald-700 font-bold'>{feature.properties.nome}</h4>
                        <hr />
                        <strong>Carbono:</strong> {feature.properties.compensacaoCarbono}% Comp.
                        <br /><br />
                        
                        <strong>Energia:</strong>
                        <ul>
                            <li>Gasto: {feature.properties.gastoEnergia.toLocaleString("pt-BR")} kWh</li>
                            <li>Compensação: {feature.properties.compensacaoEnergia}%</li>
                        </ul>

                        <strong>Água:</strong>
                        <ul>
                            <li>Gasto: {feature.properties.gastoAgua.toLocaleString("pt-BR")} Litros</li>
                            <li>Compensação: {feature.properties.compensacaoAgua}%</li>
                        </ul>
                    </div>
                </Popup>
                </CircleMarker>
            );
        })}

      </MapContainer>
    </section>
  )
}

export default HomeView
