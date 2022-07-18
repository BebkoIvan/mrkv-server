import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class News {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    short_description: string;

    @Column()
    content: string;

    @Column()
    author: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date
}
