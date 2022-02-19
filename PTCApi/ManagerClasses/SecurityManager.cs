using System;
using System.Collections.Generic;
using System.Linq;
using PTCApi.EntityClasses;
using PTCApi.Model;

namespace PTCApi.ManagerClasses
{
    public class SecurityManager{
        public SecurityManager(PtcDbContext context, UserAuthBase auth){
            _DbContext = context;
            _auth = auth;

        }

        private PtcDbContext _DbContext  = null;
        private UserAuthBase _auth = null;

        protected List<UserClaim> GetUserClaims(Guid userId){
            var list = new List<UserClaim>();

            try
            {
                list = _DbContext.Claims.Where(u=>u.UserId==userId).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Trying to get user claims.", ex);
            }

            return list;
        }

        protected UserAuthBase BuildUserAuthObject(Guid userId, string userName){
            var claims = new List<UserClaim>();
            Type _authType = _auth.GetType();

            _auth.UserId = userId;
            _auth.UserName = userName;
            _auth.IsAuthentificated = true; 
            claims = GetUserClaims(userId);

            foreach (var claim in claims)
            {
                try
                {
                    _authType.GetProperty(claim.ClaimType).SetValue(_auth, Convert.ToBoolean(claim.ClaimValue), null);
                }
                catch (System.Exception)
                {
                }
            }

            return _auth;
        }

        public UserAuthBase ValidateUser(string userName, string password){
            var list = new List<UserBase>();

            try
            {
                list = _DbContext.Users.Where(
                        u=>u.UserName.ToLower() == userName.ToLower()
                        && u.Password.ToLower() == password.ToLower())
                    .ToList();

                    if (list.Count() > 0)
                    {
                        _auth = BuildUserAuthObject(list[0].UserId, userName);
                    }
            }
            catch (System.Exception ex)
            {
                throw new Exception("Trying to retrieve user.", ex);
            }

            return _auth;
        }

    }
}