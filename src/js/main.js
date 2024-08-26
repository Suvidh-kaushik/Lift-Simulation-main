
const floorHeight = 100; 
const blockWidth = 40;
var state = {};  
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
var buildingWidth = blockWidth*(noOfLifts*3);
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




function generateFloors() {
    for (let i = 0; i < totalFloors; i++) {
        const floor = document.createElement("div");
        floor.className = "floor";
        const floorTop = i * floorHeight;
        floor.style.bottom = `${floorTop}px`;
        floor.style.height = `${floorHeight}px`;
        floor.style.width = `${buildingWidth}px`;
        floor.style.minWidth = `300px`;

        const data = document.createElement("div");
        data.textContent = `Floor ${i + 1}`;
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

        async function callNearestLift(targetFloor, direction) {
            if (liftsInAfloor[targetFloor].length >= 2) {
                liftsInAfloor[targetFloor].forEach(liftId => {
                    openDoors(liftId);
                    setTimeout(() => {
                        closeDoors(liftId);
                    }, 2500); // Close doors after 2.5 seconds
                });
                return
            }

            let nearestLiftIndex = -1;
            let minDistance = totalFloors; // Maximum possible distance is totalFloors - 1

            for (let liftIndex = 0; liftIndex < noOfLifts; liftIndex++) {
                const currentLiftFloor = liftState[liftIndex];
                const distance = Math.abs(currentLiftFloor - targetFloor);

                // Ensure we select a different lift for UP and DOWN
                const isDifferentLift = (direction === 'UP' && !liftsInAfloor[targetFloor].includes(liftIndex)) ||
                    (direction === 'DOWN' && !liftsInAfloor[targetFloor].includes(liftIndex));

                if (distance < minDistance && isDifferentLift) {
                    minDistance = distance;
                    nearestLiftIndex = liftIndex;
                }
            }

            if (nearestLiftIndex !== -1) {
                const currentLiftFloor = liftState[nearestLiftIndex];
                const liftMoveTime = minDistance * 2;
                if (typeof liftsInAfloor[currentLiftFloor] !== 'undefined' && liftsInAfloor[currentLiftFloor].length > 0) {
                    liftsInAfloor[currentLiftFloor].pop();
                }
                
                liftState[nearestLiftIndex] = targetFloor;
        
                if (typeof liftsInAfloor[targetFloor] === 'undefined') {
                    liftsInAfloor[targetFloor] = [];
                }
        
                liftsInAfloor[targetFloor].push(nearestLiftIndex);
                 await closeDoors(nearestLiftIndex)
                 moveToFloor(targetFloor, nearestLiftIndex, liftMoveTime);
            }
        }

        upButton.addEventListener("click", () => {
            callNearestLift(i, 'UP');
        });

        downButton.addEventListener("click", () => {
            callNearestLift(i, 'DOWN');
        });

        floor.appendChild(ButtonsDiv);
        floor.appendChild(data);
        floorsContainer.appendChild(floor);
    }
}




function generateLifts() {
     
    if(totalFloors==1){
        alert("no second floor to go please build it")
        return
    }

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





document.addEventListener("DOMContentLoaded", () => {
    generateFloors();
    generateLifts();
});






 function moveToFloor(floor, liftId, liftMoveTime) {
    const newPosition = floor * floorHeight;
    const lift = document.getElementById(`lift-${liftId}`);
    lift.style.transition = `bottom ${liftMoveTime}s ease-in-out`;
    lift.style.bottom = `${newPosition}px`;
    // closeDoors(liftId);
    setTimeout(async() => {
      await openDoors(liftId);
        setTimeout(async () => {
           await closeDoors(liftId);
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
