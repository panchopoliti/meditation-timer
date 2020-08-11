import longBell from  '../.././static/Audio/long-bell.mp3';
import bowlStruck from '../.././static/Audio/bowl-struck.wav';
import japaneseGong from '../.././static/Audio/bell4.wav';
import buddhistPrayerBell from '../.././static/Audio/buddhist-prayer-bell.wav';
import burmeseGong from '../.././static/Audio/gong-burmese.wav';
import chineseGong from '../.././static/Audio/gong-chinese.wav';
import tingshaBell from '../.././static/Audio/tingsha.wav';
import zenBell from '../.././static/Audio/zen-bell.mp3';

const defaultAudioSelected = 'Long Bell';

const audiosInfoArray = [
    {
        name: 'Long Bell',
        src: longBell,
    },
    {
        name: 'Bowl Struck',
        src: bowlStruck,
    },
    {
        name: 'Japanese Gong',
        src: japaneseGong,
    },
    {
        name: 'Buddhist Prayer Bell',
        src: buddhistPrayerBell,
    },
    {
        name: 'Burmese Gong',
        src: burmeseGong,
    },
    {
        name: 'Chinese Gong',
        src: chineseGong,
    },
    {
        name: 'Tingsha Bell',
        src: tingshaBell,
    },
    {
        name: 'Zen Bell',
        src: zenBell,
    },
];

export { audiosInfoArray, defaultAudioSelected };