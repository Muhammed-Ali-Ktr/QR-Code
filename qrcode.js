/* ==========================================================================
   Next-Gen QR Code Generator - Complete JS with qr-code-styling & Clipboard Copy
   ========================================================================== */

// Initial State
const state = {
    content: 'https://example.com',
    contentType: 'url',
    qrColor: '#000000',
    bgColor: '#ffffff',
    margin: 4,
    errorCorrection: 'M',
    dotType: 'square',
    eyeFrameType: 'square',
    logo: null,
    logoScale: 0.3,
    hideBackgroundDots: true,
    theme: 'dark',
    qrInstance: null
};

// Initialization on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initQR();
    renderContentInputs();
    setupEventListeners();
});

// Setup Theme based on system/saved preference
function initTheme() {
    const savedTheme = localStorage.getItem('qr-theme') || 'dark';
    state.theme = savedTheme;
    document.body.className = savedTheme + '-mode';
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.className = state.theme + '-mode';
    localStorage.setItem('qr-theme', state.theme);
}

// Initialize the qr-code-styling instance
function initQR() {
    const container = document.getElementById('qrCanvasContainer');
    if (!container) return;

    state.qrInstance = new QRCodeStyling({
        width: 1000,
        height: 1000,
        type: 'canvas', // Use canvas to avoid SVG scaling/clip-path browser rendering bugs
        data: state.content,
        margin: state.margin * 10,
        qrOptions: {
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: state.errorCorrection
        },
        dotsOptions: {
            type: state.dotType,
            color: state.qrColor
        },
        backgroundOptions: {
            color: state.bgColor
        },
        cornersSquareOptions: {
            type: state.eyeFrameType,
            color: state.qrColor
        },
        cornersDotOptions: {
            type: state.eyeFrameType === 'square' ? 'square' : 'dot',
            color: state.qrColor
        },
        imageOptions: {
            crossOrigin: 'anonymous',
            hideBackgroundDots: state.hideBackgroundDots,
            imageSize: state.logoScale,
            margin: 8
        }
    });

    // Append to container
    state.qrInstance.append(container);
}

// Update the QR styling instance with new options
function updateQR() {
    if (!state.qrInstance) return;

    const options = {
        data: state.content || ' ',
        margin: state.margin * 10,
        qrOptions: {
            errorCorrectionLevel: state.errorCorrection
        },
        dotsOptions: {
            type: state.dotType,
            color: state.qrColor
        },
        backgroundOptions: {
            color: state.bgColor
        },
        cornersSquareOptions: {
            type: state.eyeFrameType,
            color: state.qrColor
        },
        cornersDotOptions: {
            type: state.eyeFrameType === 'square' ? 'square' : 'dot',
            color: state.qrColor
        },
        imageOptions: {
            hideBackgroundDots: state.hideBackgroundDots,
            imageSize: state.logoScale
        }
    };

    if (state.logo) {
        options.image = state.logo;
    } else {
        options.image = '';
    }

    state.qrInstance.update(options);
}

