const headers = new Headers();
headers.append("Content-Type", "text/xml;charset=utf-8");
headers.append("SOAPAction", "http://ar.gov.afip.dif.FEV1/FECAESolicitar");

const body = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ar="http://ar.gov.afip.dif.FEV1/">
  <soapenv:Header/>
  <soapenv:Body>
    <ar:FECAESolicitar>
      <ar:Auth>
        <ar:Token>PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJDTj13c2ZlLCBPPUFGSVAsIEM9QVIiIHVuaXF1ZV9pZD0iMjM3MTcxNTIwNSIgZ2VuX3RpbWU9IjE3MzM0OTQ4OTkiIGV4cF90aW1lPSIxNzMzNTM4MTU5Ii8+CiAgICA8b3BlcmF0aW9uIHR5cGU9ImxvZ2luIiB2YWx1ZT0iZ3JhbnRlZCI+CiAgICAgICAgPGxvZ2luIGVudGl0eT0iMzM2OTM0NTAyMzkiIHNlcnZpY2U9IndzZmUiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjMyNTQ0MDkzNTksIENOPWluaXRpbmVyZSIgYXV0aG1ldGhvZD0iY21zIiByZWdtZXRob2Q9IjIyIj4KICAgICAgICAgICAgPHJlbGF0aW9ucz4KICAgICAgICAgICAgICAgIDxyZWxhdGlvbiBrZXk9IjIzMjU0NDA5MzU5IiByZWx0eXBlPSI0Ii8+CiAgICAgICAgICAgIDwvcmVsYXRpb25zPgogICAgICAgIDwvbG9naW4+CiAgICA8L29wZXJhdGlvbj4KPC9zc28+Cg==</ar:Token>
        <ar:Sign>P++iJ/s9S0CAVgn5Kv7o7CjVl/DxhdFkBKlU+Z6B/OsNh88uXEcCthpyE+QZZbWpf9Oe7XCrlmL5quB13AspkD7qN06CniNdWcvOkAqU1w07V/qIBxEgDpj4TwfllFRYW7OP4C6rT49l0OXYzdUQhCoIpZYpEBxZ4NYVsI1NJDY=</ar:Sign>
        <ar:Cuit>23254409359</ar:Cuit>
      </ar:Auth>
      <ar:FeCAEReq>
        <ar:FeCabReq>
          <ar:CantReg>1</ar:CantReg>
          <ar:PtoVta>1</ar:PtoVta>
          <ar:CbteTipo>1</ar:CbteTipo>
        </ar:FeCabReq>
        <ar:FeDetReq>
          <ar:FECAEDetRequest>
            <ar:Concepto>1</ar:Concepto>
            <ar:DocTipo>80</ar:DocTipo>
            <ar:DocNro>20111111112</ar:DocNro>
            <ar:CbteDesde>3</ar:CbteDesde>
            <ar:CbteHasta>3</ar:CbteHasta>
            <ar:CbteFch>20241206</ar:CbteFch>
            <ar:ImpTotal>1000.00</ar:ImpTotal>
            <ar:ImpTotConc>0.00</ar:ImpTotConc>
            <ar:ImpNeto>1000.00</ar:ImpNeto>
            <ar:ImpOpEx>0.00</ar:ImpOpEx>
            <ar:ImpTrib>0.00</ar:ImpTrib>
            <ar:ImpIVA>210.00</ar:ImpIVA>
            <ar:MonId>PES</ar:MonId>
            <ar:MonCotiz>1.00</ar:MonCotiz>
          </ar:FECAEDetRequest>
        </ar:FeDetReq>
      </ar:FeCAEReq>
    </ar:FECAESolicitar>
  </soapenv:Body>
</soapenv:Envelope>`;

fetch("https://wswhomo.afip.gov.ar/wsfev1/service.asmx", {
  method: "POST",
  headers,
  body,
})
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error("Error:", error));
