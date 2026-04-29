export interface DeviceBrand {
    id: string;
    name: string;
}

export interface RiskItem {
    id: string;
    title: string;
    description: string;
    icon?: string; // We'll use lucide-react icons in the component
}

export interface StepData {
    id: number;
    title: string;
    description: string;
    tips: string[];
    image?: string;
}

export const DEVICE_BRANDS: DeviceBrand[] = [
    { id: 'xiaomi', name: '小米' },
    { id: 'samsung', name: '三星' },
    { id: 'huawei', name: '华为' },
    { id: 'oppo', name: 'OPPO' },
    { id: 'vivo', name: 'VIVO' },
    { id: 'oneplus', name: '一加' },
    { id: 'other', name: '其他' }
];

export const RISKS: RiskItem[] = [
    {
        id: 'warranty',
        title: '失去保修',
        description: 'Root后设备将失去官方保修，维修需要自费'
    },
    {
        id: 'security',
        title: '安全风险',
        description: 'Root后系统安全性降低，可能被恶意软件利用'
    },
    {
        id: 'stability',
        title: '系统不稳定',
        description: '不当操作可能导致系统崩溃、卡顿或无法启动'
    },
    {
        id: 'ota',
        title: '无法OTA更新',
        description: 'Root后可能无法接收官方系统更新'
    },
    {
        id: 'compatibility',
        title: '应用兼容性',
        description: '部分银行、支付等应用可能检测到Root后拒绝运行'
    },
    {
        id: 'data_loss',
        title: '数据丢失',
        description: 'Root过程可能导致数据丢失，务必提前备份'
    }
];

export const TUTORIAL_STEPS: StepData[] = [
    {
        id: 1,
        title: '备份数据',
        description: '在开始Root之前，务必备份手机中的重要数据，包括照片、联系人、应用数据等。Root过程中可能会清除设备数据。',
        tips: [
            '使用云服务备份',
            '将照片和文件复制到电脑',
            '记录重要应用的账号密码'
        ]
    },
    {
        id: 2,
        title: '解锁Bootloader',
        description: '大多数手机需要先解锁Bootloader才能刷入自定义Recovery。不同品牌的解锁方法不同，请根据设备型号查找对应教程。',
        tips: [
            '解锁会清除所有数据',
            '部分品牌需要申请解锁码',
            '解锁后可能失去官方保修'
        ]
    },
    {
        id: 3,
        title: '安装ADB和Fastboot',
        description: '在电脑上安装Android SDK Platform Tools，包含ADB和Fastboot工具。这些工具用于与手机进行通信和刷入文件。',
        tips: [
            '从Google官方下载',
            '配置环境变量',
            '测试连接是否正常'
        ]
    },
    {
        id: 4,
        title: '刷入自定义Recovery',
        description: '使用Fastboot命令刷入TWRP等自定义Recovery。自定义Recovery提供了更多的操作选项，包括刷入Magisk等Root工具。',
        tips: [
            '选择对应设备的Recovery版本',
            '确保电量充足',
            '刷入后立即进入Recovery'
        ],
        image: '/root-tutorial/step4.jpg'
    },
    {
        id: 5,
        title: '刷入Magisk',
        description: '在Recovery模式下刷入Magisk安装包。刷入成功后重启设备，Magisk应用会自动安装，此时设备已获得Root权限。',
        tips: [
            '下载最新版本的Magisk',
            '刷入后不要立即重启',
            '首次启动可能较慢'
        ],
        image: '/root-tutorial/step5.jpg'
    },
    {
        id: 6,
        title: '验证Root权限',
        description: '打开Magisk应用，检查是否显示Root状态。也可以下载Root Checker等应用进行验证。成功后可以开始使用Root权限管理应用。',
        tips: [
            '使用Root Checker验证',
            '检查Superuser权限管理',
            '测试Root功能是否正常'
        ],
        image: '/root-tutorial/step6.jpg'
    }
];
