/*
 * For minidine/index.html.(copy from global.js)
 * writen by spada.
 */

Parse.initialize("LD5YXs0MuB68HbSzl6QW0RMXKfHlYRNgGx1zi7y8", "lJrNywD6Nwg385fbD2iZXYMu28qMneb75UkYVVJB");

// Userlist data array for filling in info box
// var userListData = [];
var thisOwner = "";
var thisEvent = "testEventId";

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  //showCreateDine();
  populateTable();
  // Username link click
  // $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
  // Add User button click
  // $('#btnAddUser').on('click', addUser);
  // Delete User link click
  // $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
  // $('#inputPic').on('change',tobase64);
  $('#pSend').on('click', saveParticipant);
  // $('#hSend').on('click', createdine);
  // $('#createDineBtn').on('click', checkUser);
});

// Functions =============================================================

// Show createdine Info
// function showCreateDine(event) {

//   $(window).scrollTop(0);

//   // Prevent Link from Firing
//   //event.preventDefault();

//   // Retrieve username from link rel attribute


// };

// Fill table with data
function populateTable() {
  $.getJSON('/users/getList/ievent/'+ thisEvent + '/announced', function(list) {
    console.log(list);
    if (list.length > 0) {
      var winObj = list[0];
      var winList = winObj.winList;
      if (winList.length > 0) {
        $('.scroll').empty();
        for (var i = 0; i < winList.length; i++) {
          $('.scroll').append('<p class="oddColorh3">'+ winList[i].receiptNum +'</p>\
                      <p class="oddColorp">'+ winList[i].name +'</p>');
        }
      }
    }
  });
};
// Show User Info
function showUserInfo(event) {

  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve username from link rel attribute
  var thisUserName = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = userListData.map(function(arrayItem) {
    return arrayItem.username;
  }).indexOf(thisUserName);
  // Get our User Object
  var thisUserObject = userListData[arrayPosition];

  //Populate Info Box
  $('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);

};
// Add User
function addUser(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if ($(this).val() === '') {
      errorCount++;
    }
  });

  // Check and make sure errorCount's still at zero
  if (errorCount === 0) {

    // If it is, compile all user info into one object
    var newUser = {
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'fullname': $('#addUser fieldset input#inputUserFullname').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val(),
      // 'pic':$('#addUser fieldset input#b64').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function(response) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addUser fieldset input').val('');

        // Update the table
        populateTable();

      } else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  } else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};
// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
// function tobase64(e){
//     file=document.getElementById('inputPic').files[0];
    
//     var reader = new FileReader();
//     var url=reader.readAsDataURL(file);
//     var img = new Image();
//     img.crossOrigin = 'Anonymous';
//     img.onload = function(){
//         var canvas = document.createElement('CANVAS');
//         var ctx = canvas.getContext('2d');
//         canvas.height = this.height;
//         canvas.width = this.width;
//         ctx.drawImage(this,0,0);
//         var dataURL = canvas.toDataURL(outputFormat || 'image/png');
//         $('#b64').val(dataURL);
//         canvas = null; 
//     };
//     img.src = url;
// }

/*
 * save participant.
 * writen by spada.
 */
