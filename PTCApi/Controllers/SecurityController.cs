using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PTCApi.EntityClasses;
using PTCApi.ManagerClasses;
using PTCApi.Model;

namespace PTCApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    
    public class SecurityController: AppControllerBase{
        private ILogger<ProductController> _logger;
        private PtcDbContext _DbContext;

        public SecurityController(
            ILogger<ProductController> logger,
            PtcDbContext context)
        {
            _logger = logger;
            _DbContext = context;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] AppUser user){
            IActionResult ret = null;
            var auth = new AppUserAuth();
            var mgr = new SecurityManager(_DbContext, auth);

            auth = (AppUserAuth)mgr.ValidateUser(user.UserName, user.Password);
            if (auth.IsAuthentificated) {
                ret = StatusCode(StatusCodes.Status200OK, auth);
            }
            else {
                ret = StatusCode(StatusCodes.Status404NotFound, "Invalid user name/password");
            }
            
            return ret;
        }

    }
}