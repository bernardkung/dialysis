import './App.css'
import * as d3 from "d3"
import { useState, useEffect } from 'react'
import Card from './components/Card'
import Barplot from './components/Barplot'
// import round from 'Math'


function App() {

  const [loading, setLoading] = useState(true)
  const [DFC, setDFC] = useState([])
  const [ICH_CAHPS, setICH_CAHPS] = useState([])


  // On Load
  useEffect(()=>{
    Promise.all([
      d3.csv('./data/DFC_FACILITY.csv'),
      d3.csv('./data/ICH_CAHPS_FACILITY.csv')
    ])
    .then(([ resDfc, resIchCahps ]) => {
      setDFC(resDfc)
      setICH_CAHPS(resIchCahps)
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
        ? <Barplot 
            data = {starCounts}
            label = { "Facilities per Star Rating" }
          /> 
        : <></>
      }
    </div>
  );
}

export default App;
