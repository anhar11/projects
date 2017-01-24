$('#modal-id').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var studentId = button.data('studentid') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    //var modal = $(this)
    var mod = document.getElementById('modal-id');
    mod.setAttribute('data-studentid', studentId);
});

$('#deleteStudent').click(function () {
    var modal = document.getElementById('modal-id');
    var studentId = modal.getAttribute('data-studentid');

    $.post('/delete', {
        id: studentId
    }, function (data) {
        //alert(data.success ? "Deleted!" : "Error " + data.err.message);
        if (data.success)
            window.location.reload(true);
        else {
            console.log(data.err);
        }
    })
});