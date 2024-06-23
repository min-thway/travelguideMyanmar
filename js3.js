var data= {
    chatinit:{
        title: ["Hello <span class='emoji'> &#128075;</span>","I am Mr. Chatbot","How can I help you?"],
        options: ["destination" ,"tickets","contact"]
    },
    destination: {
        title:["Please select category"],
        options:['Yangon','Mandalay','InleLake','Chaungtha'],
        url : {
            
        }
    },
    tickets:{
        title:["Please select category"],
        options:['Economy ','Business','First Class '],
        url : {
            link:["ticket.htm"]
            
        }
    },
    contact:{
        
        options:['contact us '],
        url : {
            link:["contact.htm"]
            
        }
    },
    

    yangon: {
        title: ["Thanks for your response","Top Attractions in Yangon"],
        options: ["Shwedagon Pagoda","KanDawGyi Garden","Waterboom","National Races Village"],
        url: {
            more:"https://www.youtube.com/@webhub/videos",
            link:["https://en.wikipedia.org/wiki/Shwedagon_Pagoda","https://en.wikipedia.org/wiki/National_Kandawgyi_Botanical_Gardens","https://yangonwaterboom.com/","https://www.tripadvisor.com/Attraction_Review-g294191-d2621615-Reviews-National_Races_Village-Yangon_Rangoon_Yangon_Region.html","#"]
        }
    },
    mandalay: {
        title: ["Thanks for your response","Here are some genre based movies"],
        options: ["The Shwenandaw Monastery","The KuThoDaw Pagoda","Mahamuni Buddha Temple","Sanda Muni Pagoda"],
        url: {

            link:["https://en.wikipedia.org/wiki/Shwenandaw_Monastery","https://en.wikipedia.org/wiki/Kuthodaw_Pagoda","https://en.wikipedia.org/wiki/Mahamuni_Buddha_Temple","https://en.wikipedia.org/wiki/Sandamuni_Pagoda","#"]
        }
    },
    inleLake: {
        title: ["Thanks for your response","Here are some genre based web series"],
       options:["Amazing Things to Do Around Inle Lake"],
        url: {
           
            link:["inlae.htm"]
        }
    },
    chaungtha: {
        title: ["Thanks for your response","Here are some genre based web series"],
       options:[" CHAUNG THA BEACH, MYANMAR"],
        url: {
           
            link:["chaungtha.htm"]
        }
    },
    
}

document.getElementById("init").addEventListener("click",showChatBot);
var cbot= document.getElementById("chat-box");

var len1= data.chatinit.title.length;

function showChatBot(){
    console.log(this.innerText);
    if(this.innerText=='START CHAT'){
        document.getElementById('test').style.display='block';
        document.getElementById('init').innerText='CLOSE CHAT';
        initChat();
    }
    else{
        location.reload();
    }
}

function initChat(){
    j=0;
    cbot.innerHTML='';
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*500))
}

var j=0;
function handleChat(){
    console.log(j);
    var elm= document.createElement("p");
    elm.innerHTML= data.chatinit.title[j];
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt(){
    console.log(this);
    var str= this.innerText;
    var textArr= str.split(" ");
    var findText= textArr[0];
    
    document.querySelectorAll(".opt").forEach(el=>{
        el.remove();
    })
    var elm= document.createElement("p");
    elm.setAttribute("class","test");
    var sp= '<span class="rep">'+this.innerText+'</span>';
    elm.innerHTML= sp;
    cbot.appendChild(elm);

    console.log(findText.toLowerCase());
    var tempObj= data[findText.toLowerCase()];
    handleResults(tempObj.title,tempObj.options,tempObj.url);
}

function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}


function handleResults(title,options,url){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*500)
        
    }

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    if(isObjectEmpty(url)==true){
        console.log("having more options");
        setTimeout(function(){
            showOptions(options);
        },title.length*500)
        
    }
    else{
        console.log("end result");
        setTimeout(function(){
            handleOptions(options,url);
        },title.length*500)
        
    }
}

function handleOptions(options,url){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<a class="m-link" href="'+url.link[i]+'">'+options[i]+'</a>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        cbot.appendChild(opt);
    }
    var opt= document.createElement("span");
    var inp= '<a class="m-link" href="'+url.more+'">'+'See more</a>';

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    console.log(isObjectEmpty(url));
    console.log(url);
    opt.innerHTML=inp;
    opt.setAttribute("class","opt link");
    cbot.appendChild(opt);
    handleScroll();
}

function handleScroll(){
    var elem= document.getElementById('chat-box');
    elem.scrollTop= elem.scrollHeight;
}