import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

type Props = {};

function Camera({}: Props) {
  const [init, setInit] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    if (init) return;
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          height: 700,
          width: 700,
        },
        fps: 10,
      },
      true
    );

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }
    function error(err) {
      console.warn(err);
    }
    setInit(true);
  }, [init]);

  return (
    <div>
      {/* <Input type="file" capture></Input> */}
      {/* <p>主鏡頭</p>
      <input
        type="file"
        capture="environment"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          readerQRCode(file, file.type).then((value) => {
            setData(value as string);
          });
        }}
      />
      {data ? <p>QRCode 資訊 : {data}</p> : <p>請上傳qrcode</p>} */}

      {scanResult ? <p>QRCode 資訊 : {scanResult}</p> : <div id="reader"></div>}
    </div>
  );
}

export default Camera;
