const kungur = new URL('../images/kungur.jpg', import.meta.url);
const gamsutl = new URL('../images/gamsutl.jpg', import.meta.url);
const bolgar = new URL('../images/bolgar.jpg', import.meta.url);
const kezenoyam = new URL('../images/kezenoyam.jpg', import.meta.url);
const kurshskayaKosa = new URL('../images/kurshskaya-kosa.jpg', import.meta.url);
const oymakon = new URL('../images/oymakon.jpg', import.meta.url);


export const initialCards = [
    {
        name: 'Кунгурская ледяная пещера',
        link: kungur
    },
    {
        name: 'гора Гамсутль',
        link: gamsutl
    },
    {
        name: 'город Болгар',
        link: bolgar
    },
    {
        name: 'Кезенойам',
        link: kezenoyam
    },
    {
        name: 'Берег Куршской Косы',
        link: kurshskayaKosa
    },
    {
        name: 'Оймякон',
        link: oymakon
    }
];