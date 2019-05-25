const { app, BrowserWindow } = require('electron')

// ���ֶ�window�����ȫ�����ã��������ô���Ļ�����JavaScript����
// �������յ�ʱ��window���󽫻��Զ��Ĺر�
let win

function createWindow() {
    // ������������ڡ�
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // ����index.html�ļ�
    win.loadFile('index.html')

    // �򿪿����߹���
    win.webContents.openDevTools()

    // �� window ���رգ�����¼��ᱻ������
    win.on('closed', () => {
        // ȡ������ window ����������Ӧ��֧�ֶര�ڵĻ���
        // ͨ����Ѷ�� window ��������һ���������棬
        // ���ͬʱ����Ӧ��ɾ����Ӧ��Ԫ�ء�
        win = null
    })
}

// Electron ���ڳ�ʼ����׼��
// �������������ʱ���������������
// ���� API �� ready �¼����������ʹ�á�
app.on('ready', createWindow)

// ��ȫ�����ڹر�ʱ�˳���
app.on('window-all-closed', () => {
    // �� macOS �ϣ������û��� Cmd + Q ȷ�����˳���
    // ������󲿷�Ӧ�ü���˵����ᱣ�ּ��
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // ��macOS�ϣ�������dockͼ�겢��û���������ڴ�ʱ��
    // ͨ����Ӧ�ó��������´���һ�����ڡ�
    if (win === null) {
        createWindow()
    }
})

// ������ļ��У��������дӦ��ʣ�������̴��롣
// Ҳ���Բ�ֳɼ����ļ���Ȼ���� require ���롣