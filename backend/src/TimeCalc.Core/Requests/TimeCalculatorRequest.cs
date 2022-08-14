namespace TimeCalc.Core.Requests;
public class TimeCalculatorRequest : IHttpRequest
{
    public string FromTime { get; set; }

    public string ToTime { get; set; }

    public string Operation { get; set; }
}