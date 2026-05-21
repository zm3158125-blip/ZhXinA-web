export type CornerMode = 'uniform' | 'individual';
export type ExportFormat = 'png' | 'jpeg' | 'webp';

export interface RoundCorners {
  tl: number;
  tr: number;
  br: number;
  bl: number;
}

export interface ImageRoundSettings {
  mode: CornerMode;
  uniformRadius: number;
  corners: RoundCorners;
  bgColor: string;
  transparentBg: boolean;
  padding: number;
  borderWidth: number;
  borderColor: string;
  format: ExportFormat;
  jpegQuality: number;
  maxSize: number;
}

export const DEFAULT_ROUND_SETTINGS: ImageRoundSettings = {
  mode: 'uniform',
  uniformRadius: 20,
  corners: { tl: 20, tr: 20, br: 20, bl: 20 },
  bgColor: '#ffffff',
  transparentBg: true,
  padding: 0,
  borderWidth: 0,
  borderColor: '#e5e7eb',
  format: 'png',
  jpegQuality: 0.92,
  maxSize: 1200,
};

export const RADIUS_PRESETS = [
  { label: '直角', value: 0 },
  { label: '小', value: 8 },
  { label: '中', value: 20 },
  { label: '大', value: 40 },
  { label: '超大', value: 80 },
] as const;

function clampRadius(r: number, max: number) {
  return Math.max(0, Math.min(Math.round(r), max));
}

export function getEffectiveCorners(
  settings: ImageRoundSettings,
  width: number,
  height: number
): RoundCorners {
  const maxR = Math.floor(Math.min(width, height) / 2);
  if (settings.mode === 'uniform') {
    const r = clampRadius(settings.uniformRadius, maxR);
    return { tl: r, tr: r, br: r, bl: r };
  }
  return {
    tl: clampRadius(settings.corners.tl, maxR),
    tr: clampRadius(settings.corners.tr, maxR),
    br: clampRadius(settings.corners.br, maxR),
    bl: clampRadius(settings.corners.bl, maxR),
  };
}

function traceRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  c: RoundCorners
) {
  const { tl, tr, br, bl } = c;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  if (tr > 0) ctx.arcTo(x + w, y, x + w, y + tr, tr);
  else ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h - br);
  if (br > 0) ctx.arcTo(x + w, y + h, x + w - br, y + h, br);
  else ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + bl, y + h);
  if (bl > 0) ctx.arcTo(x, y + h, x, y + h - bl, bl);
  else ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + tl);
  if (tl > 0) ctx.arcTo(x, y, x + tl, y, tl);
  else ctx.lineTo(x, y);
  ctx.closePath();
}

export interface ProcessResult {
  dataUrl: string;
  width: number;
  height: number;
}

export function processRoundedImage(
  img: HTMLImageElement,
  settings: ImageRoundSettings
): ProcessResult | null {
  let imgW = img.naturalWidth;
  let imgH = img.naturalHeight;
  if (!imgW || !imgH) return null;

  if (settings.maxSize > 0 && (imgW > settings.maxSize || imgH > settings.maxSize)) {
    const ratio = Math.min(settings.maxSize / imgW, settings.maxSize / imgH);
    imgW = Math.round(imgW * ratio);
    imgH = Math.round(imgH * ratio);
  }

  const pad = Math.max(0, settings.padding);
  const border = Math.max(0, settings.borderWidth);
  const canvasW = imgW + pad * 2 + border * 2;
  const canvasH = imgH + pad * 2 + border * 2;

  const canvas = document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const corners = getEffectiveCorners(settings, imgW, imgH);
  const innerX = pad + border;
  const innerY = pad + border;

  if (!settings.transparentBg) {
    ctx.fillStyle = settings.bgColor;
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  ctx.save();
  traceRoundRect(ctx, innerX, innerY, imgW, imgH, corners);
  ctx.clip();
  ctx.drawImage(img, innerX, innerY, imgW, imgH);
  ctx.restore();

  if (border > 0) {
    ctx.strokeStyle = settings.borderColor;
    ctx.lineWidth = border;
    traceRoundRect(ctx, innerX, innerY, imgW, imgH, corners);
    ctx.stroke();
  }

  const mime =
    settings.format === 'jpeg'
      ? 'image/jpeg'
      : settings.format === 'webp'
        ? 'image/webp'
        : 'image/png';

  const quality = settings.format === 'png' ? undefined : settings.jpegQuality;
  const dataUrl = canvas.toDataURL(mime, quality);

  return { dataUrl, width: canvasW, height: canvasH };
}

export function getDownloadExtension(format: ExportFormat): string {
  return format === 'jpeg' ? 'jpg' : format;
}