// Event Listeners setup
function setupEventListeners() {
    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Content Type Tabs Selection
    document.querySelectorAll('.type-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
            const clickedTab = e.currentTarget;
            clickedTab.classList.add('active');
            
            state.contentType = clickedTab.dataset.type;
            
            // Set reasonable default contents for types to keep preview alive
            switch (state.contentType) {
                case 'url': state.content = 'https://example.com'; break;
                case 'text': state.content = 'Merhaba Dünya'; break;
                case 'wifi': state.content = 'WIFI:T:WPA;S:WiFi-Network;P:password;;'; break;
                case 'email': state.content = 'mailto:ornek@example.com?subject=Geri Bildirim&body=Merhaba'; break;
                case 'phone': state.content = 'tel:+905551234567'; break;
            }

            renderContentInputs();
            updateQR();
        });
    });

    // Foreground Color Picker
    const qrColorInput = document.getElementById('qrColorInput');
    const qrColorPreview = document.getElementById('qrColorPreview');
    qrColorPreview.style.backgroundColor = state.qrColor;
    
    qrColorInput.addEventListener('input', (e) => {
        state.qrColor = e.target.value;
        qrColorPreview.style.backgroundColor = state.qrColor;
        
        // Remove active class from preset color dots
        document.querySelectorAll('.preset-dot').forEach(dot => dot.classList.remove('active'));
        updateQR();
    });

    // Background Color Picker
    const bgColorInput = document.getElementById('bgColorInput');
    const bgColorPreview = document.getElementById('bgColorPreview');
    bgColorPreview.style.backgroundColor = state.bgColor;

    bgColorInput.addEventListener('input', (e) => {
        state.bgColor = e.target.value;
        bgColorPreview.style.backgroundColor = state.bgColor;
        updateQR();
    });

    // Color Preset Swatches
    document.querySelectorAll('.preset-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            document.querySelectorAll('.preset-dot').forEach(d => d.classList.remove('active'));
            const selectedDot = e.currentTarget;
            selectedDot.classList.add('active');
            
            const color = selectedDot.dataset.color;
            state.qrColor = color;
            
            // Sync with picker input
            qrColorInput.value = color;
            qrColorPreview.style.backgroundColor = color;
            
            updateQR();
        });
    });

    // Margin Slider
    const marginSlider = document.getElementById('marginSlider');
    const marginVal = document.getElementById('marginVal');
    marginSlider.addEventListener('input', (e) => {
        state.margin = parseInt(e.target.value);
        marginVal.textContent = state.margin;
        updateQR();
    });

    // ECC level buttons
    document.querySelectorAll('.ecc-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.ecc-btn').forEach(b => b.classList.remove('active'));
            const clickedBtn = e.currentTarget;
            clickedBtn.classList.add('active');
            state.errorCorrection = clickedBtn.dataset.ecc;
            updateQR();
        });
    });

    // Dot Style option buttons
    document.querySelectorAll('[data-dot-type]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-dot-type]').forEach(b => b.classList.remove('active'));
            const clickedBtn = e.currentTarget;
            clickedBtn.classList.add('active');
            state.dotType = clickedBtn.dataset.dotType;
            updateQR();
        });
    });

    // Eye Frame option buttons
    document.querySelectorAll('[data-eye-frame]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-eye-frame]').forEach(b => b.classList.remove('active'));
            const clickedBtn = e.currentTarget;
            clickedBtn.classList.add('active');
            state.eyeFrameType = clickedBtn.dataset.eyeFrame;
            updateQR();
        });
    });

    // Template stack clicking
    document.querySelectorAll('.template-card-deck').forEach(card => {
        card.addEventListener('click', (e) => {
            const name = e.currentTarget.dataset.template;
            applyTemplate(name);
        });
    });

    // Logo Upload Logic
    const logoFileInput = document.getElementById('logoFileInput');
    const uploadLogoBtn = document.getElementById('uploadLogoBtn');
    const removeLogoBtn = document.getElementById('removeLogoBtn');
    const logoPreviewContainer = document.getElementById('logoPreviewContainer');
    const logoPreviewImg = document.getElementById('logoPreviewImg');
    const logoOptionsRow = document.getElementById('logoOptionsRow');
    const logoScaleSlider = document.getElementById('logoScaleSlider');
    const logoScaleVal = document.getElementById('logoScaleVal');
    const hideDotsCheckbox = document.getElementById('hideDotsCheckbox');

    uploadLogoBtn.addEventListener('click', () => {
        logoFileInput.click();
    });

    // Drag over effects for logo button
    uploadLogoBtn.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadLogoBtn.style.borderColor = 'var(--accent-color)';
        uploadLogoBtn.style.backgroundColor = 'var(--glass-input-focus)';
    });

    uploadLogoBtn.addEventListener('dragleave', () => {
        uploadLogoBtn.style.borderColor = 'var(--border-color)';
        uploadLogoBtn.style.backgroundColor = 'var(--glass-input-bg)';
    });

    uploadLogoBtn.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadLogoBtn.style.borderColor = 'var(--border-color)';
        uploadLogoBtn.style.backgroundColor = 'var(--glass-input-bg)';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleLogoFile(file);
        } else {
            showToast('Yalnızca görsel dosyaları desteklenir.');
        }
    });

    logoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleLogoFile(file);
        }
    });

    function handleLogoFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            state.logo = event.target.result;
            logoPreviewImg.src = state.logo;
            
            // Toggle visibility of preview
            logoPreviewContainer.classList.remove('hidden');
            logoOptionsRow.classList.remove('hidden');
            uploadLogoBtn.classList.add('hidden');
            
            // Set file name label
            logoPreviewContainer.querySelector('.logo-name').textContent = file.name;
            
            updateQR();
        };
        reader.readAsDataURL(file);
    }

    removeLogoBtn.addEventListener('click', () => {
        state.logo = null;
        logoPreviewImg.src = '';
        logoPreviewContainer.classList.add('hidden');
        logoOptionsRow.classList.add('hidden');
        uploadLogoBtn.classList.remove('hidden');
        logoFileInput.value = '';
        updateQR();
    });

    logoScaleSlider.addEventListener('input', (e) => {
        const scaleVal = parseFloat(e.target.value);
        state.logoScale = scaleVal / 10;
        logoScaleVal.textContent = scaleVal;
        updateQR();
    });

    hideDotsCheckbox.addEventListener('change', (e) => {
        state.hideBackgroundDots = e.target.checked;
        updateQR();
    });

    // Primary Download PNG button
    document.getElementById('downloadBtn').addEventListener('click', () => {
        downloadQR('png');
    });

    // Quick download SVG/PNG
    document.getElementById('quickDownloadPNG').addEventListener('click', () => {
        downloadQR('png');
    });

    document.getElementById('quickDownloadSVG').addEventListener('click', () => {
        downloadQR('svg');
    });

    // Share modal actions
    const shareModal = document.getElementById('shareModal');
    document.getElementById('shareBtn').addEventListener('click', () => {
        shareModal.classList.add('active');
    });

    document.getElementById('closeShareBtn').addEventListener('click', () => {
        shareModal.classList.remove('active');
    });

    shareModal.addEventListener('click', (e) => {
        if (e.target.id === 'shareModal') {
            shareModal.classList.remove('active');
        }
    });

    // Share platforms wiring
    document.getElementById('shareWhatsApp').addEventListener('click', () => shareToPlatform('whatsapp'));
    document.getElementById('shareTwitter').addEventListener('click', () => shareToPlatform('twitter'));
    document.getElementById('shareFacebook').addEventListener('click', () => shareToPlatform('facebook'));
    document.getElementById('copyImageBtn').addEventListener('click', copyQRImageToClipboard);
}

