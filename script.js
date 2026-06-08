const container = document.getElementById("cloudContainer");

const cloudCountEl = document.getElementById("cloudCount");
const sealCountEl = document.getElementById("sealCount");

const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const rewardImage = document.getElementById("rewardImage");
const closeBtn = document.getElementById("closeBtn");

let cloudPoints = 0;
let sealFragments = 0;

let imageUnlocked = false;
let listUnlocked = false;

const targetURL =
"https://sites.google.com/view/punkt-5/strona-g%C5%82%C3%B3wna";

const quotes = [
`☁️

Zaufanie buduje się latami.

Czasem wystarczy jednak jeden właściwy czyn, by je zdobyć.

— Elias`,

`☁️

Świat zmienia się szybciej, niż sądzi większość ludzi.

To właśnie czyni go ciekawym.

— Elias`,

`☁️

Nawet najdłuższa podróż składa się z pojedynczych kroków.

— Elias`,

`☁️

Są miejsca, do których wracamy.

I ludzie, dla których warto to robić.

— Elias`,

`☁️

Nie musisz znać całej drogi.

Wystarczy, że znasz następny krok.

— Elias`
];

function updateHUD(){
    cloudCountEl.textContent = cloudPoints;
    sealCountEl.textContent = sealFragments;
}

function randomCloudType(){

    const roll = Math.random();

    if(roll < 0.55) return 1;
    if(roll < 0.75) return 2;
    if(roll < 0.90) return 3;

    return 4;
}

function createCloud(){

    const cloud = document.createElement("img");

    const type = randomCloudType();

    cloud.classList.add("cloud");
    cloud.dataset.type = type;

    cloud.src = `img/chmurka${type}.png`;

    const size = 90 + Math.random()*120;

    cloud.style.width = size + "px";

    const topPos =
        Math.random() * (window.innerHeight - 200);

    cloud.style.top = topPos + "px";

    const fromLeft = Math.random() > 0.5;

    const duration =
        12 + Math.random()*10;

    if(fromLeft){

        cloud.style.left = "-250px";

        cloud.animate(
        [
            {transform:"translateX(0px)"},
            {transform:`translateX(${window.innerWidth+500}px)`}
        ],
        {
            duration:duration*1000,
            iterations:1,
            easing:"linear"
        });

    }else{

        cloud.style.left =
            (window.innerWidth+250)+"px";

        cloud.animate(
        [
            {transform:"translateX(0px)"},
            {transform:`translateX(-${window.innerWidth+500}px)`}
        ],
        {
            duration:duration*1000,
            iterations:1,
            easing:"linear"
        });
    }

    cloud.addEventListener("click", ()=>clickCloud(cloud,type));

    container.appendChild(cloud);

    setTimeout(()=>{
        cloud.remove();
        createCloud();
    }, duration*1000);
}

function clickCloud(cloud,type){

    cloud.remove();

    createCloud();

    switch(type){

        case 1:
            cloudPoints += 1;
            break;

        case 2:
            cloudPoints += 5;
            break;

        case 3:
            cloudPoints -= 2;
            if(cloudPoints < 0) cloudPoints = 0;
            break;

        case 4:

            cloudPoints += 1;

            if(sealFragments < 5){

                sealFragments++;

                showMessage(
                    quotes[sealFragments-1] +
                    `\n\n🔮 Fragment Pieczęci ${sealFragments}/5`
                );

                if(sealFragments === 5 &&
                   !imageUnlocked){

                    imageUnlocked = true;

                    setTimeout(()=>{
                        showReward("img/obrazek 9.png");
                    },300);
                }
            }

            break;
    }

    updateHUD();

    if(cloudPoints >= 50 && !listUnlocked){

        listUnlocked = true;

        showList();
    }
}

function showMessage(text){

    rewardImage.style.display="none";
    modalText.textContent=text;

    modal.classList.remove("hidden");
}

function showReward(img){

    modalText.textContent="";

    rewardImage.src=img;
    rewardImage.style.display="block";

    modal.classList.remove("hidden");
}

function showList(){

    modalText.textContent =
        "📜 Odnalazłeś list.";

    rewardImage.src="img/list.png";
    rewardImage.style.display="block";

    modal.classList.remove("hidden");

    rewardImage.onclick=()=>{
        window.location.href=targetURL;
    };
}

closeBtn.addEventListener("click",()=>{
    modal.classList.add("hidden");
});

updateHUD();

const amount = 5 + Math.floor(Math.random()*4);

for(let i=0;i<amount;i++){
    createCloud();
}