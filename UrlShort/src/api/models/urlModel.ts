import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsBooleanString, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@Entity('urls')
export class URLModel {
	@PrimaryGeneratedColumn('uuid')
	_id: string

	@Column('varchar', { length: 50 })
	@MinLength(2, { message: 'Favor inserir no mínimo $constraint1 caracteres' })
	@MaxLength(50, { message: 'Favor inserir no máximo $constraint1 caracteres' })
	hash: string

	@Column('varchar', { length: 150 })
	@MinLength(1, { message: 'Favor inserir no mínimo $constraint1 caracteres' })
	@MaxLength(3, { message: 'Favor inserir no máximo $constraint1 caracteres' })
	originURL: string

	@Column('varchar', { length: 150 })
	@MinLength(1, { message: 'Favor inserir no mínimo $constraint1 caracteres' })
	@MaxLength(3, { message: 'Favor inserir no máximo $constraint1 caracteres' })
	shortURL: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
