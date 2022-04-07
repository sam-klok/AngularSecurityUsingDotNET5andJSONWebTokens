using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PTCApi.EntityClasses;
using PTCApi.Model;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace PTCApi.Controllers {
  [Route("api/[controller]")]
  [ApiController]
  public class ProductPublicController : AppControllerBase {
    public ProductPublicController(ILogger<ProductPublicController> logger, PtcDbContext context) {
      _logger = logger;
      _DbContext = context;
    }

    private readonly PtcDbContext _DbContext;
    private readonly ILogger<ProductPublicController> _logger;

    [HttpGet]
    public IActionResult Get() {
      IActionResult ret = null;
      List<Product> list = new List<Product>();

      try {
        if (_DbContext.Products.Count() > 0) {
          list = _DbContext.Products.
            OrderBy(p => p.ProductName).ToList();
          ret = StatusCode(StatusCodes.Status200OK,
                            list);
        } else {
          ret = StatusCode(
            StatusCodes.Status404NotFound,
              "No Products exist in the system.");
        }
      } catch (Exception ex) {
        ret = HandleException(ex,
            "Exception trying to get all products");
      }

      return ret;
    }
  }
}
