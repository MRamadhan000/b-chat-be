import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export enum FriendStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    BLOCKED = 'blocked',
}

@Entity('friends')
export class Friend {
    @PrimaryGeneratedColumn()
    id: number;  
    // Relasi tetap dipertahankan untuk kebutuhan JOIN/Eager Loading
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'requesterId' }) // Mengaitkan relasi dengan kolom requesterId
    requester: User;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'addresseeId' }) // Mengaitkan relasi dengan kolom addresseeId
    addressee: User;

    @Column({ type: 'enum', enum: FriendStatus, default: FriendStatus.PENDING })    
    status: FriendStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}