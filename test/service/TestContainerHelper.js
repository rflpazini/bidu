const { GenericContainer } = require('testcontainers');

let GenerictContainerInstance = null;

class TestContainerHelper {
  static async startPostgresContainer() {
    GenerictContainerInstance = await new GenericContainer('postgres')
      .withExposedPorts(5432)
      .start();
  }

  static async stopPostgresContainer() {
    await GenerictContainerInstance.stop();
  }
}

module.exports = TestContainerHelper;
