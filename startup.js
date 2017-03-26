﻿// Check for touch enabled device, returns true if touch events exists
var is_touch_device = 'ontouchstart' in document.documentElement;
var cPass = false;
var startTime, endTime;
var downloadSize = 27; //29 kb
var minSpeed = 30; // Set minimum connection speed (percentage that is acceptable)
var cper = 0;
var cTxt = 'Untested';
var oldstate = false;
var myInterval = null;
var checkingURL = false;



$(document).ready(function () {


    $('#loadmsg').html('Testing Connection');
    $('.indicator').css('display', 'block');
    $('#test_signal').delay(600).fadeIn(600);

    //window.plugin.email.open({
    //    to: ['max.mustermann@appplant.de'],
    //    cc: ['erika.mustermann@appplant.de'],
    //    bcc: ['john.doe@appplant.com', 'jane.doe@appplant.com'],
    //    subject: 'Greetings',
    //    body: 'How are you? Nice greetings from Leipzig'
    //});

    var handleExists = function (exists) {
        checkingURL = false;
        //do more stuff based on the boolean value of exists
        if (exists) {

            try{
                setTimeout(clearInterval(myInterval), 500);
                window.location.href = "Main.html";
            }
            catch (err)
            {

            }
            // var ref = window.open('http://mobilepricingdev.mohawkind.com', '_self', 'toolbar=no,location=no');
            //window.plugins.ChildBrowser.showWebPage('http://mobilepricingdev.mohawkind.com',
            //                        {
            //                            showLocationBar: false,
            //                            showNavigationBar: false,
            //                            showAddress: false
            //                        });
           
        }
        else
        {

            $('#loadmsg').html('Internet Destination Is Not Available.');
            $("#try_again").css('display', 'block');
        }
    }


    function urlExists(url) {
        if (checkingURL == false) {
            checkingURL = true;
            $.ajax({
                type: 'HEAD',
                url: url,
                success: function () {
                    handleExists(true);
                },
                error: function () {
                    handleExists(false);
                }
            });
        }
        else
        {
            //skip it this time
        }
    }

    
    $('#try_again').css('display', 'none');

    var NetworkUpCounter = 0;

    myInterval = setInterval(function () {
        oldState = navigator.onLine ? 'online' : 'offline';
        if (oldState == "offline") {
            NetworkUpCounter = 0;
            $('#loadmsg').html('Network Connection Down.');
        }
        else {

            NetworkUpCounter += 1;
            //skip the first time through to give network time to settle;
            if (NetworkUpCounter > 1) {
                $('#loadmsg').html('Network Ready.');
                // clearInterval(myInterval);
                urlExists('http://mobilepricingqa.mohawkind.com');

            }
        }
    }, 1250);

});
// Document.ready: END
