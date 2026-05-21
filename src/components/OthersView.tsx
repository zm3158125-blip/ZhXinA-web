import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import DeviceSelector from './RootTutorial/DeviceSelector';
import RiskWarning from './RootTutorial/RiskWarning';
import TutorialStep from './RootTutorial/TutorialStep';
import ImageRoundTool from './ImageRoundTool';
import { TUTORIAL_STEPS } from '../data/rootTutorialData';
import './RootTutorial/RootTutorial.css';
import './OthersView.css';

const ARTICLES = [
  { id: 'clear-data', title: '拉闸清除数据教程' },
  { id: 'hide-env', title: '完美环境隐藏教程' },
] as const;

interface OthersViewProps {
  onArticleClick: (articleId: string) => void;
}

const OthersView: React.FC<OthersViewProps> = ({ onArticleClick }) => {
  const [tutorialStage, setTutorialStage] = useState<'device-select' | 'risk-warning' | 'tutorial'>('device-select');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  return (
    <div className="others-view page-shell card">
      <header className="page-header">
        <h1 className="page-title">
          <MoreHorizontal size={24} className="title-icon-inline" />
          其他
        </h1>
        <p className="page-desc">工具与教程 · 2026年1月19日</p>
      </header>

      <div className="others-section">
        <div className="button-grid">
          {ARTICLES.map((article) => (
            <button
              key={article.id}
              type="button"
              className="custom-button"
              onClick={() => onArticleClick(article.id)}
            >
              {article.title}
            </button>
          ))}
        </div>
      </div>

      <ImageRoundTool />

      <div className="root-tutorial-wrapper">
        {tutorialStage === 'device-select' && (
          <DeviceSelector onSelect={() => setTutorialStage('risk-warning')} />
        )}
        {tutorialStage === 'risk-warning' && (
          <RiskWarning
            onContinue={() => {
              setTutorialStage('tutorial');
              setCurrentStepIndex(0);
            }}
            onBack={() => setTutorialStage('device-select')}
          />
        )}
        {tutorialStage === 'tutorial' && (
          <TutorialStep
            stepIndex={currentStepIndex}
            totalSteps={TUTORIAL_STEPS.length}
            onNext={() => {
              if (currentStepIndex < TUTORIAL_STEPS.length - 1) {
                setCurrentStepIndex((prev) => prev + 1);
              } else {
                alert('恭喜你完成了Root基础知识的学习！');
              }
            }}
            onPrev={() => {
              if (currentStepIndex > 0) {
                setCurrentStepIndex((prev) => prev - 1);
              } else {
                setTutorialStage('risk-warning');
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OthersView;
