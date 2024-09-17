import { Injectable } from '@nestjs/common';
import { OutboxMessage } from 'src/domain/outbox-message.entity/outbox-message.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OutboxMessageRepository extends Repository<OutboxMessage> {
  constructor(private dataSource: DataSource) {
    super(OutboxMessage, dataSource.createEntityManager());
  }

  //   async getUnsentMessages(messageLimit, transaction) {
  //     let criteria = {
  //       status: {
  //         [Op.eq]: OutboxMessageStatus.ENUM.PENDING,
  //       },
  //     };

  //     const { rows } = await this.findAndCountAll(
  //       criteria,
  //       [],
  //       0,
  //       messageLimit,
  //       [],
  //       false,
  //       {},
  //       transaction,
  //     );
  //     return rows;
  //   }

  async initializeOutboxMessage(outboxMessage) {
    const payload = {
      message_id: outboxMessage.getId(),
      type: outboxMessage.getType(),
      properties: outboxMessage.getProperties(),
      headers: outboxMessage.getHeaders(),
      body: outboxMessage.getPayload(),
    };

    return this.create(payload);
  }
}
