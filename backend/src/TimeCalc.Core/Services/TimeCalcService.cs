using System.Text.RegularExpressions;
using MediatR;
using Microsoft.Extensions.Logging;
using TimeCalc.Core.Requests;

namespace TimeCalc.Core.Services;

public class TimeCalcService
{
    private const string Quantity = "quantity";
    private const string Unit = "unit";

    private const string Days = @"(d(ays?)?)";
    private const string Hours = @"(h((ours?)|(rs?))?)";
    private const string Minutes = @"(m((inutes?)|(ins?))?)";
    private const string Seconds = @"(s((econds?)|(ecs?))?)";

    private readonly ILogger<TimeCalcService> _logger;
    
    public TimeCalcService(ILogger<TimeCalcService> logger)
    {
        _logger = logger;
    }

    public Task<string> Calc(string fromTime, string toTime, string operation)
    {
        if (operation == "")
        {
            throw new ArgumentException("operation not passed in, needs to be set to either minus or plus.");
        }
        
        var fromSpan = TimeSpan.Zero;
        var toSpan = TimeSpan.Zero;
        var result = TimeSpan.Zero;

        try
        {
            fromSpan = ParseTimeSpan(fromTime);
            _logger.LogInformation("{0} --> {1}", fromTime, fromSpan.ToString("c"));
        }
        catch (FormatException)
        {
            _logger.LogError("{0}: Bad Format", fromTime);
        }
        catch (OverflowException)
        {
            _logger.LogError("{0}: Overflow", fromTime);
        }
        
        try
        {
            toSpan = ParseTimeSpan(toTime);
            _logger.LogInformation("{0} --> {1}", toTime, toSpan.ToString("c"));
        }
        catch (FormatException)
        {
            _logger.LogError("{0}: Bad Format", toTime);
        }
        catch (OverflowException)
        {
            _logger.LogError("{0}: Overflow", toTime);
        }


        switch (operation)
        {
            case "plus":
                result = fromSpan.Add(toSpan);
                break;
            case "minus":
                result = fromSpan.Subtract(toSpan);
                break;
        }


        var construct = new List<string>();

        if (result.Days > 0) construct.Add($"{result.Days}d");

        if (result.Hours > 0) construct.Add($"{result.Hours}h");

        if (result.Minutes > 0) construct.Add($"{result.Minutes}m");

        return Task.FromResult(string.Join(" ", construct));
    }

    private TimeSpan ParseTimeSpan(string s)
    {
        var timeSpanRegex = new Regex(
            string.Format(@"\s*(?<{0}>\d+)\s*(?<{1}>({2}|{3}|{4}|{5}|\Z))",
                Quantity, Unit, Days, Hours, Minutes, Seconds),
            RegexOptions.IgnoreCase);
        var matches = timeSpanRegex.Matches(s);

        var ts = new TimeSpan();
        foreach (Match match in matches)
            if (Regex.IsMatch(match.Groups[Unit].Value, @"\A" + Days))
                ts = ts.Add(TimeSpan.FromDays(double.Parse(match.Groups[Quantity].Value)));
            else if (Regex.IsMatch(match.Groups[Unit].Value, Hours))
                ts = ts.Add(TimeSpan.FromHours(double.Parse(match.Groups[Quantity].Value)));
            else if (Regex.IsMatch(match.Groups[Unit].Value, Minutes))
                ts = ts.Add(TimeSpan.FromMinutes(double.Parse(match.Groups[Quantity].Value)));
            else if (Regex.IsMatch(match.Groups[Unit].Value, Seconds))
                ts = ts.Add(TimeSpan.FromSeconds(double.Parse(match.Groups[Quantity].Value)));
            else
                // Quantity given but no unit, default to Hours
                ts = ts.Add(TimeSpan.FromHours(double.Parse(match.Groups[Quantity].Value)));

        return ts;
    }
}