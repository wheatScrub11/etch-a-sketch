let okBtn = document.getElementById("send-btn")
    , gridImput = document.getElementById("howmanysquares")
    , colorBtn = document.querySelector(".select-color")
    , raimbowBtn = document.querySelector(".raimbow-color")
    , grayBtn = document.querySelector(".gray-color")
    , eraseBtn = document.querySelector("#erase-btn")
    , actuallyGrid = document.getElementById("actually-grid")
    , theBody = document.querySelector("body")
    , ttt = document.querySelectorAll(".a")
    , holder = 0
    , holder1 = 0
    , holder3 = 0
    , theh1 = document.querySelector("h1")
    , colorInput = "black";
    
let moreBoxes, rawww, allBoxes, newGrayBox, allgrayboxes, tutorial, coco;

setTimeout(() => {
    tutorial = document.createElement("div");
    tutorial.classList.add("tutorial-msg");
    tutorial.addEventListener("click", () =>{
        tutorial.classList.remove("tutorial-msg");
        tutorial.textContent = "";
    })
    tutorial.textContent = "Please input your custom grid by writting a value in the input box. For example, '16' will generate a 16x16 grid layout. Click on this box to close it."
    theBody.appendChild(tutorial)
}, 200);

/*The input-color btn*/
colorBtn.addEventListener("input", e =>{
    let color = colorBtn.value;
    colorInput = color;
    holder = 0;
})

/*The msg*/
okBtn.addEventListener("click", e =>{
    /*The tutorial box of how to use the keyboard shortcuts*/
    tutorial = document.createElement("div");
    tutorial.classList.add("tutorial-msg");
    tutorial.addEventListener("click", () =>{
        tutorial.classList.remove("tutorial-msg");
        theBody.removeChild(tutorial)
        tutorial.textContent = "";
    })
    tutorial.style.cssText = "width:510px;height:280px;"
    tutorial.textContent = "Press 'A' to select input color mode. Press 'S' to select random color mode. Press 'D' to select layers of gray mode. Press 'F' to temporarily disable the pencil. Press 'rightclick' to delete a color from the grid"
    theBody.appendChild(tutorial)

}, {once:true})

