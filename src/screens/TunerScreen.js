import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import AudioService from '../services/AudioService';
import PremiumService from '../services/PremiumService';
import { TUNINGS, getFreeTunings, getPremiumTunings } from '../data/tunings';

const { width } = Dimensions.get('window');

const TunerScreen = ({ navigation }) => {
  const [isListening, setIsListening] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [detuning, setDetuning] = useState(0);
  const [selectedTuning, setSelectedTuning] = useState(TUNINGS[0]);
  const [visibleTunings, setVisibleTunings] = useState(getFreeTunings());

  useEffect(() => {
    PremiumService.initializePremiumStatus();
  }, []);

  const handleStartStop = async () => {
    if (isListening) {
      await AudioService.stopListening();
      setIsListening(false);
    } else {
      const onFrequencyDetected = (freq) => {
        setFrequency(freq);
        const note = AudioService.getNote(freq);
        setCurrentNote(note);
        
        // Calculate detuning (-50 to +50)
        const targetFreq = 440; // A4 as reference
        const cents = 1200 * Math.log2(freq / targetFreq);
        setDetuning(Math.max(-50, Math.min(50, cents / 100)));
      };
      await AudioService.startListening(onFrequencyDetected);
      setIsListening(true);
    }
  };

  const handleTuningSelect = (tuning) => {
    if (tuning.premium && !PremiumService.isPremium) {
      navigation.navigate('Premium');
      return;
    }
    setSelectedTuning(tuning);
  };

  const handleShowAllTunings = () => {
    if (PremiumService.isPremium) {
      setVisibleTunings(TUNINGS);
    } else {
      navigation.navigate('Premium');
    }
  };

  return (
    <View style={styles.container}>
      {/* Tuning Display */}
      <View style={styles.tuningDisplayContainer}>
        <Text style={styles.tuningName}>{selectedTuning.name}</Text>
        <Text style={styles.tuningDesc}>{selectedTuning.description}</Text>
        <Text style={styles.notes}>{selectedTuning.notes.join(' - ')}</Text>
      </View>

      {/* Frequency Meter Gauge */}
      <View style={styles.gaugeContainer}>
        <Svg width={width - 40} height={200} viewBox="0 0 300 200">
          {/* Gauge arc */}
          <Circle cx="150" cy="150" r="120" fill="none" stroke="#ddd" strokeWidth="2" />
          {/* Current needle */}
          <Line
            x1="150"
            y1="150"
            x2={150 + 100 * Math.cos((detuning / 50) * Math.PI - Math.PI / 2)}
            y2={150 + 100 * Math.sin((detuning / 50) * Math.PI - Math.PI / 2)}
            stroke="#007AFF"
            strokeWidth="3"
          />
          {/* Center point */}
          <Circle cx="150" cy="150" r="8" fill="#007AFF" />
        </Svg>
        <Text style={styles.detuningText}>{detuning > 0 ? '+' : ''}{detuning.toFixed(1)} cents</Text>
      </View>

      {/* Current Note Display */}
      {currentNote && (
        <View style={styles.noteDisplay}>
          <Text style={styles.noteText}>
            {currentNote.note}{currentNote.octave}
          </Text>
          <Text style={styles.frequencyText}>{frequency.toFixed(1)} Hz</Text>
        </View>
      )}

      {/* Start/Stop Button */}
      <TouchableOpacity
        style={[styles.button, isListening && styles.buttonActive]}
        onPress={handleStartStop}
      >
        <Text style={styles.buttonText}>{isListening ? 'STOP' : 'START'}</Text>
      </TouchableOpacity>

      {/* Tuning Selector - Scrollable */}
      <ScrollView style={styles.tuningsScrollContainer} horizontal showsHorizontalScrollIndicator={false}>
        {visibleTunings.map((tuning, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tuningButton, selectedTuning.id === tuning.id && styles.tuningButtonActive]}
            onPress={() => handleTuningSelect(tuning)}
          >
            <Text style={styles.tuningButtonText}>
              {tuning.name}{tuning.premium && !PremiumService.isPremium ? ' 🔒' : ''}
            </Text>
          </TouchableOpacity>
        ))}
        {!PremiumService.isPremium && visibleTunings.length < TUNINGS.length && (
          <TouchableOpacity
            style={[styles.tuningButton, styles.unlockButton]}
            onPress={handleShowAllTunings}
          >
            <Text style={styles.unlockButtonText}>+ More 🔓</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* AI Support Button */}
      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => navigation.navigate('Support')}
      >
        <Text style={styles.aiButtonText}>🤖 AI Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tuningDisplayContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tuningName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tuningDesc: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  notes: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    fontWeight: '500',
  },
  gaugeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detuningText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 10,
  },
  noteDisplay: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  frequencyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonActive: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  tuningsScrollContainer: {
    marginBottom: 12,
    maxHeight: 60,
  },
  tuningButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
  tuningButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  tuningButtonText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  unlockButton: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFC107',
  },
  unlockButtonText: {
    fontSize: 13,
    color: '#FF9800',
    fontWeight: '600',
  },
  aiButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7C3AED',
  },
  aiButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TunerScreen;
