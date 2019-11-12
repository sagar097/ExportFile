import React from 'react';
import DataFormatExport from './DataFormatExport';
import { saveAs } from 'file-saver';
import PdfDocument from './Demo';
import { renderToString } from 'react-dom/server';

 class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isExportEnabled:true
    }
  }

  decodeBase64 = function(s) {
    try {
        var e = {},
            i,
            b = 0,
            c,
            x,
            l = 0,
            a,
            r = '',
            w = String.fromCharCode,
            L = s.length;
        var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        for (i = 0; i < 64; i++) {
            e[A.charAt(i)] = i;
        }
        for (x = 0; x < L; x++) {
            c = e[s.charAt(x)];
            b = (b << 6) + c;
            l += 6;
            while (l >= 8) {
                ((a = (b >>> (l -= 8)) & 0xff) || x < L - 2) && (r += w(a));
            }
        }
        return r;
    } catch {
        return '';
    }
};

  dataURItoBlob = dataURI => {
    // convert base64 to raw binary data held in a string
    var byteString = this.decodeBase64(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
};

  saveToPDF = e => {
    try {
        if (e.data.indexOf('data:') === -1) return;
        saveAs(this.dataURItoBlob(e.data), 'CareGap_Report.pdf');
    } catch (e) {
        console.log(e);
    }
};
print = () => {
    // var provider = this.props.ProviderList.find(f => f.npi == this.state.selectedVisit.npi);
    let string = renderToString(
        <PdfDocument
            // data={Object.keys(this.state.CareGapPDF[this.state.selectedVisit.visituid])
            //     .map(m => this.state.CareGapPDF[this.state.selectedVisit.visituid][m])
            //     .sort(
            //         (a, b) => a.MeasureId.replace(/\D+/g, '') - b.MeasureId.replace(/\D+/g, '')
            //     )}
            // PracticeName={this.props.SelectedPractice.name}
            // Provider={provider.firstname + ' ' + provider.lastname}
            // Patient={`${this.state.selectedPatient.mrn} - ${this.state.selectedPatient.firstname} ${this.state.selectedPatient.lastname}`}
            // Visit={this.state.selectedVisit.visitdate}
            // SelectedPatient={this.state.selectedPatient}
        />
    );
    string =
        // "Download: &nbsp;&nbsp;<button onclick='CreatePDFfromHTML();'>PDF</button>&nbsp;&nbsp;" +
        // "<button onclick='fnExcelReport();'>XLS</button>" +
        '<style>ul{margin-left:-30px} li{margin-left:-15px}</style>' +
        '<div>' +
        string +
        '</div>';
    string += '<script src="./js/async.min.js"></script>';
    string += '<script  src="./js/jquery-3.4.1.slim.min.js"></script>';
    string += '<script src = "./js/jspdf.min.js" ></script > ';

    string += '<script src="./js/html2canvas.js"></script>';
    // eslint-disable-next-line no-multi-str
    // string +=
    // '<script>var Canvas2Image=function(){var t,e,n=(t=document.createElement("canvas"),{canvas:!!(e=t.getContext("2d")),imageData:!!e.getImageData,dataURL:!!t.toDataURL,btoa:!!window.btoa});function r(t,e,n){var r=t.width,a=t.height;null==e&&(e=r),null==n&&(n=a);var o=document.createElement("canvas"),i=o.getContext("2d");return o.width=e,o.height=n,i.drawImage(t,0,0,r,a,0,0,e,n),o}function a(t,e,n,a){return(t=r(t,n,a)).toDataURL(e)}function o(t){document.location.href=t}function i(t){var e=document.createElement("img");return e.src=t,e}function u(t){return"image/"+(t=t.toLowerCase().replace(/jpg/i,"jpeg")).match(/png|jpeg|bmp|gif/)[0]}function c(t){if(!window.btoa)throw"btoa undefined";var e="";if("string"==typeof t)e=t;else for(var n=0;n<t.length;n++)e+=String.fromCharCode(t[n]);return btoa(e)}function g(t){var e=t.width,n=t.height;return t.getContext("2d").getImageData(0,0,e,n)}function f(t,e){return"data:"+e+";base64,"+t}var m=function(t){var e=t.width,n=t.height,r=e*n*3,a=r+54,o=[66,77,255&a,a>>8&255,a>>16&255,a>>24&255,0,0,0,0,54,0,0,0],i=[40,0,0,0,255&e,e>>8&255,e>>16&255,e>>24&255,255&n,n>>8&255,n>>16&255,n>>24&255,1,0,24,0,0,0,0,0,255&r,r>>8&255,r>>16&255,r>>24&255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],u=(4-3*e%4)%4,g=t.data,f="",m=e<<2,v=n,d=String.fromCharCode;do{for(var s=m*(v-1),p="",h=0;h<e;h++){var l=h<<2;p+=d(g[s+l+2])+d(g[s+l+1])+d(g[s+l])}for(var b=0;b<u;b++)p+=String.fromCharCode(0);f+=p}while(--v);return c(o.concat(i))+c(f)},v=function(t,e,i,c){if(n.canvas&&n.dataURL)if("string"==typeof t&&(t=document.getElementById(t)),null==c&&(c="png"),c=u(c),/bmp/.test(c)){var v=g(r(t,e,i));o(f(m(v),"image/octet-stream"))}else{o(a(t,c,e,i).replace(c,"image/octet-stream"))}},d=function(t,e,o,c){if(n.canvas&&n.dataURL){if("string"==typeof t&&(t=document.getElementById(t)),null==c&&(c="png"),c=u(c),/bmp/.test(c)){var v=g(r(t,e,o));return i(f(m(v),"image/bmp"))}return i(a(t,c,e,o))}};return{saveAsImage:v,saveAsPNG:function(t,e,n){return v(t,e,n,"png")},saveAsJPEG:function(t,e,n){return v(t,e,n,"jpeg")},saveAsGIF:function(t,e,n){return v(t,e,n,"gif")},saveAsBMP:function(t,e,n){return v(t,e,n,"bmp")},convertToImage:d,convertToPNG:function(t,e,n){return d(t,e,n,"png")},convertToJPEG:function(t,e,n){return d(t,e,n,"jpeg")},convertToGIF:function(t,e,n){return d(t,e,n,"gif")},convertToBMP:function(t,e,n){return d(t,e,n,"bmp")}}}();</script>';
    string +=
        // eslint-disable-next-line no-multi-str
        '<script>async function CreatePDFfromHTML(){var a=new jsPDF("p","mm"),t=$(".html-content"),e=$("#pdfLogo")[0],n=document.createElement("canvas");n.getContext("2d").drawImage(e,0,0,150,50);var d=n.toDataURL("image/png"),o=(await html2canvas($("#pdfHeaderInfo")[0],{width:794})).toDataURL("image/png");for(i=0;i<t.length;i++)for(var g=await html2canvas(t[i],{width:760}),r=g.height,m=0,c=i;r>0;){var w=document.createElement("canvas");w.width=794,w.height=950,w.getContext("2d").drawImage(g,0,m-10,g.width,m+950,0,0,794,m+950),0!==c&&a.addPage();var h=w.toDataURL("image/png");a.addImage(d,"PNG",5,5),a.text(145,13,"CareGap Report"),a.addImage(o,"PNG",10,20,200,20),a.line(5,38,205,38),a.line(5,39,205,39),a.addImage(h,"PNG",5,40,200,250),a.text(198,293,""+(c+1)),r-=950,m+=950,c++}var s=a.output("datauristring");window.opener.postMessage(s,"*"),setTimeout(function(){window.close()},500)}</script>';
    // string =
    //     string +
    //     '<script>function fnExcelReport(){var e;e=\'<html xmlns:x="urn:schemas-microsoft-com:office:excel">\',e+="<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>",e+="<x:Name>CareGap Report</x:Name>",e+="<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>",e+="</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>",e+=\'<table><tbody><tr><td><table class="table table-bordered" border="1px">\',e+="",e+=\'</table></td><td><td><table class="table" style="text-align: center;">\',e+=$(".html-content").html(),e+="</table></td></tr> <tr><tr/></tbody></table>",e+="</body></html>";var t=window.navigator.userAgent.indexOf("MSIE "),a=new Blob([e],{type:"data:application/vnd.ms-excel"});if(t>0||navigator.userAgent.match(/Trident.*rv:11./))window.navigator.msSaveBlob&&navigator.msSaveBlob(a,"CareGapReport.xls");else{var o=window.URL.createObjectURL(a),r=document.createElement("a");r.href=o,r.setAttribute("download","CareGapReport.xls"),r.click()}}</script>';
    string += '<script>(function() {  CreatePDFfromHTML(); })();</script>';
    window.removeEventListener('message', this.saveToPDF, false);
    window.addEventListener('message', this.saveToPDF, false);
    var wnd = window.open('about:blank', '_blank', 'width=794');
    wnd.document.write(string);

    // const pdf = new jsPDF('p', 'mm', 'a4');

    // pdf.fromHTML(string);
    // pdf.save('pdf');
};
  render() {
    return (
      <React.Fragment>

        <DataFormatExport
          type={['pdf']}
          tooltip='Export listed'
          exportLabel='EXPORT ALL'
          clickHandlers={this.print.bind(this)}
          disabled={
            !this.state.isExportEnabled  
          }
        />
        
        {/* {!isDownloadable && <CircularLoader />} */}
      </React.Fragment>
    )
  }
}

export default App;