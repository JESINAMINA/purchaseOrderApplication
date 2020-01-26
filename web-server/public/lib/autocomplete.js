fetch('http://localhost:3000/autocomplete?').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            alert('Error,please contact the admin')
        } else {
            data = data.data
            var options = '';

            for (var i = 0; i < data.length; i++)
                options += '<option value="' + data[i] + '" />';
            document.getElementById('names').innerHTML = options;
        }
    })
})