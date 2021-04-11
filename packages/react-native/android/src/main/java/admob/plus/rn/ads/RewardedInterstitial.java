package admob.plus.rn.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAd;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAdLoadCallback;

import admob.plus.rn.ExecuteContext;
import admob.plus.rn.Generated.Events;

public class RewardedInterstitial extends AdBase {
    private RewardedInterstitialAd mAd = null;

    public RewardedInterstitial(ExecuteContext ctx) {
        super(ctx);
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void load(ExecuteContext ctx) {
        clear();

        RewardedInterstitialAd.load(ctx.getActivity(), adUnitId, ctx.optAdRequest(), new RewardedInterstitialAdLoadCallback() {
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mAd = null;
                emit(Events.REWARDED_INTERSTITIAL_LOAD_FAIL, loadAdError);
                ctx.error(loadAdError.getMessage());
            }

            @Override
            public void onAdLoaded(@NonNull RewardedInterstitialAd rewardedAd) {
                mAd = rewardedAd;
                ServerSideVerificationOptions ssv = ctx.optServerSideVerificationOptions();
                if (ssv != null) {
                    mAd.setServerSideVerificationOptions(ssv);
                }
                mAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        emit(Events.REWARDED_INTERSTITIAL_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        emit(Events.REWARDED_INTERSTITIAL_SHOW_FAIL, adError);
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        mAd = null;
                        emit(Events.REWARDED_INTERSTITIAL_SHOW);
                    }

                    @Override
                    public void onAdImpression() {
                        emit(Events.REWARDED_INTERSTITIAL_IMPRESSION);
                    }
                });

                emit(Events.REWARDED_INTERSTITIAL_LOAD);
                ctx.success();
            }
        });
    }

    public boolean isLoaded() {
        return mAd != null;
    }

    public void show(ExecuteContext ctx) {
        if (isLoaded()) {
            mAd.show(ctx.getActivity(), rewardItem -> {
                emit(Events.REWARDED_INTERSTITIAL_REWARD, rewardItem);
            });
            ctx.success();
        } else {
            ctx.error("Ad is not loaded");
        }
    }

    private void clear() {
        if (mAd != null) {
            mAd = null;
        }
    }
}
