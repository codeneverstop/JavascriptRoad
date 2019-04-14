const canvas_bkg = document.getElementById('bkg');
const context_bkg = canvas_bkg.getContext('2d');    /*never change*/

context_bkg.fillstyle = '#000';
context_bkg.fillRect(0, 0, canvas_bkg.width, canvas_bkg.height);