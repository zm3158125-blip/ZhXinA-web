import React from 'react';
import { DEVICE_BRANDS } from '../../data/rootTutorialData';
import './RootTutorial.css';

interface DeviceSelectorProps {
    onSelect: (brandId: string) => void;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ onSelect }) => {
    return (
        <div className="root-tutorial-container">
            <div className="tutorial-header">
                <h2>选择你的设备品牌</h2>
                <p>请选择你的手机品牌以获取对应的Root教程</p>
            </div>

            <div className="brand-grid">
                {DEVICE_BRANDS.map(brand => (
                    <button
                        key={brand.id}
                        className="brand-button"
                        onClick={() => onSelect(brand.id)}
                    >
                        {brand.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DeviceSelector;