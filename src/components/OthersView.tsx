import React, { useState, useRef } from 'react';
import { MoreHorizontal, Image as ImageIcon, Download, Upload } from 'lucide-react';
import './OthersView.css'; // 创建单独的CSS文件以实现玻璃拟态样式

// Define article data interface
interface ArticleData {
    id: string;
    title: string;
}

const OthersView: React.FC<{ onArticleClick: (articleId: string) => void }> = ({ onArticleClick }) => {
    // Directly define articles data instead of loading from markdown files
    const articles: ArticleData[] = [
        { id: 'clear-data', title: '拉闸清除数据教程' },
        { id: 'hide-env', title: '完美环境隐藏教程' }
    ];

    // Image rounded corner feature states
    const [image, setImage] = useState<string | null>(null);
    const [radius, setRadius] = useState<number>(20); // Default radius 20px
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgData = event.target?.result as string;
                setImage(imgData);
                // Reset processed image state
                setProcessedImage(null);
                // Process image with current radius
                processImage(imgData, radius);
            };
            reader.readAsDataURL(file);
        }
    };

    // Process image with rounded corners - Simplified and reliable implementation
    const processImage = (imgData: string, cornerRadius: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const img = new Image();

        img.onload = () => {
            // Calculate optimal canvas size (limit to 1000px to prevent performance issues)
            const maxSize = 1000;
            let width = img.width;
            let height = img.height;

            if (width > maxSize || height > maxSize) {
                const ratio = Math.min(maxSize / width, maxSize / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Draw rounded rectangle background
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(cornerRadius, 0);
            ctx.arcTo(width, 0, width, cornerRadius, cornerRadius);
            ctx.arcTo(width, height, width - cornerRadius, height, cornerRadius);
            ctx.arcTo(0, height, 0, height - cornerRadius, cornerRadius);
            ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius);
            ctx.closePath();
            ctx.fill();

            // Apply clip path for rounded corners
            ctx.beginPath();
            ctx.moveTo(cornerRadius, 0);
            ctx.arcTo(width, 0, width, cornerRadius, cornerRadius);
            ctx.arcTo(width, height, width - cornerRadius, height, cornerRadius);
            ctx.arcTo(0, height, 0, height - cornerRadius, cornerRadius);
            ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius);
            ctx.closePath();
            ctx.clip();

            // Draw the image scaled to fit canvas
            ctx.drawImage(img, 0, 0, width, height);

            // Generate processed image data
            const processedData = canvas.toDataURL('image/png');
            setProcessedImage(processedData);
        };

        img.src = imgData;
    };

    // Handle radius change
    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRadius = parseInt(e.target.value);
        setRadius(newRadius);
        if (image) {
            processImage(image, newRadius);
        }
    };

    // Handle download
    const handleDownload = () => {
        if (!processedImage) return;

        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'rounded-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="post-list glass-card">
            <h2 className="section-title">
                <MoreHorizontal className="title-icon" />
                其他
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>2026年1月19日</p>

            <div className="others-section">
                <div className="button-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    padding: '20px',
                    justifyContent: 'center'
                }}>
                    {articles.map(article => (
                        <button
                            key={article.id}
                            className="custom-button"
                            onClick={() => onArticleClick(article.id)}
                            style={{
                                padding: '16px 32px',
                                fontSize: '18px',
                                borderRadius: '12px',
                                fontWeight: '600',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(118, 75, 162, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(118, 75, 162, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(118, 75, 162, 0.3)';
                            }}
                        >
                            {article.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Image rounded corner feature */}
            <div className="image-feature" style={{
                marginTop: '40px',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                <h3 style={{
                    color: 'var(--color-primary)',
                    textAlign: 'center',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}>
                    <ImageIcon className="title-icon" />
                    图片圆角处理工具
                </h3>

                {/* Image upload area */}
                <div className="upload-area" style={{
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            margin: '0 auto'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                        }}
                    >
                        <Upload size={18} />
                        选择图片
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>

                {/* Radius control */}
                {image && (
                    <div className="radius-control" style={{
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '10px',
                            color: 'var(--text-main)',
                            fontWeight: '500'
                        }}>
                            圆角半径: {radius}px
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={radius}
                            onChange={handleRadiusChange}
                            style={{
                                width: '80%',
                                maxWidth: '400px',
                                cursor: 'pointer'
                            }}
                        />
                    </div>
                )}

                {/* Image display area */}
                {image && (
                    <div className="image-display" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        flexWrap: 'wrap',
                        marginBottom: '20px'
                    }}>
                        {/* Original image */}
                        <div className="image-container" style={{
                            maxWidth: '45%',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>原图</h4>
                            <img
                                src={image}
                                alt="Original"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain',
                                    border: '1px solid rgba(0, 0, 0, 0.1)'
                                }}
                            />
                        </div>

                        {/* Processed image */}
                        <div className="image-container" style={{
                            maxWidth: '45%',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>处理后</h4>

                            {/* Always display processed image as img tag for better compatibility */}
                            <img
                                src={processedImage || image}
                                alt="Processed"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain',
                                    border: '1px solid rgba(0, 0, 0, 0.1)'
                                }}
                            />

                            {/* Keep canvas for processing but hide it */}
                            <canvas
                                ref={canvasRef}
                                style={{
                                    display: 'none',
                                    width: '100%',
                                    height: 'auto'
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Download button */}
                {processedImage && (
                    <div className="download-area" style={{
                        textAlign: 'center'
                    }}>
                        <button
                            onClick={handleDownload}
                            style={{
                                padding: '12px 24px',
                                fontSize: '16px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                margin: '0 auto'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                            }}
                        >
                            <Download size={18} />
                            下载图片
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OthersView;