using MediatR;
using TimeCalc.Api;
using TimeCalc.Core.Handlers;
using TimeCalc.Core.Requests;
using TimeCalc.Core.Services;

using System.Diagnostics;
using OpenTelemetry.Trace;
using OpenTelemetry.Resources;

// Define some important constants to initialize tracing with
var serviceName = "stonesbg.time-calc";
var serviceVersion = "1.0.0";

var builder = WebApplication.CreateBuilder(args);
builder.Host.ConfigureLogging(logging =>
{
	logging.ClearProviders();
	logging.AddConsole();
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddMediatR(x => x.AsScoped(), typeof(TimeCalculatorHandler));
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: "Allow Any",
			policy =>
			{
				policy
					.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader();
			});
});

builder.Services.AddScoped<TimeCalcService>();
builder.Services.AddSingleton(sp => sp.GetRequiredService<ILoggerFactory>().CreateLogger("DefaultLogger"));

// Configure important OpenTelemetry settings, the console exporter, and instrumentation library
builder.Services.AddOpenTelemetryTracing(tracerProviderBuilder =>
{
	tracerProviderBuilder
			.AddConsoleExporter()
			.AddSource(serviceName)
			.SetResourceBuilder(
					ResourceBuilder.CreateDefault()
							.AddService(serviceName: serviceName, serviceVersion: serviceVersion))
			.AddHttpClientInstrumentation()
			.AddAspNetCoreInstrumentation();
});

var app = builder.Build();

var myActivitySource = new ActivitySource(serviceName);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("Allow Any");

app.UseAuthorization();

app.MapControllers();

app.MediatePost<TimeCalculatorRequest>("/calc", myActivitySource);

app.Run();