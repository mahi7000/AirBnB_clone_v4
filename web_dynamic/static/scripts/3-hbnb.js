$(document).ready(function () {
  const amenityIds = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).prop('checked')) {
      amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete amenityIds[$(this).attr('data-id')];
    }
    if (Object.keys(amenityIds).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      $('div.amenities h4').text(Object.values(amenityIds).join(', '));
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data['status'] == 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: funtion (data) {
      for (let place of data) {
        $('.places').append('<article><div class="title"><h2>' + place['name'] + '<h2><div class="price_by_night">' + place['price_by_night'] + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place['max_guest'] + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place['number_rooms'] + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place['number_bathrooms'] + ' Bathroom</div></div><div class="user"><div class="description">' + place['description'] + '</div></article>');
      }
    }
  });
});
