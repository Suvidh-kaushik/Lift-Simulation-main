// // // document.addEventListener("click",moveForward)

// // var nofFloors=3,nofLifts=3;
// // //hardcoding for now will make it dynamic later 

// // function moveForward(e){
// //     e.preventDefault();
// //      nofFloors=document.getElementById("floor").value;
// //      nofLifts=document.getElementById("lifts").value;
// //      console.log(nofFloors+" "+nofLifts)
// // }

// // var liftCurrPostn=[];

// // for(var i=0;i<nofLifts;i++){
// //     liftCurrPostn[i]=1;
// // }

// // var state={
// //     noOFfloors:nofFloors,
// //     noOFlifts:nofLifts,
// //     lift_curr_state:liftCurrPostn
// // }

// // function createFloor(floorNumber){
    
// // }





// const floorHeight = 100; 
// const blockWidth=50;
// var state={};  //using for data store to store the current state of the application 
// var liftState=[];
// var floorhaslift=[];



// function getparams(){
//     const params=new URLSearchParams(window.location.search);
//     return{
//         totalFloors:params.get("floors"),
//         noOFlifts:params.get("lifts")
//     }
// }

// const {totalFloors,noOFlifts}=getparams();

// const building = document.querySelector('.building');
// const lifts = document.querySelector('.lifts');
// const floorsContainer = document.querySelector('.floors');
// var nofclicks=-1;

// const buildingHeight = totalFloors * floorHeight;
// var buildingWidth=window.getComputedStyle(building).width
// console.log(buildingWidth)
// building.style.height = `${buildingHeight}px`;

// state={
//     noOFfloors:totalFloors,
//     noOFlifts:noOFlifts,
//     liftState
// }



// // Get DOM elements

// for(var i=0;i<noOFlifts;i++){
//     liftState[i]=0;
// }

// // for(var i=0;i<totalFloors;i++){
// //     floorhaslift[i]=0;
// // }







// // Generate buttons for each floor
// // for (let i = totalFloors - 1; i >= 0; i--) {
// //     const button = document.createElement('button');
// //     button.textContent = i === 0 ? 'Ground Floor' : `Floor ${i}`;
// //     button.onclick = () => moveToFloor(i);
// //     controls.appendChild(button);
// // }



// // for (var i = 0; i < 7; i++) {
// //     const floor = document.createElement("div");
// //     floor.className = "floor";
// //     var floorTop = (6 - i) * floorHeight;
// //     floor.style.height = `${floorHeight}px`; // Each floor should have the same height
// //     floor.style.top = `${floorTop}px`;
// //     floor.style.backgroundColor="black";
// //     floor.textContent = `Floor ${i + 1}`; // Optional: add floor number
// //     document.getElementsByClassName("floors").appendChild(floor);
// //  }

// // for (var i = 0; i < 7; i++) {
// //     const floor = document.createElement("div");
// //     floor.className = "floor";
// //     var floorTop = (6 - i) * floorHeight;
// //     floor.style.height = `${floorHeight}px`; // Each floor should have the same height
// //     floor.style.top = `${floorTop}px`;
// //     floor.style.backgroundColor = "black";
// //     floor.textContent = `Floor ${i + 1}`; // Optional: add floor number
    
// //     // Select the first element with the class 'floors'
// //     document.querySelector(".floors").appendChild(floor);
// // }




// function generateFloors(){
//     // Create and append floors
// for (let i = 0; i < totalFloors; i++) {
//     const floor = document.createElement("div");
//     floor.className = "floor";
//     const floorTop = i * floorHeight;
//     floor.style.bottom = `${floorTop}px`;
//     floor.style.height = `${floorHeight}px`;
//     floor.style.width=buildingWidth;
//     floor.style.width=`screen`
//      // Label the floors (Floor 4, Floor 3, etc.)
//     // const button=document.createElement("button");
//     // button.click=moveToFloor(i);
//     // floor.addEventListener("click",()=>{
//     //    nofclicks=(nofclicks+1)%noOFlifts
//     //    console.log(nofclicks);
//     //     moveToFloor(i,nofclicks)
//     // })

