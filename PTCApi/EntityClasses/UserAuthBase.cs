using System;
using System.Collections.Generic;

namespace PTCApi.EntityClasses
{
    public class UserAuthBase
    {
        public UserAuthBase()
        {
            UserId = Guid.Empty;
            UserName = string.Empty;
            BearerToken = string.Empty;
            IsAuthentificated = false;
            Claims = new List<UserClaim>();
        }

        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string BearerToken { get; set; }
        public bool IsAuthentificated { get; set; }

        public List<UserClaim> Claims {get;set;}
    }
}