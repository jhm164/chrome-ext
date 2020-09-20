$(function(){

  
    var statusVal=0;
    $("body").css({"background":"red"});
    $('#spendAmount').click(function(){
        console.log("hello")
      
       if(statusVal==1){
        $("body").css({"background":"green"});
        // alert(statusVal)
        chrome.runtime.sendMessage({action: "enableProxy"});
       statusVal=0;
       
////////////////////////////////////////////////////////////////
       var canvas;
       canvas = document.getElementById("glcanvas");
       var gl = canvas.getContext("experimental-webgl");
   
       $(".renderer").text(gl.getParameter(gl.RENDERER) );
       $(".vendor").text(gl.getParameter(gl.VENDOR));
       $(".unmaskvendor").text(getUnmaskedInfo(gl).vendor);
       $(".unmaskrenderer").text(getUnmaskedInfo(gl).renderer);
   
   
       function getUnmaskedInfo(gl) {
         var unMaskedInfo = {
           renderer: '',
           vendor: ''
         };
   
         var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
         if (dbgRenderInfo != null) {
           unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
           unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
         }
   
         return unMaskedInfo;
       }
/////////////////////////////////////////////////////
       
       }else if(statusVal==0){
        // alert(statusVal)
        chrome.runtime.sendMessage({action: "disableProxy"});
        statusVal=1;
        $("body").css({"background":"red"});
       }
    });


    


});