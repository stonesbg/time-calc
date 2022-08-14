using System.Text.RegularExpressions;
using MediatR;
using Microsoft.Extensions.Logging;
using TimeCalc.Core.Requests;
using TimeCalc.Core.Services;

namespace TimeCalc.Core.Handlers;

public class TimeCalculatorHandler : IRequestHandler<TimeCalculatorRequest, string>
{
    private readonly TimeCalcService _timeCalcService;
    private ILogger _logger;
    
    public TimeCalculatorHandler(ILogger logger, TimeCalcService timeCalcService)
    {
        _logger = logger;
        _timeCalcService = timeCalcService;
    }

    public Task<string> Handle(TimeCalculatorRequest request, CancellationToken cancellationToken)
    {
        return _timeCalcService.Calc(request.FromTime, request.ToTime, request.Operation);
    }

}