import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class PremiumService {
  constructor() {
    this.isPremium = false;
    this.subscriptionEndDate = null;
  }

  async initializePremiumStatus() {
    try {
      const status = await AsyncStorage.getItem('premiumStatus');
      const endDate = await AsyncStorage.getItem('subscriptionEndDate');
      if (status) {
        this.isPremium = JSON.parse(status);
        this.subscriptionEndDate = new Date(endDate);
      }
    } catch (error) {
      console.error('Error initializing premium status:', error);
    }
  }

  async purchasePremium(transactionId) {
    try {
      // Verify purchase with backend
      const response = await axios.post('/api/verify-purchase', { transactionId });
      if (response.data.valid) {
        this.isPremium = true;
        this.subscriptionEndDate = new Date(response.data.expiresAt);
        await AsyncStorage.setItem('premiumStatus', JSON.stringify(true));
        await AsyncStorage.setItem('subscriptionEndDate', this.subscriptionEndDate.toISOString());
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error purchasing premium:', error);
      return false;
    }
  }

  async restorePurchase() {
    try {
      // Restore previous purchases
      const response = await axios.post('/api/restore-purchase');
      if (response.data.valid) {
        this.isPremium = true;
        this.subscriptionEndDate = new Date(response.data.expiresAt);
        await AsyncStorage.setItem('premiumStatus', JSON.stringify(true));
        await AsyncStorage.setItem('subscriptionEndDate', this.subscriptionEndDate.toISOString());
      }
    } catch (error) {
      console.error('Error restoring purchase:', error);
    }
  }

  hasAccessToFeature(featureName) {
    const premiumFeatures = ['customTunings', 'autoTuning', 'tuningHistory', 'noAds'];
    if (!premiumFeatures.includes(featureName)) {
      return true; // Free feature
    }
    return this.isPremium;
  }

  getSubscriptionStatus() {
    return {
      isPremium: this.isPremium,
      expiresAt: this.subscriptionEndDate,
      isExpired: this.subscriptionEndDate && new Date() > this.subscriptionEndDate,
    };
  }
}

export default new PremiumService();
