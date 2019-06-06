const { app, BrowserWindow, globalShortcut } = require('electron')

//console.log(app.getAppPath())

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
app.on('ready', () => {
    createWindow();
    // ע��ȫ�ֿ�ݼ�
    const ret = globalShortcut.register('CommandOrControl+Shift+P', () => {
        console.log('CommandOrControl+Shift+P is pressed')
        win.webContents.send('ping', 'CommandOrControl+Shift+P is pressed');
    })    
    if (!ret) {
        console.log('registration failed')
    }

    // ����ݼ��Ƿ�ע��ɹ�
    console.log(globalShortcut.isRegistered('CommandOrControl+Shift+P'))
})

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

app.on('will-quit', () => {
    // ע����ݼ�
    globalShortcut.unregister('CommandOrControl+Shift+P')

    // ע�����п�ݼ�
    globalShortcut.unregisterAll()
})
// ������ļ��У��������дӦ��ʣ�������̴��롣
// Ҳ���Բ�ֳɼ����ļ���Ȼ���� require ���롣