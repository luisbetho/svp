// Initialize Cloud Firestore through Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyB6a62o5a3XumBoZRiELuC1OuzQ2sil87I",
        authDomain: "app-para-svp.firebaseapp.com",
        projectId: "app-para-svp"
    });
  
    var db = firebase.firestore();

    function guardar(){
        var nombre= document.getElementById('nombre').value;
        var apellido= document.getElementById('apellido').value;
        var grado=document.getElementById('grado').value;
        var seccion=document.getElementById('seccion').value;
        var dni= document.getElementById('dni').value;
        var celular= document.getElementById('celular').value;
        var correo= document.getElementById('correo').value;
        db.collection("Alumnos").add({
            nombres: nombre,
            apellidos: apellido,
            grado:grado,
            seccion:seccion,
            documento: dni,
            cel:celular,
            email:correo 
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value='';
            document.getElementById('apellido').value='';
            document.getElementById('grado').value='';
            document.getElementById('seccion').value='';
            document.getElementById('dni').value='';
            document.getElementById('celular').value='';
            document.getElementById('correo').value='';
        })
        .catch(function(error) {
            console.error("Error al agregar registro: ", error);
        });    
    }

// leer documentos

var tabla = document.getElementById('tabla');
db.collection("Alumnos").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML+=`
        <tr>
            
            <td>${doc.data().nombres}</td>
            <td>${doc.data().apellidos}</td>
            <td>${doc.data().grado}</td>
            <td>${doc.data().seccion}</td>
            <td>${doc.data().documento}</td>
            <td>${doc.data().cel}</td>
            <td>${doc.data().email}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombres}','${doc.data().apellidos}','${doc.data().grado}','${doc.data().seccion}','${doc.data().documento}','${doc.data().cel}','${doc.data().email}')">Editar</button></td>

        </tr>
        `
    });
});

// Borrar datos
function eliminar(id){
    db.collection("Alumnos").doc(id).delete().then(function() {
        console.log("Registro borrado con exito!");
    }).catch(function(error) {
        console.error("Error al borrar registro: ", error);
    });
}

// Actualizar datos
function editar(id,nombre,apellido,grado,seccion,dni,celular,correo){

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido; 
    document.getElementById('grado').value = grado; 
    document.getElementById('seccion').value = seccion; 
    document.getElementById('dni').value = dni; 
    document.getElementById('celular').value = celular; 
    document.getElementById('correo').value = correo;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    
    boton.onclick=function(){
        var washingtonRef = db.collection("Alumnos").doc(id);
    // Set the "capital" field of the city 'DC'

        var nombre= document.getElementById('nombre').value;
        var apellido= document.getElementById('apellido').value;
        var grado= document.getElementById('grado').value;
        var seccion= document.getElementById('seccion').value;
        var dni= document.getElementById('dni').value;
        var celular= document.getElementById('celular').value;
        var correo= document.getElementById('correo').value;

        return washingtonRef.update({
            nombres: nombre,
            apellidos: apellido,
            grado:grado,
            seccion:seccion,
            documento: dni,
            cel:celular,
            email:correo
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value='';
            document.getElementById('apellido').value='';
            document.getElementById('grado').value='';
            document.getElementById('seccion').value='';
            document.getElementById('dni').value='';
            document.getElementById('celular').value='';
            document.getElementById('correo').value='';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        }
}
