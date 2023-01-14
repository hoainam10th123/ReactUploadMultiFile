using Microsoft.AspNetCore.Mvc;
using UpLoadFileApi.Helpers;

namespace UpLoadFileApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpLoadFilesController : ControllerBase
    {
        const long MaxFileSize = 10L * 1024L * 1024L * 1024L; // 10GB

        [HttpPost]
        [DisableFormValueModelBinding]
        [RequestSizeLimit(MaxFileSize)]
        [RequestFormLimits(MultipartBodyLengthLimit = MaxFileSize)]
        public async Task<IActionResult> UploadFile()
        {
            var formCollection = await Request.ReadFormAsync();
            var files = formCollection.Files;
            if (files.Any())
            {
                var file = files["files"];
                string UploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "UploadedFiles");                
                string UploadPath = Path.Combine(UploadFolder, file!.FileName);

                using (var temp = new FileStream(UploadPath, FileMode.Create))
                {
                    await file!.CopyToAsync(temp);
                }

                return NoContent();
            }
            else
            {
                return BadRequest("No file created");
            }
        }
    }
}
