# Yape - Challenge Solution :rocket:

- [Descripción](#Descripción)
- [Instalación](#Instalación)
- [Diagrama de Arquitectura](#Diagrama_de_Arquitectura)

# Descripción

Se realizó una solución que disponibiliza un conjunto un APIs que internamente se comunican
con un microservicio antifraude mediante kafka, toda información generada se almacena en mongobd.

- MongoDb: Base de datos.
- NestJS (api-transaction): Backend y API-Gateway.
- NestJS (ms-antifraud): Microservicio de validación de transacciones.
- confluentinc/cp-kafka: Kafka server.
- provectuslabs/kafka-ui: Web app para administración y GUI de kafka.

# Instalación

Para levantar la infraestructura completa, ejecutar.
NOTA: Modificar .env a conveniencia, los valores por defector desplegan un servicio en el puerto 3000.

```bash
docker-compose up -d
```

# Ejecución

- El API-Transaction disponibiliza la UI de swagger para ocupar los servicios con facilidad.

![Swagger](./docs/Swagger.png)

- Ejecutar desde la terminal con cURL. 

```bash
curl -X 'POST' \
  'http://localhost:3000/transaction' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "accountExternalIdDebit": "12341234",
  "accountExternalIdCredit": "12341234",
  "tranferTypeId": 1,
  "value": 500
}'
```

# Diagrama de Arquitectura

El software incluye una implementación de un API-Gateway (backend) que se comunica con el microservicio mediante TRANSPORT.KAFKA.

```mermaid
sequenceDiagram
    autonumber
    actor user
    participant ApiTransaction
    participant kafka
    participant MSAntifraud
    participant mongodb

    Note over user,ApiTransaction: User side

    user-->>ApiTransaction: Request Create transaction

    Note over ApiTransaction,mongodb: Server side

    ApiTransaction-->>mongodb: Create pending transaction

    Note over ApiTransaction,MSAntifraud: Kafka side

    alt Message Pattern
        alt Topic [antifraud]
            ApiTransaction->>+kafka: Produce
            kafka->>-MSAntifraud: Consume
        end
        Note right of MSAntifraud: Antifraud algorithm...
        alt Topic [antifraud.reply]
            MSAntifraud->>+kafka: Produce
            kafka->>-ApiTransaction: Consume
        end
    end

    Note over ApiTransaction,MSAntifraud: Kafka side

    ApiTransaction->>mongodb: Update state "rejected" or "approved"

    ApiTransaction->>user: Show transaction response
```

# Performance testing

Se dejó un plan de pruebas para Apache JMeter.
La aplicación fue testeada con 5K peticiones por segundo.

[File](./docs/Antifraud.jmx)
