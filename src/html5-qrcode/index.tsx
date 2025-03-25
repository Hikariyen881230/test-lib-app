import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Paper,
} from "@mui/material";
import UploadBtn from "./upload-btn";
import "./style.css";

function HTML5QRCode() {
  // scan
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const html5QrCode = useRef(null);

  const [scanedText, setScanedText] = useState("");
  // 掃描成功後會得到 decodedText
  const qrCodeSuccessCallback = (decodedText: string) => {
    // 傳入 searchProductName 去做後續處理
    setScanedText(decodedText);
    // 停止相機
    handleStop();
  };

  useEffect(() => {
    if (openModal) {
      const observer = new MutationObserver(() => {
        const qrcodeReaderDom = document.getElementById("qrcode-reader");
        if (qrcodeReaderDom) {
          html5QrCode.current = generateHtml5QrCode("qrcode-reader");
          html5QrCode.current.start(qrCodeSuccessCallback); // 確保 DOM 存在後才開始掃描
          observer.disconnect(); // 偵測到後停止監聽
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, [openModal]);

  // 啟動相機
  const scanQRCode = async () => {
    try {
      // 嘗試取得相機權限，會自動跳出詢問框
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (stream.active) setOpenModal(true);
      setStream(stream);
    } catch (error) {
      // 若用戶拒絕權限，則提示警告
      alert("請允許使用相機以掃描 QR Code");
    }
  };

  const handleSwitch = async () => {
    html5QrCode.current.switchCamera();
  };
  // 停止相機
  const handleStop = async () => {
    setOpenModal(false);
    html5QrCode.current.handleStop();
    // 釋放攝影機資源
    stream && stream.getTracks().forEach((track) => track.stop());
  };

  // 上傳圖片
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const result = await scanImage(file);
      result && setScanedText(result);
    }
  };

  const scanImage = async (file) => {
    const html5QrCode = new Html5Qrcode("reader");
    try {
      const result = await html5QrCode.scanFile(file, false);
      return result;
    } catch (error) {
      alert("請上傳正確的QR Code");
      return "";
    }
  };

  return (
    <div>
      <div id="reader" style={{ display: "none" }}></div>
      {/* QRCode Modal */}
      <Modal
        open={openModal}
        onClose={handleStop}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            gap: 1,
          }}
        >
          <Button onClick={handleStop} variant={"contained"}>
            關閉相機
          </Button>
          <Button onClick={handleSwitch} variant={"contained"}>
            關閉相機
          </Button>
          <Box
            sx={{ width: 600, height: "auto" }}
            id="qrcode-reader"
            ref={html5QrCode}
            className="component-qrcode-reader"
          ></Box>
        </Box>
      </Modal>

      {/* Input */}
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="掃描證書號碼"
          inputProps={{ "aria-label": "掃描證書號碼" }}
          value={scanedText}
          onChange={(e) => setScanedText(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          disabled={openModal}
          onClick={scanQRCode}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M5.25 9C5.25 9.41421 5.58579 9.75 6 9.75C6.41421 9.75 6.75 9.41421 6.75 9H5.25ZM6 6V5.25C5.58579 5.25 5.25 5.58579 5.25 6H6ZM9 6.75C9.41421 6.75 9.75 6.41421 9.75 6C9.75 5.58579 9.41421 5.25 9 5.25V6.75ZM17.25 9C17.25 9.41421 17.5858 9.75 18 9.75C18.4142 9.75 18.75 9.41421 18.75 9H17.25ZM18 6H18.75C18.75 5.58579 18.4142 5.25 18 5.25V6ZM15 5.25C14.5858 5.25 14.25 5.58579 14.25 6C14.25 6.41421 14.5858 6.75 15 6.75V5.25ZM18.75 15C18.75 14.5858 18.4142 14.25 18 14.25C17.5858 14.25 17.25 14.5858 17.25 15H18.75ZM18 18V18.75C18.4142 18.75 18.75 18.4142 18.75 18H18ZM15 17.25C14.5858 17.25 14.25 17.5858 14.25 18C14.25 18.4142 14.5858 18.75 15 18.75V17.25ZM6.75 15C6.75 14.5858 6.41421 14.25 6 14.25C5.58579 14.25 5.25 14.5858 5.25 15H6.75ZM6 18H5.25C5.25 18.4142 5.58579 18.75 6 18.75V18ZM9 18.75C9.41421 18.75 9.75 18.4142 9.75 18C9.75 17.5858 9.41421 17.25 9 17.25V18.75ZM20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25V12.75ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75V11.25ZM6.75 9V6H5.25V9H6.75ZM6 6.75H9V5.25H6V6.75ZM18.75 9V6H17.25V9H18.75ZM18 5.25H15V6.75H18V5.25ZM17.25 15V18H18.75V15H17.25ZM18 17.25H15V18.75H18V17.25ZM5.25 15V18H6.75V15H5.25ZM6 18.75H9V17.25H6V18.75ZM20 11.25H4V12.75H20V11.25Z"
                fill="#000000"
              ></path>{" "}
            </g>
          </svg>
        </IconButton>
        <UploadBtn>
          <input type="file" accept="image/*" onChange={handleUpload} />
        </UploadBtn>
      </Paper>
    </div>
  );
}

export default HTML5QRCode;

// 封裝 傳入 Dom 的 id
export const generateHtml5QrCode = (domId: string) => {
  const html5QrCode = new Html5Qrcode(domId);
  let succesCallback;
  // 啟動相機  開啟掃描功能
  // 傳入 qrCodeSuccessCallback 掃描成功後要做的事
  const brConfig = { fps: 10, qrbox: { width: 400, height: 400 } };
  const start = async (qrCodeSuccessCallback: (decodedText: any) => void) => {
    succesCallback = qrCodeSuccessCallback;
    if (html5QrCode.getState() === 2) {
      handleStop();
    }
    const cameras = await Html5Qrcode.getCameras();
    // 找到後鏡頭 (label 包含 "back" 或 "environment")
    const backCamera = cameras.find(
      (camera) =>
        camera.label.toLowerCase().includes("back") ||
        camera.label.toLowerCase().includes("environment")
    );

    // 若找不到後鏡頭，則選擇第一個可用相機
    const selectedCameraId = backCamera ? backCamera.id : cameras[0].id;

    // 套件啟動相機function
    html5QrCode.start(
      // 使用預設前或後鏡頭 （environment 為使用預設）
      // selectedCameraId,
      { facingMode: "environment" },
      // 相機brcode顯示設定
      brConfig,
      // 掃描成功後的 Callback
      qrCodeSuccessCallback,
      // Error的 Callback
      qrCodeErrorCallback
    );
  };

  const switchCamera = async () => {
    try {
      const cameras = await Html5Qrcode.getCameras();
      if (cameras.length > 1) {
        const currentCameraId = html5QrCode.getRunningTrackSettings().deviceId;
        const nextCamera = cameras.find(
          (camera) => camera.id !== currentCameraId
        );

        if (nextCamera) {
          await html5QrCode.stop(); // 先停止當前相機
          await html5QrCode.start(
            nextCamera.id,
            brConfig,
            succesCallback,
            qrCodeErrorCallback
          );
        }
      }
    } catch (error) {
      alert("切換相機失敗");
      const cameras = await Html5Qrcode.getCameras();
      await html5QrCode.start(
        cameras[0].id,
        brConfig,
        succesCallback,
        qrCodeErrorCallback
      );
    }
  };

  // 關閉相機
  const handleStop = () => {
    // 套件關閉相機function
    html5QrCode
      .stop()
      .then(() => {
        // 清除
        html5QrCode.clear();
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  // Error的 Callback
  const qrCodeErrorCallback = (error: string) => {
    // lib 有 bug 暫時處理 ， 待日後更新
    // console.log("qrCodeErrorCallback error", error);
  };

  return {
    start,
    handleStop,
    switchCamera,
  };
};