//     const data=document.createElement("div");
//     data.textContent=`${i+1}`
//     data.style.color="white"
//     data.style.position="absolute"
//     data.style.right=`15px`
//     const button=document.createElement("button");
//     button.addEventListener("click",()=>{
//         nofclicks=(nofclicks+1)%noOFlifts
//     //    console.log(nofclicks);
//     console.log(liftState[nofclicks] + "----" + i);
//     var liftMoveTime=Math.abs(liftState[nofclicks]-i)*2;
//        liftState[nofclicks]=i;
//         moveToFloor(i,nofclicks,liftMoveTime)
//     })
//     button.innerHTML=`<img height="80px" width="60px"  alt="UP"/>`
//     floor.appendChild(button)
//     floor.appendChild(data)
//     //floor.appendChild(button);
//     floorsContainer.appendChild(floor);
// }

// }


// function generateLifts(){
// for(var i=0;i<noOFlifts;i++){
//     const lift=document.createElement("div");
//     lift.className="lift"
//     lift.id=`lift-${i}`
//     lift.style.left=`${(i+1)*65}px`
//     liftState[i]=0;
//     lifts.appendChild(lift);
// }
// }






// // Function to move the block
// function moveToFloor(floor,liftId,liftMoveTime) {
//     const newPosition = floor * floorHeight;
//     const lift=document.getElementById(`lift-${liftId}`)
//     lift.style.transition=`${liftMoveTime}s`
//     lift.style.bottom = `${newPosition}px`;
//     // console.log(liftState)
//     // lift.textContent=`${floor}`;
//     lift.style.color="black"
// }

//  document.addEventListener("DOMContentLoaded",()=>{
//      generateFloors();
//      generateLifts();
// })



const floorHeight = 100; 
const blockWidth = 40;
var state = {};  // Using for data store to store the current state of the application 
var liftState = [];
var floorHasLift = [];

function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        totalFloors: parseInt(params.get("floors"), 10),
        noOfLifts: parseInt(params.get("lifts"), 10)
    };
}

const { totalFloors, noOfLifts } = getParams();
const building = document.querySelector('.building');
const lifts = document.querySelector('.lifts');
const floorsContainer = document.querySelector('.floors');
document.getElementById("data1").innerText=`LIFTS:${noOfLifts}`
document.getElementById("data2").innerText=`FLOORS:${totalFloors}`
var buildingWidth = blockWidth*(noOfLifts*2.75);
building.style.height = `${totalFloors * floorHeight}px`;
var nofclicks=-1;
var liftsInAfloor=[]
state = {
    noOfFloors: totalFloors,
    noOfLifts: noOfLifts,
    liftState,
    liftsInAfloor
};

// Initialize lift state
for (var i = 0; i < noOfLifts; i++) {
    liftState[i] = [];
}

for(var i=0;i<totalFloors;i++){
    liftsInAfloor[i]=[];
}

// Generate floors dynamically
function generateFloors() {
    for (let i = 0; i < totalFloors; i++) {
        const floor = document.createElement("div");
        floor.className = "floor";
        const floorTop = i * floorHeight;
        floor.style.bottom = `${floorTop}px`;
        floor.style.height = `${floorHeight}px`;
        floor.style.width = `${buildingWidth}px`;
        
        const data = document.createElement("div");
        data.textContent = `Floor ${i + 1}`;
        data.style.color = "white";
        data.style.padding="10px"
        data.style.margin="12px"
        data.style.border=`2px solid white`
        
        const button = document.createElement("button");
        if(i==0){
            button.innerHTML = `<img height="80px" width="57px" src="https://www.svgrepo.com/show/155993/triangular-up-arrow.svg" alt="UP"/>`;
        }
        else if(i==totalFloors-1){
        button.innerHTML = `<img height="80px" width="57px" src="https://www.svgrepo.com/show/80156/down-arrow.svg" alt="UP"/>`;
        }
        else{
            button.innerHTML = `<img height="80px" width="57px" src="https://www.svgrepo.com/download/119597/up-and-down-arrows.svg" alt="UP"/>`;

        }
        button.addEventListener("click", () => {
            const liftIndex = (nofclicks = (nofclicks + 1) % noOfLifts);
            const liftMoveTime = Math.abs(liftState[liftIndex] - i) * 2;
            liftState[liftIndex] = i;
            if(liftsInAfloor[i].length<2){
            liftsInAfloor[i].push(liftIndex);
            }
                  
            if(liftsInAfloor[i].length<2){
               moveToFloor(i, liftIndex, liftMoveTime);
            }
            else{
                for (let j = 0; j < liftsInAfloor[i].length; j++) {
                    const liftToOpen = liftsInAfloor[i][j];
                    setTimeout(() => {
                        openDoors(liftToOpen);
                        setTimeout(() => {
                            closeDoors(liftToOpen);
                        }, 2500); 
                    }, 2 * 1000);
                }
            }
        });
        
        floor.appendChild(button);
        floor.appendChild(data);
        floorsContainer.appendChild(floor);
    }
}





