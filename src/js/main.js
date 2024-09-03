
const floorHeight = 100; 
const blockWidth = 40;
let state = {};  
let liftState = []; //gives the current state of the lift i.e moving or stationary and the floor it is on for every lift
// let floorHasLift = []; 

function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        totalFloors: parseInt(params.get("floors"), 10),
        noOfLifts: parseInt(params.get("lifts"), 10)
    };
}

function max(a,b){
   if(a>b){
    return a;
   }
   else{
    return b;
   }
}

const { totalFloors, noOfLifts } = getParams();
const building = document.querySelector('.building');
const lifts = document.querySelector('.lifts');
const floorsContainer = document.querySelector('.floors');
document.getElementById("data1").innerText=`LIFTS:${noOfLifts}`
document.getElementById("data2").innerText=`FLOORS:${totalFloors}`
let buildingWidth = max(blockWidth*(noOfLifts*4),1100);
building.style.height = `${totalFloors * floorHeight}px`;
let nofclicks=-1;
let liftsInAfloor=[] //keeps track of the lift id which is currenlty on the floor
let floorswaitingForLifts=[]; //queue creating using array using push for adding at the back so that front remains at the front and shift for removing the elements from the start FIFO 
//floorswaitingForLifts keeps track of the floors which requested for lift or floors which have button pressed

for (let i = 0; i < noOfLifts; i++) {
    liftState[i] = {
        condition:'S',
        floor:0
    };
}

for(let i=0;i<totalFloors;i++){
    liftsInAfloor[i]=[];
}




function generateFloors() {
    for (let i = 0; i < totalFloors; i++) {
        const floor = document.createElement("div");
        floor.className = "floor";
        const floorTop = i * floorHeight;
        floor.style.bottom = `${floorTop}px`;
        floor.style.height = `${floorHeight}px`;
        floor.style.width = `${buildingWidth}px`;
        floor.style.minWidth = `300px`;
        floor.id=`Floor-${i}`

        const data = document.createElement("div");
        data.textContent = `Floor ${i}`;
        data.style.color = "white";
        data.style.padding = "10px";
        data.style.margin = "12px";
        data.style.border = `2px solid white`;

        const ButtonsDiv = document.createElement("div");
        ButtonsDiv.className = "ButtonsDiv";

        const upButton = document.createElement("button");
        upButton.innerText = "UP";
        upButton.style.width = "60px";

        const downButton = document.createElement("button");
        downButton.innerText = "DOWN";
        downButton.style.width = "60px";
        
        if (i === 0) {
            ButtonsDiv.appendChild(upButton);
            ButtonsDiv.style.justifyContent = "center";
        } else if (i === totalFloors - 1) {
            ButtonsDiv.appendChild(downButton);
            ButtonsDiv.style.justifyContent = "center";
        } else {
            ButtonsDiv.appendChild(upButton);
            ButtonsDiv.appendChild(downButton);
        }
        upButton.addEventListener("click", () => {
            filterFORlifts(i,"up")
        });
        
        downButton.addEventListener("click", () => {
             filterFORlifts(i,"down")
        });
        
        floor.appendChild(ButtonsDiv);
        floor.appendChild(data);
        floorsContainer.appendChild(floor);
    }
}


function filterFORlifts(floor,direction){
    if(floorswaitingForLifts.includes({floor:floor,direction:direction})===false){
        floorswaitingForLifts.unshift({floor:floor,direction:direction});
        processQueue();
    }
}


function processQueue(){
    if(floorswaitingForLifts.length===0){
        return;
    }
    let shiftedfloor=floorswaitingForLifts.shift();
    let floorId=shiftedfloor.floor
    let direction=shiftedfloor.direction
    callNearestLift(floorId,direction)
}



