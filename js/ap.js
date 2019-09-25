// listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e) {
  var siteName, siteUrl, bookmark;

  // get form values
  siteName = document.getElementById('siteName').value;
  siteUrl = document.getElementById('siteUrl').value;
 
  if(!validateFormUrl(siteName, siteUrl)) {
    return false;
  }; 

  bookmark = {
    name: siteName,
    url: siteUrl
  };

  // // local torage test
  // localStorage.setItem('test', 'hello world');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  // test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null) {
    // Init array
    var bookmarks = [];
    // add to array
    bookmarks.push(bookmark);
    // set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // add bookmark to array
    bookmarks.push(bookmark);
    // re-set to local stoarge
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


  }
  // prevent form from submitting
  e.preventDefault();

  // clear form
  clearForm();

  // recall fetchbookmarks to refresh page
  fetchBookmarks();
}

 // delete bookmark
 function deleteBookmark(url) {
  // get bookmarks form local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  
  // loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  // reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // recall fetchbookmarks to refresh page
  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
  // get bookmars from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // build output
  bookmarksResults.innerHTML = '';

  // loop through bookmarks and output them 1 by 1.
  for(var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' +
                                  '<h3>' + name +
                                  ' <a class="btn btn-default"  target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>' +
                                  '</div>';
  }

}

function validateFormUrl(siteName, siteUrl) {
  // required for form
  if(!siteName || !siteUrl) {
   alert('Please fill in the form');
   return false;
 }

 var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
 var regex = new RegExp(expression);

 if(!siteUrl.match(regex)) {
   alert('Please use a valid URL');
   return false;
 }

 return true;
}

function clearForm() {
  document.getElementById('siteName').value='';
  document.getElementById('siteUrl').value='';
}