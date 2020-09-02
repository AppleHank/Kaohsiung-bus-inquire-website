$(document).ready(function(){
    $('.content .table_back').hide();

});
function switchs(){
    $('.table_come').show();
    $('.table_back').hide();
}

function switchsback() {
    $('.table_back').show();
    $('.table_come').hide();
}

function Search() {
    $.ajax({
        type: 'GET',
        url: 'http://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/Kaohsiung?$format=JSON', //欲呼叫之API網址(此範例為台鐵車站資料)
        dataType: 'json',
        headers: GetAuthorizationHeader(),
        success: function (Data) {
            $('body').text(JSON.stringify(Data[1].RouteName.Zh_tw));
        }
    });
};

function GetAuthorizationHeader() {
    var AppID = '924c821e9fe148bea0f855ca9e846adb';
    var AppKey = '9_gKDJv9xseAmS-4_sZqNU-xyzo';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}



