import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { IsNotEmpty, IsUUID, IsIn, IsJSON, IsEnum } from 'class-validator';
import { outboxMessageStatusEnum } from './enum/outbox-message-status.enum';

@Entity('outbox_message')
export class OutboxMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36, unique: true, nullable: false })
  @IsNotEmpty({ message: 'Message ID is required.' })
  message_id: string;

  @Column({ type: 'char', length: 255, nullable: false })
  @IsNotEmpty({ message: 'Type is required.' })
  type: string;

  @Column({ type: 'json', nullable: true })
  headers: object;

  @Column({ type: 'json', nullable: false })
  @IsNotEmpty({ message: 'Properties are required.' })
  @IsJSON({ message: 'Properties must be valid JSON.' })
  properties: object;

  @Column({ type: 'json', nullable: false })
  @IsNotEmpty({ message: 'Body is required.' })
  @IsJSON({ message: 'Body must be valid JSON.' })
  body: object;

  @Column({
    type: 'enum',
    enum: outboxMessageStatusEnum,
    nullable: false,
  })
  @IsEnum(outboxMessageStatusEnum, {
    message: 'Invalid outbox message  status.',
  })
  status: outboxMessageStatusEnum;

  @Column({ type: 'timestamp', nullable: true })
  sent_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
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
