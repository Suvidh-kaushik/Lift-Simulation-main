function moveForward(event){
    event.preventDefault();
    var no_lifts=parseInt(document.getElementById("lifts").value);
    var no_floors=parseInt(document.getElementById("floors").value);
    if(no_floors==1){
        window.alert("need atleast two floors to have a lift")
    }
    else if (no_floors < 1 || no_lifts < 1) {
        window.alert("Please enter numbers greater than 0");
    } 
    else if(isNaN(no_floors)||isNaN(no_lifts)){
         window.alert("Please enter numbers greater than 0")
    }
    else {
        console.log(no_floors + " --- " + no_lifts);
        var url=`https://suvidh-lift-simulation.netlify.app/src/index.html?floors=${no_floors}&lifts=${no_lifts}`
        document.location.href=url;
    }
    
   
    
}