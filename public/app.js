$(document).ready(function () {
    $('#appointmentForm').submit(function (event) {
        event.preventDefault(); 
        
        var formData = $(this).serialize();
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/tatto', 
            data: formData,
            success: function (response) {
                
                alert('Cita agendada correctamente');
                $('#appointmentForm')[0].reset(); 
            },
            error: function (error) {
                
                alert('Error al agendar la cita: ' + error.responseText);
            }   
        });
    });
});
