var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy
function previewFile() {
const preview = document.getElementById('img1');
const file = document.querySelector('input[type=file]').files[0];
const reader = new FileReader();
reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;
    }, false);

    if (file) {
    reader.readAsDataURL(file);
    }
}
var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');
canvas.width = $('#img').width();
canvas.crossOrigin = "Anonymous";
canvas.height = $('#img').height();
ctx.drawImage($('#img').get(0), 0, 0);
var x = $('#img1').width();
var y = $('#img1').height();
var ratio = x/y
$(document).on('click','#submit',function(){
    $('#preview').css('display','inline-block');
    //redraw image
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage($('#img').get(0), 0, 0);
    ctx.drawImage($('#img1').get(0), 50, 120, 150, 150*ratio);
    //refill text
    ctx.fillStyle = "black";
    ctx.textAlign = 'center';
    ctx.font = "70pt alex";
    ctx.fillText($('#name').val(),660,460);
    ctx.font = '30pt verdana'
    ctx.fillText(today,260,815);  
});
$(document).on('click','#preview',function(){
    $('#canvas').css('display','inline-block');
    $('#dpdf').css('display','inline-block');
    $('#djpg').css('display','inline-block');
})
function downloadjpg(){ 
    var canvas = document.getElementById('canvas');
    canvas.crossOrigin = "Anonymous";
    var image = canvas.toDataURL();  
    var tmpLink = document.createElement( 'a' );     
    tmpLink.download = 'certificate.jpg';
    tmpLink.href = image;
    document.body.appendChild( tmpLink );     
    tmpLink.click();     
    document.body.removeChild( tmpLink );
}
function downloadpdf(){
    var canvas = document.getElementById('canvas');
    canvas.crossOrigin = "Anonymous";
    var img = canvas.toDataURL('image/JPEG',1.0); 
    var pdf = new jsPDF('p','mm');
    pdf.text(30,30,'this is our program')
    pdf.addImage(img, 'JPEG', 0, 0, 210, 297); 
    pdf.save('certificate.pdf')
}