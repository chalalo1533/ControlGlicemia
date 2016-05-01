 function addZero(i) {
  if (i < 10) {
  i = "0" + i;
  }
  return i;
}
 
 function display_ct() {
  var strcount
  var x = new Date()
  var hora = addZero(x.getHours()) + ":" + addZero(x.getMinutes()) + ":" +  addZero(x.getSeconds());
  document.getElementById('TxHora').value = hora;
  tt=display_c();
  } 



 
 
 var mytime;


 function display_c(){
  var refresh=1000; // Refresh rate in milli seconds
  mytime=setTimeout('display_ct()',refresh)

}



 $(document).ready(function(){
   var base;
   var itemIdEtiqueta;
   var itemEtiqueta;
   var IdRegistro;




 

  
$(document).on('click',"#TxHora", function(){
  clearTimeout(mytime);
}); 

$("#left-panel").on("panelbeforeopen",function(){
//  ObtieneConfiguracion();
}); 

$("#left-panel").on("panelbeforeclose",function(){
 //guardaConfiguracion();
}); 
 function addDays(theDate, days) {
    return  new Date(new Date(theDate).getTime() + days*24*60*60*1000);
  } 

Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + days);
  return this;
};

  $( "#escala" ).on( "swiperight", swiperightHandler ); 

    function swiperightHandler(event){
  $    .mobile.changePage($("#principal"));
  }
   function validaCampos(){
if ($("#TxPrimerDia").val().length==0){
 alert("Debe Seleccionar el primer día de �ltimo periodo");
 return false;
}else{
return true;
} }

   
   function obtieneNombreEtiqueta(id){
        if (id==1) {return "Antes Desayuno";}
        if (id==2) {return "Después Desayuno";}
        if (id==3) {return "Antes Almuerzo";}
        if (id==4) {return "Después Almuerzo";}
        if (id==5) {return "Antes Cena";}
        if (id==6) {return "Después Cena";}
        if (id==7) {return "Nocturna";}
  }
   
   $(document).on('pagebeforeshow',"#configuracion",function(){
         console.log("pagebeforeshow configuracion");
         ObtieneConfiguracion();
   });
   $(document).on('pagebeforeshow',"#estadisticas",function(){
         console.log("pagebeforeshow estadisticas");
         ObtieneEstadisticas();
   });
  
   $(document).on('pagebeforeshow',"#principal",function(){
    console.log("pagebeforeshow");
   
   if (localStorage.getItem('SMedida')){        
         $("#umedida").text(localStorage.getItem('SMedida')); 
   }else{
          $("#umedida").text("mg/dl");
   }
  
   $(document).on("swipeleft swiperight", "#principal", function(e) {
       if ($(".ui-page-active" ).jqmData("panel") !== "open" ) {
            if ( e.type === "swipeleft" ) {
                $("#right-panel").panel("open");
            } else if ( e.type === "swiperight") {
                $("#left-panel").panel("open");
            }
        }
    });   
});
   $(document).on('click',"#TxHora", function(){
       clearTimeout(mytime);
}); 

   $(document).on('click',"#BtEnviar1", function(){
      var fecha= $("#lbFecha").text();
      var descripcion =$("#lbDescripcion").text();
      var valor =$("#lbValor").text();
      var etiqueta =  $("#lbEtiqueta").text();
      var body = "Medición de Glicemia, Fecha "+ fecha +", "+ etiqueta +" "+ descripcion +", valor:"+ valor;
  
      var createEmail = new MozActivity({
      name: "new",
          data: {
              type : "mail",
              url: "mailto:?subject=Medición%20de%20Glicemia&body=" + body,
              body: body, // for SMS
              number: "", // empty number for SMS
          type: [
            "websms/sms", "mail"
          ]
            
          }
      });
 });
   
  $(document).on('click',"#btcompartir",function(){
  
   var twitterURL = encodeURI("https://twitter.com/intent/tweet?text=test tweet");
        var openURL = new MozActivity({
            name: "view",
            data: {
               type: "url", 
               url: twitterURL
            }
        })
   });
   
   $(document).on('pagebeforeshow',"#pageRegistros",function(){
      obtieneEtiquetasLista();
    });     $(document).on('pagebeforeshow',"#detalleRegistro",function(){
        var transaction = base.transaction(["registros"],'readwrite');
        var objectStore = transaction.objectStore("registros");
        var request = objectStore.get(parseInt(IdRegistro));
        request.onerror = function(event) {
          alert("Unable to retrieve daa from database!");
        };
        request.onsuccess = function(event) {
          // Do something with the request.result!
          if(request.result) {
             //   alert("Name: " + request.result.fecha);
              var fecha =  request.result.fecha;
              var hora =  request.result.hora;
              var descripcion =request.result.descripcion;
              var valor =request.result.valor;
              var etiqueta= request.result.etiqueta;
              var unidadmedida =request.result.unidadmedida;
            
              $("#lbFecha").text(fecha+" "+hora);
              $("#lbDescripcion").text(descripcion);
              $("#lbValor").text(valor +" " + unidadmedida);
              $("#lbEtiqueta").text(obtieneNombreEtiqueta(etiqueta));
            
          } else {
                alert("Error al recuperar los registros!!");  
          }
        };    });
   


  $(document).on('vclick',".itemRegistro", function(){
       IdRegistro=$(this).attr('data-value');
       $.mobile.changePage("#detalleRegistro");
  });
     
   function f(fecha){
      return fecha.split("-")[2]+'/'+fecha.split("-")[1]+'/'+fecha.split("-")[0];
   }
 
   $(document).on('vclick','#BtAgregar',function(){
     var fecha = $("#TxFecha").val();
     var hora = $("#TxHora").val();
     var descripcion =$("#TxDescripcion").val();
     var valor = $("#TxMedida").val();
     var etiqueta= $("#Etiqueta").val();
     var unidadmedida =$("#umedida").text();
     if (valor==""){
         alert ("Error:Debe ingresar un valor");
         return false;
     }  
     if (parseInt(valor)<40){
         alert ("Error: Valor muy pequeño");
         return false;
     }  
     if (parseInt(valor)>700){
         alert ("Error: Valor muy elevado");
         return false;
     }  
           
     guardaRegistro(f(fecha), hora, descripcion,valor,etiqueta,unidadmedida)
 });
    
   $(document).on('click','#BtBorrarTodo',function(){
     borrarTodosRegistros(); 
   });
     
