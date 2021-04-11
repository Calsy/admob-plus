module.exports = {
  docs: [
    'index',
    {
      Capacitor: [
        'capacitor/installation',
        {
          'Ad Formats': [
            'capacitor/ads/banner',
            'capacitor/ads/interstitial',
            'capacitor/ads/rewarded',
            'capacitor/ads/rewarded-interstitial',
          ],
          API: require('./sidebar/typedoc-capacitor.js'),
        },
        {
          type: 'link',
          label: 'CHANGELOG',
          href:
            'https://github.com/admob-plus/admob-plus/blob/master/packages/capacitor/CHANGELOG.md',
        },
      ],
      Cordova: [
        'cordova/getting-started',
        'cordova/installation',
        {
          'Ad Formats': [
            'cordova/ads/banner',
            'cordova/ads/interstitial',
            'cordova/ads/rewarded',
            'cordova/ads/rewarded-interstitial',
          ],
        },
        'cordova/test-ads',
        {
          'Advanced Topics': [
            'cordova/rewarded-ads-ssv',
            'cordova/targeting',
            'cordova/volume-control',
          ],
          'User Consent': [
            'cordova/consent/request',
            { API: require('./sidebar/typedoc-cordova-consent.js') },
          ],
          API: require('./sidebar/typedoc-cordova.js'),
        },
        'cordova/faq',
        {
          type: 'link',
          label: 'CHANGELOG',
          href:
            'https://github.com/admob-plus/admob-plus/blob/master/packages/cordova/CHANGELOG.md',
        },
      ],
      Ionic: [
        'ionic/getting-started',
        'ionic/installation',
        {
          'Ad Formats': [
            'ionic/ads/banner',
            'ionic/ads/interstitial',
            'ionic/ads/rewarded',
            'ionic/ads/rewarded-interstitial',
          ],
          API: require('./sidebar/typedoc-ionic.js'),
        },
        {
          type: 'link',
          label: 'CHANGELOG',
          href:
            'https://github.com/admob-plus/admob-plus/blob/master/packages/ionic/CHANGELOG.md',
        },
      ],
    },
    'troubleshooting',
  ],
}
