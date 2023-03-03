let storeData=[];

//fetch data
const loadData=async()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    const res=await fetch(url);
    const data=await res.json();
    // console.log(data.data.tools);
    storeData=data.data.tools;
    displayUniverseData(data.data.tools);
}

//display Universe Data
const displayUniverseData=(data)=>{
    console.log(data);  
    
    //see only 6 data in page first
    data=data.slice(0,6);

    const container=document.getElementById('container');
    data.forEach(element => {
        
        container.innerHTML+=`
        
        <div class="col">
        <div class="card">
          <img src="${element.image}" class="card-img-top img-fluid card1" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
              <ol>
                 <li>${element.features[0]}</li>
                 <li> ${element.features[1]}</li>
                 <li>${element.features[2]}</li> 
              </ol>
          </div>
          <hr>
          <div class="d-flex mx-3 justify-content-between">
              <div>
                  <h4>${element.name}  </h4>
                  <p><i class="fa-regular fa-calendar-days me-3"></i>${element.published_in}</p>
              </div>
              <div>
                   <i class="fa-solid fa-right-long  "  data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="universeDetailsDataFetch('${element.id}')"></i>               
              </div>
          </div>
        </div>
      </div>
    
        `;
    });
     
    loading(false);


}

document.getElementById('showAll').addEventListener('click',function(){
    // console.log(storeData);
    loading(true);
    showAllData(storeData);

})

//showAll data
const showAllData=(data)=>{
    // console.log(data);
    const container=document.getElementById('container');
    container.innerText='';
    data.forEach(element => { 
        container.innerHTML+=`      
        <div class="col">
        <div class="card">
          <img src="${element.image}" class="card-img-top img-fluid card1" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
              <ol>
                 <li>${element.features[0]}</li>
                 <li> ${element.features[1]}</li>
                 <li>${element.features[2]}</li> 
              </ol>
          </div>
          <hr>
          <div class="d-flex mx-3 justify-content-between">
              <div>
                  <h4>${element.name}  </h4>
                  <p><i class="fa-regular fa-calendar-days me-3"></i>${element.published_in}</p>
              </div>
              <div>
              <i class="fa-solid fa-right-long" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="universeDetailsDataFetch('${element.id}')"></i>              
              </div>
          </div>
        </div>
      </div>
    
        `;
    });
    
    const showAllButton=document.getElementById('showAll-btn');
    showAllButton.classList.add('d-none');
  
    loading(false);

}


//loader
const loading= (isLoading)=>{
    const loaderSection=document.getElementById('spinner');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}



// fetch show details id
const universeDetailsDataFetch=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    // console.log(url);
    const res=await fetch(url);
    const data=await res.json();
    // console.log(data.data);
    displayDetails(data.data);
}

//show details
const displayDetails=(data)=>{
    console.log(data);
    const container=document.getElementById('modal-body');
    container.innerHTML=`
    <div class="mt-2 d-flex gap-5  ">
    <div class="card" style="width: 30rem;"  >
        <div class="card-body">
            <div>
                <div class="shadow-sm p-2 text-center">
                    <h5>${data.description} </h5>  
                </div>
                <div class="d-flex justify-content-between m-3 gap-3 shadow-sm">
                    <div style="color: green;" class="shadow-sm p-2 text-center">
                        <h5> ${data.pricing ? data.pricing[0].price : "Free of Cost"}  ${data.pricing ? data.pricing[0].plan : "Free of Cost" }</h5>
                    </div>
                    <div style="color: orange;" class="shadow-sm p-2 text-center">
                    <h5> ${data.pricing ? data.pricing[1].price : "Free of Cost"}  ${data.pricing ? data.pricing[1].plan : "Free of Cost" }</h5>
                    </div>
                    <div style="color: red;" class="shadow-sm p-2 text-center">
                    <h5> ${data.pricing ? data.pricing[2].price : "Free of Cost"}  ${data.pricing ? data.pricing[2].plan : "Free of Cost" }</h5>
                    </div>
                </div>
                <div  class="d-flex justify-content-between shadow-sm m-4 p-3">
                    <div>
                        <h4>Features</h4>
                       
                        <ol>
                        ${feature(data.features ? data.features :"Not found data!!")}
 
                        </ol>
                    </div>
                    <div>
                        <h4>Integrations</h4>
                        <ol>
                        ${integrations(data.integrations ? data.integrations : "Data not found!!")}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        </div>


    <div class="card " style="width: 30rem;">
        <div>
 
        <span class="badge text-bg-danger w-auto p-2  position-absolute m-3">${data.accuracy.score}% accuracy </span>
      

        <img src="${data.image_link[0]}" class="card-img-top" alt="...">
        </div>
        <div class="card-body p-2 text-center p-3">
            <h3 class="p-3">${data.input_output_examples? data.input_output_examples[0].input : "Data not found!!"}</h3> 

            <p> ${data.input_output_examples ? data.input_output_examples[0].output :  "Data not found!!" }</p>
        </div>
        </div>

    </div>  
    `;


}

//show all feature
const feature=(data)=>{
    console.log(data);
    let li='';
    let i=0;
     for(const list in data){
         i++;   
        li+=` <li>${data[i].feature_name}</li>`;       
     }
    return li;
}
//show all integrations
const integrations=(data)=>{
    console.log(data);
    const len=data.length;
    if(len!==0){
        let li='';
        data.forEach(element => {
           li+=` <li>${element} </li>`;     
        });
       return li;
    }
    else {
        return 'data not found';
    }
 
}


loadData()

 
 
 
 
 
 

 
















