const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();

// Multer için bir storage engine konfigüre edin (bu örnekte dosya kaydetmeyeceğimiz için diskStorage kullanmıyoruz)
const storage = multer.memoryStorage(); // Verileri bellekte tutar
const upload = multer({ storage: storage });

// E-posta gönderme için Nodemailer transporter'ını ayarla
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '', // Gmail adresinizi girin
        pass: 'gbda cxjt umni wpcf',        // Gmail şifrenizi girin
    }
});

// 'upload.none()' kullanarak herhangi bir dosya beklemeyin, sadece form verilerini alın
app.post('/send', upload.none(), async (req, res) => {
    try {
        // Gelen verileri konsola yazdır
        console.log(req.body);

        // E-posta mesajı detayları
        let mailOptions = {
            from: '', // Gönderici adresi
            to: '',           // Alıcı adresi
            subject: 'Yeni Sipariş Bilgisi',  // E-posta konusu
            text: `İsim: ${req.body.isim}\nSoyisim: ${req.body.soyisim}\nTelefon: ${req.body.telNo}\nAdres: ${req.body.adres}\nÜrün: ${req.body.urun}\nAdet: ${req.body.adet}` // E-posta içeriği
        };

        // E-posta gönderimi yap
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        // Kullanıcıya bilgi mesajı gönder
        res.send({ status: 'Siparişiniz Alınmıştır :)' });
    } catch (error) {
        console.error('E-posta gönderimi sırasında bir hata oluştu:', error);
        res.status(500).send({ status: 'Siparişiniz alınırken bir hata oluştu !!!' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
