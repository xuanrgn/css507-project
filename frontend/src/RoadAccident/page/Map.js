import React, { useEffect, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  Clusterer,
  ObjectManager,
} from "react-yandex-maps";
import { connect, useSelector } from "react-redux";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";


/** Карты для отображения дорож */
const YandexMap = ({
  mapState,
  mapdata,
  isActiveMap,
  isActiveChart,
  isActiveTab,
  clickedPoint,
  isHeatMap,setIsHeatMap
}) => { 
  /** height - высота карты
   *  data - данные по ремонтам
   *  mapRef - доступ к функциям карты
   *  myHeatmap - теплокарты
   */
  const [height, setHeight] = useState("100%");
  const [data, setData] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [myMap, setMyMap] = useState(null);
  const [myTile, setMyTile] = useState(null)
  const [myHeatmap, setMyHeatmap] = useState(null)

  /** 
 * получение данных
 */
  useEffect(() => {
    if (!isActiveMap && myMap) {
      myMap && myMap.off();
      myMap && myMap.remove();
      myMap && setMyMap(null);
      setIsHeatMap(false)
      setMyTile(null)
      setMyHeatmap(null)
    } else {
      myMap && myMap.invalidateSize()
    }
    setData([]);
    setHeight("");
    setTimeout(() => {
      setHeight("100%");
      setData(mapdata);
    }, 200);
  }, [mapdata, isActiveMap, isActiveChart, isActiveTab]);

  useEffect(() => {
      isActiveMap && configureLeafletMap(mapState.center[0], mapState.center[1], 12)
  },[isHeatMap, isActiveMap])

  useEffect(() => {
    mapRef && mapRef.objects.balloon.open(clickedPoint)
    myMap && myMap.setView([mapState.center[0], mapState.center[1]], 15)
  }, [clickedPoint])

/** 
 * настроика теплокарты
 */
  const configureLeafletMap = (lat, lng, zoom) => {
    myMap ?? setMyMap(L.map("map"))
    myMap && myMap.setView([lat, lng], zoom)
    myMap && myMap.invalidateSize()
    if (isHeatMap) {
        myMap && (myTile ?? setMyTile(L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap)))
  
        myMap && (myMap.hasLayer(myTile) ? resetTile(myTile, L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })) :  (myTile && myTile.addTo(myMap)))
    const points = mapdata.length > 0
      ? mapdata.map((p) => {
          return [p.geometry.coordinates[0] ?? 0, p.geometry.coordinates[1] ?? 0, 10];
        })
      : [];

      myMap && (myHeatmap ?? setMyHeatmap( L.heatLayer(points, {
        radius: 8,
        blur: 7,
        maxZoom: 17,
    }).addTo(myMap)))
      myMap && (myMap.hasLayer(myHeatmap) ? resetHeatmap(myHeatmap, L.heatLayer(points, {
        radius: 8,
        blur: 7,
        maxZoom: 17,
      })) : (myHeatmap && myHeatmap.addTo(myMap)))
   }
  }
/** 
 * обновления слоя карты
 */
  const resetTile = (oldLayer, newLayer) => {
    removeLayer(oldLayer, newLayer)
    setMyTile(newLayer)
  }
/** 
 * удаление слоя из карты
 */
  const removeLayer = (oldLayer,newHeatmap) => {
    myMap && myMap.removeLayer(oldLayer)
    myMap && newHeatmap && newHeatmap.addTo(myMap)
    
  }

  /** 
 * обновление теплокарты
 */
  const resetHeatmap = (oldLayer, newHeatmap) => {
    removeLayer(oldLayer, newHeatmap)
    setMyHeatmap(newHeatmap)
  }

  const configureObjectManager = (ref) => {
    setMapRef(ref);
  }

  return (<div className="crimes_maps">
    <div className="crimes_maps_legends">
      <button className="crimes_maps_legend_button" onClick={() => {
        setIsHeatMap(!isHeatMap)
      }}>
        {isHeatMap ? 'Обычная карта' : 'Тепловая карта'}
      </button>
    </div>
    <div className="crimes_maps_map">
    <div id="map" style={{ height: `${isHeatMap ? '100%' : '0.1px'}`, width: '100%', visibility: `${isHeatMap ? 'visible' : 'hidden'}` }}></div>
  <YMaps>
      <Map state={mapState} width={height} height={!isHeatMap ? '100%' : '0%'}>
        {data.length > 0 && (
          <ObjectManager
            instanceRef={ref => {
              ref && configureObjectManager(ref)
            }}
            objects={{
              openBalloonOnClick: true,
              preset: "islands#blueDotIcon",
            }}
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            clusters={
              {
                // preset: "islands#redClusterIcons",
              }
            }
            defaultFeatures={{ type: "FeatureCollection", features: data }}
            modules={[
              "objectManager.addon.objectsBalloon",
              "objectManager.addon.objectsHint",
              "objectManager.addon.clustersBalloon",
            ]}
          />
        )}
      </Map>
    </YMaps>
    </div>
  </div>

  );
};

export default YandexMap;
