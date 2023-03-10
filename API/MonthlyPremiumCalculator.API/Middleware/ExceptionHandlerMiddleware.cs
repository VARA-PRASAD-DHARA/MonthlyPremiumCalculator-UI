using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MonthlyPremiumCalculator.Data.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.API.Middleware
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public ExceptionHandlerMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next;
            _logger = loggerFactory.CreateLogger<ExceptionHandlerMiddleware>();
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
                _logger.LogInformation("Started : |Request-{method} |Api-{url} |status-{statusCode}", context.Request?.Method, context.Request?.Path.Value, context.Response?.StatusCode);
            }
            catch (Exception exception)
            {
                await HandleExceptionMessageAsync(context, exception).ConfigureAwait(false);
                _logger.LogError("Exception : |Request-{method} |Api-{url} |status-{statusCode} |Exception Message-{message}", context.Request?.Method, context.Request?.Path.Value, context.Response?.StatusCode, exception.Message);
            }
            finally
            {
                _logger.LogInformation("Finished : |Request-{method} |Api-{url} |status-{statusCode}", context.Request?.Method, context.Request?.Path.Value, context.Response?.StatusCode);
            }
        }

        private static Task HandleExceptionMessageAsync(HttpContext context, Exception exception)
        {
            var response = context.Response;
            context.Response.ContentType = "application/json";
            string message;
            switch (exception)
            {
                case AppException _:   // custom application error
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    message = "Bad Request";
                    break;
                case KeyNotFoundException _:  // not found error                   
                    response.StatusCode = (int)HttpStatusCode.NotFound;
                    message = "Key Not Found";
                    break;
                default:  // unhandled error                   
                    response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    message = "Internal Server Error";
                    break;
            }

            var result = JsonConvert.SerializeObject(new
            {
                Message = message + ", Please contact system administrator",
                Error = exception?.Message,
                context.Response.StatusCode
            });
            context.Response.StatusCode = response.StatusCode;
            return context.Response.WriteAsync(result);
        }
    }
}
