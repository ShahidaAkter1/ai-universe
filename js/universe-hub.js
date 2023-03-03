
const loadData =() =>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayHubs(data.data.tools))
};


const displayHubs = hubs =>{
    // console.log(hubs.data.tools);

    const aiContainer = document.getElementById('ai-container');
    aiContainer.textContent='';
    //display 6 card only
    const showAll=document.getElementById('show-all');
    if(hubs.length >6){
        hubs=hubs.slice(0,6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    hubs.forEach(hub => {
        console.log(hub);
        const aiDiv= document.createElement('div');
        const {image,name,published_in,features}=hub;
        aiDiv.classList.add('col');
        aiDiv.innerHTML=`
        <div class="card">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <ol>
          <li>${features[0]}</li>
          <li>${features[1]}</li>
          <li>${features[2]}</li> 
       </ol>
        </div>
        <hr>
        <div class="d-flex mx-3 justify-content-between">
            <div>
                <h4>${name}</h4>
               
                <p><i class="fa-regular fa-calendar-days me-3"></i>${published_in}</p>
            </div>
            <div>
                <i class="fa-solid fa-right-long" data-bs-toggle="modal" data-bs-target="#exampleModal" ></i> 
              
            </div>
        </div>
      </div>
        `;
        aiContainer.appendChild(aiDiv);
    });

}

loadData();