function saveParticipant(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#partForm input').each(function(index, val) {
    if ($(this).val() === '') {
      errorCount++;
    }
    // 發票格式判斷
    if ($(this).attr("id") === "pNum" && !(/^([A-Z]{2}[0-9]{8})/.test($(this).val().toString()))) {
      errorCount++;
    }
  });

  // Check and make sure errorCount's still at zero
  if (errorCount === 0) {

    // If it is, compile all user info into one object
    // 計算名字長度
    var pName = $('#pName').val();
    var two;
    if(pName.toString().match(/[\u2E80-\u9FCC]/g))
      two = pName.toString().match(/[\u2E80-\u9FCC]/g).toString().replace(/,/g,"");
    else
      two = "";
    var one = pName.replace(two,"");
    var count = 2*two.length + one.length;
    var i = 12;
    while(count > 12) {
      pName = pName.slice(0, i);
      if(pName.toString().match(/[\u2E80-\u9FCC]/g))
        two = pName.toString().match(/[\u2E80-\u9FCC]/g).toString().replace(/,/g,"");
      else
        two = "";
      one = pName.replace(two,"");
      count = 2*two.length + one.length;
      i--;
    }
    // 成立participant
    var newPart = {
      'name': pName,
      'phone': $('#pPhone').val(),
      'email': $('#pEmail').val(),
      'receiptNum': $('#pNum').val(),
      'address': $('#pAddr').val(),
      'createTime': new Date(),
      'parent_id': thisEvent,
      // 'pic':$('#addUser fieldset input#b64').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: JSON.stringify(newPart),
      url: '/users/saveParticipant/ievent',
      contentType: 'application/json', //型態才不會轉成字串
      dataType: 'JSON',
      traditional: true //有array、PlainObject、jQuery需要加,key值才不會變
    }).done(function(response) {

      // Check for successful (blank) response
      if (response.msg === '') {
        alert('送出成功！感謝參與！');

        // Clear the form inputs
        $('#partForm input').val('');

        // Clear the list
        // $('#participantList').empty();

        // Update the table
        // populateTable();

      } else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  } else {
    // If errorCount is more than 0, error out
    
    $('#partForm input').each(function(index, val) {
      if ($(this).val() === '') {
        alert('請填寫完整資料');
        $(this).focus();
        return false;
      } else if ($(this).attr("id") === "pNum" && !(/^([A-Z]{2}[0-9]{8})/.test($(this).val().toString()))) {
        alert('發票格式不正確');
        $(this).focus();
        return false;
      }
    });
    return false;
  }
};

/*
 * create Minidine.
 * writen by TK.
 * update at 2015/10/30: add parse user. by spada.
 */
function createdine(event) {

  event.preventDefault();
 
    if(Parse.User.current()) {
      console.log('create by: '+ Parse.User.current().get('name') +'\nid: '+ Parse.User.current().id);
      // Super basic validation - increase errorCount variable if any fields are blank
      var errorCount = 0;
      $('#createForm input').each(function(index, val) {
        if ($(this).val() === '') {
          errorCount++;
        }
      });

      // Check and make sure errorCount's still at zero
      if (errorCount === 0) {

        // If it is, compile all user info into one object
        var cMini = {
          'name': $('#hName').val(),
          'phone': $('#hPhone').val(),
          'date': $('#hDate').val(),
          'time': $('#hTime').val(),
          'restname': $('#hRestName').val(),
          'place': $('#hPlace').val(),
          'createTime' : new Date(),
          'ownerId' : Parse.User.current().id,
          // 'pic':$('#addUser fieldset input#b64').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
          type: 'POST',
          data: cMini,
          url: '/users/cdine',
          dataType: 'JSON'
        }).done(function(response) {
          console.log(response);

          // Check for successful (blank) response
          if (response.msg === '') {
            alert('送出成功！');

            // Clear the form inputs
            $('#createForm input').val('');

            window.location = 'index.html?id='+ response.result._id;


            // Update the table
            // populateTable();

          } else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

          }
        });
      } else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
      }
    } else {
      alert('請先登入！');
      
      // to login page.
      window.location = 'login/m-login/m-login.html?';

    }

};

function checkUser(e) {
  
  e.preventDefault();

  if(Parse.User.current()) {} else {
    alert('請先登入！');
    
    // to login page.
    window.location = '../login/m-login/m-login.html?from=minidine&id='+ thisDine;

  }
};

//抓參數
function getValue(varname) {
  var url = window.location.href;
  try {
    var qparts = url.split('?');
    if (qparts.length === 0) {
      return '';
    }
    var query = qparts[1];
    var vars = query.split('&');
    var value = '';
    for (var i = 0; i < vars.length; i++) {
      var parts = vars[i].split('=');
      if (parts[0] == varname) {
        value = parts[1];
        break;
      }
    }
    value = unescape(value);
    value.replace(/\+/g, ' ');
    return value;
  } catch (err) {
    return '';
  }
};