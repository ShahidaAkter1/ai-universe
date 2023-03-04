//global scope array for storing all data
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
    console.log("from universe :: ",data);  
    // storeData=data;
    //  const {data,...rest}=data;
    //see only 6 data in page first
    data=data.slice(0,6);
    const container=document.getElementById('container');
    container.innerText='';
    data.forEach(element => { 
        // console.log(element.features);
        container.innerHTML+=`
        <div class="col">
        <div class="card">
          <img src="${element.image ? element.image :"No image found!!"}" class="card-img-top img-fluid card1" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
              <ol id="ol">
              ${featureUniverse(element.features ? element.features : "No data found!!")}
              </ol>
          </div>
          <hr>
          <div class="d-flex mx-3 justify-content-between">
              <div>
                  <h4>${element.name ? element.name : "no data found!!" }  </h4>
                  <p id="date"><i class="fa-regular fa-calendar-days me-3"></i>${element.published_in ? element.published_in : "No published data found"}</p>
              </div>
              <div class="mt-4 text-primary">
                   <i class="fa-solid fa-right-long"  data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="universeDetailsDataFetch('${element.id}')"></i>               
              </div>
          </div>
        </div>
      </div>
    
        `;
    });
     
    loading(false);


}

const featureUniverse=(data)=>{
    // console.log("feature uni :: ",data);
    let li='';
    for(let i=0;i<data.length;i++){
        // console.log(data[i]);
        li+=`<li>${data[i]}</li>`; 
    }
    return li;
}


//showAll data
const showAllData=(data)=>{
    // console.log(data);
    const container=document.getElementById('container');
    container.innerText='';
    data.forEach(element => { 
        container.innerHTML+=`      
        <div class="col">
        <div class="card">
          <img src="${element.image ? element.image : "No image found!!"}" class="card-img-top img-fluid card1" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
              <ol>
              ${featureUniverse(element.features ? element.features : "No data found!!")}
              </ol>
          </div>
          <hr>
          <div class="d-flex mx-3 justify-content-between">
              <div>
                  <h4>${element.name ? element.name : "no data found!!" }  </h4>
                  <p><i class="fa-regular fa-calendar-days me-3"></i>${element.published_in ? element.published_in : "No published data found"}</p>
              </div>
              <div class="mt-4 text-primary">
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
    // console.log(data.accuracy.score);
    const container=document.getElementById('modal-body');
    container.innerHTML=`
    <div class="mt-2 d-flex gap-5  ">
    <div class="card"  style="max-width: 30rem;">
        <div class="card-body">
            <div>
                <div class="shadow-sm p-2 text-center">
                    <h5>${data.description ? data.description : "No data found" } </h5>  
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
                        ${feature(data.features ? data.features :"No data found!!")}
                        </ol>
                    </div>
                    <div>
                        <h4>Integrations</h4>
                        <ol>
                        ${integrations(data.integrations ? data.integrations : "No data found!!!!")}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        </div>

    <div class="card " style="width: 30rem;">
        <div>
        ${accuracyShow(data)}
        <img src="${data.image_link[0] ? data.image_link[0] : "No image found!!" }" class="card-img-top" alt="...">
        </div>
        <div class="card-body p-2 text-center p-3">
            <h3 class="p-3">${data.input_output_examples[0]? data.input_output_examples[0].input : "No data found!!"}</h3> 

            <p> ${data.input_output_examples[0] ? data.input_output_examples[0].output :  "No data found!!" }</p>
        </div>
        </div>

    </div>  
    `;
}

//accuracy show or not...badge
const accuracyShow=(data)=>{
    // console.log(data);
    const convertPercentage=data.accuracy.score*100;
    // console.log(convertPercentage);
    let span='';
    if(data.accuracy.score !==null){
        span=`
        <p  id="accuracyContainer" class="badge text-bg-danger w-auto p-2  position-absolute m-3">
        <span id="spanTagAccuracy"> ${convertPercentage}</span> % accuracy
      </p>
        `;
        return span;
    }
    else{
        span=`
        <p  id="accuracyContainer" class="badge d-none text-bg-danger w-auto p-2  position-absolute m-3">
        <span id="spanTagAccuracy"> </span> % accuracy
      </p>
        `;
        return span;
    }
}


//show all feature
const feature=(data)=>{
    // console.log(data);
    let li='';
    let i=0;
     for(const list in data){
         i++;   
        li+=`<li>${data[i].feature_name}</li>`;       
     }
    return li;
}

//show all integrations
const integrations=(data)=>{
    // console.log(data);
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


//sort the date
const sorting=(a,b)=>{
    const dateA=new Date(a.published_in);
    const dateB=new Date(b.published_in);
    if(dateA>dateB){
        return 1;
    }
    else if(dateA<dateB){ 
        return -1;
    }
    else{
        return 0;
    }
};


//show all button event handler 
document.getElementById('showAll').addEventListener('click',function(){
    // console.log(storeData);
    loading(true);
    showAllData(storeData);
})

//sort button event handler
document.getElementById('sort').addEventListener('click',function(){
    // console.log(storeData);
    const sortByDate=storeData.sort(sorting);
    // console.log(sortByDate);
    displayUniverseData(sortByDate);
    // console.log(storeData.sort(sorting));
 
})



loadData();


 
 
 
 
 
 
      
  