console.log('Start');
jQuery(document).ready(function ($) {

    const request = axios.get('http://csc225.mockable.io/consoles');
    request.then(function (response) {

        const consoles = response.data;
        const consolesHtml = consoles.map(function (em) {

            const { id, name, price, country, releaseYear, image, } = em; // deconstruction

            return `
            <div data-id="${id}" class="media p-2 m-2 bg-white rounded border border-dark">
                <div class="media-body text-right">
                    <h5 class="mt-0 mr-4">${name}:</h5>
                </div><br>
                <div>
                    <img src="${image}" class="mr-3 img-fluid img-150 rounded" alt="Photo of ${name}">
                </div>                
            </div>`;

        }).join('');

        //Just remove the div because I no longer need it.
        $('#page-loading').remove();
        
        // Write consolesHtml into consoles div
        $('#consoles').html(consolesHtml);

        // Add thistext now so it's not visible while page loads
        $('#click-console').html('Click a console below for details');
       
    });

    jQuery('#consoles').on('click', '.media', function () {

        const id = $(this).attr('data-id');
        const consoleUrl = `http://csc225.mockable.io/consoles/${id}`;
        const loaderImage = `<img src="/images/ajax-page-loader.gif" alt="Loading Page"><p>Retreiving Information</p>`;

        // Empty #console div
        $('#console').html('');

        // Show loader image and text
        $('#console').html(loaderImage);


        axios.get(consoleUrl).then(function (response) {

            //Clear loader image and text
            $('#console').html('');

            const { id, name, price, country, releaseYear, image } = response.data;

            // Insert the Information details card into #console div
            $('#console').html(`
            <div class="container">
                <div class="card border-dark" style="width: 18rem;">
                    <img src="${image}" alt="Photo of ${name}">
                    <div class="card-body">
                        <p class="m-0">Name: ${name}</p>
                        <p class="m-0">Price: $${price}</p>
                        <p class="m-0">Country: ${country}</p>
                        <p class="m-0">Release Year: ${releaseYear}</p>
                    </div>
                </div>
            </div>`);

        }).catch(function (error) {
            // Something better should happen here
            alert(error);
        });
    });
});

