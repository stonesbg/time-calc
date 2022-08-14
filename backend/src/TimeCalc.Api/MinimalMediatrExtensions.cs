using System.Diagnostics;
using MediatR;
using TimeCalc.Core.Requests;

namespace TimeCalc.Api;

public static class MinimalMediatrExtensions
{
    public static WebApplication MediatePost<TRequest>(this WebApplication app, string template, ActivitySource activitySource) where TRequest : IHttpRequest
    {
        using var activity = activitySource.StartActivity("MediatePost");

        app.MapPost(template,
            async (IMediator mediator, [AsParameters] TRequest request) =>
            {
                activity?.SetTag("request", request);
                return await mediator.Send(request);
            });
        return app;
    }
}