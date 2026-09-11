import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PremiumService from '../services/PremiumService';

const PremiumScreen = ({ navigation }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const subscriptionStatus = PremiumService.getSubscriptionStatus();

  const premiumFeatures = [
    { name: 'Unlimited Custom Tunings', icon: '🎸' },
    { name: 'Auto-Tuning Assistant', icon: '🤖' },
    { name: 'Tuning History & Analytics', icon: '📊' },
    { name: 'Ad-Free Experience', icon: '✨' },
    { name: 'Export Tunings', icon: '💾' },
    { name: 'Priority Support', icon: '👥' },
  ];

  const handlePurchase = async () => {
    setIsPurchasing(true);
    // Integrate with in-app purchase (e.g., React Native IAP)
    // For now, simulating a purchase
    const success = await PremiumService.purchasePremium('mock-transaction-id');
    setIsPurchasing(false);
    if (success) {
      navigation.goBack();
    }
  };

  const handleRestorePurchase = async () => {
    await PremiumService.restorePurchase();
  };

  if (subscriptionStatus.isPremium && !subscriptionStatus.isExpired) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Premium Active</Text>
        <Text style={styles.expiryText}>
          Your subscription expires on {subscriptionStatus.expiresAt?.toLocaleDateString()}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back to Tuner</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Unlock Premium Features</Text>
      <Text style={styles.subtitle}>Enhance your tuning experience</Text>

      <View style={styles.featuresContainer}>
        {premiumFeatures.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureName}>{feature.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.pricingContainer}>
        <Text style={styles.price}>$4.99/month</Text>
        <Text style={styles.pricingSubtitle}>or $49.99/year (Save 17%)</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handlePurchase}
        disabled={isPurchasing}
      >
        <Text style={styles.buttonText}>{isPurchasing ? 'Processing...' : 'Subscribe Now'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleRestorePurchase}>
        <Text style={styles.secondaryButtonText}>Restore Purchase</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  featuresContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  pricingContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  pricingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default PremiumScreen;
