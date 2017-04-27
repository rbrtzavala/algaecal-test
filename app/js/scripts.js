(function($) {
  // Get current date and time when page loads
  var today = new Date(),
      day = today.getDay(),
      // Keeps hour to 2 digit
      hour = ('0' + today.getHours()).substr(-2),
      // Check for Pacific Time Zone, UTC hours - 7
      ptzHour = ('0' +( today.getUTCHours() - 7)).substr(-2),
      mins = ('0' + today.getMinutes()).substr(-2),
      time = `${ptzHour}${mins}`;


  // Grab "Speak to Our Bone..." CTA in header
  var tapToTalk = document.querySelector('.tap-to-talk'),
      phone = tapToTalk.querySelector('.phone'),
      speakCTA = tapToTalk.querySelector('.speak-to-our');

  // Make JSON request to  API
  $.getJSON('https://www.algaecal.com/wp-json/acf/v2/options', function(json) {
      // Save JSON data to variable myData
      var myData = json.acf,
          phoneNum = myData['default_phone_number'],
          full7yrcopy = myData['7yr_full_copy'],
          officeTime = myData['office_hours'];

      // Inject phone number to page from API
       phone.innerHTML = phoneNum;

      //var Inject 7 year guarantee long form to Bootstrap modal on page
      var modal7yr = document.querySelector('.modal-body').innerHTML = full7yrcopy;

      if (time >= officeTime[day]['starting_time'] && time <= officeTime[day]['closing_time']) {
        speakCTA.classList.remove('hide');
      }
      // console.log(time);
    });

    // console.log(`Today is ${day} and the hour is ${hour} and ptz is ${ptzHour}`);
})(jQuery);