function generateLifts() {
    for (var i = 0; i < noOfLifts; i++) {
        const lift = document.createElement("div");
        lift.className = "lift";
        lift.id = `lift-${i}`;
        lift.style.left = `${(i + 1) * 105}px`;

        const leftDoor = document.createElement("div");
        leftDoor.className = "left-door";
        leftDoor.style.left = '0'; // Set initial position

        const rightDoor = document.createElement("div");
        rightDoor.className = "right-door";
        rightDoor.style.right = '0'; // Set initial position

        lift.appendChild(leftDoor);
        lift.appendChild(rightDoor);

        lifts.appendChild(lift);
    }
}











// // Move lift to the desired floor
// async function moveToFloor(floor, liftId, liftMoveTime) {
//     const newPosition = floor * floorHeight;
//     const lift = document.getElementById(`lift-${liftId}`);
//     lift.style.transition = `bottom ${liftMoveTime}s ease-in-out`;
//     lift.style.bottom = `${newPosition}px`;
// }


document.addEventListener("DOMContentLoaded", async() => {
   await generateFloors();
   await generateLifts();
});




// function openDoors(liftId) {
//     liftId=parseInt(liftId)
//     const lift = document.getElementById(`lift-${liftId}`);
//     console.log(lift);
//     const leftDoor = lift.querySelector('.left-door');
//     const rightDoor = lift.querySelector('.right-door');
    
//     leftDoor.style.left = '-50%';
//     rightDoor.style.right = '-50%';
// }

// function closeDoors(liftId) {
//     const lift = document.getElementById(`lift-${liftId}`);
   
//     const leftDoor = lift.querySelector('.left-door');
//     const rightDoor = lift.querySelector('.right-door');
    
//     leftDoor.style.left = '0';
//     rightDoor.style.right = '0';
// }






function moveToFloor(floor, liftId, liftMoveTime) {
    const newPosition = floor * floorHeight;
    const lift = document.getElementById(`lift-${liftId}`);
    lift.style.transition = `bottom ${liftMoveTime}s ease-in-out`;
    lift.style.bottom = `${newPosition}px`;
    // closeDoors(liftId);
    setTimeout(() => {
        openDoors(liftId);
        setTimeout(() => {
            closeDoors(liftId);
        }, 2500); 
    }, liftMoveTime * 1000);
}


function openDoors(liftId) {
    const lift = document.getElementById(`lift-${liftId}`);

    const leftDoor = lift.querySelector('.left-door');
    const rightDoor = lift.querySelector('.right-door');
        leftDoor.style.transform=`translateX(-100%)`;
        rightDoor.style.transform = 'translateX(100%)';
}

function closeDoors(liftId) {
     const lift = document.getElementById(`lift-${liftId}`);
    const leftDoor = lift.querySelector('.left-door');
    const rightDoor = lift.querySelector('.right-door');
    leftDoor.style.transform=`translateX(0)`;
    rightDoor.style.transform = 'translateX(0)';
}


// function doorautoOpener() {
//     setInterval(() => {
        
//         for (let i = 0; i < noOfLifts; i++) {
//             openDoors(i);
//         }

        
//         setTimeout(() => {
//             for (let i = 0; i < noOfLifts; i++) {
//                 closeDoors(i);
//             }
//         }, 2500);
//     }, 5000); 
// }
