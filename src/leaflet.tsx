import React, { useState, useEffect,FC } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap ,MapConsumer} from "react-leaflet";
import html2canvas from 'html2canvas';
import Button from '@mui/material/Button';
import { time } from "console";
import { Zoom } from "@mui/material";
//useMapの使い方
//canvasをdataurlにするボタン
//再レンダー

const MyComponent: FC<{zoom: boolean, setZoom: (bool: boolean) => void}> = ({zoom, setZoom}) => {

  const map = useMap()
  const getCanvas = async() =>{
    const element = map.getContainer()
    const canvas = await html2canvas(element,{
    scrollX: window.screenX,
    scrollY: -window.screenY,
    useCORS: true,
    allowTaint: false
    }).then((canvas)=>{
      
        var a = document.createElement('a');
        a.download = "fefffe.png"
        a.href = canvas.toDataURL('image/png');
        document.body.appendChild(a);
        a.click();
    })
  }

  return <Button variant="contained" onClick={()=>{setZoom(!zoom); getCanvas()}}>Hello World</Button>
  
}


const SimpleLeaflet = () => {
  const [position, setPosition] = useState({
    lat: 51.505,
    lng: -0.09,
  });
  const [zoom, setZoom] = useState(false);


  useEffect(()=>{
    console.log("rerender");
  },[zoom])

  return (
    <div>
       {/* <button onClick={() => {setZoom(zoom+1)}} style={{width: 50, height: 50}}/> */}
      <MapContainer center={position} zoom={13} style={{ height: "50vh" }}>
        <MyComponent zoom={zoom} setZoom={setZoom}/>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
          
        </Marker> */}
        
      </MapContainer>
    </div>
  );
};


export default SimpleLeaflet;