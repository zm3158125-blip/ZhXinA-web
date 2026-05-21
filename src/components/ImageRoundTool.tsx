import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image as ImageIcon,
  Download,
  Upload,
  RotateCcw,
  Link2,
  Unlink2,
} from 'lucide-react';
import {
  DEFAULT_ROUND_SETTINGS,
  RADIUS_PRESETS,
  getDownloadExtension,
  processRoundedImage,
  type ExportFormat,
  type ImageRoundSettings,
  type RoundCorners,
} from '../utils/imageRound';
import './ImageRoundTool.css';

const MAX_RADIUS_SLIDER = 200;

const ImageRoundTool: React.FC = () => {
  const [source, setSource] = useState<string | null>(null);
  const [fileName, setFileName] = useState('rounded-image');
  const [settings, setSettings] = useState<ImageRoundSettings>(DEFAULT_ROUND_SETTINGS);
  const [processed, setProcessed] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<{ w: number; h: number } | null>(null);
  const [linkedCorners, setLinkedCorners] = useState(true);
  const [processing, setProcessing] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateSettings = useCallback((patch: Partial<ImageRoundSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const applyUniformRadius = useCallback((value: number) => {
    const r = Math.max(0, value);
    setSettings((prev) => ({
      ...prev,
      uniformRadius: r,
      corners: { tl: r, tr: r, br: r, bl: r },
    }));
  }, []);

  const updateCorner = useCallback(
    (key: keyof RoundCorners, value: number) => {
      const r = Math.max(0, value);
      setSettings((prev) => {
        if (linkedCorners) {
          const corners = { tl: r, tr: r, br: r, bl: r };
          return { ...prev, corners, uniformRadius: r };
        }
        return { ...prev, corners: { ...prev.corners, [key]: r } };
      });
    },
    [linkedCorners]
  );

  const runProcess = useCallback(() => {
    const img = imgRef.current;
    if (!img?.complete || !img.naturalWidth) return;

    setProcessing(true);
    requestAnimationFrame(() => {
      const result = processRoundedImage(img, settings);
      if (result) {
        setProcessed(result.dataUrl);
        setOutputSize({ w: result.width, h: result.height });
      }
      setProcessing(false);
    });
  }, [settings]);

  useEffect(() => {
    if (!source) return;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      runProcess();
    };
    img.src = source;
  }, [source, settings, runProcess]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) return;

    setFileName(file.name.replace(/\.[^.]+$/, '') || 'rounded-image');
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSource(ev.target?.result as string);
      setProcessed(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleReset = () => {
    setSettings(DEFAULT_ROUND_SETTINGS);
    setLinkedCorners(true);
  };

  const handleDownload = () => {
    if (!processed) return;
    const ext = getDownloadExtension(settings.format);
    const link = document.createElement('a');
    link.href = processed;
    link.download = `${fileName}-rounded.${ext}`;
    link.click();
  };

  const applyCirclePreset = () => {
    if (!imgRef.current) return;
    const r = Math.floor(Math.min(imgRef.current.naturalWidth, imgRef.current.naturalHeight) / 2);
    applyUniformRadius(r);
    updateSettings({ mode: 'uniform' });
  };

  const cornerKeys: { key: keyof RoundCorners; label: string }[] = [
    { key: 'tl', label: '左上' },
    { key: 'tr', label: '右上' },
    { key: 'br', label: '右下' },
    { key: 'bl', label: '左下' },
  ];

  return (
    <div className="image-round-tool feature-panel">
      <h3 className="image-round-title">
        <ImageIcon size={22} />
        图片圆角处理工具
      </h3>
      <p className="image-round-desc">支持四角独立圆角、背景、边框与多种导出格式，全部本地处理不上传。</p>

      <div className="image-round-layout">
        <div className="image-round-controls">
          <div className="round-control-group">
            <label className="round-label">选择图片</label>
            <button type="button" className="btn btn-primary round-upload-btn" onClick={() => fileInputRef.current?.click()}>
              <Upload size={18} />
              {source ? '更换图片' : '上传图片'}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleUpload} />
          </div>

          {source && (
            <>
              <div className="round-control-group">
                <div className="round-group-head">
                  <label className="round-label">圆角模式</label>
                  <div className="round-mode-tabs">
                    <button
                      type="button"
                      className={`round-tab ${settings.mode === 'uniform' ? 'is-active' : ''}`}
                      onClick={() => updateSettings({ mode: 'uniform' })}
                    >
                      统一
                    </button>
                    <button
                      type="button"
                      className={`round-tab ${settings.mode === 'individual' ? 'is-active' : ''}`}
                      onClick={() => updateSettings({ mode: 'individual' })}
                    >
                      四角独立
                    </button>
                  </div>
                </div>

                <div className="round-presets">
                  {RADIUS_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      className={`round-preset-chip ${settings.uniformRadius === p.value && settings.mode === 'uniform' ? 'is-active' : ''}`}
                      onClick={() => {
                        updateSettings({ mode: 'uniform' });
                        applyUniformRadius(p.value);
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                  <button type="button" className="round-preset-chip" onClick={applyCirclePreset}>
                    圆形
                  </button>
                </div>

                {settings.mode === 'uniform' ? (
                  <div className="round-slider-row">
                    <span>半径</span>
                    <input
                      type="range"
                      min={0}
                      max={MAX_RADIUS_SLIDER}
                      value={settings.uniformRadius}
                      onChange={(e) => applyUniformRadius(Number(e.target.value))}
                    />
                    <input
                      type="number"
                      className="round-number"
                      min={0}
                      max={MAX_RADIUS_SLIDER}
                      value={settings.uniformRadius}
                      onChange={(e) => applyUniformRadius(Number(e.target.value) || 0)}
                    />
                    <span className="round-unit">px</span>
                  </div>
                ) : (
                  <div className="round-corners-grid">
                    <button
                      type="button"
                      className={`round-link-btn ${linkedCorners ? 'is-linked' : ''}`}
                      onClick={() => setLinkedCorners((v) => !v)}
                      title={linkedCorners ? '四角联动' : '四角独立'}
                    >
                      {linkedCorners ? <Link2 size={16} /> : <Unlink2 size={16} />}
                      {linkedCorners ? '联动' : '独立'}
                    </button>
                    {cornerKeys.map(({ key, label }) => (
                      <div key={key} className="round-corner-item">
                        <label>{label}</label>
                        <input
                          type="range"
                          min={0}
                          max={MAX_RADIUS_SLIDER}
                          value={settings.corners[key]}
                          onChange={(e) => updateCorner(key, Number(e.target.value))}
                        />
                        <input
                          type="number"
                          className="round-number round-number--sm"
                          min={0}
                          max={MAX_RADIUS_SLIDER}
                          value={settings.corners[key]}
                          onChange={(e) => updateCorner(key, Number(e.target.value) || 0)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="round-control-group">
                <label className="round-label">背景</label>
                <label className="round-check">
                  <input
                    type="checkbox"
                    checked={settings.transparentBg}
                    onChange={(e) => updateSettings({ transparentBg: e.target.checked })}
                  />
                  透明背景（PNG / WebP）
                </label>
                {!settings.transparentBg && (
                  <div className="round-color-row">
                    <input
                      type="color"
                      value={settings.bgColor}
                      onChange={(e) => updateSettings({ bgColor: e.target.value })}
                      aria-label="背景颜色"
                    />
                    <input
                      type="text"
                      className="round-hex"
                      value={settings.bgColor}
                      onChange={(e) => updateSettings({ bgColor: e.target.value })}
                      spellCheck={false}
                    />
                  </div>
                )}
              </div>

              <div className="round-control-group">
                <label className="round-label">内边距</label>
                <div className="round-slider-row">
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={settings.padding}
                    onChange={(e) => updateSettings({ padding: Number(e.target.value) })}
                  />
                  <input
                    type="number"
                    className="round-number"
                    min={0}
                    max={80}
                    value={settings.padding}
                    onChange={(e) => updateSettings({ padding: Number(e.target.value) || 0 })}
                  />
                  <span className="round-unit">px</span>
                </div>
              </div>

              <div className="round-control-group">
                <label className="round-label">边框</label>
                <div className="round-slider-row">
                  <span>粗细</span>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    value={settings.borderWidth}
                    onChange={(e) => updateSettings({ borderWidth: Number(e.target.value) })}
                  />
                  <input
                    type="number"
                    className="round-number"
                    min={0}
                    max={20}
                    value={settings.borderWidth}
                    onChange={(e) => updateSettings({ borderWidth: Number(e.target.value) || 0 })}
                  />
                </div>
                {settings.borderWidth > 0 && (
                  <div className="round-color-row">
                    <input
                      type="color"
                      value={settings.borderColor}
                      onChange={(e) => updateSettings({ borderColor: e.target.value })}
                      aria-label="边框颜色"
                    />
                    <input
                      type="text"
                      className="round-hex"
                      value={settings.borderColor}
                      onChange={(e) => updateSettings({ borderColor: e.target.value })}
                      spellCheck={false}
                    />
                  </div>
                )}
              </div>

              <div className="round-control-group">
                <label className="round-label">导出</label>
                <div className="round-format-tabs">
                  {(['png', 'jpeg', 'webp'] as ExportFormat[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      className={`round-tab ${settings.format === f ? 'is-active' : ''}`}
                      onClick={() =>
                        updateSettings({
                          format: f,
                          ...(f === 'jpeg' ? { transparentBg: false } : {}),
                        })
                      }
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
                {settings.format !== 'png' && (
                  <div className="round-slider-row">
                    <span>画质</span>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={Math.round(settings.jpegQuality * 100)}
                      onChange={(e) =>
                        updateSettings({ jpegQuality: Number(e.target.value) / 100 })
                      }
                    />
                    <span className="round-unit">{Math.round(settings.jpegQuality * 100)}%</span>
                  </div>
                )}
                <label className="round-label round-label--sub">最大边长</label>
                <select
                  className="round-select"
                  value={settings.maxSize}
                  onChange={(e) => updateSettings({ maxSize: Number(e.target.value) })}
                >
                  <option value={0}>原图尺寸</option>
                  <option value={800}>800px</option>
                  <option value={1200}>1200px</option>
                  <option value={1920}>1920px</option>
                  <option value={2560}>2560px</option>
                </select>
              </div>

              <div className="round-actions">
                <button type="button" className="btn btn-ghost" onClick={handleReset}>
                  <RotateCcw size={16} />
                  重置
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleDownload}
                  disabled={!processed}
                >
                  <Download size={16} />
                  下载
                </button>
              </div>
            </>
          )}
        </div>

        <div className={`image-round-preview ${!source ? 'is-empty' : ''}`}>
          {!source ? (
            <div className="preview-placeholder">
              <ImageIcon size={48} strokeWidth={1.2} />
              <p>上传图片后在此预览</p>
            </div>
          ) : (
            <>
              <div className="preview-pair">
                <figure className="preview-card">
                  <figcaption>原图</figcaption>
                  <img src={source} alt="原图" />
                </figure>
                <figure className="preview-card preview-card--result">
                  <figcaption>
                    处理后
                    {processing && <span className="preview-busy">处理中…</span>}
                  </figcaption>
                  <div
                    className="preview-result-wrap"
                    style={{
                      background: settings.transparentBg
                        ? 'repeating-conic-gradient(#e8e6e3 0% 25%, transparent 0% 50%) 0 0 / 16px 16px'
                        : settings.bgColor,
                    }}
                  >
                    <img src={processed || source} alt="处理后" />
                  </div>
                </figure>
              </div>
              {outputSize && (
                <p className="preview-meta">
                  输出尺寸 {outputSize.w} × {outputSize.h} px · {settings.format.toUpperCase()}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageRoundTool;
