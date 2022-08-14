
using System.Reflection;
using MediatR;
using Spectre.Console.Cli;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TimeCalc.Core;
using TimeCalc.Core.Services;


Console.WriteLine("Time Calculator");

var service = new ServiceCollection()
		.AddLogging(c => c.AddConsole(opt => opt.LogToStandardErrorThreshold = LogLevel.Debug))
		.AddMediatR(Assembly.GetExecutingAssembly())
		.AddScoped<TimeCalcService>()
		.AddSingleton<ILoggerFactory, LoggerFactory>();

service.Add(ServiceDescriptor.Describe(typeof(ILogger<>), typeof(Logger<>), ServiceLifetime.Scoped));
var serviceProvider = service.BuildServiceProvider();

var logger = serviceProvider.GetService<ILoggerFactory>()
		.CreateLogger<Program>();
logger.LogDebug("Starting application");

var app = new CommandApp<TimeCalcCommand>();
return app.Run(args);

