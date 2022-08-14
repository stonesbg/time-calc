using TimeCalc.Core;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using TimeCalc.Core.Services;

namespace TimeCalc.Core.Tests;

public class TimeCalcServiceTests
{
    [Fact]
    public void MinusDurationWhereFromBiggerTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("2h0m", "1h0m", "minus");

        result.Result.Should().Be("1h");
    }
    
    [Fact]
    public void MinusDurationWhereFromSmallerTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("1h0m", "2h0m", "minus");

        result.Result.Should().Be("");
    }
    
    [Fact]
    public void MinusDurationWhereFromBiggerMinutesTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("2h40m", "1h2m", "minus");

        result.Result.Should().Be("1h 38m");
    }
    
    [Fact]
    public void MinusDurationWhereFromBiggerSpacesTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("2h 40m", "1h 2m", "minus");

        result.Result.Should().Be("1h 38m");
    }
    
    [Fact]
    public void PlusDurationWhereFromBiggerTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("2h0m", "1h0m", "plus");

        result.Result.Should().Be("3h");
    }
    
    [Fact]
    public void PlusDurationWhereFromSmallerTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("1h0m", "2h0m", "plus");

        result.Result.Should().Be("3h");
    }
    
    [Fact]
    public void PlusDurationWhereFromBiggerMinutesTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("2h40m", "1h2m", "plus");

        result.Result.Should().Be("3h 42m");
    }
    
    [Fact]
    public void PlusDurationWhereFromBiggerSpacesTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("2h 40m", "1h 2m", "plus");

        result.Result.Should().Be("3h 42m");
    }
    
    [Fact]
    public void EmptyVariableFromTimeTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("", "2h 40m", "plus");

        result.Result.Should().Be("2h 40m");
    }
    
    [Fact]
    public void EmptyVariableToTimeTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        var result = sut.Calc("2h 40m", "", "plus");

        result.Result.Should().Be("2h 40m");
    }
    
    [Fact]
    public void EmptyVariableOperationTest()
    {
        var loggerMock = new Mock<ILogger<TimeCalcService>>();
        var sut = new TimeCalcService(loggerMock.Object);

        Action act = () => sut.Calc("2h 40m", "", "");

        act.Should().Throw<ArgumentException>()
            .WithMessage("operation not passed in, needs to be set to either minus or plus.");
    }
}