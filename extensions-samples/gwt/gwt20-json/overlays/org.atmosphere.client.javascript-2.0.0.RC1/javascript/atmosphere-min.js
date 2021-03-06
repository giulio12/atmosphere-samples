(function(){var b="2.0.0-javascript",a={},c,e=[],d=[];
a={onError:function(f){},onClose:function(f){},onOpen:function(f){},onReopen:function(f){},onMessage:function(f){},onReconnect:function(g,f){},onMessagePublished:function(f){},onTransportFailure:function(g,f){},onLocalMessage:function(f){},onFailureToReconnect:function(g,f){},AtmosphereRequest:function(J){var L={timeout:300000,method:"GET",headers:{},contentType:"",callback:null,url:"",data:"",suspend:true,maxRequest:-1,reconnect:true,maxStreamingLength:10000000,lastIndex:0,logLevel:"info",requestCount:0,fallbackMethod:"GET",fallbackTransport:"streaming",transport:"long-polling",webSocketImpl:null,webSocketBinaryType:null,dispatchUrl:null,webSocketPathDelimiter:"@@",enableXDR:false,rewriteURL:false,attachHeadersAsQueryString:true,executeCallbackBeforeReconnect:false,readyState:0,lastTimestamp:0,withCredentials:false,trackMessageLength:false,messageDelimiter:"|",connectTimeout:-1,reconnectInterval:0,dropAtmosphereHeaders:true,uuid:0,async:true,shared:false,readResponsesHeaders:false,maxReconnectOnClose:5,enableProtocol:true,onError:function(ax){},onClose:function(ax){},onOpen:function(ax){},onMessage:function(ax){},onReopen:function(ay,ax){},onReconnect:function(ay,ax){},onMessagePublished:function(ax){},onTransportFailure:function(ay,ax){},onLocalMessage:function(ax){},onFailureToReconnect:function(ay,ax){}};
var T={status:200,reasonPhrase:"OK",responseBody:"",messages:[],headers:[],state:"messageReceived",transport:"polling",error:null,request:null,partialMessage:"",errorHandled:false,id:0};
var W=null;
var m=null;
var s=null;
var B=null;
var D=null;
var ah=true;
var j=0;
var au=false;
var X=null;
var an;
var o=null;
var G=a.util.now();
var H;
aw(J);
function ao(){ah=true;
au=false;
j=0;
W=null;
m=null;
s=null;
B=null
}function x(){aj();
ao()
}function I(ay,ax){if(T.partialMessage==""&&(ax.transport=="streaming")&&(ay.responseText.length>ax.maxStreamingLength)){T.messages=[];
af(true);
A();
aj();
O(ay,ax,0)
}}function A(){if(L.enableProtocol&&!L.firstMessage){var ay="X-Atmosphere-Transport=close&X-Atmosphere-tracking-id="+L.uuid;
var ax=L.url.replace(/([?&])_=[^&]*/,ay);
ax=ax+(ax===L.url?(/\?/.test(L.url)?"&":"?")+ay:"");
L.attachHeadersAsQueryString=false;
L.dropAtmosphereHeaders=true;
L.url=ax;
L.transport="polling";
l("",L)
}}function ak(){L.reconnect=false;
au=true;
T.request=L;
T.state="unsubscribe";
T.responseBody="";
T.status=408;
z();
A();
aj()
}function aj(){if(B!=null){B.close();
B=null
}if(D!=null){D.abort();
D=null
}if(s!=null){s.abort();
s=null
}if(W!=null){if(W.webSocketOpened){W.close()
}W=null
}if(m!=null){m.close();
m=null
}aq()
}function aq(){if(an!=null){clearInterval(H);
document.cookie=encodeURIComponent("atmosphere-"+L.url)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
an.signal("close",{reason:"",heir:!au?G:(an.get("children")||[])[0]});
an.close()
}if(o!=null){o.close()
}}function aw(ax){x();
L=a.util.extend(L,ax);
L.mrequest=L.reconnect;
if(!L.reconnect){L.reconnect=true
}}function n(){return L.webSocketImpl!=null||window.WebSocket||window.MozWebSocket
}function P(){return window.EventSource
}function q(){if(L.shared){o=ae(L);
if(o!=null){if(L.logLevel=="debug"){a.util.debug("Storage service available. All communication will be local")
}if(o.open(L)){return
}}if(L.logLevel=="debug"){a.util.debug("No Storage service available.")
}o=null
}L.firstMessage=true;
L.isOpen=false;
L.ctime=a.util.now();
if(L.transport!="websocket"&&L.transport!="sse"){p(L)
}else{if(L.transport=="websocket"){if(!n()){N("Websocket is not supported, using request.fallbackTransport ("+L.fallbackTransport+")")
}else{ag(false)
}}else{if(L.transport=="sse"){if(!P()){N("Server Side Events(SSE) is not supported, using request.fallbackTransport ("+L.fallbackTransport+")")
}else{F(false)
}}}}}function ae(aB){var aC,aA,aF,ax="atmosphere-"+aB.url,ay={storage:function(){if(!a.util.supportStorage()){return
}var aI=window.localStorage,aG=function(aJ){return a.util.parseJSON(aI.getItem(ax+"-"+aJ))
},aH=function(aJ,aK){aI.setItem(ax+"-"+aJ,a.util.stringifyJSON(aK))
};
return{init:function(){aH("children",aG("children").concat([G]));
a.util.on("storage.socket",function(aJ){aJ=aJ.originalEvent;
if(aJ.key===ax&&aJ.newValue){az(aJ.newValue)
}});
return aG("opened")
},signal:function(aJ,aK){aI.setItem(ax,a.util.stringifyJSON({target:"p",type:aJ,data:aK}))
},close:function(){var aJ=aG("children");
a.util.off("storage.socket");
if(aJ){if(aD(aJ,aB.id)){aH("children",aJ)
}}}}
},windowref:function(){var aG=window.open("",ax.replace(/\W/g,""));
if(!aG||aG.closed||!aG.callbacks){return
}return{init:function(){aG.callbacks.push(az);
aG.children.push(G);
return aG.opened
},signal:function(aH,aI){if(!aG.closed&&aG.fire){aG.fire(a.util.stringifyJSON({target:"p",type:aH,data:aI}))
}},close:function(){if(!aF){aD(aG.callbacks,az);
aD(aG.children,G)
}}}
}};
function aD(aJ,aI){var aG,aH=aJ.length;
for(aG=0;
aG<aH;
aG++){if(aJ[aG]===aI){aJ.splice(aG,1)
}}return aH!==aJ.length
}function az(aG){var aI=a.util.parseJSON(aG),aH=aI.data;
if(aI.target==="c"){switch(aI.type){case"open":K("opening","local",L);
break;
case"close":if(!aF){aF=true;
if(aH.reason==="aborted"){ak()
}else{if(aH.heir===G){q()
}else{setTimeout(function(){q()
},100)
}}}break;
case"message":C(aH,"messageReceived",200,aB.transport);
break;
case"localMessage":Z(aH);
break
}}}function aE(){var aG=new RegExp("(?:^|; )("+encodeURIComponent(ax)+")=([^;]*)").exec(document.cookie);
if(aG){return a.util.parseJSON(decodeURIComponent(aG[2]))
}}aC=aE();
if(!aC||a.util.now()-aC.ts>1000){return
}aA=ay.storage()||ay.windowref();
if(!aA){return
}return{open:function(){var aG;
H=setInterval(function(){var aH=aC;
aC=aE();
if(!aC||aH.ts===aC.ts){az(a.util.stringifyJSON({target:"c",type:"close",data:{reason:"error",heir:aH.heir}}))
}},1000);
aG=aA.init();
if(aG){setTimeout(function(){K("opening","local",aB)
},50)
}return aG
},send:function(aG){aA.signal("send",aG)
},localSend:function(aG){aA.signal("localSend",a.util.stringifyJSON({id:G,event:aG}))
},close:function(){if(!au){clearInterval(H);
aA.signal("close");
aA.close()
}}}
}function aa(){var ay,ax="atmosphere-"+L.url,aC={storage:function(){if(!a.util.supportStorage()){return
}var aD=window.localStorage;
return{init:function(){a.util.on("storage.socket",function(aE){aE=aE.originalEvent;
if(aE.key===ax&&aE.newValue){az(aE.newValue)
}})
},signal:function(aE,aF){aD.setItem(ax,a.util.stringifyJSON({target:"c",type:aE,data:aF}))
},get:function(aE){return a.util.parseJSON(aD.getItem(ax+"-"+aE))
},set:function(aE,aF){aD.setItem(ax+"-"+aE,a.util.stringifyJSON(aF))
},close:function(){a.util.off("storage.socket");
aD.removeItem(ax);
aD.removeItem(ax+"-opened");
aD.removeItem(ax+"-children")
}}
},windowref:function(){var aE=ax.replace(/\W/g,""),aD=document.getElementById(aE),aF;
if(!aD){aD=document.createElement("div");
aD.id=aE;
aD.style.display="none";
aD.innerHTML='<iframe name="'+aE+'" />';
document.body.appendChild(aD)
}aF=aD.firstChild.contentWindow;
return{init:function(){aF.callbacks=[az];
aF.fire=function(aG){var aH;
for(aH=0;
aH<aF.callbacks.length;
aH++){aF.callbacks[aH](aG)
}}
},signal:function(aG,aH){if(!aF.closed&&aF.fire){aF.fire(a.util.stringifyJSON({target:"c",type:aG,data:aH}))
}},get:function(aG){return !aF.closed?aF[aG]:null
},set:function(aG,aH){if(!aF.closed){aF[aG]=aH
}},close:function(){}}
}};
function az(aD){var aF=a.util.parseJSON(aD),aE=aF.data;
if(aF.target==="p"){switch(aF.type){case"send":ai(aE);
break;
case"localSend":Z(aE);
break;
case"close":ak();
break
}}}X=function aB(aD){ay.signal("message",aD)
};
function aA(){document.cookie=encodeURIComponent(ax)+"="+encodeURIComponent(a.util.stringifyJSON({ts:a.util.now()+1,heir:(ay.get("children")||[])[0]}))
}ay=aC.storage()||aC.windowref();
ay.init();
if(L.logLevel=="debug"){a.util.debug("Installed StorageService "+ay)
}ay.set("children",[]);
if(ay.get("opened")!=null&&!ay.get("opened")){ay.set("opened",false)
}aA();
H=setInterval(aA,1000);
an=ay
}function K(az,aC,ay){if(L.shared&&aC!="local"){aa()
}if(an!=null){an.set("opened",true)
}ay.close=function(){ak()
};
if(j>0&&az=="re-connecting"){ay.isReopen=true;
ab(T)
}else{if(T.error==null){T.request=ay;
var aA=T.state;
T.state=az;
var ax=T.transport;
T.transport=aC;
var aB=T.responseBody;
z();
T.responseBody=aB;
T.state=aA;
T.transport=ax
}}}function w(ay){ay.transport="jsonp";
var ax=L;
if((ay!=null)&&(typeof(ay)!="undefined")){ax=ay
}D={open:function(){var aA="atmosphere"+(++G);
function az(){var aC=ax.url;
if(ax.dispatchUrl!=null){aC+=ax.dispatchUrl
}var aE=ax.data;
if(ax.attachHeadersAsQueryString){aC=U(ax);
if(aE!=""){aC+="&X-Atmosphere-Post-Body="+encodeURIComponent(aE)
}aE=""
}var aD=document.head||document.getElementsByTagName("head")[0]||document.documentElement;
var aB=document.createElement("script");
aB.src=aC+"&jsonpTransport="+aA;
aB.clean=function(){aB.clean=aB.onerror=aB.onload=aB.onreadystatechange=null;
if(aB.parentNode){aB.parentNode.removeChild(aB)
}};
aB.onload=aB.onreadystatechange=function(){if(!aB.readyState||/loaded|complete/.test(aB.readyState)){aB.clean()
}};
aB.onerror=function(){aB.clean();
ac(0,"maxReconnectOnClose reached")
};
aD.insertBefore(aB,aD.firstChild)
}window[aA]=function(aD){if(ax.reconnect){if(ax.maxRequest==-1||ax.requestCount++<ax.maxRequest){if(!ax.executeCallbackBeforeReconnect){O(D,ax,0)
}if(aD!=null&&typeof aD!="string"){try{aD=aD.message
}catch(aC){}}var aB=u(aD,ax,T);
if(!aB){C(T.responseBody,"messageReceived",200,ax.transport)
}if(ax.executeCallbackBeforeReconnect){O(D,ax,0)
}}else{a.util.log(L.logLevel,["JSONP reconnect maximum try reached "+L.requestCount]);
ac(0,"maxRequest reached")
}}};
setTimeout(function(){az()
},50)
},abort:function(){if(script.clean){script.clean()
}}};
D.open()
}function h(ax){if(L.webSocketImpl!=null){return L.webSocketImpl
}else{if(window.WebSocket){return new WebSocket(ax)
}else{return new MozWebSocket(ax)
}}}function i(){return a.util.getAbsoluteURL(U(L)).replace(/^http/,"ws")
}function av(){var ax=U(L);
return ax
}function F(ay){T.transport="sse";
var ax=av(L.url);
if(L.logLevel=="debug"){a.util.debug("Invoking executeSSE");
a.util.debug("Using URL: "+ax)
}if(L.enableProtocol&&ay){var aA=a.util.now()-L.ctime;
L.lastTimestamp=Number(L.stime)+Number(aA)
}if(ay&&!L.reconnect){if(m!=null){aj()
}return
}try{m=new EventSource(ax,{withCredentials:L.withCredentials})
}catch(az){ac(0,az);
N("SSE failed. Downgrading to fallback transport and resending");
return
}if(L.connectTimeout>0){L.id=setTimeout(function(){if(!ay){aj()
}},L.connectTimeout)
}m.onopen=function(aB){v(L);
if(L.logLevel=="debug"){a.util.debug("SSE successfully opened")
}if(!L.enableProtocol){if(!ay){K("opening","sse",L)
}else{K("re-opening","sse",L)
}}ay=true;
if(L.method=="POST"){T.state="messageReceived";
m.send(L.data)
}};
m.onmessage=function(aC){v(L);
if(aC.origin&&aC.origin!=window.location.protocol+"//"+window.location.host){a.util.log(L.logLevel,["Origin was not "+window.location.protocol+"//"+window.location.host]);
return
}T.state="messageReceived";
T.status=200;
aC=aC.data;
var aB=u(aC,L,T);
if(m.URL){m.interval=100;
m.URL=av(L.url)
}if(!aB){z();
T.responseBody="";
T.messages=[]
}};
m.onerror=function(aB){clearTimeout(L.id);
af(ay);
aj();
if(au){a.util.log(L.logLevel,["SSE closed normally"])
}else{if(!ay){N("SSE failed. Downgrading to fallback transport and resending")
}else{if(L.reconnect&&(T.transport=="sse")){if(j++<L.maxReconnectOnClose){K("re-connecting",L.transport,L);
L.id=setTimeout(function(){F(true)
},L.reconnectInterval);
T.responseBody="";
T.messages=[]
}else{a.util.log(L.logLevel,["SSE reconnect maximum try reached "+j]);
ac(0,"maxReconnectOnClose reached")
}}}}}
}function ag(ay){T.transport="websocket";
if(L.enableProtocol&&ay){var az=a.util.now()-L.ctime;
L.lastTimestamp=Number(L.stime)+Number(az)
}var ax=i(L.url);
if(L.logLevel=="debug"){a.util.debug("Invoking executeWebSocket");
a.util.debug("Using URL: "+ax)
}if(ay&&!L.reconnect){if(W!=null){aj()
}return
}W=h(ax);
if(L.webSocketBinaryType!=null){W.binaryType=L.webSocketBinaryType
}if(L.connectTimeout>0){L.id=setTimeout(function(){if(!ay){var aA={code:1002,reason:"",wasClean:false};
W.onclose(aA);
try{aj()
}catch(aB){}return
}},L.connectTimeout)
}W.onopen=function(aA){v(L);
if(L.logLevel=="debug"){a.util.debug("Websocket successfully opened")
}if(!L.enableProtocol){if(!ay){K("opening","websocket",L)
}else{K("re-opening","websocket",L)
}}ay=true;
W.webSocketOpened=ay;
if(L.method=="POST"){T.state="messageReceived";
W.send(L.data)
}};
W.onmessage=function(aC){v(L);
T.state="messageReceived";
T.status=200;
var aC=aC.data;
var aA=typeof(aC)=="string";
if(aA){var aB=u(aC,L,T);
if(!aB){z();
T.responseBody="";
T.messages=[]
}}else{if(!r(L,aC)){return
}T.responseBody=aC;
z();
T.responseBody=null
}};
W.onerror=function(aA){clearTimeout(L.id)
};
W.onclose=function(aA){clearTimeout(L.id);
if(T.state=="closed"){return
}var aB=aA.reason;
if(aB===""){switch(aA.code){case 1000:aB="Normal closure; the connection successfully completed whatever purpose for which it was created.";
break;
case 1001:aB="The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.";
break;
case 1002:aB="The endpoint is terminating the connection due to a protocol error.";
break;
case 1003:aB="The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).";
break;
case 1004:aB="The endpoint is terminating the connection because a data frame was received that is too large.";
break;
case 1005:aB="Unknown: no status code was provided even though one was expected.";
break;
case 1006:aB="Connection was closed abnormally (that is, with no close frame being sent).";
break
}}a.util.warn("Websocket closed, reason: "+aB);
a.util.warn("Websocket closed, wasClean: "+aA.wasClean);
af(ay);
T.state="closed";
if(au){a.util.log(L.logLevel,["Websocket closed normally"])
}else{if(!ay){N("Websocket failed. Downgrading to Comet and resending")
}else{if(L.reconnect&&T.transport=="websocket"){aj();
if(j++<L.maxReconnectOnClose){K("re-connecting",L.transport,L);
L.id=setTimeout(function(){T.responseBody="";
T.messages=[];
ag(true)
},L.reconnectInterval)
}else{a.util.log(L.logLevel,["Websocket reconnect maximum try reached "+L.requestCount]);
a.util.warn("Websocket error, reason: "+aA.reason);
ac(0,"maxReconnectOnClose reached")
}}}}}
}function r(aA,az){var ax=true;
if(a.util.trim(az)!=0&&aA.enableProtocol&&aA.firstMessage){aA.firstMessage=false;
var ay=az.split(aA.messageDelimiter);
var aB=ay.length==2?0:1;
aA.uuid=a.util.trim(ay[aB]);
aA.stime=a.util.trim(ay[aB+1]);
ax=false;
if(aA.transport!="long-polling"){al(aA)
}}else{al(aA)
}return ax
}function v(ax){clearTimeout(ax.id);
if(ax.transport!="polling"){ax.id=setTimeout(function(){af(true);
aj();
A()
},ax.timeout)
}}function ac(ax,ay){aj();
clearTimeout(L.id);
T.state="error";
T.reasonPhrase=ay;
T.responseBody="";
T.status=ax;
T.messages=[];
z()
}function u(aB,aA,ax){if(!r(L,aB)){return true
}if(aB.length==0){return true
}if(aA.trackMessageLength){aB=ax.partialMessage+aB;
var az=[];
var ay=aB.indexOf(aA.messageDelimiter);
while(ay!=-1){var aD=a.util.trim(aB.substring(0,ay));
var aC=parseInt(aD);
if(isNaN(aC)){throw'message length "'+aD+'" is not a number'
}ay+=aA.messageDelimiter.length;
if(ay+aC>aB.length){ay=-1
}else{az.push(aB.substring(ay,ay+aC));
aB=aB.substring(ay+aC,aB.length);
ay=aB.indexOf(aA.messageDelimiter)
}}ax.partialMessage=aB;
if(az.length!=0){ax.responseBody=az.join(aA.messageDelimiter);
ax.messages=az;
return false
}else{ax.responseBody="";
ax.messages=[];
return true
}}else{ax.responseBody=aB
}return false
}function N(ax){a.util.log(L.logLevel,[ax]);
if(typeof(L.onTransportFailure)!="undefined"){L.onTransportFailure(ax,L)
}else{if(typeof(a.util.onTransportFailure)!="undefined"){a.util.onTransportFailure(ax,L)
}}L.transport=L.fallbackTransport;
var ay=L.connectTimeout==-1?0:L.connectTimeout;
if(L.reconnect&&L.transport!="none"||L.transport==null){L.method=L.fallbackMethod;
T.transport=L.fallbackTransport;
L.fallbackTransport="none";
L.id=setTimeout(function(){q()
},ay)
}else{ac(500,"Unable to reconnect with fallback transport")
}}function U(az,ax){var ay=L;
if((az!=null)&&(typeof(az)!="undefined")){ay=az
}if(ax==null){ax=ay.url
}if(!ay.attachHeadersAsQueryString){return ax
}if(ax.indexOf("X-Atmosphere-Framework")!=-1){return ax
}ax+=(ax.indexOf("?")!=-1)?"&":"?";
ax+="X-Atmosphere-tracking-id="+ay.uuid;
ax+="&X-Atmosphere-Framework="+b;
ax+="&X-Atmosphere-Transport="+ay.transport;
if(ay.trackMessageLength){ax+="&X-Atmosphere-TrackMessageSize=true"
}if(ay.lastTimestamp!=undefined){ax+="&X-Cache-Date="+ay.lastTimestamp
}else{ax+="&X-Cache-Date="+0
}if(ay.contentType!=""){ax+="&Content-Type="+ay.contentType
}if(ay.enableProtocol){ax+="&X-atmo-protocol=true"
}a.util.each(ay.headers,function(aA,aC){var aB=a.util.isFunction(aC)?aC.call(this,ay,az,T):aC;
if(aB!=null){ax+="&"+encodeURIComponent(aA)+"="+encodeURIComponent(aB)
}});
return ax
}function ap(){if(a.util.browser.msie){if(typeof XMLHttpRequest=="undefined"){XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")
}catch(ax){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")
}catch(ax){}try{return new ActiveXObject("Microsoft.XMLHTTP")
}catch(ax){}throw new Error("This browser does not support XMLHttpRequest.")
}
}}return new XMLHttpRequest()
}function al(ax){if(!ax.isOpen){ax.isOpen=true;
K("opening",ax.transport,ax)
}else{if(ax.isReopen){ax.isReopen=false;
K("re-opening",ax.transport,ax)
}}}function p(az){var ax=L;
if((az!=null)||(typeof(az)!="undefined")){ax=az
}ax.lastIndex=0;
ax.readyState=0;
if((ax.transport=="jsonp")||((ax.enableXDR)&&(a.util.checkCORSSupport()))){w(ax);
return
}if(a.util.browser.msie&&a.util.browser.version<10){if((ax.transport=="streaming")){ax.enableXDR&&window.XDomainRequest?M(ax):at(ax);
return
}if((ax.enableXDR)&&(window.XDomainRequest)){M(ax);
return
}}var aA=function(){ax.lastIndex=0;
if(ax.reconnect&&j++<ax.maxReconnectOnClose){K("re-connecting",az.transport,az);
O(ay,ax,az.reconnectInterval)
}else{ac(0,"maxReconnectOnClose reached")
}};
if(ax.force||(ax.reconnect&&(ax.maxRequest==-1||ax.requestCount++<ax.maxRequest))){ax.force=false;
var ay=ap();
ay.hasData=false;
f(ay,ax,true);
if(ax.suspend){s=ay
}if(ax.transport!="polling"){T.transport=ax.transport;
ay.onabort=function(){af(true)
};
ay.onerror=function(){T.error=true;
try{T.status=XMLHttpRequest.status
}catch(aC){T.status=500
}if(!T.status){T.status=500
}aj();
if(!T.errorHandled){aA()
}}
}ay.onreadystatechange=function(){if(au){return
}T.error=null;
var aD=false;
var aI=false;
if(a.util.browser.opera&&ax.transport=="streaming"&&ax.readyState>2&&ay.readyState==4){aj();
aA();
return
}ax.readyState=ay.readyState;
if(ax.transport=="streaming"&&ay.readyState>=3){aI=true
}else{if(ax.transport=="long-polling"&&ay.readyState===4){aI=true
}}v(L);
if((!ax.enableProtocol||!az.firstMessage)&&ax.transport!="polling"&&ay.readyState==2){al(ax)
}if(aI){var aC=0;
if(ay.readyState!=0){aC=ay.status>1000?0:ay.status
}if(aC>=300||aC==0){T.errorHandled=true;
aj();
aA();
return
}var aG=ay.responseText;
if(a.util.trim(aG).length==0&&ax.transport=="long-polling"){if(!ay.hasData){aA()
}else{ay.hasData=false
}return
}ay.hasData=true;
ad(ay,L);
if(ax.transport=="streaming"){if(!a.util.browser.opera){var aF=aG.substring(ax.lastIndex,aG.length);
aD=u(aF,ax,T);
ax.lastIndex=aG.length;
if(aD){return
}}else{a.util.iterate(function(){if(T.status!=500&&ay.responseText.length>ax.lastIndex){try{T.status=ay.status;
T.headers=a.util.parseHeaders(ay.getAllResponseHeaders());
ad(ay,L)
}catch(aK){T.status=404
}v(L);
T.state="messageReceived";
var aJ=ay.responseText.substring(ax.lastIndex);
ax.lastIndex=ay.responseText.length;
aD=u(aJ,ax,T);
if(!aD){z()
}I(ay,ax)
}else{if(T.status>400){ax.lastIndex=ay.responseText.length;
return false
}}},0)
}}else{aD=u(aG,ax,T)
}try{T.status=ay.status;
T.headers=a.util.parseHeaders(ay.getAllResponseHeaders());
ad(ay,ax)
}catch(aH){T.status=404
}if(ax.suspend){T.state=T.status==0?"closed":"messageReceived"
}else{T.state="messagePublished"
}var aE=az.transport!="streaming";
if(aE&&!ax.executeCallbackBeforeReconnect){O(ay,ax,0)
}if(T.responseBody.length!=0&&!aD){z()
}if(aE&&ax.executeCallbackBeforeReconnect){O(ay,ax,0)
}I(ay,ax)
}};
try{ay.send(ax.data);
ah=true
}catch(aB){a.util.log(ax.logLevel,["Unable to connect to "+ax.url])
}}else{if(ax.logLevel=="debug"){a.util.log(ax.logLevel,["Max re-connection reached."])
}ac(0,"maxRequest reached")
}}function f(az,aA,ay){var ax=aA.url;
if(aA.dispatchUrl!=null&&aA.method=="POST"){ax+=aA.dispatchUrl
}ax=U(aA,ax);
ax=a.util.prepareURL(ax);
if(ay){az.open(aA.method,ax,aA.async);
if(aA.connectTimeout>-1){aA.id=setTimeout(function(){if(aA.requestCount==0){aj();
C("Connect timeout","closed",200,aA.transport)
}},aA.connectTimeout)
}}if(L.withCredentials){if("withCredentials" in az){az.withCredentials=true
}}if(!L.dropAtmosphereHeaders){az.setRequestHeader("X-Atmosphere-Framework",a.util.version);
az.setRequestHeader("X-Atmosphere-Transport",aA.transport);
if(aA.lastTimestamp!=undefined){az.setRequestHeader("X-Cache-Date",aA.lastTimestamp)
}else{az.setRequestHeader("X-Cache-Date",0)
}if(aA.trackMessageLength){az.setRequestHeader("X-Atmosphere-TrackMessageSize","true")
}az.setRequestHeader("X-Atmosphere-tracking-id",aA.uuid)
}if(aA.contentType!=""){az.setRequestHeader("Content-Type",aA.contentType)
}a.util.each(aA.headers,function(aB,aD){var aC=a.util.isFunction(aD)?aD.call(this,az,aA,ay,T):aD;
if(aC!=null){az.setRequestHeader(aB,aC)
}})
}function O(ay,az,aA){if(az.reconnect||(az.suspend&&ah)){var ax=0;
if(ay&&ay.readyState!=0){ax=ay.status>1000?0:ay.status
}T.status=ax==0?204:ax;
T.reason=ax==0?"Server resumed the connection or down.":"OK";
az.id=setTimeout(function(){p(az)
},aA)
}}function ab(ax){ax.state="re-connecting";
Y(ax)
}function M(ax){if(ax.transport!="polling"){B=S(ax);
B.open()
}else{S(ax).open()
}}function S(az){var ay=L;
if((az!=null)&&(typeof(az)!="undefined")){ay=az
}var aE=ay.transport;
var aD=0;
var ax=new window.XDomainRequest();
var aB=function(){if(ay.transport=="long-polling"&&(ay.reconnect&&(ay.maxRequest==-1||ay.requestCount++<ay.maxRequest))){ax.status=200;
M(ay)
}};
var aC=ay.rewriteURL||function(aG){var aF=/(?:^|;\s*)(JSESSIONID|PHPSESSID)=([^;]*)/.exec(document.cookie);
switch(aF&&aF[1]){case"JSESSIONID":return aG.replace(/;jsessionid=[^\?]*|(\?)|$/,";jsessionid="+aF[2]+"$1");
case"PHPSESSID":return aG.replace(/\?PHPSESSID=[^&]*&?|\?|$/,"?PHPSESSID="+aF[2]+"&").replace(/&$/,"")
}return aG
};
ax.onprogress=function(){aA(ax)
};
ax.onerror=function(){if(ay.transport!="polling"){aj();
if(j++<ay.maxReconnectOnClose){ay.id=setTimeout(function(){K("re-connecting",az.transport,az);
M(ay)
},ay.reconnectInterval)
}else{ac(0,"maxReconnectOnClose reached")
}}};
ax.onload=function(){};
var aA=function(aF){clearTimeout(ay.id);
var aH=aF.responseText;
aH=aH.substring(aD);
aD+=aH.length;
if(aE!="polling"){ay.id=setTimeout(function(){j=ay.maxReconnectOnClose;
af(true);
A();
aj()
},ay.timeout);
var aG=u(aH,ay,T);
if(aE=="long-polling"&&a.util.trim(aH)==0){return
}if(ay.executeCallbackBeforeReconnect){aB()
}if(!aG){C(T.responseBody,"messageReceived",200,aE)
}if(!ay.executeCallbackBeforeReconnect){aB()
}}};
return{open:function(){var aF=ay.url;
if(ay.dispatchUrl!=null){aF+=ay.dispatchUrl
}aF=U(ay,aF);
ax.open(ay.method,aC(aF));
if(ay.method=="GET"){ax.send()
}else{ax.send(ay.data)
}if(ay.connectTimeout>-1){ay.id=setTimeout(function(){if(ay.requestCount==0){aj();
C("Connect timeout","closed",200,ay.transport)
}},ay.connectTimeout)
}},close:function(){ax.abort()
}}
}function at(ax){B=t(ax);
B.open()
}function t(aA){var az=L;
if((aA!=null)&&(typeof(aA)!="undefined")){az=aA
}var ay;
var aB=new window.ActiveXObject("htmlfile");
aB.open();
aB.close();
var ax=az.url;
if(az.dispatchUrl!=null){ax+=az.dispatchUrl
}if(az.transport!="polling"){T.transport=az.transport
}return{open:function(){var aC=aB.createElement("iframe");
ax=U(az);
if(az.data!=""){ax+="&X-Atmosphere-Post-Body="+encodeURIComponent(az.data)
}ax=a.util.prepareURL(ax);
aC.src=ax;
aB.body.appendChild(aC);
var aD=aC.contentDocument||aC.contentWindow.document;
ay=a.util.iterate(function(){try{if(!aD.firstChild){return
}var aG=aD.body?aD.body.lastChild:aD;
var aI=function(){var aK=aG.cloneNode(true);
aK.appendChild(aD.createTextNode("."));
var aJ=aK.innerText;
aJ=aJ.substring(0,aJ.length-1);
return aJ
};
if(!aD.body||!aD.body.firstChild||aD.body.firstChild.nodeName.toLowerCase()!=="pre"){var aF=aD.head||aD.getElementsByTagName("head")[0]||aD.documentElement||aD;
var aE=aD.createElement("script");
aE.text="document.write('<plaintext>')";
aF.insertBefore(aE,aF.firstChild);
aF.removeChild(aE);
aG=aD.body.lastChild
}if(az.closed){az.isReopen=true
}ay=a.util.iterate(function(){var aK=aI();
if(aK.length>az.lastIndex){v(L);
T.status=200;
T.error=null;
aG.innerText="";
var aJ=u(aK,az,T);
if(aJ){return""
}C(T.responseBody,"messageReceived",200,az.transport)
}az.lastIndex=0;
if(aD.readyState==="complete"){af(true);
K("re-connecting",az.transport,az);
az.id=setTimeout(function(){at(az)
},az.reconnectInterval);
return false
}},null);
return false
}catch(aH){T.error=true;
K("re-connecting",az.transport,az);
if(j++<az.maxReconnectOnClose){az.id=setTimeout(function(){at(az)
},az.reconnectInterval)
}else{ac(0,"maxReconnectOnClose reached")
}aB.execCommand("Stop");
aB.close();
return false
}})
},close:function(){if(ay){ay()
}aB.execCommand("Stop");
af(true)
}}
}function ai(ax){if(o!=null){k(ax)
}else{if(s!=null||m!=null){g(ax)
}else{if(B!=null){V(ax)
}else{if(D!=null){R(ax)
}else{if(W!=null){E(ax)
}}}}}}function l(ay,ax){if(!ax){ax=am(ay)
}ax.transport="polling";
ax.method="GET";
ax.async=false;
ax.reconnect=false;
ax.force=true;
ax.suspend=false;
p(ax)
}function k(ax){o.send(ax)
}function y(ay){if(ay.length==0){return
}try{if(o){o.localSend(ay)
}else{if(an){an.signal("localMessage",a.util.stringifyJSON({id:G,event:ay}))
}}}catch(ax){a.util.error(ax)
}}function g(ay){var ax=am(ay);
p(ax)
}function V(ay){if(L.enableXDR&&a.util.checkCORSSupport()){var ax=am(ay);
ax.reconnect=false;
w(ax)
}else{g(ay)
}}function R(ax){g(ax)
}function Q(ax){var ay=ax;
if(typeof(ay)=="object"){ay=ax.data
}return ay
}function am(ay){var az=Q(ay);
var ax={connected:false,timeout:60000,method:"POST",url:L.url,contentType:L.contentType,headers:L.headers,reconnect:true,callback:null,data:az,suspend:false,maxRequest:-1,logLevel:"info",requestCount:0,withCredentials:L.withCredentials,transport:"polling",isOpen:true,attachHeadersAsQueryString:true,enableXDR:L.enableXDR,uuid:L.uuid,dispatchUrl:L.dispatchUrl,enableProtocol:false,messageDelimiter:"|",maxReconnectOnClose:L.maxReconnectOnClose};
if(typeof(ay)=="object"){ax=a.util.extend(ax,ay)
}return ax
}function E(ax){var aA=Q(ax);
var ay;
try{if(L.dispatchUrl!=null){ay=L.webSocketPathDelimiter+L.dispatchUrl+L.webSocketPathDelimiter+aA
}else{ay=aA
}W.send(ay)
}catch(az){W.onclose=function(aB){};
aj();
N("Websocket failed. Downgrading to Comet and resending "+ay);
g(ax)
}}function Z(ay){var ax=a.util.parseJSON(ay);
if(ax.id!=G){if(typeof(L.onLocalMessage)!="undefined"){L.onLocalMessage(ax.event)
}else{if(typeof(a.util.onLocalMessage)!="undefined"){a.util.onLocalMessage(ax.event)
}}}}function C(aA,ax,ay,az){T.responseBody=aA;
T.transport=az;
T.status=ay;
T.state=ax;
z()
}function ad(ax,aA){if(!aA.readResponsesHeaders&&!aA.enableProtocol){aA.lastTimestamp=a.util.now();
aA.uuid=G;
return
}try{var az=ax.getResponseHeader("X-Cache-Date");
if(az&&az!=null&&az.length>0){aA.lastTimestamp=az.split(" ").pop()
}var ay=ax.getResponseHeader("X-Atmosphere-tracking-id");
if(ay&&ay!=null){aA.uuid=ay.split(" ").pop()
}if(aA.headers){a.util.each(L.headers,function(aD){var aC=ax.getResponseHeader(aD);
if(aC){T.headers[aD]=aC
}})
}}catch(aB){}}function Y(ax){ar(ax,L);
ar(ax,a.util)
}function ar(ay,az){switch(ay.state){case"messageReceived":j=0;
if(typeof(az.onMessage)!="undefined"){az.onMessage(ay)
}break;
case"error":if(typeof(az.onError)!="undefined"){az.onError(ay)
}break;
case"opening":if(typeof(az.onOpen)!="undefined"){az.onOpen(ay)
}break;
case"messagePublished":if(typeof(az.onMessagePublished)!="undefined"){az.onMessagePublished(ay)
}break;
case"re-connecting":if(typeof(az.onReconnect)!="undefined"){az.onReconnect(L,ay)
}break;
case"re-opening":if(typeof(az.onReopen)!="undefined"){az.onReopen(L,ay)
}break;
case"fail-to-reconnect":if(typeof(az.onFailureToReconnect)!="undefined"){az.onFailureToReconnect(L,ay)
}break;
case"unsubscribe":case"closed":var ax=typeof(L.closed)!="undefined"?L.closed:false;
if(typeof(az.onClose)!="undefined"&&!ax){az.onClose(ay)
}L.closed=true;
break
}}function af(ax){if(T.state!="closed"){T.state="closed";
T.responseBody="";
T.messages=[];
T.status=!ax?501:200;
z()
}}function z(){var az=function(aC,aD){aD(T)
};
if(o==null&&X!=null){X(T.responseBody)
}L.reconnect=L.mrequest;
var ax=typeof(T.responseBody)=="string";
var aA=(ax&&L.trackMessageLength)?(T.messages.length>0?T.messages:[""]):new Array(T.responseBody);
for(var ay=0;
ay<aA.length;
ay++){if(aA.length>1&&aA[ay].length==0){continue
}T.responseBody=(ax)?a.util.trim(aA[ay]):aA[ay];
if(o==null&&X!=null){X(T.responseBody)
}if(T.responseBody.length==0&&T.state=="messageReceived"){continue
}Y(T);
if(d.length>0){if(L.logLevel=="debug"){a.util.debug("Invoking "+d.length+" global callbacks: "+T.state)
}try{a.util.each(d,az)
}catch(aB){a.util.log(L.logLevel,["Callback exception"+aB])
}}if(typeof(L.callback)=="function"){if(L.logLevel=="debug"){a.util.debug("Invoking request callbacks")
}try{L.callback(T)
}catch(aB){a.util.log(L.logLevel,["Callback exception"+aB])
}}}}this.subscribe=function(ax){aw(ax);
q()
};
this.execute=function(){q()
};
this.close=function(){ak()
};
this.disconnect=function(){A()
};
this.getUrl=function(){return L.url
};
this.push=function(az,ay){if(ay!=null){var ax=L.dispatchUrl;
L.dispatchUrl=ay;
ai(az);
L.dispatchUrl=ax
}else{ai(az)
}};
this.getUUID=function(){return L.uuid
};
this.pushLocal=function(ax){y(ax)
};
this.enableProtocol=function(ax){return L.enableProtocol
};
this.request=L;
this.response=T
}};
a.subscribe=function(f,i,h){if(typeof(i)=="function"){a.addCallback(i)
}if(typeof(f)!="string"){h=f
}else{h.url=f
}var g=new a.AtmosphereRequest(h);
g.execute();
e[e.length]=g;
return g
};
a.unsubscribe=function(){if(e.length>0){var f=[].concat(e);
for(var h=0;
h<f.length;
h++){var g=f[h];
g.close();
clearTimeout(g.response.request.id)
}}e=[];
d=[]
};
a.unsubscribeUrl=function(g){var f=-1;
if(e.length>0){for(var j=0;
j<e.length;
j++){var h=e[j];
if(h.getUrl()==g){h.close();
clearTimeout(h.response.request.id);
f=j;
break
}}}if(f>=0){e.splice(f,1)
}};
a.addCallback=function(f){if(a.util.inArray(f,d)==-1){d.push(f)
}};
a.removeCallback=function(g){var f=a.util.inArray(g,d);
if(f!=-1){d.splice(f,1)
}};
a.util={browser:{},parseHeaders:function(g){var f,i=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,h={};
while(f=i.exec(g)){h[f[1]]=f[2]
}return h
},now:function(){return new Date().getTime()
},isArray:function(f){return Object.prototype.toString.call(f)==="[object Array]"
},isBinary:function(g){var f=Object.prototype.toString.call(g);
return f==="[object Blob]"||f==="[object ArrayBuffer]"
},isFunction:function(f){return Object.prototype.toString.call(f)==="[object Function]"
},getAbsoluteURL:function(f){var g=document.createElement("div");
g.innerHTML='<a href="'+f+'"/>';
return encodeURI(decodeURI(g.firstChild.href))
},prepareURL:function(g){var h=a.util.now();
var f=g.replace(/([?&])_=[^&]*/,"$1_="+h);
return f+(f===g?(/\?/.test(g)?"&":"?")+"_="+h:"")
},trim:function(f){if(!String.prototype.trim){return f.toString().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ")
}else{return f.toString().trim()
}},param:function(j){var h,f=[];
function i(k,l){l=a.util.isFunction(l)?l():(l==null?"":l);
f.push(encodeURIComponent(k)+"="+encodeURIComponent(l))
}function g(l,m){var k;
if(a.util.isArray(m)){a.util.each(m,function(o,n){if(/\[\]$/.test(l)){i(l,n)
}else{g(l+"["+(typeof n==="object"?o:"")+"]",n)
}})
}else{if(Object.prototype.toString.call(m)==="[object Object]"){for(k in m){g(l+"["+k+"]",m[k])
}}else{i(l,m)
}}}for(h in j){g(h,j[h])
}return f.join("&").replace(/%20/g,"+")
},supportStorage:function(){var g=window.localStorage;
if(g){try{g.setItem("t","t");
g.removeItem("t");
return window.StorageEvent&&!a.util.browser.msie&&!(a.util.browser.mozilla&&a.util.browser.version.split(".")[0]==="1")
}catch(f){}}return false
},iterate:function(h,g){var i;
g=g||0;
(function f(){i=setTimeout(function(){if(h()===false){return
}f()
},g)
})();
return function(){clearTimeout(i)
}
},each:function(l,m,g){var k,h=0,j=l.length,f=a.util.isArray(l);
if(g){if(f){for(;
h<j;
h++){k=m.apply(l[h],g);
if(k===false){break
}}}else{for(h in l){k=m.apply(l[h],g);
if(k===false){break
}}}}else{if(f){for(;
h<j;
h++){k=m.call(l[h],h,l[h]);
if(k===false){break
}}}else{for(h in l){k=m.call(l[h],h,l[h]);
if(k===false){break
}}}}return l
},extend:function(j){var h,g,f;
for(h=1;
h<arguments.length;
h++){if((g=arguments[h])!=null){for(f in g){j[f]=g[f]
}}}return j
},on:function(h,g,f){if(h.addEventListener){h.addEventListener(g,f,false)
}else{if(h.attachEvent){h.attachEvent("on"+g,f)
}}},off:function(h,g,f){if(h.removeEventListener){h.removeEventListener(g,f,false)
}else{if(h.detachEvent){h.detachEvent("on"+g,f)
}}},log:function(h,g){if(window.console){var f=window.console[h];
if(typeof f=="function"){f.apply(window.console,g)
}}},warn:function(){a.util.log("warn",arguments)
},info:function(){a.util.log("info",arguments)
},debug:function(){a.util.log("debug",arguments)
},error:function(){a.util.log("error",arguments)
},xhr:function(){try{return new window.XMLHttpRequest()
}catch(g){try{return new window.ActiveXObject("Microsoft.XMLHTTP")
}catch(f){}}},parseJSON:function(f){return !f?null:window.JSON&&window.JSON.parse?window.JSON.parse(f):new Function("return "+f)()
},stringifyJSON:function(i){var l=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,j={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function g(f){return'"'+f.replace(l,function(m){var n=j[m];
return typeof n==="string"?n:"\\u"+("0000"+m.charCodeAt(0).toString(16)).slice(-4)
})+'"'
}function h(f){return f<10?"0"+f:f
}return window.JSON&&window.JSON.stringify?window.JSON.stringify(i):(function k(q,p){var o,n,f,m,s=p[q],r=typeof s;
if(s&&typeof s==="object"&&typeof s.toJSON==="function"){s=s.toJSON(q);
r=typeof s
}switch(r){case"string":return g(s);
case"number":return isFinite(s)?String(s):"null";
case"boolean":return String(s);
case"object":if(!s){return"null"
}switch(Object.prototype.toString.call(s)){case"[object Date]":return isFinite(s.valueOf())?'"'+s.getUTCFullYear()+"-"+h(s.getUTCMonth()+1)+"-"+h(s.getUTCDate())+"T"+h(s.getUTCHours())+":"+h(s.getUTCMinutes())+":"+h(s.getUTCSeconds())+'Z"':"null";
case"[object Array]":f=s.length;
m=[];
for(o=0;
o<f;
o++){m.push(k(o,s)||"null")
}return"["+m.join(",")+"]";
default:m=[];
for(o in s){if(hasOwn.call(s,o)){n=k(o,s);
if(n){m.push(g(o)+":"+n)
}}}return"{"+m.join(",")+"}"
}}})("",{"":i})
},checkCORSSupport:function(){if(a.util.browser.msie&&!window.XDomainRequest){return true
}else{if(a.util.browser.opera&&a.util.browser.version<12){return true
}}var f=navigator.userAgent.toLowerCase();
var g=f.indexOf("android")>-1;
if(g){return true
}return false
}};
c=a.util.now();
(function(){var g=navigator.userAgent.toLowerCase(),f=/(chrome)[ \/]([\w.]+)/.exec(g)||/(webkit)[ \/]([\w.]+)/.exec(g)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(g)||/(msie) ([\w.]+)/.exec(g)||g.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(g)||[];
a.util.browser[f[1]||""]=true;
a.util.browser.version=f[2]||"0";
if(a.util.browser.msie||(a.util.browser.mozilla&&a.util.browser.version.split(".")[0]==="1")){a.util.storage=false
}})();
a.util.on(window,"unload",function(f){a.unsubscribe()
});
a.util.on(window,"keypress",function(f){if(f.which===27){f.preventDefault()
}});
a.util.on(window,"offline",function(){a.unsubscribe()
});
window.atmosphere=a
})();