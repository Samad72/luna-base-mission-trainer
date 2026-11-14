const $=id=>document.getElementById(id);
const resourceInfo=[["oxygen","Oxygen","Breathable air",100],["water","Water","Crew water supply",100],["food","Food","Stored meals",100],["power","Power","Battery charge",100],["shield","Radiation shield","Protection integrity",100]];
let R={},day=1,points=0,selected="solar",commander="Commander",outpost="Moon",donkiEvent=null,missionEnded=false;
const actionData=[
 {id:"solar",icon:"☀",name:"Optimize solar panels",desc:"Restore battery charge",effect:"+18 POWER",apply:()=>R.power+=18},
 {id:"water",icon:"♻",name:"Recycle water",desc:"Recover water from the life-support loop",effect:"+18 WATER",apply:()=>R.water+=18},
 {id:"food",icon:"♧",name:"Maintain greenhouse",desc:"Support fresh food production",effect:"+18 FOOD",apply:()=>R.food+=18},
 {id:"oxygen",icon:"⚙",name:"Repair life support",desc:"Inspect oxygen-generation equipment",effect:"+15 OXYGEN",apply:()=>R.oxygen+=15},
 {id:"shield",icon:"⬡",name:"Reinforce radiation shelter",desc:"Improve protective shielding",effect:"+18 SHIELD",apply:()=>R.shield+=18}
];
function clamp(){Object.keys(R).forEach(k=>R[k]=Math.max(0,Math.min(100,R[k])));}
function render(){ $("resources").innerHTML=resourceInfo.map(([k,n,d])=>`<div class="resource"><span class="rlabel">${n.toUpperCase()}</span><strong>${Math.round(R[k])}%</strong><div class="meter"><div style="width:${R[k]}%;background:${R[k]<25?'#ff7889':'#69e1f1'}"></div></div><small>${d}</small></div>`).join("");$("day").textContent=`${String(day).padStart(2,"0")} / 07`;$("progress").style.width=`${(day-1)/7*100}%`;}
function start(){commander=$("name").value.trim()||"Commander";outpost=$("base").value;R={oxygen:100,water:100,food:100,power:100,shield:100};day=1;points=0;missionEnded=false;donkiEvent=null;$("commander").textContent=commander;$("baseName").textContent=outpost.toUpperCase()+" OUTPOST";$("welcome").classList.add("hidden");$("result").classList.add("hidden");$("game").classList.remove("hidden");$("log").textContent="Mission initialized. Outpost systems online.";render();$("eventTitle").textContent="All systems nominal";$("eventText").textContent="Select a priority for your crew. Fetch NASA space-weather records for a real-world learning context.";}
function log(t){$("log").textContent=t;}
function finish(success,why){missionEnded=true;$("game").classList.add("hidden");$("result").classList.remove("hidden");$("medal").textContent=success?"🏆":"⚠️";$("resultTitle").textContent=success?"Seven-day mission accomplished":"Mission interrupted";$("resultText").textContent=success?`Great work, ${commander}. Your crew completed the simulated ${outpost} outpost mission.`:`The mission ended because ${why}. Review the resource trade-offs and try a new strategy.`;$("days").textContent=success?7:day-1;$("points").textContent=points;$("outpost").textContent=outpost.toUpperCase();}
function endDay(){if(missionEnded)return;actionData.find(a=>a.id===selected).apply();clamp();R.oxygen-=9;R.water-=10;R.food-=8;R.power-=8;R.shield-=2;
let incident=null;if(donkiEvent&&day===2){incident="NASA DONKI reported recent solar activity. In this training scenario, Mission Control raises a preparedness drill; the simulated shielding impact is not derived from the NASA record.";R.shield-=12;$("eventTitle").textContent="Space-weather preparedness drill";$("eventText").textContent=incident;}else if(Math.random()<.45){const e=[["Water-line leak","A simulated leak reduces stored water.", "water",-12],["Dust on solar array","A fictional dust event reduces battery charge.","power",-13],["Greenhouse yield","A simulated crop yield improves food stores.","food",10],["Sensor maintenance","A simulated equipment fault reduces oxygen reserve.","oxygen",-10]][Math.floor(Math.random()*4)];$("eventTitle").textContent=e[0];$("eventText").textContent=e[1];R[e[2]]+=e[3];incident=e[0];}else{$("eventTitle").textContent="Routine operations";$("eventText").textContent="No additional simulated event today.";}
clamp();points+=Object.values(R).every(v=>v>0)?100:20;log(`Day ${day}: ${actionData.find(a=>a.id===selected).name}. ${incident||"Routine operations."}`);render();let failed=Object.entries(R).find(([k,v])=>v<=0);if(failed){finish(false,failed[0]+" reached zero");return;}if(day===7){finish(true);return;}day++;render();}

async function fetchDonki() {
  const state = $("apiState");

  state.textContent = "LOADING…";
  $("weatherTitle").textContent = "Contacting NASA DONKI";
  $("weatherText").textContent =
    "Requesting recent solar flare and CME records from NASA.";

  try {
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - 7);

    const fmt = d => d.toISOString().slice(0, 10);

    const [flr, cme] = await Promise.all(
      ["FLR", "CME"].map(async type => {
        const url =
          `https://ccmc.gsfc.nasa.gov/DONKI-API/get/${type}` +
          `?startDate=${fmt(start)}&endDate=${fmt(end)}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`NASA DONKI ${type}: HTTP ${response.status}`);
        }

        return response.json();
      })
    );

    const count =
      (Array.isArray(flr) ? flr.length : 0) +
      (Array.isArray(cme) ? cme.length : 0);

    donkiEvent = count > 0;

    state.textContent = "NASA DATA LOADED";
    state.style.color = "#74e3b5";

    $("weatherTitle").textContent =
      `${count} recent DONKI record(s) found`;

    $("weatherText").textContent = count
      ? `NASA DONKI returned ${flr.length} solar flare record(s) and ${cme.length} CME record(s) for the last seven days. These records are not a local lunar/Martian radiation forecast.`
      : "No FLR or CME records were returned in this date window. The game remains playable.";

    log(
      "NASA DONKI queried successfully. Space-weather records are contextual data, not a site-specific hazard forecast."
    );

  } catch (err) {
    console.error("DONKI error:", err);

    state.textContent = "API UNAVAILABLE";
    state.style.color = "#ffca78";

    $("weatherTitle").textContent =
      "NASA data could not be loaded";

    $("weatherText").textContent =
      `Connection error: ${err.message}. Check your internet connection and try again.`;

    donkiEvent = null;
  }
}
document.getElementById("start").addEventListener("click",start);document.getElementById("restart").addEventListener("click",start);document.getElementById("endDay").addEventListener("click",endDay);document.getElementById("fetchWeather").addEventListener("click",fetchDonki);
$("actions").innerHTML=actionData.map((a,i)=>`<button class="action ${i===0?'selected':''}" data-id="${a.id}"><span class="symbol">${a.icon}</span><span class="copy"><b>${a.name}</b><small>${a.desc}</small></span><span class="effect">${a.effect}</span></button>`).join("");
document.querySelectorAll(".action").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".action").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");selected=b.dataset.id;}));
