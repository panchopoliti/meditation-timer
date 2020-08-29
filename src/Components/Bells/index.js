import longBell from  '../.././static/Audio/long-bell.mp3';
import bowlStruck from '../.././static/Audio/bowl-struck.mp3';
import japaneseGong from '../.././static/Audio/bell4.mp3';
import buddhistPrayerBell from '../.././static/Audio/buddhist-prayer-bell.mp3';
import burmeseGong from '../.././static/Audio/gong-burmese.wav';
import chineseGong from '../.././static/Audio/gong-chinese.wav';
import tingshaBell from '../.././static/Audio/tingsha.wav';
import zenBell from '../.././static/Audio/zen-bell.mp3';
import deepBell from '../.././static/Audio/deep-bell.mp3';
import oceanWaves from '../.././static/Audio/ocean-waves.mp3';
import rainforestWaterways from '../.././static/Audio/rainforest-waterways.mp3';
import soothingWinds from '../.././static/Audio/soothing-winds.mp3';
import tibetanBell from '../.././static/Audio/tibetan-bell.mp3';

const defaultAudioSelected = 'Bowl Struck';

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
    {
        name: 'Deep Bell',
        src: deepBell,
    },
    {
        name: 'Ocean Waves',
        src: oceanWaves,
    },
    {
        name: 'Rainforest Waterways',
        src: rainforestWaterways,
    },
    {
        name: 'Soothing Winds',
        src: soothingWinds,
    },
    {
        name: 'Tibetan Bell',
        src: tibetanBell,
    },
];

export { audiosInfoArray, defaultAudioSelected };