$(document).on('vclick','#BtBorrarRegistro',function(){
 if (confirm("¿Esta seguro que desea borrar este registro?")){ 
           var transaction = base.transaction(['registros'], 'readwrite');
           var store = transaction.objectStore('registros');
           var request = store.delete(parseInt(IdRegistro));
           request.onsuccess = function () {
           alert("Registro Eliminado");
           $.mobile.back();
       }
		   request.onerror = function (e) {
			   alert("Error mientras eliminaba la etiqueta : " + e.value);
			};
     }
		});   $("#BtCancelarEtiqueta").click(function(){
        $.mobile.changePage("#pageEtiquetas");
  });
   
 function initializeDB() {
  if (window.indexedDB) {
	  console.log("IndexedDB support is there");
	}
	else {
	   alert("Indexed DB is not supported. Where are you trying to run this ? ");
	} 	var request = indexedDB.open('diabetes', 1);
	request.onsuccess = function (e) {
	   base = e.target.result
	}
  
	request.onerror = function (e) {
    console.log("Error:" +e);
	};
 
	request.onupgradeneeded = function (e) {
     base = e.target.result;
    var objectStore = base.createObjectStore('registros', { keyPath: 'id', autoIncrement: true });
    console.log("Registros creados");
  
	};
}
  
 function guardaRegistro(fecha, hora, descripcion,valor,etiqueta,unidadmedida){
 var transaction = base.transaction(['registros'], 'readwrite');
  var registro = {};
  registro.fecha=fecha;
  registro.hora= hora;
  registro.valor=valor;
  registro.etiqueta=etiqueta;
  registro.unidadmedida=unidadmedida;
  registro.descripcion = descripcion;
  var store = transaction.objectStore('registros');
  var request = store.add(registro);
  request.onsuccess = function (e) {
        alert("Registro Almacenado");
  };
  request.onerror = function (e) {
       alert("Error guardando registro. Razon : " + e.value);
  } 
}
   
function borrarRegistro(id){
  if (confirm("¿Esta seguro que desea borrar este Registro?")){ 
		   var transaction = base.transaction(['registros'], 'readwrite');
		   var store = transaction.objectStore('registros');
       var request = store.delete(itemIdEtiqueta);
		   request.onsuccess = function () {
			   alert("Registro Eliminado");
		     obtieneEtiquetasLista();
         $.mobile.changePage("#pageEtiquetas");
       }
		   request.onerror = function (e) {
			   alert("Error mientras eliminaba el registro : " + e.value);
			};
     }
} function borrarTodosRegistros(){
   if (confirm("Atención, esta operación no se puede deshacer! ¿está seguro?")){ 
		   var transaction = base.transaction(['registros'], 'readwrite');
		   var store = transaction.objectStore('registros');
      
       var request = store.clear();
		   request.onsuccess = function () {
			  alert("Todos los registros fueron eliminados.");
		    // obtieneEtiquetas();
        $.mobile.changePage("#principal");
         
       }
		   request.onerror = function (e) {
			   alert("Error mientras eliminaba la etiqueta : " + e.value);
			};
     }
  }   
  
  