// Render dynamic input fields based on active tab
function renderContentInputs() {
    const container = document.getElementById('contentInputContainer');
    if (!container) return;

    let html = '';

    switch (state.contentType) {
        case 'url':
            html = `
                <div class="input-field-group">
                    <label class="input-label" for="urlInput">URL / Web Sitesi Adresi</label>
                    <input type="text" id="urlInput" class="glass-input" placeholder="https://example.com" value="${state.content.startsWith('http') ? state.content : 'https://example.com'}">
                </div>
            `;
            break;

        case 'text':
            html = `
                <div class="input-field-group">
                    <label class="input-label" for="textInput">Metin İçeriği</label>
                    <textarea id="textInput" class="glass-input" placeholder="QR koduna dönüştürülecek mesajı yazın...">${state.content.startsWith('WIFI:') || state.content.startsWith('mailto:') || state.content.startsWith('tel:') ? 'Merhaba Dünya' : state.content}</textarea>
                </div>
            `;
            break;

        case 'wifi':
            // Parse existing wifi or default
            let wifiSSID = 'WiFi-Network';
            let wifiPass = 'password';
            let wifiEnc = 'WPA';
            
            if (state.content.startsWith('WIFI:')) {
                const parts = state.content.slice(5).split(';');
                parts.forEach(part => {
                    if (part.startsWith('S:')) wifiSSID = part.slice(2);
                    else if (part.startsWith('P:')) wifiPass = part.slice(2);
                    else if (part.startsWith('T:')) wifiEnc = part.slice(2);
                });
            }

            html = `
                <div class="input-field-group">
                    <label class="input-label" for="wifiSSID">Kablosuz Ağ Adı (SSID)</label>
                    <input type="text" id="wifiSSID" class="glass-input" placeholder="Ağ Adı" value="${wifiSSID}">
                </div>
                <div class="wifi-inputs">
                    <div class="input-field-group">
                        <label class="input-label" for="wifiPassword">Ağ Şifresi</label>
                        <input type="password" id="wifiPassword" class="glass-input" placeholder="Şifre" value="${wifiPass}">
                    </div>
                    <div class="input-field-group">
                        <label class="input-label" for="wifiEncryption">Şifreleme Tipi</label>
                        <select id="wifiEncryption" class="glass-input">
                            <option value="WPA" ${wifiEnc === 'WPA' ? 'selected' : ''}>WPA/WPA2</option>
                            <option value="WEP" ${wifiEnc === 'WEP' ? 'selected' : ''}>WEP</option>
                            <option value="nopass" ${wifiEnc === 'nopass' ? 'selected' : ''}>Şifresiz (Açık)</option>
                        </select>
                    </div>
                </div>
            `;
            break;

        case 'email':
            let emailAddr = 'ornek@example.com';
            let emailSub = 'Geri Bildirim';
            let emailBody = '';
            
            if (state.content.startsWith('mailto:')) {
                try {
                    const mailtoUrl = new URL(state.content);
                    emailAddr = mailtoUrl.pathname;
                    emailSub = mailtoUrl.searchParams.get('subject') || 'Geri Bildirim';
                    emailBody = mailtoUrl.searchParams.get('body') || '';
                } catch(e) {
                    // fallback parsing if URL creation fails
                    const cleanMailto = state.content.replace('mailto:', '');
                    const queryIndex = cleanMailto.indexOf('?');
                    if (queryIndex !== -1) {
                        emailAddr = cleanMailto.substring(0, queryIndex);
                        const params = new URLSearchParams(cleanMailto.substring(queryIndex));
                        emailSub = params.get('subject') || 'Geri Bildirim';
                        emailBody = params.get('body') || '';
                    } else {
                        emailAddr = cleanMailto;
                    }
                }
            }

            html = `
                <div class="input-field-group">
                    <label class="input-label" for="emailAddress">E-posta Adresi</label>
                    <input type="email" id="emailAddress" class="glass-input" placeholder="ornek@example.com" value="${emailAddr}">
                </div>
                <div class="wifi-inputs">
                    <div class="input-field-group">
                        <label class="input-label" for="emailSubject">Konu</label>
                        <input type="text" id="emailSubject" class="glass-input" placeholder="Konu Başlığı" value="${emailSub}">
                    </div>
                    <div class="input-field-group">
                        <label class="input-label" for="emailBody">Mesaj Detayı (İsteğe Bağlı)</label>
                        <input type="text" id="emailBody" class="glass-input" placeholder="Mesaj..." value="${emailBody}">
                    </div>
                </div>
            `;
            break;

        case 'phone':
            let telNum = '+905551234567';
            if (state.content.startsWith('tel:')) {
                telNum = state.content.slice(4);
            }
            html = `
                <div class="input-field-group">
                    <label class="input-label" for="phoneNumber">Telefon Numarası</label>
                    <input type="tel" id="phoneNumber" class="glass-input" placeholder="+90 555 123 4567" value="${telNum}">
                </div>
            `;
            break;
    }

    container.innerHTML = html;

    // Attach dynamic input listeners with debounce
    const inputs = container.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(() => {
            updateContentFromFields();
            updateQR();
        }, 200));
        
        // Specifically for select changes, trigger instantly
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', () => {
                updateContentFromFields();
                updateQR();
            });
        }
    });
}

