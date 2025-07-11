/**
 * QuantumCoin-ZeroEnergy - Главная точка входа
 * Революционная криптовалюта с нулевыми комиссиями и энергопотреблением
 */

const { QuantumNode } = require('./core/node');
const { Wallet } = require('./wallet/wallet');
const { NetworkManager } = require('./core/network/manager');
const { ConsensusEngine } = require('./core/consensus/pov');
const { CryptoManager } = require('./core/crypto/quantum-crypto');
const { AIEvolution } = require('./ai/evolution');

class QuantumCoin {
  constructor(config = {}) {
    this.config = {
      port: config.port || 8080,
      networkId: config.networkId || 'quantum-mainnet',
      enableOffline: config.enableOffline !== false,
      enableAI: config.enableAI !== false,
      ...config
    };
    
    this.node = null;
    this.wallet = null;
    this.network = null;
    this.consensus = null;
    this.crypto = null;
    this.ai = null;
  }

  async initialize() {
    console.log('🚀 Инициализация QuantumCoin-ZeroEnergy...');
    
    // Инициализация квантово-устойчивой криптографии
    this.crypto = new CryptoManager();
    await this.crypto.initialize();
    
    // Инициализация консенсуса Proof-of-Validation
    this.consensus = new ConsensusEngine(this.crypto);
    
    // Инициализация сетевого менеджера
    this.network = new NetworkManager(this.config);
    
    // Инициализация ноды
    this.node = new QuantumNode({
      crypto: this.crypto,
      consensus: this.consensus,
      network: this.network,
      config: this.config
    });
    
    // Инициализация кошелька
    this.wallet = new Wallet(this.crypto);
    
    // Инициализация AI системы самоэволюции
    if (this.config.enableAI) {
      this.ai = new AIEvolution(this);
      await this.ai.initialize();
    }
    
    console.log('✅ QuantumCoin-ZeroEnergy успешно инициализирован!');
  }

  async start() {
    await this.initialize();
    
    console.log('🌐 Запуск ноды...');
    await this.node.start();
    
    console.log('📱 Запуск сети...');
    await this.network.start();
    
    if (this.ai) {
      console.log('🧠 Запуск AI системы...');
      await this.ai.start();
    }
    
    console.log('🚀 QuantumCoin-ZeroEnergy запущен на порту', this.config.port);
  }

  async stop() {
    console.log('🛑 Остановка QuantumCoin-ZeroEnergy...');
    
    if (this.ai) await this.ai.stop();
    if (this.network) await this.network.stop();
    if (this.node) await this.node.stop();
    
    console.log('✅ QuantumCoin-ZeroEnergy остановлен');
  }
}

// Запуск при прямом вызове
if (require.main === module) {
  const quantumCoin = new QuantumCoin();
  
  quantumCoin.start().catch(console.error);
  
  // Обработка сигналов завершения
  process.on('SIGINT', async () => {
    await quantumCoin.stop();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    await quantumCoin.stop();
    process.exit(0);
  });
}

module.exports = { QuantumCoin };
