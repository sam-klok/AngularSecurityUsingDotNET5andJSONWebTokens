import { UserAuthBase } from "../shared/security/user-auth-base";

export class AppUserAuth extends UserAuthBase{
    canAccessProducts: boolean = false;
    canAccessCategories: boolean = false;
    canAccessLogs: boolean = false;
    canAccessSettings: boolean = false;
    canAddCategory: boolean = false;
    canAddProduct: boolean = false;
    canSaveProduct: boolean = false;

    init(): void{
        super.init();

        this.canAccessProducts = false;
    }
}