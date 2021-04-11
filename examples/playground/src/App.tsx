import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink, Route, Switch } from 'wouter'
import ColorModeSwitcher from './components/ColorModeSwitcher'
import Logs from './components/Logs'
import BannerAd from './routes/BannerAd'
import Home from './routes/Home'
import InterstitialAd from './routes/InterstitialAd'
import RewardedAd from './routes/RewardedAd'
import RewardedInterstitialAd from './routes/RewardedInterstitialAd'

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <SimpleGrid height="100vh" spacingY="20px" templateRows="auto 1fr 1fr">
      <Container as="header">
        <Heading>
          <Flex>
            <Link as={RouterLink} to="/">
              AdMob Plus
            </Link>
            <Spacer />
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
        </Heading>
        <HStack as="nav">
          <Link as={RouterLink} to="/banner">
            Banner Ad
          </Link>
          <Link as={RouterLink} to="/interstitial">
            Interstitial Ad
          </Link>
          <Link as={RouterLink} to="/rewarded">
            Rewarded Ad
          </Link>
          <Link as={RouterLink} to="/rewarded-interstitial">
            Rewarded Interstitial Ad
          </Link>
        </HStack>
      </Container>
      <Container>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/banner">
            <BannerAd />
          </Route>
          <Route path="/interstitial">
            <InterstitialAd />
          </Route>
          <Route path="/rewarded">
            <RewardedAd />
          </Route>
          <Route path="/rewarded-interstitial">
            <RewardedInterstitialAd />
          </Route>
        </Switch>
      </Container>
      <Flex maxH="50vh">
        <Logs />
      </Flex>
    </SimpleGrid>
  )
}

export default App
