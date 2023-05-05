function preDownload(jsonObj){
    const sJson = JSON.stringify(jsonObj, null, "\t");
    const blob = new Blob([sJson])
    const aElement = document.getElementById('download');
      aElement.setAttribute('download', 'person.json');
      const href = URL.createObjectURL(blob);
      aElement.href = href;
      aElement.setAttribute('target', '_blank');
}
export default preDownload;