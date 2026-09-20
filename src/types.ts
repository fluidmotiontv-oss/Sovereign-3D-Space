/**
 * Sovereign 3D Ecosystem Core Types
 */

export interface TelemetryData {
  cpu: number;
  gpu: number;
  memory: number;
  temp: number;
  nodeStatus: 'online' | 'offline' | 'warning';
  tunnelHealth: number;
}

export interface LogicDebateMessage {
  id: string;
  role: 'user' | 'dragon';
  content: string;
  timestamp: number;
}

export interface FrequencySettings {
  hz: number;
  gain: number;
  type: OscillatorType;
  active: boolean;
}

export const SOLFEGGIO_FREQUENCIES = {
  UT: 396, // Liberation from Fear
  RE: 417, // Facilitating Change
  MI: 528, // Transformation & Miracles (DNA Repair)
  FA: 639, // Connecting/Relationships
  SOL: 741, // Expression/Solutions
  LA: 852, // Returning to Spiritual Order
  GROUNDING: 174,
  RELIEF: 285,
  UNIVERSAL: 432
};
