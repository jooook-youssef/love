document.addEventListener("DOMContentLoaded",()=>{
  const hearts=document.getElementById("hearts");
  if(hearts){
    function makeHeart(){
      const h=document.createElement("span");
      h.className="heart";
      h.textContent=["♥","❤","♡","💗"][Math.floor(Math.random()*4)];
      h.style.left=Math.random()*100+"%";
      h.style.fontSize=(12+Math.random()*20)+"px";
      h.style.animationDuration=(7+Math.random()*7)+"s";
      hearts.appendChild(h);
      setTimeout(()=>h.remove(),15000);
    }
    setInterval(makeHeart,550);
    for(let i=0;i<12;i++)setTimeout(makeHeart,i*120);
  }
});

function unlock(){
  const input=document.getElementById("password");
  const error=document.getElementById("error");
  const correctPassword="1234"; // غيّر كلمة السر هنا
  if(input && input.value===correctPassword){
    sessionStorage.setItem("unlocked","yes");
    location.href="intro.html";
  }else if(error){
    error.textContent="كلمة السر غير صحيحة 💔";
  }
}