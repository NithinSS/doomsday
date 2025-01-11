interface GameConfig {
  duration: number;
  startYear: number;
  endYear: number;
}

const DEFAULT_CONFIG: GameConfig = {
  duration: 120,
  startYear: 1600,
  endYear: 2100
};

export function saveGameConfig(config: GameConfig): void {
  localStorage.setItem('doomsday-config', JSON.stringify(config));
}

export function loadGameConfig(): GameConfig {
  const stored = localStorage.getItem('doomsday-config');
  if (!stored) return DEFAULT_CONFIG;
  
  try {
    const config = JSON.parse(stored);
    return {
      duration: Math.max(30, Math.min(600, config.duration)),
      startYear: Math.max(1300, Math.min(3020, config.startYear)),
      endYear: Math.max(1300, Math.min(3020, config.endYear))
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}