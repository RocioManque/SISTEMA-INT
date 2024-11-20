<?php
// Simulación de credenciales correctas
$usuario_correcto = "admin";
$contraseña_correcta = "1234";

// Capturamos los datos del formulario
$usuario = $_POST['usuario'];
$contraseña = $_POST['contraseña'];

// Validamos las credenciales
if ($usuario === $usuario_correcto && $contraseña === $contraseña_correcta) {
    // Redirigir a la página de "Oficina Virtual"
    header("Location: oficina-virtual.html");
    exit();
} else {
    // Si las credenciales son incorrectas, mostrar un mensaje de error y redirigir de nuevo al login
    echo "<script>
            alert('Usuario o contraseña incorrectos');
            window.location.href = 'index.html';
          </script>";
}
?>
