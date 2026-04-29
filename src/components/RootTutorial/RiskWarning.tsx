import React from 'react';
import { AlertTriangle, ShieldOff, ShieldAlert } from 'lucide-react';
import { RISKS } from '../../data/rootTutorialData';
import './RootTutorial.css';

interface RiskWarningProps {
    onContinue: () => void;
    onBack: () => void;
}

const RiskWarning: React.FC<RiskWarningProps> = ({ onContinue, onBack }) => {
    const getRiskIcon = (id: string) => {
        switch (id) {
            case 'security': return <ShieldOff size={24} />;
            case 'stability': return <ShieldAlert size={24} />;
            default: return <AlertTriangle size={24} />;
        }
    };

    return (
        <div className="root-tutorial-container">
            <div className="tutorial-header">
                <div className="warning-icon">
                    <AlertTriangle size={48} />
                </div>
                <h2>风险提示</h2>
                <p>Root 操作存在以下风险，请仔细阅读后决定是否继续</p>
            </div>

            <div className="risk-list">
                {RISKS.map(risk => (
                    <div key={risk.id} className="risk-item">
                        <div className="risk-icon">
                            {getRiskIcon(risk.id)}
                        </div>
                        <div className="risk-content">
                            <h4>{risk.title}</h4>
                            <p>{risk.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="warning-actions">
                <button className="back-button" onClick={onBack}>
                    返回
                </button>
                <button className="continue-button" onClick={onContinue}>
                    我已知晓风险，继续
                </button>
            </div>
        </div>
    );
};

export default RiskWarning;