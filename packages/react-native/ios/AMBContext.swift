import GoogleMobileAds

class AMBContext {
    static var ads = [Int: AMBAdBase]()
    static weak var plugin: RNAdMobPlus!

    let opts: NSDictionary?
    let resolve: RCTPromiseResolveBlock
    let reject: RCTPromiseRejectBlock

    init(_ opts: NSDictionary?,
         _ resolve: @escaping RCTPromiseResolveBlock,
         _ reject: @escaping RCTPromiseRejectBlock) {
        self.opts = opts
        self.resolve = resolve
        self.reject = reject
    }

    func opt(_ key: String) -> Any? {
        return opts?.value(forKey: key)
    }

    func optString(_ key: String) -> String? {
        return opt(key) as? String
    }

    func optId() -> Int? {
        return opt("id") as? Int
    }

    func optAdUnitID() -> String? {
        return optString("adUnitId")
    }

    func optAppMuted() -> Bool? {
        return opt("appMuted") as? Bool
    }

    func optAppVolume() -> Float? {
        return opt("appVolume") as? Float
    }

    func optMaxAdContentRating() -> GADMaxAdContentRating? {
        switch optString("maxAdContentRating") {
        case "G":
            return GADMaxAdContentRating.general
        case "MA":
            return GADMaxAdContentRating.matureAudience
        case "PG":
            return GADMaxAdContentRating.parentalGuidance
        case "T":
            return GADMaxAdContentRating.teen
        default:
            return nil
        }
    }

    func optChildDirectedTreatmentTag() -> Bool? {
        return opt("tagForChildDirectedTreatment") as? Bool
    }

    func optUnderAgeOfConsentTag() -> Bool? {
        return opt("tagForUnderAgeOfConsent") as? Bool
    }

    func optTestDeviceIds() -> [String]? {
        if let testDeviceIds = opt("testDeviceIds") as? [String] {
            return testDeviceIds
        }
        return nil
    }

    func optAd() -> AMBAdBase? {
        guard let id = optId(),
              let ad = AMBContext.ads[id]
        else {
            return nil
        }
        return ad
    }

    func optAdOrError() -> AMBAdBase? {
        if let ad = optAd() {
            return ad
        } else {
            error("Ad not found")
            return nil
        }
    }

    func optGADRequest() -> GADRequest {
        let request = GADRequest()
        if let contentURL = optString("contentUrl") {
            request.contentURL = contentURL
        }
        let extras = GADExtras()
        if let npa = optString("npa") {
            extras.additionalParameters = ["npa": npa]
        }
        request.register(extras)
        return request
    }

    func optGADServerSideVerificationOptions() -> GADServerSideVerificationOptions? {
        guard let ssv = opt("serverSideVerification") as? NSDictionary
        else {
            return nil
        }

        let options = GADServerSideVerificationOptions.init()
        if let customData = ssv.value(forKey: "customData") as? String {
            options.customRewardString = customData
        }
        if let userId = ssv.value(forKey: "userId") as? String {
            options.userIdentifier = userId
        }
        return options
    }

    func success() {
        resolve(nil)
    }

    func success(_ message: Any) {
        resolve(message)
    }

    func error() {
        self.error("Unknown error")
    }

    func error(_ message: String) {
        reject("unknown", message, nil)
    }

    func error(_ error: Error?) {
        if error != nil {
            reject("error", error!.localizedDescription, error)
        } else {
            self.error()
        }
    }

    func error(_ error: NSError) {
        reject(error.code.description, error.localizedDescription, error)
    }
}
