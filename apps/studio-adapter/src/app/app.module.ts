import { Module } from "@nestjs/common";
import { StudioGateway } from "./studio.gateway";


@Module({
  imports: [],
  controllers: [],
  providers: [StudioGateway],
})
export class AppModule {}
