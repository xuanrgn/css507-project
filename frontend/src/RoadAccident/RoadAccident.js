import React from "react";
import "./RoadAccident.css";
import RoadAccidentBlock from "./page/RoadAccidentBlock";
import { getCookie } from '../utils/auth'
const RoadAccident = () => {

  const [config, setConfig] = React.useState(null)

  React.useEffect(() => {
    const cookie = getCookie('usertoken')

   if(cookie){
     setConfig(JSON.parse(cookie))

   }
   else {
     localStorage.removeItem('userhash')
   }
  }, [])

  return <RoadAccidentBlock config={config} />;
};

export default RoadAccident;
