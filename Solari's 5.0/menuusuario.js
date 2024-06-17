// script.js
document.getElementById('change-pic-btn').addEventListener('click', function() {
    document.getElementById('upload-profile-pic').click();
});

document.getElementById('upload-profile-pic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-pic').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});