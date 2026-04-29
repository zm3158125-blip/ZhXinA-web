import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb } from 'lucide-react';
import { TUTORIAL_STEPS } from '../../data/rootTutorialData';
import './RootTutorial.css';

interface TutorialStepProps {
    stepIndex: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
}

const TutorialStep: React.FC<TutorialStepProps> = ({ stepIndex, totalSteps, onNext, onPrev }) => {
    const currentStep = TUTORIAL_STEPS[stepIndex];
    const progress = ((stepIndex + 1) / totalSteps) * 100;

    return (
        <div className="root-tutorial-container tutorial-step-container">
            <div className="step-header">
                <h2>Root 基础知识教程</h2>
                <p>第 {stepIndex + 1} 步 / 共 {totalSteps} 步</p>
            </div>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="step-content">
                <div className="step-title-section">
                    <div className="step-number">{currentStep.id}</div>
                    <h3>{currentStep.title}</h3>
                </div>

                <div className="step-description">
                    <p>{currentStep.description}</p>
                </div>

                <div className="step-tips">
                    <div className="tips-header">
                        <Lightbulb size={20} />
                        <span>小贴士</span>
                    </div>
                    <ul className="tips-list">
                        {currentStep.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="step-navigation">
                <button
                    className="nav-button prev-button"
                    onClick={onPrev}
                >
                    <ChevronLeft size={20} />
                    上一步
                </button>

                {stepIndex === totalSteps - 1 ? (
                    <button
                        className="nav-button complete-button"
                        onClick={onNext}
                    >
                        <CheckCircle size={20} />
                        完成教程
                    </button>
                ) : (
                    <button
                        className="nav-button next-button"
                        onClick={onNext}
                    >
                        下一步
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TutorialStep;