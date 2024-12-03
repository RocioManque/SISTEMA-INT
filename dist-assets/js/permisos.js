const spreadsheetId = '1gzp1hLfZaZMQarKdxPnvtHeyTioqhd3vatL-UmFnlUI';
const apiKey = 'AIzaSyBLuMXUjJmU3XLfErAIH-iI4pXzmSnl-0E'; // clave de API
const range1 = 'Sheet1'; // Nombre de la primera pestaña
const range2 = 'Sheet2'; // Nombre de la segunda pestaña

// URL de la API de Google Sheets
const url1 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range1}?key=${apiKey}`;
const url2 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range2}?key=${apiKey}`;

$(document).ready(function() {
    $('#login').on('click', function() {
        // Obtiene los valores del formularioCUIT

        clearStoredToken();
        fetchData();
    });
});
    
function fetchData() {

    const user = $('#user').val(); // Email del formulario
const pass = $('#pass').val(); // CUIT del formulario


    const findUser1 = (rows1) => {
        return rows1.find(row => {
            const user = $('#user').val(); // Email del formulario
            const pass = $('#pass').val(); // CUIT del formulario

            const rowUser = (row[1] || ""); // Suponiendo que el email está en la columna 1
            const rowPass = row[3] || ""; // Suponiendo que el CUIT está en la columna 3
            
            return rowUser === user && rowPass === pass;
            
        });
    };
    const findUser2 = (rows2) => {
        const user = $('#user').val(); // Email del formulario
        const pass = $('#pass').val(); // CUIT del formulario
        console.log(user,pass)
        return rows2.find(row => {
            const rowUser  = (row[2] || ""); // Suponiendo que el email está en la columna 1
            const rowPass = row[1] || ""; // Suponiendo que el CUIT está en la columna 4
            
            return rowUser  === user && rowPass === pass;
        
        });
    };

    Promise.all([fetch(url1), fetch(url2)])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => {
            const rows1 = data[0].values; 
            const rows2 = data[1].values; 

            // Busca el usuario en ambas pestañas
            const user = findUser1(rows1) || findUser2(rows2);//


            if (user) {

                if(user.length <= 5 ){
                    const userData = {
                        name: user[0], 
                        permission: user[3], 
                    };
                    console.log(userData)
                    localStorage.setItem('userData', JSON.stringify(userData));

                    if(userData.permission === 'mesa de entrada'){
                    
                    window.location.href = '/html/casosPendientes.html';
                    }else{
                     window.location.href = '/html/casosEnGestion.html';
                    }

                }else{
                    const userData = {
                        name: user[2], 
                        permission: 'PAS', 
                      
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));
                    window.location.href = '/html/casosPas.html';
                }
  
            }else{
                   alert('El usuario no existe')
            }
        })
        .catch(error => console.error('Error al cargar', error));
}
function clearStoredToken() {
    localStorage.removeItem('google_access_token');
}
// });
    // });
//  });
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             rows = data.values; // Asignar datos a rows
//             console.log(rows);
//         })
//         .catch(error => console.error('Error al cargar datos de Google Sheets:', error));
// }

// function authenticateUser(e) {
//     e.preventDefault(); // Evitar el envío del formulario
//     const user = $('#user').val();
//     const pass = $('#pass').val();

//     try {
//         let isAuthenticated = false; // Define isAuthenticated
//         let userData = {}; // Para almacenar los datos del usuario

//         rows.forEach(row => {
//             if (row[0] === user && row[4] === pass) {
//                 isAuthenticated = true;
//                 userData = {
//                     name: row[0], // Asumiendo que el nombre está en la columna 0
//                     permission: row[3] 
//                 };
//                 return false; // Interrumpir bucle forEach en caso de autenticación exitosa
//             }
//         });

//         if (isAuthenticated) {
//             // Almacenar información del usuario en localStorage
//             localStorage.setItem('userData', JSON.stringify(userData));
//             // Redirigir a la siguiente pantalla
//             window.location.href = '/html/layout3/nuevoCaso.html'; // Cambia a tu página siguiente
//         } else {
//             alert('Usuario o contraseña incorrectos');
//         }
//     } catch (error) {
//         console.error("Error al obtener datos de Google Sheets:", error);
//         alert("Error al conectar con Google Sheets.");
//     }
 