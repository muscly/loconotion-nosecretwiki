const regexURL = /original=(.*)/;
const urlMatch = window.location.href.match(regexURL);
const originalUrl = match[1];

const regexOriginal = /^https:\/\/codingdad.me\/(2[0-9][0-9][0-9])\/([0-9][0-9])\/([0-9][0-9])\/([a-zA-Z0-9_\-]+)/;

var url = '/';
if (regexOriginal.test(originalUrl))
{
  const match = originalUrl.match(regexOriginal);
  url = 'https://codingdad.me/' + match[1] + '-' + match[2] + '-' + match[3] + '-' + match[4];
}

setTimeout(function(){
  window.location.href = url;
}, 3000);