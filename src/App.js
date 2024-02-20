import './App.css'
import * as d3 from "d3"
import { useState, useEffect, useRef } from 'react'
import Card from './components/Card'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import LineChart from './components/PieChart'
import ScatterChart from './components/ScatterChart'
import TimeSeries from './components/TimeSeries'
// import round from 'Math'


function App() {

  const [loading, setLoading] = useState(true)
  const [DFC, setDFC] = useState([])
  const [ICH_CAHPS, setICH_CAHPS] = useState([])
  const [QIP, setQIP] = useState([])
  const DFCMap = useRef(new Map())

  const dims = { 
    width: 500, height: 500,
    bottomAxisHeight: 15,
    innerRadius: 120,
    outerRadius: 220,
    padding: { top: 30, right: 20, bottom: 30, left: 40 }
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
      resDfc.forEach((d,i)=>DFCMap.current.set(d['CMS Certification Number (CCN)'], i))
    })
  }, [])

  // FUNCTIONS //////////////////////////////////
  const simplifyOwnership= (owner)=>{    
    switch (owner) {
    case "Fresenius Medical Care":
      return "Fresenius"
    case "DaVita":
      return "DaVita"
    case "Independent":
      return "Independent"
    default:
      return "Other"
    }
  }


  //// DATA /////////////////////////////////////
  // Star Distribution
  const starCounts = {}
  ICH_CAHPS
    .filter(i=>i['ICH-CAHPS data availability code']=="001")
    .map(i => {
      const starRating = i['Star rating of the dialysis facility']
      starCounts[starRating] =  starCounts[starRating] ? starCounts[starRating] + 1 : 1
    })

  // Ownership Distribution
  const ownershipCounts = {}
  ICH_CAHPS
    .map(i=>{
      const owner = simplifyOwnership(i["Chain Organization"])
      ownershipCounts[owner] = ownershipCounts[owner] ? ownershipCounts[owner] + 1 : 1
      
    })
  const ownershipData = Object.keys(ownershipCounts).map(key=>{
    return {owner:key, value: ownershipCounts[key]}
  })

  // Survival x Mortality
  const survivalMortalityData = QIP.map( (q, i)=>{
    const qipCCN = q['CMS Certification Number (CCN)']
    const qipTPS = q['Total Performance Score']
    
    if ( !qipCCN || qipTPS == "No Score" || !qipTPS || 
      !DFCMap.current.get(qipCCN) || 
      !DFC[DFCMap.current.get(qipCCN)]['Mortality Rate (Facility)'] || 
      DFC[DFCMap.current.get(qipCCN)]['Mortality Rate (Facility)'] < 0 ) {
      return
    }
    const DFCClinic = DFC[DFCMap.current.get(qipCCN)]
    // console.log(DFCClinic)
    return {
      totalPerformanceScore: parseInt(qipTPS), 
      mortalityRate: parseInt(DFCClinic['Mortality Rate (Facility)']),
      chainOrganization: simplifyOwnership(DFCClinic['Chain Organization'])
    }
  }).filter(q=>q)

  // Certification Time Series data
  const customTimeParser  = d3.timeParse("%d%b%Y")
  const sortByDate = ( a,b, debug=false ) => {
    const aDate = new Date(a).getTime()
    const bDate = new Date(b).getTime()
    if (debug) {
      console.log("a:", aDate)
      console.log("b:", bDate)
      console.log("compare:", aDate < bDate ? -1 : aDate > bDate ? 1 : 0)
    }
    return aDate < bDate ? -1 : aDate > bDate ? 1 : 0
  }

  console.log(DFC)
  
  // Sort data by date
  const certificationSum = {}
  DFC.sort((a,b) => sortByDate(
      customTimeParser(a['Certification Date']),
      customTimeParser(b['Certification Date']),

  // Accumulate cumulative sum
  )).forEach((value, index)=>{
    const cDate = customTimeParser(value['Certification Date'])
    certificationSum[cDate] = index + 1
  })
  
  const certificationData = Object.keys(certificationSum).map(key=>{
    return {date:key, value: certificationSum[key]}
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

      {/* Certifications over Time */}
      { !loading
        ? <TimeSeries 
            data = {certificationData}
            label = { "Certifications over Time" }
            dims = { dims }
          />
        : <></>
      }

      {/* Facilities per Star Rating */}
      { !loading 
        ? <BarChart 
            data = {starCounts}
            label = { "Facilities per Star Rating" }
            dims = { dims }
          /> 
        : <></>
      }

      {/* SCATTER PLOT: DFC Mortality Rate (Facility) vs QIP Total Performance Score */}
      { !loading 
        ? <ScatterChart 
          data = {survivalMortalityData}
          label = { "Total Performance x Mortality Rate" }
          dims = { dims }
          colors = { colors }
        /> 
        : <></>
      }

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
