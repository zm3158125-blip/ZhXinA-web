import React from 'react';
import { ArrowLeft } from 'lucide-react';
import '../components/PostDetail.css';

interface ClearDataPageProps {
    onBack: () => void;
}

const ClearDataPage: React.FC<ClearDataPageProps> = ({ onBack }) => {
    return (
        <div className="post-detail glass-card">
            <button onClick={onBack} className="back-btn">
                <ArrowLeft size={20} />
                <span>返回列表</span>
            </button>

            <article className="post-full-content">
                <header className="post-header">
                    <h1 className="post-detail-title">拉闸清除数据教程</h1>

                    <div className="post-meta">
                        <div className="meta-item">
                            <span>2026-01-19</span>
                        </div>
                        <div className="meta-item">
                            <span>250 words</span>
                        </div>
                    </div>
                </header>

                <div className="markdown-body">
                    <p>看不懂就重开！这个方法适用所有游戏！</p>
                    <p>按照此教程还不能解决问题？</p>
                    <p>(你设备成非洲人的了，有够黑的)</p>
                    <p>只能通过刷机清理一切回归干净了</p>
                    <p>最简单粗暴有效的还得是刷机！</p>
                    <p>有问题刷一次直接解决99%</p>
                    <p>不怕麻烦的小伙伴建议：</p>
                    <p>拉闸一次，刷机一次</p>
                    <p>保证设备干净是在给稳定铺路！</p>
                    <p>怕麻烦的小伙伴建议：</p>
                    <p>小闸选清理，大闸选刷机</p>
                    <p>🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫</p>
                    <p>🎣教程开始：</p>
                    <p>https://www.123865.com/s/VuUcVv-3XIDv</p>
                    <p>刷入两个模块🔥</p>
                    <p>这两个模块不是所有系统都能有效果</p>
                    <p>刷完重启查看IMEI和序列号变了没</p>
                    <p>没变的就是系统不兼容，直接🚮</p>
                    <p>那个变了，就留那个就行了</p>
                    <p>不能插卡的设备没有IMEI</p>
                    <p>比如大部分平板</p>
                    <p>就不用刷IMEI模块了</p>
                    <p>🔥全游戏拉闸清理教程：</p>
                    <p>🔥每次拉闸后按顺序操</p>
                    <p>✅第一步：</p>
                    <p>结束所有应用/游戏的后台</p>
                    <p>去面具里执行两个模块的按钮</p>
                    <p>(如果安装了模块就照做，没有就跳过)</p>
                    <p>✅第二步：</p>
                    <p>卸载游戏，重启设备</p>
                    <p>开机后重新安装游戏</p>
                    <p>安装好后不要启动游戏</p>
                    <p>✅第三步：</p>
                    <p>如果设备存在OAID(虚拟ID)功能</p>
                    <p>去设置里手动重置OAID(虚拟ID)</p>
                    <p>设置 → 隐私 → 广告与隐私 → 重置广告标识符</p>
                    <p>✅第四步：</p>
                    <p>执行阿灵的随机ID修改.sh</p>
                    <p>会自动重启，不用慌张</p>
                    <p>(设备/应用ID重启才会生效新ID)</p>
                    <p>🤓OK，又可以奔放了</p>
                </div>
            </article>
        </div>
    );
};

export default ClearDataPage;