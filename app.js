const pLayerInput= ()=>{
    const inputValue= document.getElementById('InputId');
    const inputText= inputValue.value;
    inputValue.value='';

   fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputText}`)
   .then(res => res.json())
   .then(data => getOutput(data.teams))

}
pLayerInput();
const getOutput = (data)=>{
    // console.log(data);
    const spinner= document.getElementById('spinnerId');
    spinner.style.display='none';
  const container = document.getElementById('container');
  container.textContent='';
  for(const value of data){
  //  console.log(value);
      const div = document.createElement('div');
      div.classList.add('row');
      div.innerHTML =`
      <div  onclick="showDetails(${value.idTeam})" class="col shadow-lg p-3 m-2">
      <div class="card">
        <img src="${value.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${value.strAlternate}</h5>
          <p class="card-text">${value.strDescriptionEN.slice(0, 200)}</p>
        </div>
      </div>
    </div>
      `
      container.appendChild(div)
  }
}

const showDetails= (teamId)=> {
  console.log(teamId);
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`
  fetch(url)
  .then(res => res.json())
  .then(data=> outPutDetails(data.teams[0]))

}

const outPutDetails = (team)=>{
  console.log(team);
  const detailsDiv = document.getElementById('details');
  detailsDiv.textContent= '';
  const divDetail = document.createElement('div');
  divDetail.classList.add('card');
  divDetail.innerHTML=`
  <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${team.strAlternate}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="${team.strFacebook}" class="btn btn-primary">Go somewhere</a>
        </div>
  `
detailsDiv.appendChild(divDetail)
}