/*The Ok btn*/
okBtn.addEventListener("click", e =>{
    hidethem();
    let gridImputValue = gridImput.value;
    let checkmark = document.createElement("div")

    let isANumber = function(){

        setTimeout(() => {
            okBtn.removeChild(checkmark);
            checkmark.classList.remove("green-border");
            checkmark.classList.remove("red-border");
            checkmark.classList.remove("alert-msg");
        }, 1500);

        if ((parseInt(gridImputValue) > 100) || (parseInt(gridImputValue) < 1) || (gridImputValue == "")){
            checkmark.classList.add("alert-msg");
            checkmark.textContent = "PLEASE ENTER A VALID NUMBER VALUE BETWEEN 1 AND 100"
            okBtn.appendChild(checkmark);
            return "invalid"
        }else if(typeof(gridImputValue) == "string"){
            checkmark.classList.add("green-border");
            checkmark.textContent = "✔"
            okBtn.appendChild(checkmark);
            gridImputValue = parseInt(gridImputValue);
            return "valid"
        }
    }
    let totalBoxes = function(a){
        let rew = a * a;
        return rew;
    }

    setTimeout(() => {
        let resultIsANumber = isANumber();
        
        if(resultIsANumber == "valid"){
            actuallyGrid.style.cssText = `grid-template-columns: repeat(${gridImputValue}, 1fr);grid-template-rows: repeat(${gridImputValue}, 1fr);`

            rawww = totalBoxes(gridImputValue);

            for (let i = 0; i < rawww; ++i){
                moreBoxes = document.createElement("div");
                moreBoxes.classList.add("zzz1");
                actuallyGrid.appendChild(moreBoxes);
            }
            allBoxes = document.querySelectorAll(".zzz1");

            /*Reset the boxes color everytime the "Ok" btn is clicked, preventing visual bugs*/
            for(let i = 0; i < rawww; ++i){
                allBoxes[i].style.cssText = "background-color:white;"
            }
            /*color style n1*/
            const firstbtn = function(c){
                allBoxes[c].style.cssText = `background-color:${colorInput};`
            }
            /*color style n2 (random)*/
            const secondbtn = function(c){
                let asd = theRGBA();
                allBoxes[c].style.cssText = `background-color:${asd};`
            }
            /*color style n3 (layers of gray)*/
            const thirdbtn = function(c){
                allBoxes[c].addEventListener("click", e =>{
                    newGrayBox = document.createElement("div");
                    newGrayBox.classList.add("allof")
                    newGrayBox.classList.add("NIT");
                    allBoxes[c].appendChild(newGrayBox);
                },{once:true})
            }
            /*Stops the pencil color function*/
            const fourbtn = function(){} 
            /*Erase function that replaces the color of the boxes and delete the gray boxes*/
            const fivebtn = function(c){
                allBoxes[c].addEventListener("contextmenu", e =>{
                    e.preventDefault();
                    e.target.style.backgroundColor = "white";
                    allBoxes[i].removeChild(newGrayBox)
                })
            }
            /* The three mode of colors switching between each other*/
            const comparison = function(i){
                actuallyGrid.addEventListener("contextmenu", e =>{
                    e.preventDefault();
                    fivebtn(i)
                })
                if (holder == 0){firstbtn(i)}
                else if(holder == 1){secondbtn(i)}
                else if(holder == 2){thirdbtn(i)}
                else if(holder == 3){fourbtn(i)}
                
                allgrayboxes = document.querySelectorAll(".allof")
            }
            /*Add the event listener for each box of the grid*/
            for(let i = 0; i < rawww; ++i){
                allBoxes[i].addEventListener("mouseover", e =>{
                    /*take the input of the pressed key and then compare them and choose a color mode*/
                    window.addEventListener("keydown", e =>{
                        coco = e.key.toLowerCase()
                    })
        
                    if (coco == "a"){holder = 0;}
                    else if (coco == "s"){holder = 1;}
                    else if (coco == "d"){holder = 2;}
                    else if (coco == "f"){holder = 3;}
                    comparison(i) //
                })
            }

            /*The actually "Erase" btn working, i decided to put it here*/
            for(let i = 0; i < rawww; ++i){

                eraseBtn.addEventListener("click", () =>{
                    allBoxes[i].style.cssText = "background-color:white;"
                    for (let i = 0; i <= allgrayboxes.length - 1; ++i){
                        allgrayboxes[i].classList.remove("NIT");
                    }
                })
            }
        }
    }, 0);
})
/* Function1 to random-btn */
const computerChoose = function(){
    let a, b, c;
    const MAX = 255;
    a = Math.random(256);
    b = a * MAX;
    c = Math.floor(b);

    return c;
}

/* Function2 to random-btn */
const theRGBA = function(){
    let r = computerChoose();
    let g = computerChoose();
    let b = computerChoose();
    let a = computerChoose();
    let outpout = `rgba(${r}, ${g}, ${b}, ${a})`
    holder = 1;
    coco = 1;
    return outpout;
}

/* The random btn */
raimbowBtn.addEventListener("click", theRGBA)

/*Function1 to gray-btn*/
const scaleGray = function(){
    let outpout = "#00000005"
    holder = 2;
    coco = 2;
    return outpout;
}

/*The gray btn */
grayBtn.addEventListener("click", scaleGray)

/*The btns styles when they're focus*/
for(let i =0; i <= ttt.length - 1; ++i){
    ttt[i].addEventListener("click", () =>{

        if(i == 0){
            ttt[0].classList.add("bb");
            ttt[1].classList.remove("bb");
            ttt[2].classList.remove("bb");
        }else if (i == 1){
            ttt[0].classList.remove("bb");
            ttt[1].classList.add("bb");
            ttt[2].classList.remove("bb");
        }else if (i == 2){
            ttt[0].classList.remove("bb");
            ttt[1].classList.remove("bb");
            ttt[2].classList.add("bb");
        }
    })
}
/* The Show / hide grid btn*/
let show = document.querySelector(".kuj");
let showQbtn = document.createElement("div");
showQbtn.classList.add("showGridStyle");
showQbtn.classList.add("a");
eraseBtn.classList.add("a");
showQbtn.textContent = "Show/Hide grid"
show.appendChild(showQbtn);

const showthem = function(){
    for(let i = 0; i < rawww; ++i){
        allBoxes[i].classList.add("prueba");
    }
}
const hidethem = function(){
    for(let i = 0; i < rawww; ++i){
        allBoxes[i].classList.remove("prueba");
    }
}
showQbtn.addEventListener("click", () =>{
    
    if (holder1 == 0){
        showthem()
        holder1 = 1;
    }else if (holder1 == 1){
        hidethem();
        holder1 = 0;
    }
})

