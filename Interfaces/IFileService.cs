using Azure.Storage.Blobs.Models;

namespace Project3.Interfaces
{
  public interface IFileService
  {
    Task<BlobContentInfo> UploadFile(IFormFile fileid);
    Task<bool> DeleteFile(Guid fileid);

  }
}
