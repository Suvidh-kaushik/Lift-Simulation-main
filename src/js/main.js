
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

// Generate floors dynamically
function generateFloors() {
    for (let i = 0; i < totalFloors; i++) {
        const floor = document.createElement("div");
        floor.className = "floor";
        const floorTop = i * floorHeight;
        floor.style.bottom = `${floorTop}px`;
        floor.style.height = `${floorHeight}px`;
        floor.style.width = `${buildingWidth}px`;
        floor.style.minWidth=`300px`;
        
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
            if(liftState[liftIndex]!=0){
                liftsInAfloor[liftState[liftIndex]].pop();
            }
            liftState[liftIndex] = i;
            if (liftsInAfloor[i].length < 2) {
                liftsInAfloor[i].push(liftIndex);
                closeDoors(liftIndex);
                moveToFloor(i, liftIndex, liftMoveTime);
            } else {
                // If two lifts are already on the floor, open their doors only
                for (let j = 0; j < liftsInAfloor[i].length; j++) {
                    const liftToOpen = liftsInAfloor[i][j];
                    setTimeout(() => {
                        openDoors(liftToOpen);
                        setTimeout(() => {
                            closeDoors(liftToOpen);
                        }, 2500);
                    }, 2000);
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
