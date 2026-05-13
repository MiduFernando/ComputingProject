declare module "qrcode" {
  interface QRCodeToDataURLOptions {
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    type?: string;
    width?: number;
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  export function toDataURL(data: string, options?: QRCodeToDataURLOptions): Promise<string>;
  export function toCanvas(canvas: HTMLCanvasElement, data: string, options?: QRCodeToDataURLOptions): Promise<void>;
  export function toString(data: string, options?: QRCodeToDataURLOptions): Promise<string>;
  const QRCode: {
    toDataURL: typeof toDataURL;
    toCanvas: typeof toCanvas;
    toString: typeof toString;
  };
  export default QRCode;
}
