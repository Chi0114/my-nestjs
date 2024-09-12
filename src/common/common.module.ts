import { Module } from "@nestjs/common";
import { LoginUtil } from "./utils/login.util";

@Module({
    providers:[LoginUtil],
    exports:[LoginUtil]
})
export class CommonModule{}