// Harvest values from active inputs and update state.content
function updateContentFromFields() {
    switch (state.contentType) {
        case 'url':
            const urlInput = document.getElementById('urlInput');
            state.content = urlInput ? urlInput.value.trim() : 'https://example.com';
            break;

        case 'text':
            const textInput = document.getElementById('textInput');
            state.content = textInput ? textInput.value : '';
            break;

        case 'wifi':
            const ssid = document.getElementById('wifiSSID')?.value || '';
            const pass = document.getElementById('wifiPassword')?.value || '';
            const enc = document.getElementById('wifiEncryption')?.value || 'WPA';
            state.content = `WIFI:T:${enc};S:${ssid};P:${pass};;`;
            break;

        case 'email':
            const email = document.getElementById('emailAddress')?.value || '';
            const subject = document.getElementById('emailSubject')?.value || '';
            const body = document.getElementById('emailBody')?.value || '';
            state.content = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            break;

        case 'phone':
            const phone = document.getElementById('phoneNumber')?.value || '';
            state.content = `tel:${phone}`;
            break;
    }
}

// Apply visual presets (deck of cards)
function applyTemplate(name) {
    document.querySelectorAll('.template-card-deck').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.template === name) {
            card.classList.add('active');
        }
    });

    switch (name) {
        case 'default-dark':
            state.qrColor = '#000000';
            state.bgColor = '#ffffff';
            state.dotType = 'square';
            state.eyeFrameType = 'square';
            break;
        case 'royal-glass':
            state.qrColor = '#4f46e5';
            state.bgColor = '#ffffff';
            state.dotType = 'rounded';
            state.eyeFrameType = 'extra-rounded';
            break;
        case 'cyber-sunset':
            state.qrColor = '#f43f5e';
            state.bgColor = '#0f0f1b';
            state.dotType = 'dots';
            state.eyeFrameType = 'extra-rounded';
            break;
        case 'mint-forest':
            state.qrColor = '#059669';
            state.bgColor = '#f0fdf4';
            state.dotType = 'classy';
            state.eyeFrameType = 'outround';
            break;
    }

    // Sync input controls
    document.getElementById('qrColorInput').value = state.qrColor;
    document.getElementById('qrColorPreview').style.backgroundColor = state.qrColor;
    document.getElementById('bgColorInput').value = state.bgColor;
    document.getElementById('bgColorPreview').style.backgroundColor = state.bgColor;

    // Remove active preset dots highlight since custom template overrides
    document.querySelectorAll('.preset-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.color === state.qrColor);
    });

    // Update style buttons
    document.querySelectorAll('[data-dot-type]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.dotType === state.dotType);
    });

    document.querySelectorAll('[data-eye-frame]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.eyeFrame === state.eyeFrameType);
    });

    updateQR();
    showToast(`${name.replace('-', ' ').toUpperCase()} şablonu uygulandı.`);
}

