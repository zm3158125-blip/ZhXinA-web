import React from 'react';
import { ArrowLeft } from 'lucide-react';
import '../components/PostDetail.css';

interface HideEnvPageProps {
    onBack: () => void;
}

const HideEnvPage: React.FC<HideEnvPageProps> = ({ onBack }) => {
    return (
        <div className="post-detail glass-card">
            <button onClick={onBack} className="back-btn">
                <ArrowLeft size={20} />
                <span>返回列表</span>
            </button>

            <article className="post-full-content">
                <header className="post-header">
                    <h1 className="post-detail-title">完美环境隐藏教程</h1>

                    <div className="post-meta">
                        <div className="meta-item">
                            <span>2026-01-19</span>
                        </div>
                        <div className="meta-item">
                            <span>300 words</span>
                        </div>
                    </div>
                </header>

                <div className="markdown-body">
                    <p>教程来源于：悲伤</p>
                    <p>基本适用所有的ksu管理器（支持SUkisu Ultra、KSUnext、mKSU的LKM和GKI模式等等）仅lkm模式和GKI模式的隐藏环境文件不同1108版本</p>
                    <p>很多老哥反应原来的隐藏模块新版的管理器刷不进去隐藏模块，今天更新一下一键隐藏模块</p>
                    <p>https://pan.wo.cn/s/1L1n4E48562</p>
                    <p>链接：https://pan.quark.cn/s/f419b4aa851f</p>
                    <p>链接:https://pan.baidu.com/s/14JamlZCceRyoMT8IlVKgLA?pwd=9999</p>
                    <p>链接:  https://yun.139.com/shareweb/#/w/i/2qidZ5dF5ntic</p>
                    <p>支持:</p>
                    <p>✅ColorOS16和澎湃Os3(安卓16)</p>
                    <p>✅支持最新版SUkisu Ultra和kernelSU</p>
                    <p>▶️具体更新看教程结尾</p>
                    <p>========刷入教程开始==========</p>
                    <p>▶️第一步：打开我们的ksu管理器安装＂ksu一键隐藏环境＂并重启设备</p>
                    <p>▶️第二步：下拉状态栏，打开lsp寄生器激活隐藏应用列表</p>
                    <p>▶️第三步:激活后重启设备进入KSU给mt管理器授权root权限和隐藏bl列表权限</p>
                    <p>▶️第四步：打开mt管理器执行 keybox(1108).sh 来替换密钥(使用root权限执行，不要再问为什么执行失败)</p>
                    <p>▶️第五步：开机后打开隐藏应用列表还原配置</p>
                    <p>第六步:打开Zygisk-Next的仅还原挂载(GKi模式可以忽略这一步)</p>
                    <p>▶️如果你是lkm模式到这一步就完成了，如果你是gki模式那么接着操作</p>
                    <p>刷入GKI模式教程： [链接]查看链接</p>
                    <p>第六步：使用su伪装内核版本和内核构建</p>
                    <p>打开ksu管理器找到模块(如果你sukisuultra版本比新的话，也可以用sukisuultra里面自带的)</p>
                    <p>点击执行</p>
                    <p>翻到下面，第一个填写我们的内核版本（＃之前的）第二个填写内核构建（＃之后的包括#）</p>
                    <p>这一步适合隐藏进阶的玩家，可以过一些租号和检测环境比较严的软件，具体效果自行测试</p>
                    <p>▶️新版本更新日志:</p>
                    <p>1.使用Tricky Store-v1.4.1正式版本进行隐藏BL（解决检测到ts模块的问题）</p>
                    <p>2.使用Zygisk-Next-1.3.0-648（融合Shamiko功能）</p>
                    <p>3.使用改包名的隐藏应用列表(解决检测到隐藏应用列表问题)</p>
                    <p>4.更新密钥文件(解决密钥失效问题，也可找其他密钥自行替换，密钥泛滥就失效)</p>
                </div>
            </article>
        </div>
    );
};

export default HideEnvPage;