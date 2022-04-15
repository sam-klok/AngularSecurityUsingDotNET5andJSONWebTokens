import { UserAuthBase } from "../shared/security/user-auth-base";
import { AppUserClaim } from "./app-user-claim";

export class AppUserAuth extends UserAuthBase{
    claims: AppUserClaim[] = [];
    
    // canAccessProducts: boolean = false;
    // canAccessCategories: boolean = false;
    // canAccessLogs: boolean = false;
    // canAccessSettings: boolean = false;
    // canAddCategory: boolean = false;
    // canAddProduct: boolean = false;
    // canEditProduct: boolean = false;
    // canDeleteProduct: boolean = false;
    // canSaveProduct: boolean = false;

    init(): void{
        super.init();

        // this.canAccessProducts = false;
        // this.canAccessCategories = false;
        // this.canAccessLogs = false;
        // this.canAccessSettings=false;
        // this.canAddProduct=false;
        // this.canEditProduct=false;
    }

    getValueOfProperty(obj: any, key: string): boolean{
        let ret = obj[key];
        return ret;
    }
}