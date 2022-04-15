using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using PTCApi.EntityClasses;
using PTCApi.Model;

namespace PTCApi.ManagerClasses
{
    public class SecurityManager{
        public SecurityManager(PtcDbContext context, 
            UserAuthBase auth,
            JwtSettings settings)
        {
            _DbContext = context;
            _auth = auth;
            _settings = settings;
        }

        private PtcDbContext _DbContext  = null;
        private UserAuthBase _auth = null;
        private JwtSettings _settings = null;

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

        protected string BuildJwtToken(IList<UserClaim> claims, string userName){
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Key));

            var jwtClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (UserClaim claim in claims)
            {
                jwtClaims.Add(new Claim(claim.ClaimType, claim.ClaimValue));
            }

            var token = new JwtSecurityToken(
                issuer: _settings.Issuer,
                audience: _settings.Audience,
                claims: jwtClaims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(_settings.MinutesToExpiration),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            // convert to string basically
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        protected UserAuthBase BuildUserAuthObject(Guid userId, string userName){
            //var claims = new List<UserClaim>();
            Type _authType = _auth.GetType();

            _auth.UserId = userId;
            _auth.UserName = userName;
            _auth.IsAuthentificated = true; 
            _auth.Claims = GetUserClaims(userId);

            // foreach (var claim in claims)
            // {
            //     try
            //     {
            //         _authType.GetProperty(claim.ClaimType).SetValue(_auth, Convert.ToBoolean(claim.ClaimValue), null);
            //     }
            //     catch (System.Exception)
            //     {
            //     }
            // }

            _auth.BearerToken = BuildJwtToken(_auth.Claims, userName);

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