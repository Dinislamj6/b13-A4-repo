let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

let total = document.getElementById("Total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");

const mainContainer = document.querySelector("main");
const allCardSection = document.getElementById("allCardSection");

const btnAll = document.getElementById("btn-all");
const btnInterview = document.getElementById("btn-interview");
const btnRejected = document.getElementById("btn-rejected");
const filterSection = document.getElementById("filtered-section");
const rejectedSection = document.getElementById("rejected-section");
const totalJobCount = document.getElementById("total-job-count");
const hiddenCard = document.getElementById("hidden-card");


function calCuletCount() {
  total.innerText = allCardSection.children.length;
  console.log(totalJobCount, allCardSection.children.length);
  totalJobCount.innerText = allCardSection.children.length;

  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calCuletCount();

function toggleStyle(id) {
  //    btn filtering ////
  btnAll.classList.remove("bg-primary", "text-white");
  btnInterview.classList.remove("bg-primary", "text-white");
  btnRejected.classList.remove("bg-primary", "text-white");
  hiddenCard.classList.remove("hidden");

  btnAll.classList.add("bg-gray-300", "text-black");
  btnInterview.classList.add("bg-gray-300", "text-black");
  btnRejected.classList.add("bg-gray-300", "text-black");
  const selected = document.getElementById(id);
  selected.classList.remove("bg-gray-300", "text-black");
  selected.classList.add("bg-primary", "text-white");

  currentStatus = id;

  if (id == "btn-interview") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    rejectedSection.classList.add("hidden");
  } else if (id == "btn-all") {
    allCardSection.classList.remove("hidden");
    rejectedSection.classList.add("hidden");
    filterSection.classList.add("hidden");
  } else if (id == "btn-rejected") {
    allCardSection.classList.add("hidden");
    filterSection.classList.add("hidden");
    rejectedSection.classList.remove("hidden");
  }
}

mainContainer.addEventListener("click", function (event) {
  
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;

  

    
    const jobName = parentNode.querySelector(".jobName").innerText;
    const jobtitle = parentNode.querySelector(".jobtitle").innerText;
    const jobsalary = parentNode.querySelector(".jobsalary").innerText;
    const status = parentNode.querySelector(".status-btn").innerText;
    const jobdetails = parentNode.querySelector(".job-details").innerText;
    parentNode.querySelector(".status-btn").innerText = "Interview";

    const cardInfo = {
      jobName,
      jobtitle,
      jobsalary,
      status: "interview",
      jobdetails,
    };
    
    const jobExist = interviewList.find(
      (item) => item.jobName == cardInfo.jobName,
    );
   
    if (!jobExist) {
      interviewList.push(cardInfo);
     
    }
    

    renderInterview(interviewList);

    calCuletCount();
  }

  // // step 2 rejected for
  else if (event.target.classList.contains("btn-error")) {
 
    const parentNode = event.target.parentNode.parentNode;
    

    const jobName = parentNode.querySelector(".jobName").innerText;
    const jobtitle = parentNode.querySelector(".jobtitle").innerText;
    const jobsalary = parentNode.querySelector(".jobsalary").innerText;
    const status = parentNode.querySelector(".status-btn").innerText;
    const jobdetails = parentNode.querySelector(".job-details").innerText;
    parentNode.querySelector(".status-btn").innerText = "Rejected";

    const cardInfo = {
      jobName,
      jobtitle,
      jobsalary,
      status: "rejected",
      jobdetails,
    };

    const jobExist = rejectedList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      rejectedList.push(cardInfo);
    }
    interviewList = interviewList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );
    calCuletCount();
    renderRejected(rejectedList);
    renderInterview(interviewList);
  }

  

  /// delete btn////
  else if (event.target.classList.contains("btn-delete")) {
    console.log("inside");

    const card = event.target.closest(".card");
    if (card) {
      card.remove();
      calCuletCount();
    }
  }
});



function renderInterview(interviewLists) {
  if (interviewLists.length == 0) {
    filterSection.innerHTML = `
              <div id="hidden-card" class="card  w-full bg-base-100 card-lg shadow-sm items-center justify-center p-5">
                <div class="card-body">
                     <div class="flex justify-center">
                        <img src="./jobs.png" alt="" width="45px">
                     </div>
                    <h2 class="text-center">No jobs available</h2>
                    <p>Check back soon for new job opportunities</p>
                </div>

            </div>
        `;
    return;
  }
  filterSection.innerHTML = "";
  console.log(interviewLists);
  for (let interview of interviewLists) {
    console.log(interview);
    let div = document.createElement("div");
    div.className = "card w-full bg-base-100 card-lg shadow-sm";
    div.innerHTML = `
     <div class="card-body">
                <div class="flex justify-between ">
                    <div class="font-bold">
                        <h2 class="jobName">${interview.jobName}</h2>
                    </div>
                    <div>
                        <button class="btn btn-circle">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="jobtitle">${interview.jobtitle}</p>
                <p class="jobsalary">${interview.jobsalary}</p>
                <div>
                    <button class="status-btn btn btn-xs btn-primary btn-soft text-white">${interview.status}</button>
                </div>
                <p class="job-details text-sm text-gray-600">${interview.jobdetails}</p>
                <div>
                    <button class="btn btn-xs btn-outline btn-success">Interview</button>
                    <button class="btn btn-xs btn-outline btn-error">Rejected</button>
                </div>
            </div>

    `;
    filterSection.appendChild(div);
  }
}

// render rejected
function renderRejected(rejectedLists) {
  rejectedSection.innerHTML = "";

  for (let rejected of rejectedLists) {
  
    let div = document.createElement("div");
    div.className = "card w-full bg-base-100 card-lg shadow-sm";
    div.innerHTML = `
     <div class="card-body">
                <div class="flex justify-between ">
                    <div class="font-bold">
                        <h2 class="jobName">${rejected.jobName}</h2>
                    </div>
                    <div>
                        <button class="btn btn-circle">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="jobtitle">${rejected.jobtitle}</p>
                <p class="jobsalary">${rejected.jobsalary}</p>
                <div>
                    <button class="status-btn btn btn-xs btn-primary btn-soft text-white">${rejected.status}</button>
                </div>
                <p class="job-details text-sm text-gray-600">${rejected.jobdetails}</p>
                <div>
                    <button class="btn btn-xs btn-outline btn-success">Interview</button>
                    <button class="btn btn-xs btn-outline btn-error">Rejected</button>
                </div>
            </div>

    `;
    rejectedSection.appendChild(div);
  }
}