function guardaEtiqueta(descripcion,msg){   var transaction = base.transaction([ 'etiquetas' ], 'readwrite');
  var etiqueta = {};
  etiqueta.descripcion = descripcion;
  var store = transaction.objectStore('etiquetas');
  var request = store.add(etiqueta);
   console.log("guardar " + descripcion);
  request.onsuccess = function (e) {
      if (msg==1){
        alert("Etiqueta Registrada");
      }else{
        console.log("Etiqueta "+ descripcion +" registrada");
      }
  };
  request.onerror = function (e) {
       alert("Error guardando etiqueta. Razon : " + e.value);
  } 
}
   
 function obtieneEtiquetasLista(){
    var valormaximo=0;
    var cantidad=0;
    $("#ListaRegistros").empty();
       
    if (localStorage.getItem('maximo')){         
        valormaximo=localStorage.getItem('maximo'); 
    }else{
         valormaximo=0;
    }
     
    if (localStorage.getItem('cantidad')){         
        cantidad=localStorage.getItem('cantidad'); 
    }else{
        cantidad=50; 
      
    }
       // cantidad=100;
   // $("#cantt").text(cantidad);
    var transaction = base.transaction(['registros']);
	  var store = transaction.objectStore('registros');
    var i=0;
       
    store.openCursor(null,"prev").onsuccess = function (e) {
	     var cursor = e.target.result;
       if ((cursor)&&(i<cantidad)) {
		     i++; 
         var value = cursor.value;
         if (valormaximo>0){
              if(value.valor>valormaximo){
                 $("#ListaRegistros").append('<li value="' + value.id + '"><a class="itemRegistro"  data-transition="none"  data-value="'
                                             +value.id+'" href="#detalleRegistro"><div style="color:red;font-size:30px;">'+ value.valor +'</div><div>'
                                             + value.fecha+' ' +value.hora+'</div></a></li>');
      		    }else{
                $("#ListaRegistros").append('<li value="' + value.id + '"><a class="itemRegistro"  data-transition="none"  data-value="'
                                             +value.id+'" href="#detalleRegistro"><div style="color:black;font-size:30px;">'+ value.valor +'</div><div>'
                                            + value.fecha+' ' +value.hora+'</div></a></li>');
              }
         }else{
             
                $("#ListaRegistros").append('<li value="' + value.id + '"><a class="itemRegistro"  data-transition="none" data-value="'
                                             +value.id+'"  href="#detalleRegistro"><div style="color:black;font-size:30px;">'+ value.valor +'</div><div>'
                                             + value.fecha+' ' +value.hora+'</div></a></li>');
         
          }
          cursor.continue();
			  }
        $('#ListaRegistros').listview('refresh');
          $("#cantt").text(i);
			};
}   
     function ObtieneEstadisticas(){
     console.log("estada");
  var antes_desayuno_cantidad=0;
  var despues_desayuno_cantidad=0;
  var antes_almuerzo_cantidad=0;
  var despues_almuerzo_cantidad=0;
  var antes_cena_cantidad=0;
  var despues_cena_cantidad=0;
  var nocturna_cantidad=0;
  var medida="mg/dl";   var valor=0;
  var antes_desayuno_valor=0;
  var despues_desayuno_valor=0;
  var antes_almuerzo_valor=0;
  var despues_almuerzo_valor=0;
  var antes_cena_valor=0;
  var despues_cena_valor=0;
  var nocturna_valor=0;
   
  var transaction = base.transaction(['registros']);
  var store = transaction.objectStore('registros');
  
     if (localStorage.getItem('SMedida')){ 
        medida = localStorage.getItem('SMedida'); 
    }
  
  var i=0;
       
   store.openCursor().onsuccess = function (e) {
       var cursor = e.target.result;
       console.log(cursor);
       if (cursor) {
          i++; 
          var value = cursor.value;
          console.log(value.valor);
          valor =valor  + parseInt(value.valor);
          console.log(valor);
          if (value.etiqueta==1){
                  antes_desayuno_cantidad++;
                  antes_desayuno_valor=antes_desayuno_valor +parseInt(value.valor);
          } 
          if (value.etiqueta==2){
                  despues_desayuno_cantidad++;
                  despues_desayuno_valor=despues_desayuno_valor + parseInt(value.valor);
          }           if (value.etiqueta==3){
                  antes_almuerzo_cantidad++;
                  antes_almuerzo_valor=antes_almuerzo_valor + parseInt(value.valor);
          } 
          if (value.etiqueta==4){
                  despues_almuerzo_cantidad++;
                  despues_almuerzo_valor=despues_almuerzo_valor + parseInt(value.valor);
          }           if (value.etiqueta==5){
                  antes_cena_cantidad++;
                  antes_cena_valor=antes_cena_valor + parseInt(value.valor);
          }           if (value.etiqueta==6){
                  despues_cena_cantidad++;
                  despues_cena_valor=despues_cena_valor +parseInt(value.valor);
          }           if (value.etiqueta==7){
                  nocturna_cantidad++;
                  nocturna_valor=nocturna_valor + parseInt(value.valor);
          }          cursor.continue();
     }      if(!cursor){       $("#ande_cant").text(antes_desayuno_cantidad);
      var prom =0;
      if (antes_desayuno_cantidad>0){
        prom=antes_desayuno_valor/antes_desayuno_cantidad; 
      }
      $("#ande_prom").text(Math.floor(prom) +" " +medida);    
      $("#dede_cant").text(despues_desayuno_cantidad);
      var prom =0;
      if (despues_desayuno_cantidad>0){
        prom=despues_desayuno_valor/despues_desayuno_cantidad; 
      }
      $("#dede_prom").text(Math.floor(prom) +" " +medida); 
      $("#anal_cant").text(antes_almuerzo_cantidad);
      var prom =0;
      if (antes_almuerzo_cantidad>0){
        prom=antes_almuerzo_valor/antes_almuerzo_cantidad; 
      }
      $("#anal_prom").text(Math.floor(prom) +" " +medida); 
      $("#deal_cant").text(despues_almuerzo_cantidad);
      var prom =0;
      if (despues_almuerzo_cantidad>0){
        prom=despues_almuerzo_valor/despues_almuerzo_cantidad; 
      }
      $("#deal_prom").text(Math.floor(prom) +" " +medida);       $("#ance_cant").text(antes_cena_cantidad);
      var prom =0;
      if (antes_cena_cantidad>0){
        prom=antes_cena_valor/antes_cena_cantidad; 
      }
      $("#ance_prom").text(Math.floor(prom) +" " +medida);        $("#dece_cant").text(despues_cena_cantidad);
      var prom =0;
      if (despues_cena_cantidad>0){
        prom=despues_cena_valor/despues_cena_cantidad; 
      }
      $("#dece_prom").text(Math.floor(prom) +" " +medida);
      
      
      $("#nocto_cant").text(nocturna_cantidad);
      var prom =0;
      if (nocturna_cantidad>0){
        prom=nocturna_valor/nocturna_cantidad; 
      }
      $("#nocto_prom").text(Math.floor(prom) +" " +medida); 
      $("#total_cant").text(i);
      var prom =0;
      if (i>0){
        prom=valor/i; 
      }
      $("#total_prom").text(Math.floor(prom) +" " +medida);
   }
} }
   
 $("#BtGuardarConfiguracion").click(function(){
    localStorage.setItem('SMedida',$("#SMedida").val());
    localStorage.setItem('cantidad',$("#cantidad").val());
    localStorage.setItem('maximo',$("#TxMax").val());
    alert("Configuración Registrada");
    $.mobile.changePage("#principal");
  });    
        function ObtieneConfiguracion(){
    if (localStorage.getItem('SMedida')){ 
         $("#SMedida").val(localStorage.getItem('SMedida')); 
    }else{
          $("#SMedida").val("mg/dl");
    }
    if (localStorage.getItem('cantidad')){ 
    
        $("#cantidad").val(localStorage.getItem('cantidad')); 
    }else{
        $("#cantidad").val(50);
        $("#cantidad").selectmenu("refresh");
    }    if (localStorage.getItem('maximo')){ 
         $("#TxMax").val(localStorage.getItem('maximo')); 
    }else{
          $("#TxMax").val("");
    }
} function setFecha()
{
  var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {	dd='0'+dd} 
	if(mm<10) {mm='0'+mm} 
  today = yyyy+'-'+mm+"-"+dd;   
	$("#TxFecha").val(today);
}  initializeDB();

 setFecha();
 display_ct(); 
 });