// Download QR Code
function downloadQR(format) {
    if (!state.qrInstance) return;
    try {
        state.qrInstance.download({
            name: `qr-code-${Date.now()}`,
            extension: format
        });
        showToast(`QR Kodu ${format.toUpperCase()} olarak indiriliyor...`);
    } catch (error) {
        console.error(error);
        showToast('İndirme işlemi sırasında bir hata oluştu.');
    }
}

// Copy canvas to clipboard as an Image Blob
function copyQRImageToClipboard() {
    const container = document.getElementById('qrCanvasContainer');
    const canvas = container.querySelector('canvas');
    
    if (!canvas) {
        showToast('Kopyalanacak QR kodu bulunamadı.');
        return;
    }

    try {
        canvas.toBlob((pngBlob) => {
            if (navigator.clipboard && navigator.clipboard.write) {
                navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': pngBlob })
                ]).then(() => {
                    showToast('QR Kod görsel olarak panoya kopyalandı!');
                    document.getElementById('shareModal').classList.remove('active');
                }).catch(err => {
                    console.error('Clipboard write error:', err);
                    showToast('Panoya yazma hatası oluştu.');
                });
            } else {
                showToast('Görsel kopyalama tarayıcınızda desteklenmiyor.');
            }
        }, 'image/png');
    } catch(err) {
        console.error('Copy Image Error:', err);
        showToast('Kopyalama sırasında bir hata oluştu.');
    }
}

// Share via Platform APIs or links
function shareToPlatform(platform) {
    const text = encodeURIComponent(`Oluşturduğum QR Kod: ${state.content}`);
    const shareUrl = encodeURIComponent(window.location.href);
    let url = '';

    switch (platform) {
        case 'whatsapp':
            url = `https://wa.me/?text=${text}`;
            break;
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${text}`;
            break;
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${text}`;
            break;
    }

    if (url) {
        window.open(url, '_blank', 'width=600,height=450');
        document.getElementById('shareModal').classList.remove('active');
    }
}

// Micro-interaction Toast message
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('active');
    }, 2500);
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
