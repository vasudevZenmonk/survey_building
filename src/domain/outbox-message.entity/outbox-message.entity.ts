import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { IsNotEmpty, IsUUID, IsIn, IsJSON } from 'class-validator';
import { outboxMessageStatusEnum } from './enum/outbox-message-status.enum';

@Entity('outbox_message')
export class OutboxMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, nullable: false })
  @IsUUID()
  @IsNotEmpty({ message: 'Message ID is required.' })
  message_id: string;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty({ message: 'Type is required.' })
  type: string;

  @Column({ type: 'json', nullable: true })
  headers: any;

  @Column({ type: 'json', nullable: false })
  @IsNotEmpty({ message: 'Properties are required.' })
  @IsJSON({ message: 'Properties must be valid JSON.' })
  properties: any;

  @Column({ type: 'json', nullable: false })
  @IsNotEmpty({ message: 'Body is required.' })
  @IsJSON({ message: 'Body must be valid JSON.' })
  body: any;

  @Column({
    type: 'enum',
    enum: outboxMessageStatusEnum,
    default: outboxMessageStatusEnum.PENDING,
    nullable: false,
  })
  @IsIn(Object.values(outboxMessageStatusEnum), {
    message: 'Status is invalid.',
  })
  status: outboxMessageStatusEnum;

  @Column({ type: 'timestamp', nullable: true })
  sent_at: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  // Methods
  markAsSent() {
    this.status = outboxMessageStatusEnum.SENT;
    this.sent_at = new Date();
  }

  getMessageId() {
    return this.message_id;
  }

  getProperties() {
    return {
      ...this.properties,
      headers: this.headers,
    };
  }

  getBody() {
    return this.body;
  }
}
