import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import AudioService from '../services/AudioService';
import PremiumService from '../services/PremiumService';

const { width } = Dimensions.get('window');

const TunerScreen = ({ navigation }) => {
  const [isListening, setIsListening] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [detuning, setDetuning] = useState(0);
  const [tunings] = useState([
    { name: 'Standard', notes: ['E', 'A', 'D', 'G', 'B', 'E'], free: true },
    { name: 'Drop D', notes: ['D', 'A', 'D', 'G', 'B', 'E'], free: true },
    { name: 'Half Step Down', notes: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'], premium: true },
    { name: 'Custom', notes: [], premium: true },
  ]);
  const [selectedTuning, setSelectedTuning] = useState(tunings[0]);

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

  return (
    <View style={styles.container}>
      {/* Tuning Display */}
      <View style={styles.tuningDisplayContainer}>
        <Text style={styles.tuningName}>{selectedTuning.name}</Text>
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

      {/* Tuning Selector */}
      <View style={styles.tuningsContainer}>
        {tunings.map((tuning, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tuningButton, selectedTuning.name === tuning.name && styles.tuningButtonActive]}
            onPress={() => handleTuningSelect(tuning)}
          >
            <Text style={styles.tuningButtonText}>
              {tuning.name}{tuning.premium && !PremiumService.isPremium ? ' 🔒' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  tuningDisplayContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tuningName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  notes: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  gaugeContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
    padding: 20,
    marginBottom: 30,
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
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonActive: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  tuningsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tuningButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tuningButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  tuningButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default TunerScreen;
