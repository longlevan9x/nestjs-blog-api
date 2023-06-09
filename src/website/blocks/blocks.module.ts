import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { BlockRepository } from '../../app/repositories/block.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockModel, BlockSchema } from '../../app/schemas/block.schema';

@Module({
  controllers: [BlocksController],
  providers: [BlocksService, BlockRepository],
  imports: [
    MongooseModule.forFeature([{ name: BlockModel.name, schema: BlockSchema }]),
  ],
})
export class BlocksModule {}
