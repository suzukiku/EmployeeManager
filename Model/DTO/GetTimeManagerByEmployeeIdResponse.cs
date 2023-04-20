namespace Project3.Model.DTO
{
  public class GetTimeManagerByEmployeeIdResponse
  {
    public GetTimeManagerByEmployeeIdResponse()
    {
    }

    public GetTimeManagerByEmployeeIdResponse(IEnumerable<TimeManager> timeManagers, TimeManagerResult timeManagerResult)
    {
      TimeManager = timeManagers;
      TimeManagerResult = timeManagerResult;
    }

    public IEnumerable<TimeManager> TimeManager { get; set; }
    public TimeManagerResult TimeManagerResult { get; set; }
  }
}
