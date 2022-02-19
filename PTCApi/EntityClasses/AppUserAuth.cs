using System;

namespace PTCApi.EntityClasses
{
    public class AppUserAuth: UserAuthBase
    {
        public AppUserAuth() : base()
        {
            CanAccessProducts = false;
            СanAccessCategories = false;
            СanAccessLogs = false;
            СanAccessSettings = false;
            СanAddCategory = false;
            СanAddProduct = false;
            СanEditProduct = false;
            СanDeleteProduct = false;
        }

        public bool CanAccessProducts { get; private set; }
        public bool СanAccessCategories { get; private set; }
        public bool СanAccessLogs { get; private set; }
        public bool СanAccessSettings { get; private set; }
        public bool СanAddCategory { get; private set; }
        public bool СanAddProduct { get; private set; }
        public bool СanEditProduct { get; private set; }
        public bool СanDeleteProduct { get; private set; }
    }
}