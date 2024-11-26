function crearCae(){

const myHeaders = new Headers();
myHeaders.append("SOAPAction", "http://ar.gov.afip.dif.FEV1/FECAESolicitar");
myHeaders.append("Content-Type", "text/xml;charset=utf-8");
myHeaders.append("Cookie", "f5avraaaaaaaaaaaaaaaa_session_=GOPBDBEBFHEKPJJKAJEJLEKBLKNINPDAHIBDKAGMNMBFBJDKFJMEIACEJKBAMJHPCPIDMCDJEAECBBOIHNEACCGGCDGCEIBLCMFBHHEFLNDLEFMMPGDCMGGOLJJOBDOB; TS010b76f1=01439f1ddfb7404d8fc71afe50d3ee7dd31c9e0e7d19062f668f6073aae72655c63ba8f168eeec1e6383bc5daa7c1aaafc1c4b4af5207ba5b7fbe6345ccf59358e0ea8fc81");

const raw = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"\r\nxmlns:ar=\"http://ar.gov.afip.dif.FEV1/\">\r\n <soapenv:Header/>\r\n <soapenv:Body>\r\n <ar:FECAESolicitar>\r\n <!--Optional:-->\r\n <ar:Auth>\r\n <ar:Token>PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJDTj13c2ZlLCBPPUFGSVAsIEM9QVIiIHVuaXF1ZV9pZD0iMTYxMTQ0OTE5MSIgZ2VuX3RpbWU9IjE3MzIxOTQwMDAiIGV4cF90aW1lPSIxNzMyMjM3MjYwIi8+CiAgICA8b3BlcmF0aW9uIHR5cGU9ImxvZ2luIiB2YWx1ZT0iZ3JhbnRlZCI+CiAgICAgICAgPGxvZ2luIGVudGl0eT0iMzM2OTM0NTAyMzkiIHNlcnZpY2U9IndzZmUiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjMyNTQ0MDkzNTksIENOPWluaXRpbmVyZSIgYXV0aG1ldGhvZD0iY21zIiByZWdtZXRob2Q9IjIyIj4KICAgICAgICAgICAgPHJlbGF0aW9ucz4KICAgICAgICAgICAgICAgIDxyZWxhdGlvbiBrZXk9IjIzMjU0NDA5MzU5IiByZWx0eXBlPSI0Ii8+CiAgICAgICAgICAgIDwvcmVsYXRpb25zPgogICAgICAgIDwvbG9naW4+CiAgICA8L29wZXJhdGlvbj4KPC9zc28+Cg==</ar:Token>\r\n <ar:Sign>Jls7aXxa+T1FVFRPxoAVFltNjCvH28Xr/KQ3c82/XHIoEn9VnqRG37FoyPY/+fPVJfP6HP/uFYpuafH1dzutXVA8n2alPWdo3L1cDNVUmHqNeTpMeqgnP8GbwTpsJ7vh+w2gKt1eMLN4Gk1QH1s3XoRb8Eb81tBqr93hunMhaI8=</ar:Sign>\r\n <ar:Cuit>23254409359</ar:Cuit>\r\n </ar:Auth>\r\n <ar:FeCAEReq>\r\n <ar:FeCabReq>\r\n    <ar:CantReg>1</ar:CantReg>\r\n <ar:PtoVta>12</ar:PtoVta>\r\n <ar:CbteTipo>3</ar:CbteTipo>\r\n </ar:FeCabReq>\r\n <ar:FeDetReq>\r\n <ar:FECAEDetRequest>\r\n <ar:Concepto>1</ar:Concepto>\r\n <ar:DocTipo>80</ar:DocTipo>\r\n <ar:DocNro>20111111112</ar:DocNro>\r\n<ar:CbteDesde>2</ar:CbteDesde>\r\n<ar:CbteHasta>1</ar:CbteHasta>\r\n<ar:CbteFch>20241121</ar:CbteFch>\r\n<ar:ImpTotal>184.05</ar:ImpTotal>\r\n<ar:ImpTotConc>0</ar:ImpTotConc>\r\n<ar:ImpNeto>150</ar:ImpNeto>\r\n<ar:ImpOpEx>0</ar:ImpOpEx>\r\n<ar:ImpTrib>7.8</ar:ImpTrib>\r\n<ar:ImpIVA>26.25</ar:ImpIVA>\r\n<ar:FchServDesde></ar:FchServDesde>\r\n<ar:FchServHasta></ar:FchServHasta>\r\n<ar:FchVtoPago></ar:FchVtoPago>\r\n<ar:MonId>PES</ar:MonId>\r\n<ar:MonCotiz>1</ar:MonCotiz>\r\n<ar:Tributos>\r\n <ar:Tributo>\r\n <ar:Id>99</ar:Id>\r\n<ar:Desc>Impuesto Municipal Matanza</ar:Desc>\r\n<ar:BaseImp>150</ar:BaseImp>\r\n<ar:Alic>5.2</ar:Alic>\r\n<ar:Importe>7.8</ar:Importe>\r\n </ar:Tributo>\r\n </ar:Tributos>\r\n<ar:Iva>\r\n <ar:AlicIva>\r\n <ar:Id>5</ar:Id>\r\n <ar:BaseImp>100</ar:BaseImp>\r\n<ar:Importe>21</ar:Importe>\r\n </ar:AlicIva>\r\n<ar:AlicIva>\r\n <ar:Id>4</ar:Id>\r\n <ar:BaseImp>50</ar:BaseImp>\r\n<ar:Importe>5.25</ar:Importe>\r\n </ar:AlicIva>\r\n </ar:Iva>\r\n</ar:FECAEDetRequest>\r\n </ar:FeDetReq>\r\n </ar:FeCAEReq>\r\n </ar:FECAESolicitar>\r\n </soapenv:Body>\r\n</soapenv:Envelope>";

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://wswhomo.afip.gov.ar/wsfev1/service.asmx", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}