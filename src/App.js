import './App.css'
import * as d3 from "d3"
import { useState, useEffect, useRef } from 'react'
import Card from './components/Card'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
// import round from 'Math'


function App() {

  const [loading, setLoading] = useState(true)
  const [DFC, setDFC] = useState([])
  const [ICH_CAHPS, setICH_CAHPS] = useState([])
  const [QIP, setQIP] = useState([])
  const dims = { 
    width: 500, height: 500,
    bottomAxisHeight: 15,
    innerRadius: 120,
    outerRadius: 220,
    padding: { top: 20, right: 20, bottom: 20, left: 20 }
  }
  const colors = [
    "#e0ac2b",
    "#e85252",
    "#6689c6",
    "#9a6fb0",
    "#a53253",
    "#69b3a2",
  ]

  // On Load
  useEffect(()=>{
    Promise.all([
      d3.csv('./data/DFC_FACILITY.csv'),
      d3.csv('./data/ICH_CAHPS_FACILITY.csv'),
      d3.csv('./data/COMPLETE_QIP_DATA.csv')
    ])
    .then(([ resDfc, resIchCahps, resQip ]) => {
      setDFC(resDfc)
      setICH_CAHPS(resIchCahps)
      setQIP(resQip)
      setLoading(false)
    })
  }, [])

  // Star Distribution

  const starCounts = {}
  ICH_CAHPS
    .filter(i=>i['ICH-CAHPS data availability code']=="001")
    .map(i => {
      const starRating = i['Star rating of the dialysis facility']
      starCounts[starRating] =  starCounts[starRating] ? starCounts[starRating] + 1 : 1
    })

  // Ownership Distributionrange;
  const ownershipCounts = {}
  ICH_CAHPS
    .map(i=>{
      const owner = i["Chain Organization"]
      switch (owner) {
        case "Fresenius Medical Care":
          ownershipCounts["Fresenius"] = ownershipCounts["Fresenius"] ? ownershipCounts["Fresenius"] + 1 : 1
          break
        case "DaVita":
          ownershipCounts["DaVita"] = ownershipCounts["DaVita"] ? ownershipCounts["DaVita"] + 1 : 1
          break
        case "Independent":
          ownershipCounts["Independent"] = ownershipCounts["Independent"] ? ownershipCounts["Independent"] + 1 : 1
          break
        default:
          ownershipCounts["Other"] = ownershipCounts["Other"] ? ownershipCounts["Other"] + 1 : 1
          break
      }
      
    })
  const ownershipData = Object.keys(ownershipCounts).map(key=>{
    return {owner:key, value: ownershipCounts[key]}
  })

  return (
    <div className="App flexCol">

      <div className={"cardContainer flexRow"}>
        {/* Count Facilities */}
        <Card value={DFC.length} label={'# Facilities'} />
        
        {/* Count Dialysis Stations */}
        <Card 
          value={
            DFC.reduce(
              (acc, curr)=>acc + parseInt(curr['# of Dialysis Stations']), 
              0
            )
          } 
          label={'# Dialysis Stations'} 
        />  

        {/* Count Star Rating Surveys */}
        <Card 
          value={ICH_CAHPS
            .filter(curr=>curr['ICH-CAHPS data availability code']=="001")
            .length} 
          label={'# Star Ratings'} 
        />

        {/* Average Star Rating */}
        <Card 
          value={Math.round(
            10*(ICH_CAHPS
              .filter(curr=>curr['ICH-CAHPS data availability code']=="001")
              .reduce(
                (acc, curr)=>acc + parseInt(curr['Star rating of the dialysis facility']), 
                0
              ) / ICH_CAHPS
              .filter(curr=>curr['ICH-CAHPS data availability code']=="001")
              .length
            ))/10} 
          label={'Avg Star Rating'} 
        />
      </div>

      {/* Facilities per Star Rating */}
      { !loading 
        ? <BarChart 
            data = {starCounts}
            label = { "Facilities per Star Rating" }
          /> 
        : <></>
      }

      {/* SCATTER PLOT: DFC # of Dialysis Stations vs QIP Total Performance Score */}

      {/* PIE PLOT: Ownership */}
      { !loading 
        ? <PieChart
          data = {ownershipData}
          label = { "Facility Ownership Distribution" }
          dims = { dims }
          colors = { colors }
        />
        : <></>
      }

    </div>
  );
}

export default App;
