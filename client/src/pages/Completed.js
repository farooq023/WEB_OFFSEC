import {connect} from 'react-redux'
import React, {useEffect} from 'react';
import { results } from '../actions/results.js';
// import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import generatePDF from "../pdfReporting/webscan/PdfReport.js";


// function refreshPage() {
//     window.location.reload(false);
// }


const Completed = ({resultsData,results, isResults}) => {
  // const onSubmit=async ()=>{
  //   await results();
    
  // }
  useEffect(()=>{
    getResults();
  })

  const getResults = async ()=>{
    await results();
    // if(isResults){
    //   return <Redirect to='/completed'/>
    // }
  }
  
  
  return (
    <div>
      <h1 style={{textAlign: 'center'}}> <b>Scan Results</b></h1>
      <br/>
      {/* <h4 style={{textAlign: 'center'}}>Your Ongoing Assessments</h4> */}
      <br/>
      <br/>
      <br/>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Vulnerability</th>
              <th scope="col">Severity</th>
              <th scope="col">Url</th>
            </tr>
          </thead>
          <tbody>
            {isResults ? 
              resultsData.map((obj)=>(<tr>
                <td>{obj.Vulnerability}</td>
                <td>{obj.Severity}</td>
                <td>{obj.URL}</td>
                </tr>)) : <td></td>
              }
          </tbody>
          
          </table></div>
          <button
              className="btn btn-primary"
              onClick={() => generatePDF(resultsData)}
            >
              Get report
            </button>
      
  
    </div>
  );
}



const mapStateToProps=(state)=>({
    resultsData:state.results.results, 
    isResults: state.results.isResults


})

Completed.propTypes = {
    resultsData: PropTypes.array.isRequired,
    results: PropTypes.func.isRequired,
  isResults: PropTypes.bool.isRequired

};

connect(mapStateToProps, {results})(Completed);