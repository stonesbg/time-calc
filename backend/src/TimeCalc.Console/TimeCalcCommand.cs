using Spectre.Console.Cli;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;

using TimeCalc.Core;
using TimeCalc.Core.Services;

internal sealed class TimeCalcCommand : Command<TimeCalcCommand.Settings>
{
    private TimeCalcService _timeCalcService;
    
    public TimeCalcCommand(TimeCalcService timeCalcService)
    {
        _timeCalcService = timeCalcService;
    }

    public sealed class Settings : CommandSettings
    {
        [Description("Source Time")]
        [CommandArgument(0, "<from_time>")]
        public string? FromTime { get; init; }

        [CommandArgument(1, "<from_time>")]
        public string? operation { get; init; }


        [CommandArgument(2, "<to_time>")]
        public string? ToTime { get; init; }
    }


    public override int Execute([NotNull] CommandContext context, [NotNull] Settings settings)
    {
         Console.WriteLine(_timeCalcService.Calc(settings.FromTime, settings.ToTime, settings.operation).Result);

         return 0;
    }
}