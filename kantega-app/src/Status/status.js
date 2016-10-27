import React from 'react';

var response = "";

var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "https://www.vegvesen.no/nvdb/api/v2/status", false);
  xhttp.send();
  


const Status = () => {
    return <div id="about">
        <p>Denne siden bruker data hentet fra vegvesenet sitt API.</p>
        <div id="apiStatus">
			<div>Dette ble sist oppdatert:  {response.datagrunnlag.sist_oppdatert}</div>
        </div>
    </div>
}

export default Status