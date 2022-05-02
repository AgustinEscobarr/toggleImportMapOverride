let circle = document.getElementById('circle');
const toggleDevtools= document.getElementById('toggleDevtools');
detectDevtools();
function detectDevtools(){
    chrome.storage.sync.get('devtools',({devtools})=>{
        if(devtools){
            circle.style.backgroundColor="red";
        }else{
            circle.style.backgroundColor="white";
        }
    });
}
toggleDevtools.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addOrDelete,
    });
  });

  function addOrDelete(){
    if(localStorage.getItem('devtools')){
        if(confirm('Remove "devtools"')){
            localStorage.removeItem("devtools");
            chrome.storage.sync.set({devtools:false});
            location.reload();
        }
    }
    else{
        if(confirm('Add "devtools" to true')){
            localStorage.setItem('devtools',true);
            chrome.storage.sync.set({devtools:true});
            location.reload();
        }
    }
}
//Código desarrolado por Agustín Escobar, para la mejor celula de todas, la 7!!!
