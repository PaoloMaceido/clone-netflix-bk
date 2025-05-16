import { Account } from 'src/core/accounts/entities/account.entity';
import { Session } from 'src/core/sessions/entities/session.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ type: 'timestamp', nullable: true })
  emailVerified?: Date;

  @Column({ nullable: true })
  hashedPassword?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @Column('uuid', { array: true, default: [] })
  favoriteIds: string[];
}