async function callNearestLift(floorId,direction){
        const targetFloor=floorId;
       
     for(let liftIndex of liftsInAfloor[targetFloor]){
        if (liftState[liftIndex].direction === direction) {
            if(liftState[liftIndex].condition==="S"){
             await openDoors(liftIndex)
             setTimeout(async()=>{
                 await closeDoors(liftIndex)
             },2000)
            }
             return;
         }
     }

        let nearestLiftIndex=-1;
        let minDistance=totalFloors;
        for(let i=0;i<noOfLifts;i++){
            let liftFloor=liftState[i].floor;
            let diff=Math.abs(liftFloor-targetFloor);
            if(minDistance>diff && liftState[i].condition==='S' && !liftsInAfloor[targetFloor].includes(i)){
                minDistance=diff
                nearestLiftIndex=i;
            }
        }

        if(nearestLiftIndex!==-1){
            const currentLiftFloor = liftState[nearestLiftIndex].floor;
                        const liftMoveTime = (minDistance)*2;
                        if (liftsInAfloor[currentLiftFloor].length > 0) {
                            liftsInAfloor[currentLiftFloor] = liftsInAfloor[currentLiftFloor].filter(lift => lift !== nearestLiftIndex);
                        }
            
                        liftState[nearestLiftIndex].floor = targetFloor;
                        liftState[nearestLiftIndex].condition = 'M'; // 'M' stands for 'Moving'
                        liftState[nearestLiftIndex].direction=direction
                        liftsInAfloor[targetFloor].push(nearestLiftIndex);
                         moveToFloor(targetFloor, nearestLiftIndex, liftMoveTime);
        }
        else{
            floorswaitingForLifts.push({floor:targetFloor,direction:direction})
        }
}




function generateLifts() {
    for (let i = 0; i < noOfLifts; i++) {
        const lift = document.createElement("div");
        lift.className = "lift";
        lift.id = `lift-${i}`;
        lift.style.left = `${(i + 1) * 105}px`;

        const leftDoor = document.createElement("div");
        leftDoor.className = "left-door";
        leftDoor.style.left = '0';

        const rightDoor = document.createElement("div");
        rightDoor.className = "right-door";
        rightDoor.style.right = '0'; 

        lift.appendChild(leftDoor);
        lift.appendChild(rightDoor);

        lifts.appendChild(lift);
    }
}





document.addEventListener("DOMContentLoaded", () => {
    generateFloors();
    generateLifts();
});






  function moveToFloor(floor, liftId, liftMoveTime) {
    const newPosition = floor * floorHeight;
    const lift = document.getElementById(`lift-${liftId}`);
    lift.style.transition = `transform ${liftMoveTime}s ease-in-out`;
    lift.style.transform = `translateY(-${newPosition}px)`;
     setTimeout(async() => {
      await openDoors(liftId);
        setTimeout( () => {
            closeDoors(liftId).then(()=>{
                liftState[liftId].condition='S';
                processQueue()
            });
        }, 2500); 
    }, liftMoveTime * 1000);
}


function openDoors(liftId) {
    return new Promise((resolve) => {
    const lift = document.getElementById(`lift-${liftId}`);
    const leftDoor = lift.querySelector('.left-door');
    const rightDoor = lift.querySelector('.right-door');
    
    if(leftDoor.style.transform!=='translateX(-100%)'){
    leftDoor.style.transition = 'transform 2.5s ease';
    rightDoor.style.transition = 'transform 2.5s ease';
    
    leftDoor.style.transform = 'translateX(-100%)';
    rightDoor.style.transform = 'translateX(100%)';
    setTimeout(()=>resolve(),2000);
    }
    else{
        resolve();
    }
    })
}

function closeDoors(liftId) {
    return new Promise((resolve) => {
    const lift = document.getElementById(`lift-${liftId}`);
    const leftDoor = lift.querySelector('.left-door');
    const rightDoor = lift.querySelector('.right-door');
    
if(leftDoor.style.transform!=='translateX(0)'){
    leftDoor.style.transition = 'transform 2.5s ease';
    rightDoor.style.transition = 'transform 2.5s ease';
    
    leftDoor.style.transform = 'translateX(0)';
    rightDoor.style.transform = 'translateX(0)';
     setTimeout(()=>resolve(),2000);
}else{
    resolve()
}
    })
}