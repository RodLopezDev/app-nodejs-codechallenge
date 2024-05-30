"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const configs_1 = require("./common/configs");
async function bootstrap() {
    const broker = `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`;
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                brokers: [broker],
            },
            consumer: {
                groupId: configs_1.KAFKA_CONSUMER_GROUP_ID,
            },
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map