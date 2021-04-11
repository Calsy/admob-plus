import { registerPlugin } from '@capacitor/core'
import type { AdMobPlusPlugin } from './definitions'

const AdMobPlus = registerPlugin<AdMobPlusPlugin>('AdMobPlus', {
  web: () => import('./web').then((m) => new m.AdMobPlusWeb()),
})

type MobileAdOptions = { adUnitId: string }

class MobileAd {
  private static allAds: { [s: number]: MobileAd } = {}
  private static _counter = 1

  public readonly adUnitId: string
  public readonly id: number

  constructor({ adUnitId }: MobileAdOptions) {
    this.adUnitId = adUnitId

    this.id = MobileAd._counter++
    MobileAd.allAds[this.id] = this
  }
}

class BannerAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public show() {
    return AdMobPlus.bannerShow({ id: this.id, adUnitId: this.adUnitId })
  }

  public hide() {
    return AdMobPlus.bannerHide({ id: this.id })
  }
}

class InterstitialAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public load() {
    return AdMobPlus.interstitialLoad({ id: this.id, adUnitId: this.adUnitId })
  }

  public show() {
    return AdMobPlus.interstitialShow({ id: this.id })
  }
}

class RewardedAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public load() {
    return AdMobPlus.rewardedLoad({ id: this.id, adUnitId: this.adUnitId })
  }

  public show() {
    return AdMobPlus.rewardedShow({ id: this.id })
  }
}

class RewardedInterstitialAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public load() {
    return AdMobPlus.rewardedInterstitialLoad({
      id: this.id,
      adUnitId: this.adUnitId,
    })
  }

  public show() {
    return AdMobPlus.rewardedInterstitialShow({ id: this.id })
  }
}

export * from './definitions'
export {
  AdMobPlus,
  BannerAd,
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
}
