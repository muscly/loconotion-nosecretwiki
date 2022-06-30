var url = '/';

const regex = /^https:\/\/codingdad.me\/(2[0-9][0-9][0-9])\/([0-9][0-9])\/([0-9][0-9])\/([a-zA-Z0-9_\-]+)/;
if (regex.test( window.location.href))
{
  const match = window.location.href.match(regex);
  url = 'https://codingdad.me/' + match[1] + '-' + match[2] + '-' + match[3] + '-' + match[4];
}

setTimeout(function(){
  window.location.href = url;
}, 3000);