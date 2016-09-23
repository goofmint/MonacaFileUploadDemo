var application_key = "YOUR_APPLICATION_KEY";
var client_key = "YOUR_CLIENT_KEY";

var ncmb = new NCMB(application_key, client_key);

function onDiviceReady() {
  
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataUrl = reader.result;
    document.getElementById("image").src = dataUrl;
  }
  
  // ファイルを選択したら実行
  var photo = document.getElementById("photo");
  photo.addEventListener('change', function(e) {
    e.preventDefault();
    var file = e.target.files[0];
    document.getElementById("filename").value = file.name
    reader.readAsDataURL(file);
  }, false);
  
  // ファイルアップロード
  var submit = document.getElementById("submit");
  submit.addEventListener("click", function(e) {
    e.preventDefault();
    // ファイル名、ファイルデータを取得
    var fileName = document.getElementById("filename").value;
    var fileData = dataURItoBlob(document.getElementById("image").src);
    
    // アップロード
    ncmb.File.upload(fileName, fileData)
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.error(err);
      })
  }, false)
  
  // ファイルダウンロード
  var view = document.getElementById("view");
  view.addEventListener("click", function(e) {
    e.preventDefault();
    // ファイル名を取得
    var fileName = document.getElementById("filename").value;
    
    // ダウンロード（バイナリなのでblobを指定）
    ncmb.File.download(fileName, "blob")
      .then(function(blob) {
        // ファイルリーダーにデータを渡す
        reader.readAsDataURL(blob);
      })
      .catch(function(err) {
        console.error(err);
      })
  }, false);
}

// dataURIをBlobに変換
function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

document.addEventListener("deviceready", onDiviceReady, false);
